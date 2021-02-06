import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import firebase from '../../firebase'
import {
    EditMeatScreen,
    EditProfileScreen,
    LoginScreen,
    RegisterScreen,
    SaveMeatByCodeScreen,
} from '../../screens'
import { BottomNavRouter } from '../BottomNavRouter'
import { MeatListItemScreen } from '../MeatListItem'

const Stack = createStackNavigator()

export const MainRouter = () => {
    const [initialRoute, setInitialRoute] = React.useState('Login')

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) setInitialRoute('Home')
        })
    }, [setInitialRoute])

    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                component={LoginScreen}
                name="Login"
                options={{ title: 'Login' }}
            />
            <Stack.Screen
                component={RegisterScreen}
                name="Register"
                options={{ title: 'Register' }}
            />
            <Stack.Screen
                component={BottomNavRouter}
                name="Home"
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                component={SaveMeatByCodeScreen}
                name="SaveMeat"
                options={{ title: 'Save Meat' }}
            />
            <Stack.Screen
                component={MeatListItemScreen}
                name="MeatItem"
                options={{ title: 'Meat Item' }}
            />
            <Stack.Screen
                component={EditMeatScreen}
                name="EditMeat"
                options={{ title: 'Edit Meat' }}
            />
            <Stack.Screen
                component={EditProfileScreen}
                name="EditProfile"
                options={{ title: 'Edit Profile' }}
            />
        </Stack.Navigator>
    )
}
