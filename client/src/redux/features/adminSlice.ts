import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    error : false,
    admin : {
        name : "",
        email : "",
        _id : "",
        image : ""
    }
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers(builder) {

    },
})

export default adminSlice