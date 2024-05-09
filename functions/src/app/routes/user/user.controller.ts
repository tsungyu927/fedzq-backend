import { NextFunction, Request, Response, Router } from "express";
import { validateParams } from "./user.utils";
import { getUser } from "./user.service";
import { success } from "../../../helpers/response";

const router = Router();

/**
 * GET /user
 *
 */
router.get(
  "/user",
  validateParams,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore;
      const jti = req.jti;
      // @ts-ignore;
      const name = req.name;

      const profile = await getUser({ jti, name });

      res.status(200).json(success({ data: profile }));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
