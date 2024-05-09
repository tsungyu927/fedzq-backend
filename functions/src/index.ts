import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

import { authToken, errorHandler, header, monitor } from "./utils/middleware";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import helmet from "helmet";
import { corsOptions } from "./constants/corsOptions";
import routes from "./app/routes/routes";

const app = express();

// setup cors
app.use(monitor);
app.use(header);
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser());
app.use(authToken);
app.use(routes);

app.use(errorHandler);

// deploy functions to asia-east1 (Taiwan)
setGlobalOptions({ region: "asia-east1" });

export const api = onRequest(app);
