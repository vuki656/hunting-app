import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import * as React from "react"

import { AddNewScreen } from "../../Screens/AddNewScreen"
import { HomeScreen } from "../../Screens/HomeScreen"
import { LoginScreen } from '../../Screens/Login'
import { MyListScreen } from "../../Screens/MyListScreen"
import { RegisterScreen } from '../../Screens/Register'
import { ScanScreen } from "../../Screens/ScanScreen"
import { SettingsScreen } from "../../Screens/SettingsScreen"
import { FooterBarIcon } from "../FooterBarIcon"

const Tab = createBottomTabNavigator()

export const Router = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, focused }) =>
                        <FooterBarIcon
                            color={color}
                            focused={focused}
                            route={route}
                        />,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Scan" component={ScanScreen} />
                <Tab.Screen name="My List" component={MyListScreen} />
                <Tab.Screen name="Add New" component={AddNewScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Login" component={LoginScreen} />
                <Tab.Screen name="Register" component={RegisterScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
