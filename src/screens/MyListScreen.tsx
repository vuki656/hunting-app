import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { MeatListItem } from '../components/MeatListItem'
import firebase from '../firebase'

export const MyListScreen = () => {
    const [currentUserUid] = useState(firebase.auth().currentUser.uid)
    const [meatList, setMeatList] = useState([])

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
                    renderItem={({ item }) => <MeatListItem meatItem={item} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})

