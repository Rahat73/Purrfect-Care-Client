import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addComment,
  deleteComment,
  editComment,
  votePost,
} from "../services/post-action-service";

interface IProps {
  postId: string;
  voteData: {
    voteType: "upvote" | "downvote";
  };
}

export const useVotePost = ({
  invalidateQueries,
  onSuccess,
}: {
  invalidateQueries: string[];
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationKey: ["VOTE_POST"],
    mutationFn: async ({ postId, postData }) =>
      await votePost(postId, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueries });
      onSuccess();
      //   toast.success("Voted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useAddComment = ({
  invalidateQueries,
}: {
  invalidateQueries: string[];
}) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: async ({ postId, commentData }) =>
      await addComment(postId, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueries });
      //   toast.success("Voted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useEditComment = ({
  invalidateQueries,
  onSuccess,
}: {
  invalidateQueries: string[];
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationKey: ["EDIT_COMMENT"],
    mutationFn: async ({ postId, commentId, commentData }) =>
      await editComment(postId, commentId, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueries });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteComment = ({
  invalidateQueries,
}: {
  invalidateQueries: string[];
}) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async ({ postId, commentId }) =>
      await deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueries });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
