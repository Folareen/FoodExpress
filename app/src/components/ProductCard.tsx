import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import formatPrice from '../utils/formatPrice'

type ProductCardProps = {
    navigation: any,
    img: string,
    title: string,
    price: number,
    isSearchItem: Boolean
}

const ProductCard = ({ navigation, img, title, price, isSearchItem }: ProductCardProps) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('product-details')
        }} className={`${isSearchItem ? 'mx-[5%]' : 'mx-[30px]'} rounded-[30px] bg-white mt-[51px] py-[25px] ${!isSearchItem && 'px-[25px]'} ${isSearchItem && 'w-[40%]'}`} style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 30,
            marginBottom: 60,
        }} >
            <Image source={{ uri: img }} className={`${isSearchItem ? 'w-[128px]' : 'w-[164px]'} ${isSearchItem ? 'h-[128px]' : 'h-[164px]'} rounded-full -mt-[76px] mx-auto`} />
            <View className='flex-row mt-[25px] mb-[15px] mx-2'>
                <Text className='text-black text-[22px] font-[bold] text-center  flex-1 flex-wrap'>
                    {title}
                </Text>
            </View>
            <View className='flex-row mx-2'>
                <Text className='text-primary font-[extrabold] text-center text-[17px] flex-1 flex-wrap'>
                    &#8358;{formatPrice(price)}
                </Text>
            </View>


        </TouchableOpacity>
    )
}

export default ProductCard