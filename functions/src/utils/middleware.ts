import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "./decodeJwt";
import { validateError } from "../helpers/response";
import dayjs = require("dayjs");

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.header("Authorization");

    // decode Bearer token and return jwt payload
    // (throw error if something went wrong)
    const payload = decodeJwt(authorizationHeader);

    // Check expiration
    const current = dayjs();
    const exp = dayjs.unix(payload?.exp || 0);

    if (current > exp) throw new Error();

    // Check jti is exist
    const jti = payload?.jti;
    if (!jti) throw new Error();

    // Auth successfully
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json(
      validateError({
        status: 401,
        messages: ["Invalid authorization header"],
      })
    );
  }
};
