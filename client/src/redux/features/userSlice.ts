import { createSlice } from "@reduxjs/toolkit";
import userActions from "./userActions";
import { toast } from "react-toastify"

interface UserType {
    name: string,
    _id: string,
    image: string,
    email: string,
    status: string,
    verified: boolean | null | undefined,
    wallet: {
        balance: Number
        transactions: string[]
    }
}

interface BookingType {
    mentor: string,
    user: string,
    status: string,
    date: string,
    startTime: string,
    endTime: string
}

interface InitialState {
    loading: boolean,
    error: boolean,
    user: UserType,
    users: UserType[],
    bookings: BookingType[]
}

const initialState: InitialState = {
    loading: false,
    error: false,
    user: {
        _id: "",
        email: "",
        image: "",
        name: "",
        status: "",
        verified: undefined,
        wallet: {
            balance: 0,
            transactions: []
        }
    },
    users: [],
    bookings: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = ({ ...state.user, [action.payload.name]: action.payload.value })
        }
    },
    extraReducers(builder) {
        //get
        builder.addCase(userActions.userGet.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            state.user = payload?.user
        })
        builder.addCase(userActions.userGet.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userActions.userGet.rejected, (state, { payload }) => {
            state.loading = false
            state.error = true
            toast.error((payload as { message: string }).message)
        })
        //get

        // register
        builder.addCase(userActions.userRegister.fulfilled, (state) => {
            state.loading = false
            state.error = false
        })
        builder.addCase(userActions.userRegister.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(userActions.userRegister.rejected, (state, { payload }) => {
            state.loading = false
            state.error = true
            toast.error((payload as { message: string }).message)
        })

        // register

        // get All Bookings
        builder.addCase(userActions.getAllBookings.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            state.bookings = payload.bookings
            console.log(payload.bookings)
        })
        builder.addCase(userActions.getAllBookings.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(userActions.getAllBookings.rejected, (state, { payload }) => {
            state.loading = false
            state.error = true
            toast.error((payload as { message: string })?.message)
        })
        // get All Bookings
    },
})

export default userSlice
