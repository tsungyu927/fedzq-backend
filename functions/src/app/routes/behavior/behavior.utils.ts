import { NextFunction, Request, Response } from "express";
import * as _ from "lodash";
import HttpException from "../../models/http-exception.model";
import { GetBehaviorPosts, PutBehaviorPosts } from "./I_Behavior";

export const validateGetBehavior = (
  req: Request<unknown, unknown, unknown, GetBehaviorPosts>,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.query.userId;

  if (!userId) {
    throw new HttpException(400, "Missing required parameter: 'userId'");
  }

  // @ts-ignore
  req.userId = userId;
  next();
};

export const validatePutBehavior = (
  req: Request<unknown, unknown, PutBehaviorPosts>,
  res: Response,
  next: NextFunction
) => {
  const requiredFields: Array<keyof Omit<PutBehaviorPosts, "postId">> = [
    "userId",
    "title",
    "description",
    "answer",
    "share",
  ];

  // Check if all required fields are present and have values
  const missingFields = requiredFields.filter((field) =>
    _.isNil(req.body[field])
  );

  if (missingFields.length > 0) {
    const errorMsgs = missingFields.map(
      (field) => `Missing required parameter: '${field}'`
    );

    throw new HttpException(400, errorMsgs);
  }

  next();
  return;
};
