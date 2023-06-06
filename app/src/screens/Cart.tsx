import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'
import CartItem from '../components/CartItem'

const Cart = ({ navigation }: { navigation: any }) => {
    const [prevCard, setPrevCard] = useState(null)

    return (
        <GestureHandlerRootView className='bg-[#F6F6F9] flex-1'>
            <View className='mt-[60px] mx-[42px] mb-[10px] flex-row items-center justify-center relative'>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }} className='absolute left-0'>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text className='font-[bold] text-[18px] '>
                    Cart
                </Text>
            </View>

            <View className='flex-row items-center justify-center mt-[40px] mb-[20px]'>
                <MaterialIcons name="swipe" size={18} color="black" />
                <Text className='text-[10px] font-[normal] ml-2'>
                    Swipe an item to delete
                </Text>

            </View>

            <View>
                <ScrollView >
                    {
                        [
                            {
                                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                                title: 'Veggie tomato mix',
                                price: 1900
                            },
                            {
                                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                                title: 'Veggie tomato mix',
                                price: 1900
                            },
                            {
                                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                                title: 'Veggie tomato mix',
                                price: 1900
                            },
                            {
                                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                                title: 'Veggie tomato mix',
                                price: 1900
                            }
                        ].map(
                            ({ img, title, price }) => (
                                <CartItem prevCard={prevCard} setPrevCard={setPrevCard} img={img} title={title} price={price} />
                            )
                        )
                    }
                </ScrollView>
            </View>

            <TouchableOpacity className='bg-primary absolute bottom-3  rounded-[30px]  py-[20px] w-4/5 left-[10%] right-[10%] items-center ' onPress={
                () => {
                    console.log('checkout')
                }
            }>
                <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                    Checkout
                </Text>
            </TouchableOpacity>

        </GestureHandlerRootView >
    )
}

export default Cart