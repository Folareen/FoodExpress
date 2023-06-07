import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Login from '../../components/auth/Login'
import Signup from '../../components/auth/Signup'

const Auth = () => {
    const [currForm, setCurrForm] = useState<'login' | 'sign up'>('login')

    return (
        <KeyboardAvoidingView className='flex-1 bg-[#EDEDED]'>
            <ScrollView className='flex-1  '>
                <View className='items-center bg-white justify-center rounded-b-[30px] h-[350px]'>
                    <Image source={require('../../assets/images/logo.png')} className='w-[150px] h-[160px] ' />
                    <View className='flex-row absolute bottom-0 left-[50px] right-[50px] w-[calc(100% - 100px]'>
                        {
                            ['login', 'sign up'].map(
                                (item, index) => (
                                    <TouchableOpacity key={index} onPress={
                                        () => {
                                            setCurrForm(item)
                                        }
                                    } className=' py-[16px] flex-row justify-center w-1/2'>
                                        <Text className=' text-[18px] capitalize font-[bold]'>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )
                        }
                        <View className={`absolute h-[3px] w-1/2 bg-[#FA4A0C] bottom-0 ${currForm == 'login' ? 'left-0' : 'right-0'} `}>
                        </View>
                    </View>
                </View>

                {
                    currForm == 'login' ?
                        <Login />
                        :
                        <Signup />
                }
                <StatusBar style='dark' />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Auth