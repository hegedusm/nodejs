import MongoClient from "mongodb";
import config from "./config/config";
import init from "./init";


const url = config.url;

const cities = {};

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	console.log("Connected to the mongo db");
	process.on("exit", () => {
		console.log("Closing mongo db"),
			db.close();
	});
	var dbo = db.db("nodeDB");
	cities.collection = dbo.collection("cities");
	cities.collection.countDocuments({}).then(count => {
		if (!count) {
			init.data.forEach(city => {
				cities.collection.insertOne(city, function (err, res) {
					if (err) throw err;
					console.log(`${city.name} document inserted`);
				});
			});
		}
	});

});

export default cities;