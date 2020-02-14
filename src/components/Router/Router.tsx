// Other Imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import * as React from "react"
// Screens Imports
import { AddNewScreen } from "../Screens/AddNewScreen"
import { HomeScreen } from "../Screens/HomeScreen"
import { MyListScreen } from "../Screens/MyListScreen"
import { ScanScreen } from "../Screens/ScanScreen"
import { SettingsScreen } from "../Screens/SettingsScreen"
import { FooterBarIcon } from "../_Specific/FooterBarIcon"

const Tab = createBottomTabNavigator()

export const Router = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => <FooterBarIcon color={color} route={route} />,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Scan" component={ScanScreen} />
                <Tab.Screen name="My List" component={MyListScreen} />
                <Tab.Screen name="Add New" component={AddNewScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
