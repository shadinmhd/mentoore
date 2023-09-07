import { createSlice } from "@reduxjs/toolkit";
import authActions from "./authActions";
import { toast } from "react-toastify";

const initialState = {
    loading: false,
    error: false,
    type: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            if (localStorage.getItem("token")) {
                localStorage.removeItem("token")
                localStorage.removeItem("type")
                state.type = ""
            }
        },
        init: (state) => {
            if (localStorage.getItem("token")) {
                state.type = localStorage.getItem("type") as string
            }

        }
    },
    extraReducers(builder) {
        // login
        builder.addCase(authActions.login.fulfilled, (state, { payload }) => {
            state.loading = false
            state.type = payload?.type
            localStorage.setItem("token", payload?.token)
            localStorage.setItem("type", payload?.type)
        })
        builder.addCase(authActions.login.pending, (state) => {
            state.loading = false
            state.error = false
        })
        builder.addCase(authActions.login.rejected, (state, { payload }) => {
            state.loading = false
            state.error = true
            toast.error((payload as { message: string }).message)
        })
        // login
    },
})

export default authSlice
