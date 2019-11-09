import express from "express";
import cookieParser from "./middlewares/cookie-parser";
import queryParser from "./middlewares/query-parser.js";
import bodyParser from 'body-parser';
import routes from "./routes/routes";

const app = express();

app.use(cookieParser);
app.use(queryParser);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

export default app;