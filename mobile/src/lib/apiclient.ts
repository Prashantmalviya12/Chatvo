import { useAuth } from "@clerk/clerk-expo"
import axios from "axios"
import { useEffect } from "react"

const api_url = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
    baseURL:api_url,
    headers:{"Content-Type":"application/json"}
})

const useApi = () => {
    const {getToken} = useAuth()

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(async (config) => {
            const token = await getToken()

            if(token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        })
        return () => {
            api.interceptors.request.eject(requestInterceptor)
        }
        
    },[getToken])
    return api
}

export default useApi

// api.interceptors.request.use()