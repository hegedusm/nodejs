import config from "./config/config";
import DirWatcher from "./moduls/dirwatcher";
import Importer from "./moduls/importer";
import path from "path";


var dataPath = path.join(__dirname, config.importPath);

const watcher = new DirWatcher(config.importPeriod);
new Importer(watcher);
watcher.watch(dataPath);