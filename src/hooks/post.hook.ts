import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  getPostById,
} from "../services/post-service";
import { IPost } from "../types";
import { toast } from "sonner";

export const useCreatePost = ({
  invalidateQueries,
}: {
  invalidateQueries: string[];
}) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Record<string, any>>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueries });
      toast.success("Post created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

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

export const useGetMyPosts = () => {
  const { data, isLoading, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["GET_MY_POSTS"],
    queryFn: async () => await getMyPosts(),
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
    isSuccess,
    isFetching,
  };
};
