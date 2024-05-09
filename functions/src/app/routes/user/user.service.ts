import prisma from "../../../prisma/prisma-client";
import HttpException from "../../models/http-exception.model";
import { CreateUser, GetUser } from "./I_User";

export const getUser = async ({ jti, name }: GetUser) => {
  const profile = await prisma.users.findUnique({
    where: {
      kindeJit: jti,
    },
  });

  if (!profile) {
    return await createUser({ jti, name });
  }

  return profile;
};

export const createUser = async ({ jti, name }: CreateUser) => {
  const profile = await prisma.users.create({
    data: {
      kindeJit: jti,
      name,
    },
  });

  if (!profile) {
    throw new HttpException(404, {});
  }

  return profile;
};
