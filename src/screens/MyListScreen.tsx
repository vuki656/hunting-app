import React, { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, View } from 'react-native'

import { MeatListItemScreen } from '../components/MeatListItem'
import firebase from '../firebase'

export const MyListScreen = (props) => {
    const { navigation } = props

    const [currentUserUid] = useState(firebase.auth().currentUser.uid)
    const [meatList, setMeatList] = useState([])


    // TODO: list not fetching after scan, something with updating on unmounted component
    useEffect(() => {
        fetchMeat()
        activateListeners()
    }, [])

    // Listen for meat changes
    const activateListeners = () => {
        firebase
        .database()
        .ref(`meat/${currentUserUid}`)
        .on('child_changed', () => {
            fetchMeat()
        })
    }

    // Get meat list from database
    const fetchMeat = async () => {
        setMeatList([])
        let meatTempList = []

        await firebase
        .database()
        .ref('meat')
        .child(`${currentUserUid}/`)
        .on('value', meatList => {
            meatList.forEach(meat => {
                meatTempList.push({
                    code: meat.val().code,
                    cut: meat.val().cut,
                    huntDate: meat.val().huntDate,
                    huntSpot: meat.val().huntSpot,
                    species: meat.val().species,
                    weight: meat.val().weight,
                    consumed: meat.val().consumed,
                })
            })
        })

        setMeatList(meatTempList)
    }

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={meatList}
                    renderItem={({ item }) => <MeatListItemScreen meatItem={item} navigation={navigation}/>}
                />
            </View>
            <Button
                color="red"
                title="Edit"
                onPress={() => navigation.navigate('EditMeat')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})

