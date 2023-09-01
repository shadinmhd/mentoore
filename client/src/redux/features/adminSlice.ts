import { createSlice } from "@reduxjs/toolkit";
import adminActions from "./adminActions";
import { toast } from 'react-toastify'

const initialState = {
    loading: false,
    error: false,
    admin: {
        name: "",
        email: "",
        _id: "",
        image: ""
    }
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers(builder) {
        //get 
        builder.addCase(adminActions.adminGet.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            state.admin = payload?.admin
        })
        builder.addCase(adminActions.adminGet.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(adminActions.adminGet.rejected, (state, { payload }) => {
            state.loading = false
            state.error = true
            toast.error((payload as { message: string })?.message)
        })
        //get
    },
})

export default adminSlice