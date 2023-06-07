import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useSelector } from "react-redux"
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { Image } from 'react-native'

const Profile = ({ navigation }: { navigation: any }) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    return (
        <View className='bg-[#F6F6F9] flex-1 px-[40px]'>
            <View className='mt-[50px]  mb-[14px] flex-row items-center'>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }}>
                    <AntDesign name="left" size={20} color="black" />
                </TouchableOpacity>
            </View>


            <View className='flex-row mb-[15px]'>
                <Text className='text-black text-[28px] font-[bold] text-left  flex-1 flex-wrap'>
                    My profile
                </Text>
            </View>


            <View>
            </View>

            <View className=' mt-[30px] flex-row justify-between items-center'>
                <Text className='text-[18px] font-[bold]'>
                    Personal details
                </Text>
                <Text className='text-primary text-[15px] font-[normal]'>
                    change
                </Text>
            </View>


            <View className='bg-white w-full rounded-[20px] p-[18px] mt-[10px] flex-row'>
                <Image source={require('../../assets/images/avatar.png')} className='h-[100px] w-[90px] rounded-[10px]' />
                <View className='ml-[18px] flex-1'>
                    <Text className='text-[19px] font-[bold] '>
                        {user.name}
                    </Text>
                    <View className='flex-row  w-full'>
                        <Text className='flex-1 flex-wrap opacity-50 py-1 border-b-[1px] border-[#00000070]'>
                            {user.email}
                        </Text>
                    </View>
                    <View className='flex-row  w-full'>
                        <Text className='flex-1 flex-wrap opacity-50 py-1 border-b-[1px] border-[#00000070]'>
                            {user.phoneNumber}
                        </Text>
                    </View>
                    <View className='flex-row  w-full'>
                        <Text className='flex-1 flex-wrap opacity-50 py-1 '>
                            {user.address}
                        </Text>
                    </View>

                </View>

            </View>

            <View>
                {
                    ['Orders', 'Pending reviews', 'Faq', 'Help'].map((btn) => (
                        <TouchableOpacity className='mt-[25px] rounded-[20px] bg-white p-[20px] flex-row justify-between' key={btn}>
                            <Text className='text-[18px] font-[bold]'>
                                {btn}
                            </Text>
                            <AntDesign name="right" size={20} color="black" />

                        </TouchableOpacity>
                    ))
                }
            </View>

            <TouchableOpacity className='bg-primary w-full rounded-[30px]  py-[20px] mt-auto items-center mb-3'>
                <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                    Update
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile