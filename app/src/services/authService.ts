import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from "jwt-decode"
import api, { setAxiosToken } from "../config/api"
import { authenticate } from "../redux/features/authSlice"

export const signup = async (data: { name: string, email: string, phoneNumber: string, password: string, address: string }, dispatch: any) => {
    try {
        const {data : {token}} = await api.post('signup', data as unknown as string)
        const user = await jwtDecode(token)
        await AsyncStorage.removeItem('token')
        await AsyncStorage.setItem('token', token)
        setAxiosToken(token)
        dispatch(authenticate(user))
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || error.message)
    }
}

export const login = async (data: { email: string, password: string, }, dispatch: any) => {
    try {
        const {data : {token}} = await api.post('login', data as unknown as string)
        const user = await jwtDecode(token)
        await AsyncStorage.removeItem('token')
        await AsyncStorage.setItem('token', token)
        setAxiosToken(token)
        dispatch(authenticate(user))
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error?.response?.data?.message || error.message)
    }
}