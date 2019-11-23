import http from "http";

http.createServer()
.on("request", (req, res) => {
	res.writeHead(200, {
		"Content-Type": req.headers["content-type"] || "text/plain"
	});
	req.pipe(res);
}).listen(3000);