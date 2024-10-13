"use server";

import axiosInstance from "../lib/axios-instance";

export const followUser = async (postData: { followingId: string }) => {
  try {
    const { data } = await axiosInstance.put("/follow", postData);
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const getFollow = async () => {
  try {
    const { data } = await axiosInstance.get("/follow/me");
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
