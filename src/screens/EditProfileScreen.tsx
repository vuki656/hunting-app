import * as React from 'react'
import { useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

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
            <Text style={styles.label}>
                💳 First Name
            </Text>
            <TextInput
                onChangeText={setFirstName}
                placeholder="First Name"
                style={styles.field}
                value={firstName}
            />
            <Text style={styles.label}>
                📧 Email
            </Text>
            <TextInput
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.field}
                value={email}
            />
            <Text style={styles.label}>
                🔑 Password
            </Text>
            <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.field}
                value={password}
            />
            <Text style={styles.label}>
                🔁 Repeat Password
            </Text>
            <TextInput
                onChangeText={setRepeatPassword}
                placeholder="Repeat Password"
                secureTextEntry={true}
                style={styles.field}
                value={repeatPassword}
            />
            <Text style={styles.errorText}>
                {error && (
                    <Text>
                        {error}
                    </Text>
                )}
            </Text>
            <View style={styles.button}>
                <Button
                    color="red"
                    onPress={() => {
                        handleProfileSave()
                    }}
                    title="💾 Save"
                />
            </View>
            <View style={styles.button}>
                <Button
                    color="orange"
                    onPress={() => navigation.goBack()}
                    title="❌ Cancel"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
    },
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 25,
        textAlign: 'center',
    },
    field: {
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 5,
        paddingBottom: 5,
        width: '100%',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 30,
    },
})
