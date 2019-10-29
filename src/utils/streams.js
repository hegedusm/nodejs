const yargs = require('yargs');
const fs = require('fs');
const util = require("util");
const async = require("async");
const path = require("path");

const actionRegistry = {};

const argv = yargs
	.option('action', {
		alias: "a",
		description: 'Name of the action',
		type: 'string'
	})
	.option('file', {
		alias: "f",
		description: 'Action parameter',
		type: 'string'
	})
	.option('path', {
		alias: "p",
		description: 'Css bundler action parameter',
		type: 'string'
	})
	.help(false)
	.showHelpOnFail(false)
	.argv;

/**
 * Opens prompt and writes back reversed string from input
 */
function reverse(commandLineInput) {
	inputTransform("reverse", line => line.split('').reverse().join(''), commandLineInput);
}

/**
 * Opens prompt and writes back upper cased string from input
 */
function transform(commandLineInput) {
	inputTransform("transform", line => line.toUpperCase(), commandLineInput);
}

/**
 * Writes file content to stdout
 */
function outputFile(filePath) {
	if (!fs.statSync(filePath).isFile()) {
		console.error("Required parameter missing");
		return;
	}

	fs.createReadStream(filePath).pipe(process.stdout);
}

/**
 * Writes formatted json object from the parameter to stdout
 */
function convertFromFile(filePath) {
	if (!fs.statSync(filePath).isFile()) {
		console.error("Required parameter missing");
		return;
	}
	const csv = require("csvjson");
	const content = fs.readFileSync(filePath, "utf8");
	process.stdout.write(util.format(csv.toObject(content)));
}

/**
 * Creates new json file from the content of the parameter at the location of the source file
 */
function convertToFile(filePath) {
	if (!fs.statSync(filePath).isFile()) {
		console.error("Required parameter missing");
		return;
	}

	const csv = require("csvjson");
	const content = fs.readFileSync(filePath, "utf8");
	const parsedPath = path.parse(filePath);
	const targetPath = path.join(parsedPath.dir, parsedPath.name + ".json");

	const outStream = fs.createWriteStream(targetPath)
	outStream.write(JSON.stringify(csv.toObject(content)));
}


function cssBundler(directory) {
	if (!fs.statSync(directory).isDirectory()) {
		console.error("Required parameter missing");
		return;
	}
	fs.readdir(directory, (err, files) => {
		if (err) {
			console.error(err);
			return;
		}
		files = files
			.filter(file => file.endsWith(".css"))
			.filter(file => file !== "bundle.css")
			.map(file => path.join(directory, file));
		//append required file to the end
		var homeworkCss = path.join(__dirname, "/data/nodejs-homework3.css");
		files.push(homeworkCss)

		console.log(`Bundling css files: ${files}`);

		const targetcssPath = path.join(directory, "bundle.css");

		async.map(files, fs.readFile, (err, results) => {
			if (err) {
				console.error(err);
				return;
			}

			fs.writeFile(targetcssPath, results.join("\n"), (err) => {
				if (err) {
					console.error(err);
					return;
				}
			});

		});
	});

}


function registerAction(action, parameter) {
	actionRegistry[action.name] = () => action(parameter);
}

/**
 * Writes defined input, or in it's absence a dynamic promp input to process std through a transformer function
 */
function inputTransform(prompt, transformer, definedInput) {
	if (definedInput) {
		process.stdout.write(transformer(definedInput));
	}
	else {
		var readline = require('readline');
		var rl = readline.createInterface(process.stdin, process.stdout);
		rl.setPrompt(`${prompt}> `);
		rl.prompt();
		rl.on('line', function (line) {
			if (line == "exit") {
				console.log("bye");
				rl.close();
			}
			console.log(transformer(line));
			rl.prompt();
		}).on('close', function () {
			process.exit(0);
		});
	}
}

registerAction(reverse, argv._[0]);
registerAction(transform, argv._[0]);
registerAction(outputFile, argv.file);
registerAction(convertFromFile, argv.file);
registerAction(convertToFile, argv.file);
registerAction(cssBundler, argv.path);


if (process.argv[2] && (process.argv[2] == "-h" || process.argv[2] == "--help")) {
	yargs.showHelp();
}
else {
	if (actionRegistry[argv.action]) {
		actionRegistry[argv.action]();
	}
	else {
		console.error(`Unknown action ${argv.action}, valid actions are ${Object.keys(actionRegistry)}`);
	}
}
