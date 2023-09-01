import { createSlice } from "@reduxjs/toolkit";
import authActions from "./authActions";

const initialState = {
    loading: false,
    error: false,
    type: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            if (localStorage.getItem("token")) {
                localStorage.removeItem("token")
                localStorage.removeItem("type")
            }
        },
        init: (state) => {
            if (localStorage.getItem("token")) {
                state.type = localStorage.getItem("type") as string
                console.log("init")
            }

        }
    },
    extraReducers(builder) {
        // login
        builder.addCase(authActions.login.fulfilled, (state, { payload }) => {
            state.loading = false
            state.type = payload?.token
            localStorage.setItem("token", payload?.token)
            localStorage.setItem("type", payload?.type)
        })
        // login
    },
})

export default authSlice