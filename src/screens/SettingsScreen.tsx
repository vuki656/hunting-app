import React from 'react'
import { Button, View } from 'react-native'
import firebase from '../firebase'

export const SettingsScreen = (props) => {
    const { navigation } = props

    const handleLogOut = () => {
        firebase
        .auth()
        .signOut()
        .then(() => {
            navigation.navigate('Login')
        })

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                color="blue"
                title="Logout"
                onPress={() => handleLogOut()}
            />
        </View>
    )
}
