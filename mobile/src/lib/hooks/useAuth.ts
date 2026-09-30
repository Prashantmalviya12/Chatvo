import { useMutation } from "@tanstack/react-query";
// import { apiclient } from "../apiclient"
import useApi from "../apiclient";

export const useAuthCallback = () => {
  const apiclient = useApi();
  return useMutation({
    mutationFn: async () => {
      const res = await apiclient.post("/api/auth/callback");
      console.log("mutation signin", res.data.data);
      return res.data;
    },
  });
};
