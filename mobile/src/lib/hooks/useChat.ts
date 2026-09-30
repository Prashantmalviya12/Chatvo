import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../apiclient";

export const useGetChats = () => {
  const apiclient = useApi();
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await apiclient.get("/api/getChats");
      console.log("Get chats list:", res.data);
      return res.data;
    },
  });
};

export const useGetorCreateChat = () => {
  const apiclient = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (participantId: string) => {
      const res = await apiclient.post(`/api/getChat/${participantId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};
