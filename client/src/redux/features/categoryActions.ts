import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/Api";

export const categoryGet = createAsyncThunk(
    "category/get",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("/category")
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (error) {
            return rejectWithValue({ message: "something went wrong" })
        }
    }
)

export default { categoryGet }