import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ErrorObj } from "../interface/I_Common";
import { success } from "../helpers/response";
import { errorHandler } from "../helpers/errorHandler";

const prisma = new PrismaClient();

export type GetBehaviorPosts = {
  userId: string;
};

export type PutBehaviorPosts = {
  postId?: string;
  userId: string;
  title: string;
  description: string;
  answer: string;
  share: boolean;
};

export const getBehaviorPosts = async (
  req: Request<unknown, unknown, unknown, GetBehaviorPosts>,
  res: Response
) => {
  try {
    const userId = req.query.userId;

    if (!userId)
      throw {
        type: "error",
        statusCode: 400,
        message: "Missing required parameter: 'userId'",
      };

    const posts = await prisma.behavior_posts.findMany({
      where: {
        authorId: userId,
      },
    });

    return res.status(200).json(success({ data: posts }));
  } catch (e) {
    const err = e as ErrorObj;

    return errorHandler(err, res);
  }
};

export const putBehaviorPosts = async (
  req: Request<unknown, unknown, PutBehaviorPosts>,
  res: Response
) => {
  try {
    const { postId, userId, title, description, answer, share } = req.body;

    const data = {
      authorId: userId,
      title,
      description,
      answer,
      share,
    };

    if (postId) {
      // Update the post
      const updatedPost = await prisma.behavior_posts.update({
        where: {
          id: postId,
        },
        data,
      });

      return res.status(200).json(success({ data: updatedPost }));
    }

    // Create a new Post
    const newPost = await prisma.behavior_posts.create({ data });

    return res.status(200).json(success({ data: newPost }));
  } catch (e) {
    const err = e as ErrorObj;

    return errorHandler(err, res);
  }
};
