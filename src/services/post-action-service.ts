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

export const editComment = async (
  postId: string,
  commentId: string,
  commentData: { content: string }
) => {
  try {
    const { data } = await axiosInstance.put(
      `/posts/comment/edit/${postId}/${commentId}`,
      commentData
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/posts/comment/delete/${postId}/${commentId}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
