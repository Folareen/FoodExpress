import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'
import CartItem from '../components/CartItem'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import formatPrice from '../utils/formatPrice'

const Cart = ({ navigation }: { navigation: any }) => {
    const [prevCard, setPrevCard] = useState(null)

    const { products, quantity, subTotal } = useSelector((state: RootState) => state.cart)


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
                        products?.map(
                            ({ cover_img, title, price, slug }) => (
                                <CartItem prevCard={prevCard} setPrevCard={setPrevCard} img={cover_img} title={title} price={price} quantity={products.find((pd) => pd.slug == slug)?.quantity} slug={slug} />
                            )
                        )
                    }

                </ScrollView>
            </View>

            <View className='mt-auto mb-[90px] flex flex-row justify-between w-4/5 items-center mx-auto'>
                <Text className='text-[17px] font-[normal]'>
                    Total
                </Text>
                <Text className='text-[22px] font-[bold]'>
                    &#8358;{formatPrice(subTotal)}
                </Text>
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