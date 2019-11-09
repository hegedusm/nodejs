import express from 'express';
import product from "../controllers/product/product";

const routes  = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});


routes.get("/api/products", product.list);
routes.get("/api/products/:id", product.get);
routes.get("/api/products/:id/reviews", product.getReviews);
routes.post("/api/products", product.addProduct);

routes.use(function(req, res) {
  response.sendNotFound(res);
});
module.exports = routes;