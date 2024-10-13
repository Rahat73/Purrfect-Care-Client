import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPayments, purchasePost } from "../services/payment-service";
import { toast } from "sonner";

export const usePurchasePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["PURCHASE_POST"],
    mutationFn: async (postId) => await purchasePost(postId),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_PAYMENTS"] });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPayments = () => {
  const { data, isLoading, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["GET_ALL_PAYMENTS"],
    queryFn: async () => await getAllPayments(),
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
    isSuccess,
    isFetching,
  };
};
