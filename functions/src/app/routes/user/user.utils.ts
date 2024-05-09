import { NextFunction, Request, Response } from "express";
import HttpException from "../../models/http-exception.model";

export const validateParams = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const name = req.query.name;

  if (!name) {
    throw new HttpException(400, "Missing required parameter: 'name'");
  }

  // @ts-ignore
  req.name = name;
  next();
};
