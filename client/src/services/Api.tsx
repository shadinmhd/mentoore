import axios from "axios"
import Cookies from "js-cookie"

const Api = axios.create({
    baseURL: "http://localhost:8000"
})

if (Cookies.get("token")) {
    Api.interceptors.request.use((request) => {
        request.headers.Authorization = Cookies.get("token")
        return request
    })
}

export default Api