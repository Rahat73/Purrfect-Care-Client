"use server";

import { FieldValues } from "react-hook-form";
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

export const updatePost = async (postId: string, postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${postId}`, postData);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}`);
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

export const changePostVisibilty = async (postId: string) => {
  try {
    const { data } = await axiosInstance.put(
      `/posts/change-visibility/${postId}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const purchasePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.post(`/payment/purchase`, { postId });
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
