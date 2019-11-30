import express from "express";
import cookieParser from "./middlewares/cookie-parser";
import queryParser from "./middlewares/query-parser.js";
import bodyParser from 'body-parser';
import { authRoute } from "./auth/auth";
import routes from "./routes/routes";
import path from "path";


const app = express();

app.use(cookieParser);
app.use(queryParser);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', authRoute);
app.use('/', routes);


export default app;