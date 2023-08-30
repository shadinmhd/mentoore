import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/Api";

const login = createAsyncThunk(
    "auth/login",
    async (loginInfo, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/login", loginInfo)
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