import axios from "axios"

const Api = axios.create({
    baseURL: "http://localhost:8000"
})

if (localStorage.getItem("token")) {
    Api.interceptors.request.use((request) => {
        request.headers.Authorization = localStorage.getItem("token")
        return request
    })
}

export default Api