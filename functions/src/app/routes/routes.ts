import { Router } from "express";
import userController from "./user/user.controller";
import behaviorController from "./behavior/behavior.controller";

const api = Router().use(userController).use(behaviorController);

export default Router().use("/v1", api);
