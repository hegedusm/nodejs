import { Users } from "../database/mongo/mongoose";

exports.list = (req, resp) => {
	Users.find({}, (err, users) => {
		if (err) resp.sendStatus(500);
		else resp.json(users.map(user => user.userName));
	});
}

exports.delete = (req, resp) => {
	const userName = req.params.userName;
	Users.deleteOne({ userName: userName }, (err, res) => {
		if (err) resp.sendStatus(500);
		else if (res.deletedCount) resp.sendStatus(200);
		else resp.sendStatus(404);
	});
}