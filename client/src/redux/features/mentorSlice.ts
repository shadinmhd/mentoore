import { createSlice } from "@reduxjs/toolkit";
import mentorActions from "./mentorActions";
import { toast } from "react-toastify";

interface MentorsType {
    firstName: string,
    lastName: string,
    _id: string,
    image: string,
    email: string,
    category: string,
    status: string
}

interface InitialState {
    loading: boolean,
    error: boolean,
    mentor: MentorsType,
    mentors: MentorsType[]
}

const initialState: InitialState = {
    loading: false,
    error: false,
    mentor: {
        firstName: "",
        lastName: "",
        email: "",
        _id: "",
        image: "",
        category: "",
        status: ""
    },
    mentors: []
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

        // get all
        builder.addCase(mentorActions.mentorGetAll.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            state.mentors = payload?.mentors
        })
        builder.addCase(mentorActions.mentorGetAll.pending, (state, { payload }) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(mentorActions.mentorGetAll.rejected, (state, { payload }) => {
            state.loading = false
            state.error = false
            toast.error((payload as { message: string })?.message)
        })
        // get all
    },
})

export default mentorSlice