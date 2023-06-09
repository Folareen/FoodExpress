import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const Landing = ({ navigation }: { navigation: any }) => {

    return (
        <View className='bg-[#FF4B3A] flex-1'>
            <StatusBar style="light" />
            <View className='bg-white rounded-full self-start mt-[67px] ml-[62px] w-[73px] h-[73px] items-center justify-center'>
                <Image source={require('../assets/images/logo.png')} className=' w-[45px] h-[45px]' />
            </View>
            <Text className='text-[65px] !leading-[0] text-white ml-[62px] font-[extrabold]'>
                Food for
                Everyone
            </Text>
            <Image source={require('../assets/images/landing-main.png')} className=' ' />
            <TouchableOpacity className='bg-white rounded-[30px] absolute bottom-4 left-[10%] right-[10%] py-[20px]  w-4/5 items-center' onPress={
                () => {
                    navigation.navigate('home')
                }
            }>
                <Text className='text-primary text-[16px] font-[bold]'>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Landing