import fs from "fs";

class Importer {
	constructor(eventEmitter) {
		eventEmitter.addListener("changed", changed => {
			console.log(`Changes received ${changed}`);
			changed.forEach(file => {
				const content = this.importSync(file);
				console.log(`${file}: ${content ? content : "<empty file>"}`);
			});
		})
	}

	async import(path) {
		return await fs.readFile(path, "utf8");
	}

	importSync(path) {
		return fs.readFileSync(path, "utf8");
	}
}

export default Importer;