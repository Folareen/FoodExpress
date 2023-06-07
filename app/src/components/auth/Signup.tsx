import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { signup } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { Overlay } from '@rneui/themed'

const Signup = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [address, setAddress] = useState<string>('')

    const dispatch = useDispatch()

    const [submitting, setSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    return (
        <View className='px-[50px] pt-[50px] pb-[40px] flex-1'>
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

            <View className='mb-[50px]'>
                <Text className='font-[bold] font-[15px]' style={{ color: 'rgba(0,0,0,0.4)' }}>
                    Phone number
                </Text>
                <TextInput value={phoneNumber} onChangeText={
                    (text) => {
                        setPhoneNumber(text)
                    }
                } className='border-b-[0.5px] border-solid border-black py-[4px] font-bold text-black text-[18px]' keyboardType='numeric' />
            </View>

            <View className='mb-[50px]'>
                <Text className='font-[bold] font-[15px]' style={{ color: 'rgba(0,0,0,0.4)' }}>
                    Password
                </Text>
                <TextInput value={password} onChangeText={
                    (text) => {
                        setPassword(text)
                    }
                } className='border-b-[0.5px] border-solid border-black py-[4px] font-bold text-black text-[18px]' secureTextEntry />
            </View>

            <View>
                <Text className='font-[bold] font-[15px]' style={{ color: 'rgba(0,0,0,0.4)' }}>
                    House address
                </Text>
                <TextInput value={address} onChangeText={
                    (text) => {
                        setAddress(text)
                    }
                } className='border-b-[0.5px] border-solid border-black py-[4px] font-bold text-black text-[18px]' multiline={true} numberOfLines={3} style={{ textAlignVertical: 'top' }} />
            </View>

            <TouchableOpacity className='bg-primary rounded-[30px]  py-[20px] w-full mt-[80px] items-center ' onPress={async () => {
                try {
                    setSubmitting(true)
                    await signup({ name, email, phoneNumber, password, address }, dispatch)
                } catch (error: any) {
                    setError(error.message)
                } finally {
                    setSubmitting(false)
                }
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