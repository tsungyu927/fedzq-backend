import { logger } from "firebase-functions";
import { Request, Response, NextFunction } from "express";
import * as dayjs from "dayjs";

import { decodeJwt } from "./middleware.utils";
import HttpException from "../app/models/http-exception.model";
import { error, validateError } from "../helpers/response";

export const header = (req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  next();
};

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    const jwtPayload = decodeJwt(token);

    // Check expiration
    const current = dayjs();
    const exp = dayjs.unix(jwtPayload?.exp || 0);
    if (current > exp) throw new Error();

    // Check jti is exist
    if (!jwtPayload.jti) {
      throw new Error();
    }

    // Auth successfully
    // @ts-ignore
    req.jti = jwtPayload.jti;
    next();
  } catch (error) {
    throw new HttpException(401, "Invalid token");
  }
};

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err && err.name === "UnauthorizedError") {
    return res
      .status(401)
      .json(validateError({ messages: ["Missing authorization credentials"] }));
  }
  if (err && err.errorCode) {
    return res
      .status(err.errorCode)
      .json(error({ status: err.errorCode, messages: err.message }));
  }
  return res.status(500).json(error({ messages: err.message }));
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
