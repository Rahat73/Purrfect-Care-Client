"use server";

import axiosInstance from "../lib/axios-instance";

export const followUser = async (postData: { followingId: string }) => {
  try {
    const { data } = await axiosInstance.put("/follow", postData);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
