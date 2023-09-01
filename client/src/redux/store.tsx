import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/userSlice"
import categorySlice from "./features/categorySlice"
import mentorSlice from "./features/mentorSlice"
import adminSlice from "./features/adminSlice"
import authSlice from "./features/authSlice"

const store = configureStore({
    reducer: {
        admin: adminSlice.reducer,
        user: userSlice.reducer,
        mentor: mentorSlice.reducer,
        category: categorySlice.reducer,
        auth: authSlice.reducer
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>