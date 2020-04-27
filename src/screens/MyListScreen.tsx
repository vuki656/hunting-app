import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { MeatItemType, MeatListItemScreen } from '../components/MeatListItem'
import firebase from '../firebase'

export const MyListScreen = (props) => {
    const { navigation } = props

    const [currentUserUid] = useState(firebase.auth().currentUser.uid)
    const [meatList, setMeatList] = useState<MeatItemType[]>(null)

    // TODO: list not fetching after scan, something with updating on unmounted component
    useEffect(() => {
        activateListeners()
        fetchMeat()
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
            },
        )

        setMeatList(meatTempList)
    }

    return (
        <View style={styles.container}>
            {meatList && (
                <View>
                    <FlatList
                        data={meatList}
                        renderItem={({ item }) => (
                            <MeatListItemScreen
                                meatItem={item}
                                navigation={navigation}
                                key={item.code}
                            />
                        )}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})

