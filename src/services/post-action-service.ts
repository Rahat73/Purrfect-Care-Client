"use server";

import axiosInstance from "../lib/axios-instance";

export const votePost = async (
  postId: string,
  postData: {
    voteType: "upvote" | "downvote";
  }
) => {
  try {
    const { data } = await axiosInstance.put(`/posts/vote/${postId}`, postData);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const addComment = async (
  postId: string,
  commentData: { content: string }
) => {
  console.log(commentData, postId);
  try {
    const { data } = await axiosInstance.put(
      `/posts/comment/${postId}`,
      commentData
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
