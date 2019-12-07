import db from "../database/models";

exports.list = (req, resp) => {
	db.Product.findAll({raw:true}).then(products => resp.json(products));
}

exports.get = (req, resp) => {
	const productId = req.params.id;
	db.Product.findByPk(productId).then(product => {
		if (!product) {
			resp.sendStatus(404);
		}
		else {
			resp.json(product);
		}
	});
	
}

exports.getReviews = (req, resp) => {
	const productId = req.params.id;
	db.Review.findAll({attributes: ['text'], where: { productId: productId } }).then(reviews => {
		if (!reviews) {
			resp.sendStatus(404);
		}
		else {
			resp.json(reviews);
		}
	});
}

exports.addProduct = (req, resp) => {
	const product = req.body;
	db.sequelize.transaction((t) => {
		return db.Product.create(
			{
				name: product.name,
				createdAt: new Date(),
				updatedAt: new Date(),
			  }, {transaction: t}
		).then(createdProduct => {
			if(product.reviews) {
				return Promise.all(product.reviews.map(review => {
					db.Review.create({
						text: review, 
						productId: createdProduct.id,
						createdAt: new Date(),
						updatedAt: new Date() }, {transaction: t})
				}));
			}
		})
	}).then(result => {
		console.log("ok");
		resp.sendStatus(200)
	});
	
}