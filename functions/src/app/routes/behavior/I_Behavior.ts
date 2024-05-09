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
