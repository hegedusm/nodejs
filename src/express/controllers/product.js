
const products = {};
var lastId = 0;

exports.list = (req, resp) => {
	resp.json(products);
}

exports.get = (req, resp) => {
	const productId = req.params.id;
	const product = products[productId];
	if (!product) {
		resp.sendStatus(404);
	}
	else {
		resp.json(product);
	}
}

exports.getReviews = (req, resp) => {
	const productId = req.params.id;
	const product = products[productId];
	if (!product) {
		resp.sendStatus(404);
	}
	else {
		resp.json(product.reviews);
	}
}

exports.addProduct = (req, resp) => {
	const id = lastId++;
	products[id] = req.body;
	resp.json(req.body);
}