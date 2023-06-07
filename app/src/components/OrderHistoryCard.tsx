import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import formatPrice from '../utils/formatPrice'

type Props = { items: { items: { cover_img: string, title: string, price: number, quantity: string }[] } }

const OrderHistoryCard = ({ items }: Props) => {
    console.log(items, 'itemss')
    return (
        <View className=''>

            {
                items.items.map(({ cover_img, title, price, quantity }, index) => {
                    return (
                        <View className={` border-b-[1px] border-gray-400   flex-row justify-between items-center py-2`}>
                            <Image source={{ uri: cover_img }} className='w-[20px] h-[20px] rounded-full' />
                            <Text className='text-[14px] font-bold'>
                                {title}
                            </Text>
                            <Text className='text-primary font-[bold] text-[12px] '>
                                &#8358;{formatPrice(price)}
                            </Text>
                            <Text className='text-[13px] text-black py-1'>
                                {quantity}
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default OrderHistoryCard