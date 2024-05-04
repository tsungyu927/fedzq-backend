import { decode } from "jsonwebtoken";

export const verifyAccessToken = (token: string) => {
  try {
    const payload = decode(token);

    return payload;
  } catch (error) {
    console.error(error);
    return new Error("error");
  }
};
