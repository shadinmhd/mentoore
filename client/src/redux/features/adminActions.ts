import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/Api";

export const adminLogin = createAsyncThunk(
    "admin/login",
    async (loginInfo, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/admin/login", loginInfo)
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return
        }
    }
)

export const adminRegister = createAsyncThunk(
    "admin/register",
    async (registerInfo, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/admin/regiser", registerInfo)
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

export const adminGet = createAsyncThunk(
    "admin/get",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("/admin")
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "something went wron" })
        }
    }
)

export const adminEdit = createAsyncThunk(
    "admin/edit",
    async (editInfo: FormData, { rejectWithValue }) => {
        try {
            const { data } = await Api.put("/admin", editInfo)
            if (data.success) {
                return data
            }
            else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "something went wrong" })
        }
    }
)

export const userGetAll = createAsyncThunk(
    "admin/userGetAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("/admin/userGetAll")
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
    "admin/userGet",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const { data } = await Api.get(`/admin/user/${id}`)
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
    'admin/userEdit',
    async ({ editInfo }: { editInfo: FormData }, { rejectWithValue }) => {
        try {
            const { data } = await Api.put("/admin/user", editInfo)
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
    "admim/useDelete",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const { data } = await Api.delete(`/admin/user/${id}`)
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

const mentorGetAll = createAsyncThunk(
    "admin/mentorgetall",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("/admin/mentor/getAll")
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "somethin went wrong" })
        }
    }
)
const mentorGet = createAsyncThunk(
    "admin/mentorGet",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const { data } = await Api.get(`/admin/mentor/${id}`)
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "somethin went wrong" })
        }
    }
)

const mentorEdit = createAsyncThunk(
    "admin/mentorEdit",
    async ({ editInfo }: { editInfo: FormData }, { rejectWithValue }) => {
        try {
            const { data } = await Api.put("/admin/mentor", editInfo)
            if (data.success) {
                return data
            } else {
                return rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "somethin went wrong" })
        }
    }
)
const mentorDelete = createAsyncThunk(
    "admin/mentorDelete",
    async (_, { rejectWithValue }) => {
        try {

        } catch (err) {
            return rejectWithValue({ message: "somethin went wrong" })
        }
    }
)

export default {
    adminLogin, adminRegister, adminGet, adminEdit,
    userGetAll, userGet, userEdit, userDelete,
    mentorGetAll, mentorGet, mentorEdit, mentorDelete
}