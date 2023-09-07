import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/Api";

interface loginType {
    email: string,
    password: string
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
export default { login }
