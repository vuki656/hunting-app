import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import { MyListScreen } from '../../screens/MyListScreen'
import { ScanScreen } from '../../screens/ScanScreen'
import { SettingsScreen } from '../../screens/SettingsScreen'
import { FooterBarIcon } from '../FooterBarIcon'

const Tab = createBottomTabNavigator()

export const BottomNavRouter = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => (
                    <FooterBarIcon
                        color={color}
                        focused={focused}
                        route={route}
                    />
                ),
            })}
        >
            <Tab.Screen
                component={MyListScreen}
                name="My List"
            />
            <Tab.Screen
                component={ScanScreen}
                name="Scan"
            />
            <Tab.Screen
                component={SettingsScreen}
                name="Settings"
            />
        </Tab.Navigator>
    )
}
