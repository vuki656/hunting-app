import React, { useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import firebase from '../firebase'

export const RegisterScreen = (props) => {
    const { navigation } = props

    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)

    const clearForm = () => {
        setFirstName('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setError('')
    }

    const validateInput = () => {
        // Remove extra whitespace from email
        setEmail(email.trim())

        // Check if all fields filled
        if (!firstName || !email || !password || !repeatPassword) {
            setLoading(false)
            setError('Please fill all fields')

            return false
        }

        // Check if passwords match
        if (password !== repeatPassword) {
            setLoading(false)
            setError('Passwords don\'t match')

            return false
        }

        setError('')

        return true
    }

    const handleUserRegister = () => {
        setLoading(true)
        const isInputValid = validateInput()
        const trimmedEmail = email.trim() // TODO: fix

        isInputValid && firebase
            .auth()
            .createUserWithEmailAndPassword(trimmedEmail, password)
            .then((response) => {
                response.user.updateProfile({
                    displayName: firstName,
                })

                setLoading(false)
                clearForm()
                navigation.navigate('Login')
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    Trail Glassin
                </Text>
            </View>
            <TextInput
                onChangeText={setFirstName}
                placeholder="First name"
                style={styles.field}
                value={firstName}
            />
            <TextInput
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.field}
                textContentType="emailAddress"
                value={email}
            />
            <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.field}
                value={password}
            />
            <TextInput
                onChangeText={setRepeatPassword}
                placeholder="Repeat Password"
                secureTextEntry={true}
                style={styles.field}
                value={repeatPassword}
            />
            {isLoading
                ? (
                    <View style={styles.footer}>
                        <Text>
                            Loading
                        </Text>
                    </View>

                )
                : (
                    <Button
                        color="orange"
                        onPress={() => {
                            handleUserRegister()
                        }}
                        title="Register"
                    />
                )}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerCta}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>
                {error && (
                    <Text>
                        {error}
                    </Text>
                )}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 40,
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
        marginBottom: 20,
        paddingBottom: 5,
        width: '100%',
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerCta: {
        color: 'orange',
        fontWeight: 'bold',
    },
    footerText: {
        marginTop: 25,
        textAlign: 'center',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
        width: '100%',
    },
    titleText: {
        fontSize: 40,
    },
})
