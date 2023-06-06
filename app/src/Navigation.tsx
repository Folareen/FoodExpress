import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Landing from './screens/Landing'
import Auth from './screens/Auth'
import Home from './screens/Home'
import Search from './screens/Search'
import ProductDetails from './screens/ProductDetails'
import Cart from './screens/Cart'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name='landing' component={Landing} options={{ headerShown: false }} />
                <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='search' component={Search} options={{ headerShown: false }} />
                <Stack.Screen name='product-details' component={ProductDetails} options={{ headerShown: false }} />
                <Stack.Screen name='cart' component={Cart} options={{ headerShown: false }} />
                <Stack.Screen name='auth' component={Auth} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation