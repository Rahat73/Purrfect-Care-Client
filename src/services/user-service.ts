"use server";

import envConfig from "../config/env-config";
import axiosInstance from "../lib/axios-instance";

export const getUserInfo = async () => {
  try {
    const { data } = await axiosInstance.get(`${envConfig.baseApi}/users/me`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
