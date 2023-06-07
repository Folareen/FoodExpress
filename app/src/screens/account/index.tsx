import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Profile from './Profile'
import Auth from './Auth'

const Account = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    return (
        <>
            {
                user ? <Profile /> : <Auth />
            }
        </>
    )
}

export default Account