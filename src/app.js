import config from "./config/config";
import DirWatcher from "./modules/dirwatcher";
import Importer from "./modules/importer";
import path from "path";


var dataPath = path.join(__dirname, config.importPath);

const watcher = new DirWatcher(config.importPeriod);
new Importer(watcher);
watcher.watch(dataPath);