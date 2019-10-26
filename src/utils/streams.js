const yargs = require('yargs');
const fs = require('fs');
const util = require("util");

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
	.demandOption("action")
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
	const path = require("path");
	const csv = require("csvjson");
	const content = fs.readFileSync(filePath, "utf8");
	const parsedPath = path.parse(filePath);
	const targetPath = path.join(parsedPath.dir, parsedPath.name+".json");
	
	const outStream = fs.createWriteStream(targetPath)
	outStream.write(JSON.stringify(csv.toObject(content)));
}

function registerAction(action) {
	actionRegistry[action.name] = action;
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
registerAction(outputFile);
registerAction(convertFromFile);
registerAction(convertToFile);

if (actionRegistry[argv.action]) {
	actionRegistry[argv.action](argv.file);
}
else {
	console.error(`Unknown action ${argv.action}, valid actions are ${Object.keys(actionRegistry)}`);
}
