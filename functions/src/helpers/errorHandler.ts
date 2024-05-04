import { Response } from "express";
import { ErrorObj } from "../interface/I_Common";
import { error } from "./response";

export const errorHandler = (err: ErrorObj, response: Response) => {
  const statusCode = err.statusCode || 500;
  const errorMsg = err.message || "Internal server error";

  return response
    .status(statusCode)
    .json(error({ status: statusCode, messages: [errorMsg] }));
};
