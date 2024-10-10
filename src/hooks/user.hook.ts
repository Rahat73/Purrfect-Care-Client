import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  blockUser,
  getAllUsers,
  getUserInfo,
  makeAdmin,
  updateProfile,
} from "../services/user-service";
import { IUser } from "../types";

export const useUserInfo = () => {
  const { data, isLoading, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["GET_USER_INFO"],
    queryFn: async () => await getUserInfo(),
  });

  return {
    data: data?.data as IUser,
    isLoading,
    refetch,
    isFetching,
    isSuccess,
  };
};

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (updateData) => await updateProfile(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_USER_INFO"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllUsers = () => {
  const { data, isLoading, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsers(),
  });
  return {
    data: data?.data as IUser[],
    isLoading,
    refetch,
    isFetching,
    isSuccess,
  };
};

export const useMakeAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["MAKE_ADMIN"],
    mutationFn: async (userId) => await makeAdmin(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["BLOCK_USER"],
    mutationFn: async (userId) => await blockUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
