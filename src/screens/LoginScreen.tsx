import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firebase from '../firebase'

export const LoginScreen = (props) => {
    const { navigation } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)

    const clearForm = () => {
        setEmail('')
        setPassword('')
        setError('')
    }

    const validateInput = () => {
        // Remove extra whitespace from email
        setEmail(email.trim())

        // Check if all fields filled
        if (!email || !password) {
            setLoading(false)
            setError('Please fill all fields')
            return false
        }

        setError('')
        return true
    }

    const handleUserLogin = () => {
        setLoading(true)
        const isInputValid = validateInput()
        const trimmedEmail = email.trim() // TODO: fix

        isInputValid && firebase
        .auth()
        .signInWithEmailAndPassword(trimmedEmail, password)
        .then(() => {
            setLoading(false)
            clearForm()
            navigation.navigate('Home')
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
            {isLoading
                ? (
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Loading
                        </Text>
                    </View>

                ) : (
                    <Button
                        color="#3740FE"
                        title="Login"
                        onPress={() => handleUserLogin()}
                    />
                )
            }
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.footerCta}>
                        Register
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
