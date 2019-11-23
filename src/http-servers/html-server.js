import http from "http";
import path from "path";
import fs from "fs";

http.createServer()
.on("request", (req, res) => {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});

	fs.createReadStream(path.join(__dirname, "/data/index.html")).pipe(res);
}).listen(3000);