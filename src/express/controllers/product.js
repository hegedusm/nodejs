import { Products } from "../database/mongo/mongoose";

let lastId = 1;

exports.list = (req, resp) => {
	Products.find({}, (err, products) => {
		if (err) resp.sendStatus(500);
		else resp.json(products);
	});
}

exports.get = (req, resp) => {
	const productId = req.params.id;
	Products.findOne({ id: productId }, (err, product) => {
		if (err) resp.sendStatus(500);
		else resp.json(product);
	});
}

exports.getReviews = (req, resp) => {
	const productId = req.params.id;
	Products.findOne({ id: productId }, (err, product) => {
		if (err) resp.sendStatus(500);
		else resp.json(product.reviews);
	});
}

exports.addProduct = (req, resp) => {
	const product = req.body;
	product.id = ++lastId;
	new Products(product).save(product, (err, p) => {
		if (err) resp.sendStatus(500);
		else resp.sendStatus(200);
	});
}

exports.delete = (req, resp) => {
	const productId = req.params.id;
	Products.deleteOne({ id: productId }, (err, res) => {
		if (err) resp.sendStatus(500);
		else if (res.deletedCount) resp.sendStatus(200);
		else resp.sendStatus(404);
	});
}