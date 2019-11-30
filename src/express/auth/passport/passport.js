import passport from "passport";
import LocalStrategy from "passport-local";
import authenticate from "../users/authenticator";
import GitHubStrategy from "passport-github";

passport.use(new GitHubStrategy({
	clientID: "c830bc543e268f974cc5",
	clientSecret: "a1bb9cf6f980c37d448d45a2f053b805ca55cd4a",
	callbackURL: "http://127.0.0.1:8080/auth/github/callback"
},
	function (accessToken, refreshToken, profile, cb) {
		return cb(null, profile);
	}
));

passport.use(new LocalStrategy({
	usernameField: 'userName',
	passwordField: 'password',
	session: false
},
	function (userName, password, done) {
		if (!authenticate(userName, password)) {
			done(null, false, "invalid username / password");
		}
		else {
			done(null, userName)
		}
	}
));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});


export default passport;