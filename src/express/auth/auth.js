import express from 'express';
import jwt from "jsonwebtoken";
import authenticate from "./users/authenticator";
import passport from "./passport/passport";

export const authRoute = express.Router();

authRoute.use(passport.initialize());


authRoute.post("/auth", (req, resp) => {

	if (!authenticate(req.body.userName, req.body.password)) {
		resp.status(404).send("Invalid username / password");
	} else {
		var token = jwt.sign({ userName: 'req.body.userName' }, 'privateKey');
		resp.send({
			"data": {
				"user": {
					"username": req.body.userName
				}
			},
			"token": token
		});
	}
});

authRoute.post("/login", passport.authenticate("local"), (req, resp) => {
	resp.sendStatus(200);
});

authRoute.get('/login/github',
	passport.authenticate('github'));

authRoute.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	function (req, res) {
		// Successful authentication, redirect home.
		res.status(200).send("github ok");
	});


export const verifyToken = (req, resp, next) => {
	const token = req.headers["x-access-token"];
	if (token) {
		jwt.verify(token, "privateKey", (err, decoded) => {
			if (err) {
				resp.status(401).send("Invalid token");
			}
			else {
				next();
			}
		})
	} else {
		resp.status(401).send("Missing access token");
	}
}