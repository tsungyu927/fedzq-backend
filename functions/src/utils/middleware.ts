import { logger } from "firebase-functions";
import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "./decoder";
import { validateError } from "../helpers/response";
import * as dayjs from "dayjs";

export const header = (req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  next();
};

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

export const monitor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.info(`API call: ${req.method} ${req.baseUrl}${req.path}`, {
    cookies: req.cookies,
    header: req.headers,
  });

  next();
};
