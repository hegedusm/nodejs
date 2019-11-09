
const cookieParser = (req, res, next) => {
	const rawCookies = (req.headers.cookie || "" ).split(";");
	const parsedCookies = {};
	rawCookies.map(cookie => cookie.trim()).forEach(cookie => {
		const cookieParts = cookie.split("=");
		parsedCookies[cookieParts[0]] = cookieParts[1];
	});
	req.parsedCookies = parsedCookies;
	next();
}

export default cookieParser;