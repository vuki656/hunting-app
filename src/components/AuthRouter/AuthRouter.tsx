import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect, useState } from 'react'

import firebase from '../../firebase'
import { LoginScreen } from '../../screens/LoginScreen'
import { RegisterScreen } from '../../screens/RegisterScreen'
import { MainRouter } from '../MainRouter'

const Stack = createStackNavigator()

export const AuthRouter = () => {
    const [initialRoute, setInitialRoute] = useState('Home') // TODO Set to register


    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) setInitialRoute('Home')
        })
    }, [setInitialRoute])

   return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerTitleAlign: 'center',
            }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'Login' }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: 'Register',
                }}
            />
            <Stack.Screen
                name="Home"
                component={MainRouter}
                options={{
                    title: 'Home',
                }}
            />
        </Stack.Navigator>
    )
}

