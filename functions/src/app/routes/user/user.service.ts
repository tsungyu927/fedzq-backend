import prisma from "../../../utils/prisma-client";
import HttpException from "../../models/http-exception.model";
import { CreateUser, GetUser } from "./I_User";

export const getUser = async ({ sub, name }: GetUser) => {
  const profile = await prisma.users.findUnique({
    where: {
      kindeSub: sub,
    },
  });

  if (!profile) {
    return await createUser({ sub, name });
  }

  return profile;
};

export const createUser = async ({ sub, name }: CreateUser) => {
  const profile = await prisma.users.create({
    data: {
      kindeSub: sub,
      name,
    },
  });

  if (!profile) {
    throw new HttpException(404, {});
  }

  return profile;
};
