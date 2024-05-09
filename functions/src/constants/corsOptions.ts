import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  // origin: "http://localhost:3000",
  origin: "*",
  allowedHeaders: ["Origin", "Authorization", "Content-Type", "Accept"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  // credentials: true,
  // maxAge: 86400,
};
