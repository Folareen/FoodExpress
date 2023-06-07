import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Landing from './screens/Landing'
import Auth from './screens/account/Auth'
import Home from './screens/Home'
import Search from './screens/Search'
import ProductDetails from './screens/ProductDetails'
import Cart from './screens/Cart'
import Account from './screens/account'
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from 'jwt-decode'
import { setAxiosToken } from './config/api'
import { useDispatch } from 'react-redux'
import { authenticate } from './redux/features/authSlice'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            const token: string = await AsyncStorage.getItem('token')
            if (Boolean(!token)) return
            const user = await jwtDecode(token)
            await AsyncStorage.setItem('token', token)
            setAxiosToken(token)
            dispatch(authenticate(user))
        })()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name='landing' component={Landing} options={{ headerShown: false }} />
                <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='search' component={Search} options={{ headerShown: false }} />
                <Stack.Screen name='product-details' component={ProductDetails} options={{ headerShown: false }} />
                <Stack.Screen name='cart' component={Cart} options={{ headerShown: false }} />
                <Stack.Screen name='account' component={Account} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation