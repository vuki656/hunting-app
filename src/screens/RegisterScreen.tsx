import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
        .catch(error => {
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
                value={firstName}
                style={styles.input}
                placeholder="First name"
                onChangeText={setFirstName}
            />
            <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                textContentType="emailAddress"
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
            {isLoading
                ? (
                    <View style={styles.footer}>
                        <Text>
                            Loading
                        </Text>
                    </View>

                ) : (
                    <Button
                        color="blue"
                        title="Register"
                        onPress={() => handleUserRegister()}
                    />
                )
            }
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerCta}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>
                {error && (<Text>{error}</Text>)}
            </Text>
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
        backgroundColor: '#fff',
    },
    title: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    titleText: {
        fontSize: 40,
    },
    input: {
        width: '100%',
        marginBottom: 20,
        paddingBottom: 5,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        marginTop: 25,
        textAlign: 'center',
    },
    footerCta: {
        color: 'blue',
        fontWeight: 'bold',
    },
    errorText: {
        marginTop: 25,
        textAlign: 'center',
        color: 'red',
    },
})
