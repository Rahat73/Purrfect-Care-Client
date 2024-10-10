"use server";

import { FieldValues } from "react-hook-form";
import envConfig from "../config/env-config";
import axiosInstance from "../lib/axios-instance";

export const getUserInfo = async () => {
  try {
    const { data } = await axiosInstance.get(`/users/me`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateProfile = async (updateData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put("/users/me", updateData);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const makeAdmin = async (userId: string) => {
  try {
    const { data } = await axiosInstance.put(`/users/make-admin/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const blockUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.put(`/users/block/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
