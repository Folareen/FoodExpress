import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice'
import authReducer from './features/authSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store