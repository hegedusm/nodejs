const yargs = require('yargs');
const fs = require('fs');
const util = require("util");
const async = require("async");
const path = require("path");
var request = require('request');

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
function reverse() {
	inputTransform("reverse", line => line.split('').reverse().join(''));
}

/**
 * Opens prompt and writes back upper cased string from input
 */
function transform() { inputTransform("transform", line => line.toUpperCase()); }

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

				var options = {
					url: 'https://epam-my.sharepoint.com/personal/vitali_kozlov_epam_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fvitali%5Fkozlov%5Fepam%5Fcom%2FDocuments%2FNode%2Ejs%2FCDP%2FHomeworks%2F3%2E%20Command%20Line%2E%20Debugging%2E%20Errors%20handling%20%2D%20Filesystem%20and%20Streams%2Fnodejs%2Dhomework3%2Ecss&parent=%2Fpersonal%2Fvitali%5Fkozlov%5Fepam%5Fcom%2FDocuments%2FNode%2Ejs%2FCDP%2FHomeworks%2F3%2E%20Command%20Line%2E%20Debugging%2E%20Errors%20handling%20%2D%20Filesystem%20and%20Streams&originalPath=aHR0cHM6Ly9lcGFtLW15LnNoYXJlcG9pbnQuY29tLzp1Oi9wL3ZpdGFsaV9rb3psb3YvRWVZODlPbHRyMXBCcXBsZzUyTTUwN0lCNXlxYUhpRDcxdzB4czJzM0hSaWhwQT9ydGltZT1iLXNHbnZKWjEwZw'
				};

				request.get(options, function (error, response, body) {
					if (error) {
						console.error(error);
					}
					let httpRespAppend = ""
					if (response.statusCode === 200) {
						httpRespAppend = body;
					} else {
						httpRespAppend = ".missingHttp{}"
					}
					fs.appendFile(targetcssPath, httpRespAppend, (err) => {
						if (err) {
							console.error(err);
						}
					});
				});
			});

		});
	});

}


function registerAction(action, parameter) {
	actionRegistry[action.name] = () => action(parameter);
}

function inputTransform(prompt, transformer) {
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


registerAction(reverse);
registerAction(transform);
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
