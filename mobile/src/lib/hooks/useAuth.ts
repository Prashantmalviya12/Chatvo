import { useMutation } from "@tanstack/react-query"
// import { apiclient } from "../apiclient"
import { userModel } from "../types/auth.types"
import useApi from "../apiclient"

export const useAuthCallback = () => {
    const apiclient = useApi()
    return useMutation({
        mutationFn:async () => {
            const res = await apiclient.post<userModel>("/api/auth/callback")
            console.log("mutation signin",res.data)
            res.data
        }
    })
}