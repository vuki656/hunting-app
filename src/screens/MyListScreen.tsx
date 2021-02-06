import React, {
 useEffect,
useState 
} from 'react'
import {
 FlatList,
StyleSheet,
View 
} from 'react-native'

import type { MeatItemType} from '../components/MeatListItem';
import { MeatListItemScreen 
} from '../components/MeatListItem'
import firebase from '../firebase'

export const MyListScreen = (props) => {
    const { navigation } = props

    const [currentUserUid] = useState(firebase.auth().currentUser.uid)
    const [meatList, setMeatList] = useState<MeatItemType[]>([])

    useEffect(() => {
        activateListeners()
        fetchMeat()

        return () => {
            turnOffConnection()
        }
    }, [])

    const turnOffConnection = () => {
        firebase
            .database()
            .ref(`meat/${currentUserUid}`)
            .off()
    }

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
    const fetchMeat = () => {
        firebase
            .database()
            .ref('meat')
            .child(`${currentUserUid}/`)
            .on('value', (_meatList) => {
                setMeatList([])
                _meatList.forEach((meat) => {
                    setMeatList((meatList) => [...meatList, {
                        code: meat.val().code,
                        cut: meat.val().cut,
                        huntDate: meat.val().huntDate,
                        huntSpot: meat.val().huntSpot,
                        species: meat.val().species,
                        consumed: meat.val().consumed,
                        weight: meat.val().weight,
                    }])
                })
            },
            )
    }

    return (
        <View style={styles.container}>
            <View>
                {meatList && (
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
)}
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
