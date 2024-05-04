import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { success } from "../helpers/response";
import { decodeJwt } from "../utils/decodeJwt";
import { ErrorObj } from "../interface/I_Common";
import { errorHandler } from "../helpers/errorHandler";

const prisma = new PrismaClient();

export type GetUser = {
  name: string;
};

export const getUser = async (
  req: Request<unknown, unknown, unknown, GetUser>,
  res: Response
) => {
  try {
    const token = req.header("Authorization");
    const name = req.query.name;
    const jwtPayload = decodeJwt(token);

    if (!jwtPayload.jti)
      throw { type: "error", statusCode: 401, message: "Invalid token" };
    if (!name)
      throw {
        type: "error",
        statusCode: 400,
        message: "Missing required parameter: 'name'",
      };

    const profile = await prisma.users.findUnique({
      where: {
        kindeJit: jwtPayload.jti,
      },
    });

    // Create user if profile not existed
    if (!profile) {
      const createdUser = await prisma.users.create({
        data: {
          kindeJit: jwtPayload.jti,
          name: name,
        },
      });

      return res.status(200).json(success({ data: createdUser }));
    }

    return res.status(200).json(success({ data: profile }));
  } catch (e) {
    const err = e as ErrorObj;

    return errorHandler(err, res);
  }
};
