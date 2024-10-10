import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { getUserInfo, updateProfile } from "../services/user-service";
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
