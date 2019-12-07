import express from 'express';
import product from "../controllers/product";
import users from "../controllers/users";
import cities from "../controllers/cities";
import { verifyToken } from "../auth/auth";

const routes = express.Router();

routes.get('/', (req, res) => {
	res.status(200).json({ message: 'Ok' });
});

routes.get("/api/products*", verifyToken);
routes.get("/api/products", product.list);
routes.get("/api/products/:id", product.get);
routes.delete("/api/products/:id", product.delete);
routes.get("/api/products/:id/reviews", product.getReviews);
routes.post("/api/products", product.addProduct);

routes.get("/api/getOneMongodb", cities.getOne);
routes.get("/api/citiesMongoose", cities.getOneMongoose);
routes.get("/api/cities", cities.findAll);
routes.post("/api/cities",(req, resp, next) => {
	const city = req.body;
	city.lastModifiedDate = new Date();
	next();
}, cities.add);
routes.put("/api/cities/:id", (req, resp, next) => {
	const city = req.body;
	city.lastModifiedDate = new Date();
	next();
}, cities.upsert);
routes.delete("/api/cities/:id", cities.delete);

routes.get("/api/users", verifyToken, users.list);
routes.delete("/api/users/:userName", users.delete);

routes.use(function (req, res) {
	res.sendStatus(404);
});
module.exports = routes;