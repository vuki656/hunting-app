import moment from 'moment'
import * as React from 'react'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

import firebase from '../../firebase'
import { setSelectedMeat } from '../../redux/actions/userActions'

export const MeatListItemScreen = (props) => {
    const { meatItem, navigation } = props

    const dispatch = useDispatch()

    const [currentUserUid] = useState(firebase.auth().currentUser.uid)

    // Toggle consumed status on click
    const handleConsumptionChange = () => {
        firebase
        .database()
        .ref(`meat/${currentUserUid}/${meatItem.code}`)
        .update({
            consumed: !meatItem.consumed,
        })
        .then(() => {
            alert(`Update Successful`)
        })
        .catch(() => {
            alert('Something wen\'t wrong, please try again.')
        })
    }

    const handleEditButtonPress = () => {
        dispatch(setSelectedMeat(meatItem))
        navigation.navigate('EditMeat')
    }

    return (
        <View>
            <View style={styles.meatItem}>
                <Text>Cut: {meatItem.cut}</Text>
                <Text>Hunt Date: {moment(meatItem.huntDate).format('DD MM YYYY')}</Text>
                <Text>Hunt Spot: {meatItem.huntSpot}</Text>
                <Text>Species: {meatItem.species}</Text>
                <Text>Code: {meatItem.code}</Text>
                <Text>Weight: {meatItem.weight}</Text>
                <Text>Consumed: {meatItem.consumed ? 'Yes' : 'No'}</Text>
            </View>
            <View>
                <Button
                    color="red"
                    title="Edit"
                    onPress={() => handleEditButtonPress()}
                />
            </View>
            <View>
                <Button
                    color="blue"
                    title={meatItem.consumed ? 'Mark as not Consumed' : 'Mark as Consumed'}
                    onPress={() => handleConsumptionChange()}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    meatItem: {
        width: '100%',
        padding: 20,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
})

