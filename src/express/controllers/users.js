const users = ["admin", "test"];

exports.list = (req, resp) => {
	resp.json(users);
}