import mongoose from "mongoose";
import Cities from "./model/cities";
import Users from "./model/users";
import Products from "./model/products";
import init from "../init";

mongoose.connect('mongodb://localhost/mongoose', { useNewUrlParser: true });

Cities.countDocuments({}, (err, count) => {
	if (err) throw err;
	if (!count) {
		init.data.forEach(city => {
			new Cities(city).save((err, c) => {
				console.log(`Created Mongoose city ${c.name}`);
			});
		});
	}
});

Users.countDocuments({}, (err, count) => {
	if (err) throw err;
	if (!count) {
		new Users({ userName: "test", password: "test" }).save((err, u) => {
			console.log(`Created Mongoose user ${u.userName}`);
		});
	}
});

Products.countDocuments({}, (err, count) => {
	if (err) throw err;
	if (!count) {
		new Products({id: 1, name: "testProduct", reviews: [{text: "testReview"}]}).save((err, p) => {
			console.log(`Created Mongoose city ${p.name}`);
		});
	}
});


export {Cities, Products, Users};