import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
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
        <View style={styles.container}>
            <Button
                color="blue"
                title="Logout"
                onPress={() => handleLogOut()}
            />
            <Button
                color="red"
                title="Edit Profile"
                onPress={() =>  navigation.navigate('EditProfile')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})
