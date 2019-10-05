import fs from "fs";
import util from "util";
import EventEmmitter from "events";
import path from "path";

const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

class DirWatcher extends EventEmmitter {

	constructor(path, delay) {
		super();
		this.fileMetadatas = {};

		const directory = this.isValidPath(path);
		console.log(`Started watching directory ${directory} for file changes every ${delay} ms`);
		setInterval(() => this.checkAndNotifyDirectoryChange(directory), delay, directory);
	}

	isValidPath(path) {
		const stats = fs.lstatSync(path);
		if (!stats.isDirectory()) {
			throw `${path} is not a directory`;
		}
		return path;
	}

	checkAndNotifyDirectoryChange(directory) {
		this.checkDirectoryChange(directory).then(changed => {
			if (changed.length > 0) {
				this.emit("changed", changed);
			}
		});
	}

	/**
	 * Lists the files that changed in the directory since the last check
	 * @param directory the directory to check
	 */
	async checkDirectoryChange(directory) {
		const directoryExists = await exists(directory);
		if (directoryExists) {
			const files = await readdir(directory);
			const filteredFiles = [];
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const filePath = path.join(directory, file);
				const changed = await this.checkAndUpdateFileChange(filePath);
				if (changed) {
					filteredFiles.push(filePath);
				}
			}
			return filteredFiles;
		}
		else {
			return [];
		}
	}

	/**
	 * Checks if the given file was modified. Ignores non existing files and directories
	 * @param file the file to check
	 * @returns true if the file was modified
	 */
	async checkAndUpdateFileChange(file) {
		const fileExists = await exists(file)
		if (fileExists) {
			const stats = await stat(file);
			if (stats.isDirectory()) {
				return false;
			}
			const oldStats = this.fileMetadatas[file] || -1;
			this.fileMetadatas[file] = stats.mtimeMs;
			return oldStats < stats.mtimeMs;
		}
		else {
			return false;
		}
	}

}

export default DirWatcher;