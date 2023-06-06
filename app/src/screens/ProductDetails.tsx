import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import formatPrice from '../utils/formatPrice'

const ProductDetails = ({ navigation }: { navigation: any }) => {
    const [currImgIndex, setCurrImgIndex] = useState(0)

    const scrollViewRef = useRef(null)

    return (
        <View className='bg-[#F6F6F9] flex-1'>
            <View className='mt-[60px] mx-[42px] mb-[10px] flex-row items-center justify-between'>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Feather name="heart" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollViewRef} pagingEnabled onMomentumScrollEnd={(event) => {
                    const contentOffset = event.nativeEvent.contentOffset;
                    const viewSize = event.nativeEvent.layoutMeasurement;
                    const pageNum = Math.floor(contentOffset.x / viewSize.width);
                    setCurrImgIndex(pageNum);
                }} >
                    {
                        [
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                        ].map(
                            (img, index) => (
                                <View className='w-screen items-center justify-center'>
                                    <Image source={{ uri: img }} key={index} className='w-[240px] h-[240px] rounded-full ' />
                                </View>
                            )
                        )
                    }
                </ScrollView>
                <View className='flex-row justify-center gap-6 my-[10px]'>
                    {
                        [0, 1, 2, 3].map(
                            (num) => (
                                <TouchableOpacity className={`w-[8px] h-[8px] ${num == currImgIndex ? 'bg-primary' : 'bg-[#C4C4C4]'} rounded-full`} onPress={() => {
                                    scrollViewRef.current.scrollTo({
                                        x: num * Dimensions.get('screen').width,
                                        y: 0,
                                        animated: true,
                                    });
                                    setCurrImgIndex(num)
                                }}>
                                </TouchableOpacity>
                            )
                        )
                    }

                </View>

            </View>

            <View className='flex-row mb-[15px] mx-[50px]'>
                <Text className='text-black text-[28px] font-[bold] text-center  flex-1 flex-wrap'>
                    Veggie tomato mix
                </Text>
            </View>
            <View className='flex-row mx-[50px]'>
                <Text className='text-primary font-[extrabold] text-center text-[22px] flex-1 flex-wrap'>
                    &#8358;{formatPrice(1900)}
                </Text>
            </View>

            <View className='mx-[50px] mt-[40px]'>
                <Text className='text-[17px] font-[bold] mb-2'>
                    Delivery info
                </Text>
                <Text className='opacity-50 font-[normal] text-[15px]'>
                    Delivered between monday aug and thursday 20 from 8pm to 91:32 pm
                </Text>
            </View>

            <View className='mx-[50px] mt-[40px]'>
                <Text className='text-[17px] font-[bold] mb-2'>
                    Return policy
                </Text>
                <Text className='opacity-50 font-[normal] text-[15px]'>
                    All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.
                </Text>
            </View>

            <TouchableOpacity className='bg-primary absolute bottom-3  rounded-[30px]  py-[20px] w-4/5 left-[10%] right-[10%] items-center ' onPress={
                () => {
                    console.log('add to cart')
                }
            }>
                <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                    Add to cart
                </Text>
            </TouchableOpacity>


        </View>
    )
}

export default ProductDetails