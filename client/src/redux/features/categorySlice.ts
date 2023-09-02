import { createSlice } from "@reduxjs/toolkit";
import categoryActions from "./categoryActions";
import { toast } from "react-toastify";

interface categoryType {
    name: string
}

interface initialStateType {
    loading: boolean,
    error: boolean,
    categories: categoryType[]
}

const initialState: initialStateType = {
    loading: false,
    error: false,
    categories: []
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(categoryActions.categoryGet.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            state.categories = payload?.categories
        })

        builder.addCase(categoryActions.categoryGet.pending, (state) => {
            state.loading = true
            state.error = false
        })

        builder.addCase(categoryActions.categoryGet.rejected, (state, { payload }) => {
            state.loading = false
            state.error = true
            toast.error((payload as { message: string })?.message)
        })
    },
})

export default categorySlice