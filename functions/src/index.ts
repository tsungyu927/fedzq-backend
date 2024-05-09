import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import { getUser } from "./models/user";
import { getBehaviorPosts, putBehaviorPosts } from "./models/behavior";

import { authentication, header, monitor } from "./utils/middleware";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import helmet from "helmet";
import { validatePutBehavior } from "./helpers/validator";
import { corsOptions } from "./constants/corsOptions";

const app = express();
const main = express();

// setup cors
main.use(monitor);
main.use(cors(corsOptions));
main.use("/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// auth user token
// app.use(monitor);
app.use(cookieParser());
app.use(helmet());
app.use(header);
// app.use(authentication);

app.get("/user", getUser);

app.get("/behavior", getBehaviorPosts);

app.put("/behavior", validatePutBehavior, putBehaviorPosts);

// deploy functions to asia-east1 (Taiwan)
setGlobalOptions({ region: "asia-east1" });

export const api = onRequest(main);
