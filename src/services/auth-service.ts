"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../lib/axios-instance";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);

    if (data.success) {
      cookies().set("accessToken", data?.accessToken);
      // cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data.success) {
      cookies().set("accessToken", data?.accessToken);
      // cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  // cookies().delete("refreshToken");
};

export const forgotPassword = async (emailData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forgot-password",
      emailData
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const changePassword = async (passwordData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      passwordData
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      profilePicture: decodedToken.profilePicture,
    };
  }
  return decodedToken;
};

// export const getNewAccessToken = async () => {
//   try {
//     const refreshToken = cookies().get("refreshToken")?.value;
//     const res = await axiosInstance({
//       url: "/auth/refresh-token",
//       method: "POST",
//       withCredentials: true,
//       headers: {
//         cookies: `refreshToken=${refreshToken}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     throw new Error("Failed to get new access token");
//   }
// };
