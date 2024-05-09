import { JwtPayload, decode } from "jsonwebtoken";

export const decodeJwt = (authorizationHeader?: string) => {
  if (!authorizationHeader) throw new Error();

  const token = authorizationHeader.replace("Bearer ", "");
  const jwtPayload = decode(token) as JwtPayload;

  return jwtPayload;
};
