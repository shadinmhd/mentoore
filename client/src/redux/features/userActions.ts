import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/Api";

interface RegisterInfo {
    name: string,
    email: string,
    password: string
}

export const userLogin = createAsyncThunk(
    "user/login",
    async (loginInfo, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/user/login", { loginInfo })
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data?.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "something went wrong" })
        }
    }
)

export const userRegister = createAsyncThunk(
    "user/register",
    async ({ name, email, password }: RegisterInfo, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/user/register", { name, email, password })
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

export const userGet = createAsyncThunk(
    "user/get",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("/user")
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

export const userEdit = createAsyncThunk(
    "user/edit",
    async (editData: FormData, { rejectWithValue }) => {
        try {
            const { data } = await Api.put("/user", editData)
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

export const userDelete = createAsyncThunk(
    "user/delete",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.delete("/user")
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

export const getAllBookings = createAsyncThunk(
    "user/getAllBookings",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("/user/getAllBookings")
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "somethign went wrong" })
        }
    }
)

export default { userLogin, userRegister, userEdit, userDelete, userGet, getAllBookings }