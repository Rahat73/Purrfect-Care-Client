"use server";

import axiosInstance from "../lib/axios-instance";

export const purchasePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.post(`/payment/purchase`, { postId });
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllPayments = async () => {
  try {
    const { data } = await axiosInstance.get("/payment");
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
