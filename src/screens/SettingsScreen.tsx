import React from 'react'
import {
    Button,
    StyleSheet,
    View,
} from 'react-native'

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
                    onPress={() => {
                        handleLogOut()
                    }}
                    title="🔙 Logout"
                />
            </View>
            <View style={styles.button}>
                <Button
                    color="red"
                    onPress={() => navigation.navigate('EditProfile')}
                    title="🖊️ Edit Profile"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 40,
    },
})
