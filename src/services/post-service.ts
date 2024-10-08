"use server";

import envConfig from "../config/env-config";
import axiosInstance from "../lib/axios-instance";

export const createPost = async (postData: Record<string, any>) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPosts = async (queryParams?: Record<string, any>) => {
  try {
    const { data } = await axiosInstance.get(`${envConfig.baseApi}/posts`, {
      params: queryParams,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `${envConfig.baseApi}/posts/${postId}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
