import { View, Text } from 'react-native'
import React from 'react'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    return (
        <View>
            <Text>Profile</Text>
            <Text>
                {JSON.stringify(user)}
            </Text>
        </View>
    )
}

export default Profile
