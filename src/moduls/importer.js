import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

class Importer {
	constructor(eventEmitter) {
		eventEmitter.addListener("changed", changed => {
			console.log(`Changes received ${changed}`);
			changed.forEach(file => {
				this.import(file).then(content => {console.log(`${file}: ${content ? content : "<empty file>"}`);});
			});
		})
	}

	async import(path) {
		return await readFile(path, "utf8");
	}

	importSync(path) {
		return fs.readFileSync(path, "utf8");
	}
}

export default Importer;