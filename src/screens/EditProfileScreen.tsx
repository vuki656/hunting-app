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

        if (!error) {
            alert('Update Successful')
            navigation.navigate('Settings')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>💳 First Name</Text>
            <TextInput
                value={firstName}
                style={styles.field}
                placeholder="First Name"
                onChangeText={setFirstName}
            />
            <Text style={styles.label}>📧 Email</Text>
            <TextInput
                value={email}
                style={styles.field}
                placeholder="Email"
                onChangeText={setEmail}
            />
            <Text style={styles.label}>🔑 Password</Text>
            <TextInput
                value={password}
                style={styles.field}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <Text style={styles.label}>🔁 Repeat Password</Text>
            <TextInput
                value={repeatPassword}
                style={styles.field}
                placeholder="Repeat Password"
                secureTextEntry={true}
                onChangeText={setRepeatPassword}
            />
            <Text style={styles.errorText}>
                {error && (<Text>{error}</Text>)}
            </Text>
            <View style={styles.button}>
                <Button
                    color="red"
                    title="💾 Save"
                    onPress={() => handleProfileSave()}
                />
            </View>
            <View style={styles.button}>
                <Button
                    color="orange"
                    title="❌ Cancel"
                    onPress={() => navigation.goBack()}
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
        padding: 20,
    },
    field: {
        width: '100%',
        paddingBottom: 5,
        marginBottom: 5,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    label: {
        marginTop: 30,
        fontWeight: 'bold',
    },
    button: {
        padding: 20,
    },
    errorText: {
        marginTop: 25,
        textAlign: 'center',
        color: 'red',
    },
})
