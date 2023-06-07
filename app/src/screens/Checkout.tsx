import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Overlay } from '@rneui/themed'
import { checkout } from '../services/checkoutService'
import { AntDesign, Entypo, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import formatPrice from '../utils/formatPrice'

const Checkout = ({ navigation }: { navigation: any }) => {
    const { products, quantity, subTotal } = useSelector((state: RootState) => state.cart)

    const [submitting, setSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank account'>('card')
    const [deliveryMethod, setDeliveryMethod] = useState<'door delivery' | 'pickup'>('door delivery')

    return (
        <View className='bg-[#F6F6F9] flex-1 px-[40px]'>
            <View className='mt-[50px]  mb-[14px] flex-row items-center justify-center relative'>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }} className='absolute left-0'>
                    <AntDesign name="left" size={20} color="black" />
                </TouchableOpacity>
                <Text className='font-[bold] text-[18px] '>
                    Checkout
                </Text>
            </View>

            <View className='flex-row my-[20px]'>
                <Text className='text-black text-[34px] font-[bold] text-left  flex-1 flex-wrap'>
                    Payment
                </Text>
            </View>

            <Text className='font-[bold] text-[18px] mb-1'>
                Payment method
            </Text>
            <View className='bg-white w-full rounded-[20px] p-[18px] mt-[10px'>
                <TouchableOpacity className='flex-row items-center' onPress={() => { setPaymentMethod('card') }}>
                    <Entypo name="dot-single" size={48} color={paymentMethod == 'card' ? '#F47B0A' : 'white'} style={{ marginHorizontal: -12, marginTop: -8 }} />
                    <View className='flex-1 border-b-[1px] border-[#0000006e] pb-[12px] flex-row items-center ml-[8px]'>
                        <View className={`${paymentMethod == 'card' ? 'bg-[#F47B0A]' : 'bg-[#EB4796]'} p-[10px] mr-[12px] rounded-md`}>
                            <AntDesign name="creditcard" size={24} color="white" />
                        </View>
                        <Text className='font-[normal] text-[17px] '>
                            Card
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className='flex-row items-center mt-[12px]' onPress={() => { setPaymentMethod('bank account') }}>
                    <Entypo name="dot-single" size={48} color={paymentMethod == 'bank account' ? '#F47B0A' : 'white'} style={{ marginHorizontal: -12 }} />
                    <View className='flex-1 flex-row items-center ml-[8px]'>
                        <View className={`${paymentMethod == 'bank account' ? 'bg-[#F47B0A]' : 'bg-[#EB4796]'} p-[10px] mr-[12px] rounded-md`}>
                            <MaterialCommunityIcons name="bank" size={24} color="white" />
                        </View>
                        <Text className='font-[normal] text-[17px] '>
                            Bank account
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text className='font-[bold] text-[18px] mt-[40px] mb-1'>
                Delivery method
            </Text>
            <View className='bg-white w-full rounded-[20px] px-[18px] mt-[10px'>
                <TouchableOpacity className='flex-row items-center pt-[18px]' onPress={() => { setDeliveryMethod('door delivery') }}>
                    <Octicons name="dot-fill" size={24} color={deliveryMethod == 'door delivery' ? '#F47B0A' : 'white'} style={{ marginTop: -14 }} />
                    <View className='flex-1 border-b-[1px] border-[#0000006e] pb-[18px] flex-row items-center ml-[12px]'>
                        <Text className='font-[normal] text-[17px] '>
                            Door delivery
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='flex-row items-center pt-[18px]' onPress={() => { setDeliveryMethod('pickup') }}>
                    <Octicons name="dot-fill" size={24} color={deliveryMethod == 'pickup' ? '#F47B0A' : 'white'} style={{ marginTop: -14 }} />
                    <View className='flex-1 pb-[18px] flex-row items-center ml-[12px]'>
                        <Text className='font-[normal] text-[17px] '>
                            Pickup
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>



            <Overlay isVisible={submitting}>
                <View>
                    <ActivityIndicator size="large" color="#FF460A" />
                    <Text className='font-[bold] text-[17px] mt-1'>
                        Please wait...
                    </Text>
                </View>
            </Overlay>
            <Overlay isVisible={error.length > 0} onBackdropPress={() => {
                setError('')
            }}>
                <View>
                    <Text className='font-[bold] text-[17px] mt-1 text-red-500'>
                        {error}
                    </Text>
                </View>
            </Overlay>

            <View className='mt-auto mb-[90px] flex flex-row justify-between w-full items-center mx-auto'>
                <Text className='text-[17px] font-[normal]'>
                    Total
                </Text>
                <Text className='text-[22px] font-[bold]'>
                    &#8358;{formatPrice(subTotal)}
                </Text>
            </View>


            <TouchableOpacity className='bg-primary absolute bottom-3  rounded-[30px]  py-[20px] w-full left-[10%] right-[10%] items-center ' onPress={
                async () => {
                    try {
                        setSubmitting(true)
                        await checkout({ items: products, total: subTotal, totalQty: quantity })
                    } catch (error: any) {
                        setError(error.message)
                    } finally {
                        setSubmitting(false)
                    }
                }
            }>
                <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                    Checkout
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Checkout