import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    user: {
        name: "",
        email: "",
        _id: "",
        image: ""
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {

    },
})

export default userSlice