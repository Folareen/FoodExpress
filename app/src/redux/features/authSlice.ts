import { createSlice } from '@reduxjs/toolkit'
import Toast from 'react-native-root-toast'

const initialState = { user: null }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            Toast.show(`Signed out!`, {
                duration: Toast.durations.SHORT,
                position: 60,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red',
                textColor: '#fff'
            });
        }
    }
})

export const { authenticate, logout } = authSlice.actions
export default authSlice.reducer