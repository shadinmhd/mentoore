import { createSlice } from "@reduxjs/toolkit";
import userActions from "./userActions";
import { toast } from "react-toastify"

interface UserType {
    name: string,
    _id: string,
    image: string,
    email: string,
    status: string
}

interface InitialState {
    loading: boolean,
    error: boolean,
    user: {
        name: string,
        email: string,
        _id: string,
        image: string
    },
    users: UserType[]
}

const initialState: InitialState = {
    loading: false,
    error: false,
    user: {
        _id: "",
        email: "",
        image: "",
        name: ""
    },
    users: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
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
            toast.success((payload as { message: string }).message)
        })

        // register
    },
})

export default userSlice
