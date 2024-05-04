import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { getUser } from "./models/user";
import { getBehaviorPosts, putBehaviorPosts } from "./models/behavior";

import { authentication } from "./utils/middleware";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as express from "express";
import helmet from "helmet";

const app = express();
const main = express();

// setup cors

main.use("/v1", app);
main.use(cors());
main.use(helmet());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// auth user token
app.use(authentication);

app.get("/user", getUser);

app.get("/behavior", getBehaviorPosts);

app.put("/behavior", putBehaviorPosts);

// export const user = onRequest((request, response) => {
//   const cookies = request.cookies;

//   logger.info("Hello logs!", { structuredData: true });
//   response.status(200).send("SUCCESS");
// });

export const api = onRequest(main);
