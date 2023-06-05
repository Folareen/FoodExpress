import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Signup = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <View className='px-[50px] pt-[50px] pb-[40px] flex-1'>
            <View className='mb-[50px]'>
                <Text className='font-[bold] font-[15px]' style={{ color: 'rgba(0,0,0,0.4)' }}>
                    Name
                </Text>
                <TextInput className='border-b-[0.5px] border-solid border-black py-[4px] font-bold text-black text-[18px]' value={name} onChangeText={
                    (text) => {
                        setName(text)
                    }
                } />
            </View>

            <View className='mb-[50px]'>
                <Text className='font-[bold] font-[15px]' style={{ color: 'rgba(0,0,0,0.4)' }}>
                    Email address
                </Text>
                <TextInput className='border-b-[0.5px] border-solid border-black py-[4px] font-bold text-black text-[18px]' value={email} onChangeText={
                    (text) => {
                        setEmail(text)
                    }
                } />
            </View>

            <View>
                <Text className='font-[bold] font-[15px]' style={{ color: 'rgba(0,0,0,0.4)' }}>
                    Password
                </Text>
                <TextInput value={password} onChangeText={
                    (text) => {
                        setPassword(text)
                    }
                } className='border-b-[0.5px] border-solid border-black py-[4px] font-bold text-black text-[18px]' secureTextEntry />
            </View>

            <TouchableOpacity className='bg-[#FF460A] rounded-[30px]  py-[20px] w-full mt-[80px] items-center ' onPress={
                () => {
                    console.log('signup')
                }
            }>
                <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                    Signup
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Signup