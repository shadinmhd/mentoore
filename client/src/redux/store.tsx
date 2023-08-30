import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/userSlice"
import categorySlice from "./features/categorySlice"
import mentorSlice from "./features/mentorSlice"
import adminSlice from "./features/adminSlice"

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        mentor: mentorSlice.reducer,
        category: categorySlice.reducer
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>