import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/Api";

export const mentorLogin = createAsyncThunk(
    "mentor/login",
    async (loginInfo, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/mentor/login", loginInfo)
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

export const mentorRegister = createAsyncThunk(
    "mentor/register",
    async (registerInfo, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("/mentor/register", registerInfo)
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

export const mentorGet = createAsyncThunk(
    "mentor/get",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("/mentor")
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

export const mentorEdit = createAsyncThunk(
    "mentor/edit",
    async (editInfo: FormData, { rejectWithValue }) => {
        try {
            const { data } = await Api.put("/mentor", editInfo)
            if (data.success) {
                return data
            } else {
                rejectWithValue({ message: data.message })
            }
        } catch (err) {
            return rejectWithValue({ message: "something went wrong" })
        }
    }
)

export const mentorDelete = createAsyncThunk(
    "mentor/delete",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.delete("/mentor")
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

export const mentorGetAll = createAsyncThunk(
    "mentor/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("mentor/getAll")
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

export const getMentorDetails = createAsyncThunk(
    "mentor/getMentorDetails",
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await Api.get(`/mentor/getDetails/${id}`)
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
    "mentor/getAllBookings",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await Api.get("/mentor/bookings")
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

interface BookingData {
    date: string,
    startTime: string,
}

export const createBooking = createAsyncThunk(
    "mentor/createBooking",
    async (bookingData: BookingData, { rejectWithValue }) => {
        try {
            const { data } = await Api.post("mentor/bookings", bookingData)
            if (data.success)
                return data
            else
                return rejectWithValue({ message: data.message })
        } catch (err) {
            return rejectWithValue({ message: "something went wrong" })
        }
    }
)

export default {
    mentorLogin, mentorRegister, mentorGet, mentorEdit, mentorDelete, mentorGetAll, getMentorDetails,
    getAllBookings, createBooking
}