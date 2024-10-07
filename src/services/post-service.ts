"use server";

import axiosInstance from "../lib/axios-instance";
import envConfig from "../config/env-config";
import { IPost } from "../types";

// export const registerUser = async (userData: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.post("/auth/signup", userData);

//     if (data.success) {
//       cookies().set("accessToken", data?.accessToken);
//       // cookies().set("refreshToken", data?.data?.refreshToken);
//     }

//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

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
