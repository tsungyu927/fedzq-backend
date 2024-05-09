import { NextFunction, Request, Response, Router } from "express";
import { success } from "../../../helpers/response";
import { validateGetBehavior, validatePutBehavior } from "./behavior.utils";
import { getBehaviorPosts, putBehaviorPosts } from "./behavior.service";

const router = Router();

/**
 * GET /user
 *
 */
router.get(
  "/behavior",
  validateGetBehavior,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore;
      const userId = req.userId;

      const posts = await getBehaviorPosts({ userId });

      res.status(200).json(success({ data: posts }));
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/behavior",
  validatePutBehavior,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = req.body;
      const result = await putBehaviorPosts(params);

      res.status(200).json(success({ data: result }));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
