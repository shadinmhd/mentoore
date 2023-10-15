import axios from "axios"
import { toast } from "react-toastify"

const Api = axios.create({
    baseURL: "https://192.168.1.4:8000"
})

if (localStorage.getItem("token")) {
    Api.interceptors.request.use((request) => {
        request.headers.Authorization = localStorage.getItem("token")
        return request
    })
}

Api.interceptors.response.use(response => response, err => {
    if(err.response && err.response.status === 500){
        toast.error("internal server error")
    }
    return Promise.reject(err)
})

export default Api