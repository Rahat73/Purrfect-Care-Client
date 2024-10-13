import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { followUser, getFollow } from "../services/follow-service";

export const useFollowUser = ({
  invalidateQueries,
}: {
  invalidateQueries: string[];
}) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { followingId: string }>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (postData) => await followUser(postData),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: invalidateQueries });
      } else {
        toast.error(data.message);
      }
      //   toast.success("Following user successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useGetFollow = () => {
  const { data, isLoading, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["GET_FOLLOW"],
    queryFn: async () => await getFollow(),
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
    isSuccess,
    isFetching,
  };
};
