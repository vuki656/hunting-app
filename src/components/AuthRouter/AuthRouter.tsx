import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect, useState } from 'react'

import firebase from '../../firebase'
import { EditMeatScreen } from '../../screens/EditMeatScreen'
import { EditProfileScreen } from '../../screens/EditProfileScreen'
import { LoginScreen } from '../../screens/LoginScreen'
import { RegisterScreen } from '../../screens/RegisterScreen'
import { SaveMeatByCodeScreen } from '../../screens/SaveMeatByCode'
import { MainRouter } from '../MainRouter'
import { MeatListItemScreen } from '../MeatListItem'

const Stack = createStackNavigator()

export const AuthRouter = () => {
    const [initialRoute, setInitialRoute] = useState('Login')

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
                options={{ title: 'Register' }}
            />
            <Stack.Screen
                name="Home"
                component={MainRouter}
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                name="SaveMeat"
                component={SaveMeatByCodeScreen}
                options={{ title: 'Save Meat' }}
            />
            <Stack.Screen
                name="MeatItem"
                component={MeatListItemScreen}
                options={{ title: 'Meat Item' }}
            />
            <Stack.Screen
                name="EditMeat"
                component={EditMeatScreen}
                options={{ title: 'Edit Meat' }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: 'Edit Profile' }}
            />
        </Stack.Navigator>
    )
}

