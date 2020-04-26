import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import { AddNewScreen } from '../../screens/AddNewScreen'
import { HomeScreen } from '../../screens/HomeScreen'
import { MyListScreen } from '../../screens/MyListScreen'
import { ScanScreen } from '../../screens/ScanScreen'
import { SettingsScreen } from '../../screens/SettingsScreen'
import { FooterBarIcon } from '../FooterBarIcon'

const Tab = createBottomTabNavigator()

export const MainRouter = () => {
    return (
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
        </Tab.Navigator>
    )
}
