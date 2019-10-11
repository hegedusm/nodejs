import fs from "fs";
import util from "util";
import csv from "csvtojson";

const readFile = util.promisify(fs.readFile);

class Importer {
	constructor(eventEmitter) {
		eventEmitter.addListener("changed", changed => {
			console.log(`Changes received ${changed}`);
			changed.forEach(file => {
				this.import(file).then(content =>  
					csv({
						noheader:true,
						output: "csv"
					}).fromString(content)
					.then(csvRow => console.log(csvRow))
				);
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