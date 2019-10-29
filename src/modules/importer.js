import fs from "fs";
import util from "util";
import csv from "csvjson";

const readFile = util.promisify(fs.readFile);

class Importer {
	constructor(eventEmitter) {
		eventEmitter.addListener("changed", changed => {
			console.log(`Changes received ${changed}`);
			changed.forEach(file => {
				this.import(file).then(content => console.log(content));
				//console.log(this.importSync(file));
			});
		})
	}

	async import(path) {
		const content = await readFile(path, "utf8");
		return this.convertContent(content);
	}

	importSync(path) {
		const content = fs.readFileSync(path, "utf8");
		return this.convertContent(content);
	}

	convertContent(content) {
		return csv.toObject(content);
	}
}

export default Importer;