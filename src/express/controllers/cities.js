import cities from "../database/mongo";
import { Cities } from "../database/mongo/mongoose";

exports.getOne = (req, resp) => {
	cities.collection.find().toArray((err, cities) => {
		if (err) resp.sendStatus(500);
		if(cities.length > 0) resp.json(cities[Math.floor(Math.random() * cities.length)]);
		else resp.sendStatus(404);
	});
}

exports.getOneMongoose = (req, resp) => {
	Cities.find({}, (err, cities) => {
		if (err) resp.sendStatus(500);
		if(cities.length > 0)  resp.json(cities[Math.floor(Math.random() * cities.length)]);
		else resp.sendStatus(404);
	})
}

exports.findAll = (req, resp) => {
	Cities.find({}, (err, cities) => {
		if (err) resp.sendStatus(500);
		else resp.json(cities);
	});
}

exports.add = (req, resp) => {
	const city = req.body;
	new Cities(city).save((err, c) => {
		if (err) resp.sendStatus(500);
		else resp.sendStatus(200);
	});
}

exports.upsert = (req, resp) => {
	const id = req.params.id;
	const city = req.body;
	city.id = id;
	Cities.findOneAndUpdate({ id: id }, city, { upsert: true }, (err, cities) => {
		if (err) resp.sendStatus(500);
		else resp.sendStatus(200);
	});
}

exports.delete = (req, resp) => {
	const id = req.params.id;
	Cities.deleteOne({ id: id }, (err, res) => {
		if (err) resp.sendStatus(500);
		else if (res.deletedCount) resp.sendStatus(200);
		else resp.sendStatus(404);
	});
}

