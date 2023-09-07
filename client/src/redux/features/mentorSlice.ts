import { createSlice } from "@reduxjs/toolkit";
import mentorActions from "./mentorActions";
import { toast } from "react-toastify";

interface bookingType {
    mentor: string,
    user: string | null | undefined,
    status: string,
    date: string,
    startTime: string,
    endTime: string
}

interface MentorsType {
    firstName: string,
    lastName: string,
    _id: string,
    image: string,
    email: string,
    category: string,
    status: string,
    description: string,
    bookings: bookingType[]
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
        status: "",
        description: "",
        bookings: []
    },
    mentors: []
}

const mentorSlice = createSlice({
    name: "mentor",
    initialState,
    reducers: {
        updateMentor: (state, { payload }) => {
            state.mentor = ({ ...state.mentor, [payload.name]: payload.value })
        }
    },
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

        //edit
        builder.addCase(mentorActions.mentorEdit.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            toast.success(payload.message)
        })
        builder.addCase(mentorActions.mentorEdit.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(mentorActions.mentorEdit.rejected, (state, { payload }) => {
            state.error = true
            state.loading = false
            toast.error((payload as { message: string })?.message)
        })
        //edit

        //get all booking
        builder.addCase(mentorActions.getAllBookings.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            state.mentor.bookings = payload.bookings
        })
        builder.addCase(mentorActions.getAllBookings.pending, (state => {
            state.loading = true
            state.error = false
        }))
        builder.addCase(mentorActions.getAllBookings.rejected, (state, { payload }) => {
            state.error = true
            state.loading = false
            toast.error((payload as { message: string })?.message)
        })
        //get all booking

        // create booking
        builder.addCase(mentorActions.createBooking.fulfilled, (state, { payload }) => {
            state.error = false
            state.loading = false
            toast.success(payload.message)
        })
        builder.addCase(mentorActions.createBooking.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(mentorActions.createBooking.rejected, (state, { payload }) => {
            state.loading = false
            state.error = true
            toast.error((payload as { message: string })?.message)
        })
        // create booking
    },
})

export default mentorSlice