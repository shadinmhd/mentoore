import { createSlice } from "@reduxjs/toolkit";

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
    extraReducers(builder) { },
})

export default categorySlice