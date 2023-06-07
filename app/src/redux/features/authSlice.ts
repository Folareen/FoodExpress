import {createSlice} from '@reduxjs/toolkit'

const initialState = {user: null}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate : (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const {authenticate, logout} = authSlice.actions
export default authSlice.reducer