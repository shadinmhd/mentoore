import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    mentor: {
        firstName: "",
        lastName: "",
        _id: "",
        image: "",
        email: ""
    }
}

const mentorSlice = createSlice({
    name: "mentor",
    initialState,
    reducers: {},
    extraReducers(builder) {

    },
})

