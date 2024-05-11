import prisma from "../../../utils/prisma-client";
import HttpException from "../../models/http-exception.model";
import { GetBehaviorPosts, PutBehaviorPosts } from "./I_Behavior";

export const getBehaviorPosts = async ({ userId }: GetBehaviorPosts) => {
  try {
    const posts = await prisma.behavior_posts.findMany({
      where: {
        authorId: userId,
      },
    });

    return posts;
  } catch (err) {
    throw new HttpException(500, "Failed to get behavior posts");
  }
};

export const putBehaviorPosts = async (params: PutBehaviorPosts) => {
  try {
    const { postId, userId, title, description, answer, share } = params;

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

      return updatedPost;
    }

    // Create a new Post
    const newPost = await prisma.behavior_posts.create({ data });

    return newPost;
  } catch (err) {
    throw new HttpException(500, "Failed to create/update behavior post");
  }
};
