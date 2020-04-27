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
            alert(`You marked meat with species: ${meatItem.species} and cut: ${meatItem.cut} as consumed.`)
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
        <View style={styles.container}>
            <View style={styles.meatItem}>
                <Text>
                    <Text style={styles.bolded}>💾 Code:</Text> {meatItem.code}
                </Text>
                <Text>
                    <Text style={styles.bolded}>🦌 Species:</Text> {meatItem.species}
                </Text>
                <Text>
                    <Text style={styles.bolded}>🍗 Cut:</Text> {meatItem.cut}
                </Text>
                <Text>
                    <Text style={styles.bolded}>📅 Hunt Date:</Text> {moment(meatItem.huntDate).format('DD MM YYYY')}
                </Text>
                <Text>
                    <Text style={styles.bolded}>🗺️ Hunt Spot:</Text> {meatItem.huntSpot}
                </Text>
                <Text>
                    <Text style={styles.bolded}>⚖️ Weight:</Text> {meatItem.weight}
                </Text>
                <Text>
                    <Text style={styles.bolded}>🍴 Consumed:</Text> {meatItem.consumed ? 'Yes' : 'No'}
                </Text>
            </View>
            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <Button
                        color="red"
                        title="🖊️ Edit"
                        onPress={() => handleEditButtonPress()}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color="orange"
                        title={meatItem.consumed ? '❌ Mark as not Consumed' : '✔️ Mark as Consumed'}
                        onPress={() => handleConsumptionChange()}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#ccc',
        borderBottomWidth: 1,
        padding: 20,
    },
    bolded: {
        fontWeight: 'bold',
    },
    meatItem: {
        width: '100%',
        padding: 10,
        alignSelf: 'center',
    },
    button: {
        padding: 10,
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

