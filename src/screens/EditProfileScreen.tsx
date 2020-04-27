import * as React from 'react'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

import firebase from '../firebase'

export const EditProfileScreen = (props) => {
    const { navigation } = props

    const [currentUser] = useState(firebase.auth().currentUser)

    const [error, setError] = useState('')
    const [firstName, setFirstName] = useState(currentUser.displayName)
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const handleProfileSave = () => {
        if (firstName !== currentUser.displayName) {
            currentUser
            .updateProfile({ displayName: firstName })
            .catch((error) => {
                setError(error.message)
            })
        }

        if (email !== currentUser.email) {
            currentUser
            .updateEmail(email)
            .catch((error) => {
                setError(error.message)
            })
        }

        if (password && password === repeatPassword) {
            currentUser
            .updatePassword(password)
            .catch((error) => {
                setError(error.message)
            })
        }

        if(!error) {
            alert("Update Successful")
            navigation.navigate('Settings')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={firstName}
                style={styles.input}
                placeholder="First Name"
                onChangeText={setFirstName}
            />
            <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
            />
            <TextInput
                value={password}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <TextInput
                value={repeatPassword}
                style={styles.input}
                placeholder="Repeat Password"
                secureTextEntry={true}
                onChangeText={setRepeatPassword}
            />
            <Text style={styles.errorText}>
                {error && (<Text>{error}</Text>)}
            </Text>
            <Button
                color="red"
                title="Save"
                onPress={() => handleProfileSave()}
            />
            <Button
                color="blue"
                title="Cancel"
                onPress={() => navigation.navigate('My List')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    input: {
        width: '100%',
        marginBottom: 20,
        paddingBottom: 5,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    errorText: {
        marginTop: 25,
        textAlign: 'center',
        color: 'red',
    },
})
