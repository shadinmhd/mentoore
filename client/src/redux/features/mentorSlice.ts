import { createSlice } from "@reduxjs/toolkit";
import mentorActions from "./mentorActions";
import { toast } from "react-toastify";

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
        // get
        builder.addCase(mentorActions.mentorGet.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            state.mentor = payload?.mentor
        })
        builder.addCase(mentorActions.mentorGet.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(mentorActions.mentorGet.rejected, (state, { payload }) => {
            state.loading = false
            state.error = true
            toast.error((payload as { message: string })?.message)
        })
        // get
    },
})

export default mentorSlice