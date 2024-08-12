import axios from "axios";
import toast from "react-hot-toast";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export const fetchAllCard = async () => {
  const res = await axios.get("/api/card");
  if (!res.data) {
    throw new Error("Response was not ok");
  }
  return res.data.data;
};

// hook for display Card
export const useGetCardData = () => {
  return useQuery(["card"], fetchAllCard);
};

// update card
const updateCard = (data: any) => {
  return axios.put("/api/updatecard", data);
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCard, {
    onSuccess: () => {
      toast.success("Card updated successfully");
      queryClient.invalidateQueries("card");
    },
    onError: () => {
      toast.error("Failed to updated card");
    },
  });
};
