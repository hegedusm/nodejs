import express from 'express';
import product from "../controllers/product";
import users from "../controllers/users";
import { verifyToken } from "../auth/auth";

const routes = express.Router();

routes.get('/', (req, res) => {
	res.status(200).json({ message: 'Ok' });
});

routes.get("/api/products*", verifyToken);
routes.get("/api/products", product.list);
routes.get("/api/products/:id", product.get);
routes.get("/api/products/:id/reviews", product.getReviews);
routes.post("/api/products", product.addProduct);

routes.get("/api/users", verifyToken, users.list);

routes.use(function (req, res) {
	res.sendStatus(404);
});
module.exports = routes;