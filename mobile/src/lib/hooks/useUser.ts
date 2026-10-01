import { useQuery } from "@tanstack/react-query";
import useApi from "../apiclient";
import { userResponse } from "../types/auth.types";

export const useGetUsers = () => {
  const apiclient = useApi();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await apiclient.get<userResponse>("/api/userlist");
      console.log("User list rresponse:", res.data);
      return res.data;
    },
  });
};
