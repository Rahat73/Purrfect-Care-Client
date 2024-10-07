import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/post-service";
import { IPost } from "../types";

export const useGetPostById = (postId: string) => {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["GET_POST_BY_ID", postId],
    queryFn: async () => await getPostById(postId),
  });

  return { data: data?.data as IPost, isLoading, refetch, isSuccess };
};
