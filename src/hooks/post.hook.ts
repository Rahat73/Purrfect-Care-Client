import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePostVisibilty,
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPostById,
  updatePost,
} from "../services/post-service";
import { IPost } from "../types";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

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

export const useUpdatePost = ({
  invalidateQueries,
  onSuccess,
}: {
  invalidateQueries: string[];
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { postId: string; postData: FieldValues }>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ postId, postData }) =>
      await updatePost(postId, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_POST"] });
      queryClient.invalidateQueries({ queryKey: ["GET_MY_POSTS"] });
      queryClient.invalidateQueries({ queryKey: invalidateQueries });
      onSuccess();
      toast.success("Post updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId) => await deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_POST"] });
      queryClient.invalidateQueries({ queryKey: ["GET_MY_POSTS"] });
      toast.success("Post deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
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

export const useChangePostVisibilty = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["CHANGE_POST_VISIBILITY"],
    mutationFn: async (postId) => await changePostVisibilty(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_POST"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
