import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/Api";

interface loginType {
    email: string,
    password: string
}

interface OtpType {
    otp: string,
    id : string
}

const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: loginType, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/login", { email, password })
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "something went wrong" })
        }
    }
)

const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ otp , id }: OtpType, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/otp", { otp , id })
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "something went wrong" })
        }

    }
)

export default { login, verifyOtp }
