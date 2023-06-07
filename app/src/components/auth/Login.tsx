import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../services/authService'
import { Overlay } from '@rneui/themed'
import { ActivityIndicator } from 'react-native'

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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

            <TouchableOpacity className='bg-primary rounded-[30px]  py-[20px] w-full mt-[80px] items-center ' onPress={async () => {
                try {
                    setSubmitting(true)
                    await login({ email, password }, dispatch)
                } catch (error: any) {
                    setError(error.message)
                } finally {
                    setSubmitting(false)
                }
            }
            }>
                <Text className='text-[#ffffff] text-[16px] font-[bold]'>
                    Login
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login