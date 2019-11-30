import db from "../database/models";

exports.list = (req, resp) => {
	db.Users.findAll({raw:true, attributes: ['userName']}).then(users => resp.json(users));
}