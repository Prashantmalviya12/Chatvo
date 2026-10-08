import { useQuery } from "@tanstack/react-query";
import useApi from "../apiclient";
import { messageResponse } from "../types/chat.types";

export const useGetMessage = (chatid: string) => {
  const apiclient = useApi();
  return useQuery({
    queryKey: ["getMessage", chatid],
    queryFn: async () => {
      const res = await apiclient.get<messageResponse>(
        `/api/message/${chatid}`,
      );
      // console.log("message Data", res.data);
      return res.data;
    },
    enabled: !!chatid,
  });
};
