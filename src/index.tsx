import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { Provider } from 'react-redux'

import { AuthRouter } from './components/AuthRouter/AuthRouter'
import store from './redux/store'

export default function Index() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AuthRouter />
            </NavigationContainer>
        </Provider>
    )
}
