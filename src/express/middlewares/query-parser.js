import url from "url";
import queryString from "querystring";

const queryParser = (req, res, next) => {
	const query = url.parse(req.url).query;
	if (query) {
		req.parsedQuery = queryString.parse(query);
	}
	next();
}

export default queryParser;