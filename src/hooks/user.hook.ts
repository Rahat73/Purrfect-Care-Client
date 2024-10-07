import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types";
import { getUserInfo } from "../services/user-service";

export const useUserInfo = () => {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["GET_USER_INFO"],
    queryFn: async () => await getUserInfo(),
  });

  return { data: data?.data as IUser, isLoading, refetch, isSuccess };
};
