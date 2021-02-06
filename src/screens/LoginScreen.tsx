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

export const LoginScreen = (props) => {
    const { navigation } = props

    const [email, setEmail] = useState('off.vukovic@gmail.com') // todo remove
    const [password, setPassword] = useState('123456')
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
            {isLoading
                ? (
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Loading
                        </Text>
                    </View>

                )
                : (
                    <Button
                        color="orange"
                        onPress={() => {
                            handleUserLogin()
                        }}
                        title="Login"
                    />
                )}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.footerCta}>
                        Register
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
