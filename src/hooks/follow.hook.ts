import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { followUser } from "../services/follow-service";

export const useFollowUser = ({
  invalidateQueries,
}: {
  invalidateQueries: string[];
}) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { followingId: string }>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (postData) => await followUser(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueries });
      //   toast.success("Following user successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
