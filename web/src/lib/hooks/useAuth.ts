import { useMutation, useQuery } from "@tanstack/react-query";
import useApi from "../axios";
import type { userDetailResponse } from "../types/auth.types";

export const useAuthCallback = () => {
  const apiclient = useApi();
  return useMutation({
    mutationFn: async () => {
      const res = await apiclient.post("/api/auth/callback");
      // console.log("mutation signin", res.data.data);
      return res.data;
    },
  });
};

export const useCurrentUser = () => {
  const apiclient = useApi();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await apiclient.get<userDetailResponse>("/api/auth/me");
      // console.log("user Detail", res.data);
      return res.data;
    },
  });
};
