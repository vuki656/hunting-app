import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { Provider } from 'react-redux'

import { MainRouter } from './components/MainRouter/MainRouter'
import store from './redux/store'

export default function Index() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <MainRouter />
            </NavigationContainer>
        </Provider>
    )
}
