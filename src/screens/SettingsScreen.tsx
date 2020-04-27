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
            <View style={styles.button}>
                <Button
                    color="orange"
                    title="🔙 Logout"
                    onPress={() => handleLogOut()}
                />
            </View>
            <View style={styles.button}>
                <Button
                    color="red"
                    title="🖊️ Edit Profile"
                    onPress={() => navigation.navigate('EditProfile')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 40,
    },
    button: {
        marginTop: 20,
    },
})
