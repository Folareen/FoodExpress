import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import formatPrice from '../utils/formatPrice'
import { urlFor } from '../config/sanityClient'
import { useRoute } from '@react-navigation/native'
import { useSelector } from "react-redux"
import { RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { addProduct, removeProduct } from '../redux/features/cartSlice'

const ProductDetails = ({ navigation }: { navigation: any }) => {
    const { params: { cover_img, images, title, price, slug } } = useRoute<any>()

    const [currImgIndex, setCurrImgIndex] = useState(0)

    const scrollViewRef = useRef(null)

    const { products } = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

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
                        images?.map(
                            (img: any, index: number) => (
                                <View className='w-screen items-center justify-center' key={index}>
                                    <Image source={{ uri: urlFor(img?.asset).url() }} key={index} className='w-[240px] h-[240px] rounded-full ' />
                                </View>
                            )
                        )
                    }
                </ScrollView>
                <View className='flex-row justify-center gap-6 my-[10px]'>
                    {
                        [...Array(images.length).keys()].map(
                            (num) => (
                                <TouchableOpacity className={`w-[8px] h-[8px] ${num == currImgIndex ? 'bg-primary' : 'bg-[#C4C4C4]'} rounded-full`} onPress={() => {
                                    scrollViewRef.current.scrollTo({
                                        x: num * Dimensions.get('screen').width,
                                        y: 0,
                                        animated: true,
                                    });
                                    setCurrImgIndex(num)
                                }} key={num}>
                                </TouchableOpacity>
                            )
                        )
                    }

                </View>

            </View>

            <View className='flex-row mb-[15px] mx-[50px]'>
                <Text className='text-black text-[28px] font-[bold] text-center  flex-1 flex-wrap'>
                    {title}
                </Text>
            </View>
            <View className='flex-row mx-[50px]'>
                <Text className='text-primary font-[extrabold] text-center text-[22px] flex-1 flex-wrap'>
                    &#8358;{formatPrice(price)}
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

            {
                products.find(pd => pd.slug == slug) ?
                    <TouchableOpacity className='bg-primary absolute bottom-3  rounded-[30px]  py-[20px] w-4/5 left-[10%] right-[10%] items-center ' onPress={
                        () => {
                            dispatch(removeProduct({ slug }))
                        }
                    }>
                        <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                            Remove from cart
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity className='bg-primary absolute bottom-3  rounded-[30px]  py-[20px] w-4/5 left-[10%] right-[10%] items-center ' onPress={
                        () => {
                            dispatch(addProduct({ title, quantity: 1, price, cover_img, slug }))
                        }
                    }>
                        <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                            Add to cart
                        </Text>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default ProductDetails