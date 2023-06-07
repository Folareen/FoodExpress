import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import api from '../config/api'
import OrderHistoryCard from '../components/OrderHistoryCard'
import { FlatList } from 'react-native'
import { Skeleton } from '@rneui/themed'
import { Dimensions } from 'react-native'
import { formatDate } from '../utils/formatDate'
import formatPrice from '../utils/formatPrice'

const OrderHistory = ({ navigation }: { navigation: any }) => {
    const [orders, setOrders] = useState([])
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setFetching(true)
                const { data } = await api.get('orders')
                setOrders(data.orders)
            } catch (err: any) {
                console.log(err.message)
            } finally {
                setFetching(false)
            }
        })()
    }, [])

    if (fetching) {
        return <View className='flex-1 '>
            <Skeleton animation="wave" width={Dimensions.get('screen').width * 0.9} style={{ borderRadius: 40, flex: 1, marginVertical: 60, marginRight: 'auto', marginLeft: 'auto' }} />
        </View>
    }

    return (
        <GestureHandlerRootView className='bg-[#F6F6F9] flex-1'>
            <View className='mt-[60px] mx-[42px] mb-[10px] flex-row items-center justify-center relative'>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }} className='absolute left-0'>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text className='font-[bold] text-[18px] '>
                    Order History
                </Text>
            </View>

            {
                orders.length > 0 ?
                    <FlatList
                        data={orders}
                        className='flex-1 mt-2'
                        renderItem={({ item }) => (
                            <View className='w-4/5 mx-auto bg-white rounded-[20px] p-4 my-2 flex-1'>
                                <Text className='text-[15px] font-[bold] mb-2'>{formatDate(item.date)}</Text>
                                <OrderHistoryCard items={item} />
                                <View className='flex-row items-center justify-between'>
                                    <Text className='text-[13px] font-[bold] mt-2'>Total:</Text>
                                    <Text className='text-[13px] font-[bold] mt-2'>&#8358;{formatPrice(item.total)}</Text>
                                </View>
                            </View>
                        )}
                    />
                    :
                    <View className=' flex-1 items-center justify-center relative'>
                        <AntDesign name="calendar" size={64} color="#00000074" />
                        <Text className='text-black text-[28px] font-[bold]   flex-wrap my-3'>
                            No history yet
                        </Text>
                        <Text className='text-[normal] opacity-60 text-[17px] w-3/4 text-center'>
                            Hit the orange button down
                            below to Create an order
                        </Text>

                        <TouchableOpacity className='bg-primary absolute bottom-3  rounded-[30px]  py-[20px] w-4/5 left-[10%] right-[10%] items-center ' onPress={
                            () => {
                                navigation.navigate('home')
                            }
                        }>
                            <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                                Start ordering
                            </Text>
                        </TouchableOpacity>
                    </View>
            }

        </GestureHandlerRootView >
    )
}

export default OrderHistory