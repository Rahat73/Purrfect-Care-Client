import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getPostById } from "../services/post-service";
import { IPost } from "../types";

export const useGetAllPosts = (queryParams?: Record<string, any>) => {
  const { data, isLoading, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["GET_ALL_POST", queryParams],
    queryFn: async () => await getAllPosts(queryParams),
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
    isSuccess,
    isFetching,
  };
};

export const useGetPostById = (postId: string) => {
  const { data, isLoading, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["GET_POST_BY_ID", postId],
    queryFn: async () => await getPostById(postId),
  });

  return {
    data: data?.data as IPost,
    isLoading,
    refetch,
    isSuccess,
    isFetching,
  };
};
