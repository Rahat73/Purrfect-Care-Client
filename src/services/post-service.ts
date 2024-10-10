"use server";

import envConfig from "../config/env-config";
import axiosInstance from "../lib/axios-instance";

export const createPost = async (postData: Record<string, any>) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllPosts = async (queryParams?: Record<string, any>) => {
  try {
    const { data } = await axiosInstance.get(`/posts`, {
      params: queryParams,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getMyPosts = async () => {
  try {
    const { data } = await axiosInstance.get(`/posts/me`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
