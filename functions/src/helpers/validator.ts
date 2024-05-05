import { NextFunction, Request, Response } from "express";
import { PutBehaviorPosts } from "../models/behavior";
import { error } from "./response";

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
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    const errorMsgs = missingFields.map(
      (field) => `Missing required parameter: '${field}'`
    );

    return res.status(400).json(error({ status: 400, messages: errorMsgs }));
  }

  next();
  return;
};
