import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'

import { AuthRouter } from './components/AuthRouter/AuthRouter'

export default function Index() {
    return (
        <NavigationContainer>
            <AuthRouter />
        </NavigationContainer>
    )
}
