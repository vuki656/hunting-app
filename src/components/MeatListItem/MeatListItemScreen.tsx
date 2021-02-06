import moment from 'moment'
import * as React from 'react'
import { useState } from 'react'
import {
 Button,
StyleSheet,
Text,
View 
} from 'react-native'
import { useDispatch } from 'react-redux'

import firebase from '../../firebase'
import { setSelectedMeat } from '../../redux/actions/userActions'

import type { MeatListItemProps } from './MeatListItem.types'

export const MeatListItemScreen: React.FC<MeatListItemProps> = (props) => {
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
                    <Text style={styles.bolded}>
💾 Code:
</Text> 
{' '}
{meatItem.code}
                </Text>
                <Text>
                    <Text style={styles.bolded}>
🦌 Species:
</Text> 
{' '}
{meatItem.species}
                </Text>
                <Text>
                    <Text style={styles.bolded}>
🍗 Cut:
</Text> 
{' '}
{meatItem.cut}
                </Text>
                <Text>
                    <Text style={styles.bolded}>
📅 Hunt Date:
</Text> 
{' '}
{moment(meatItem.huntDate).format('DD MM YYYY')}
                </Text>
                <Text>
                    <Text style={styles.bolded}>
🗺️ Hunt Spot:
</Text> 
{' '}
{meatItem.huntSpot}
                </Text>
                <Text>
                    <Text style={styles.bolded}>
⚖️ Weight:
</Text> 
{' '}
{meatItem.weight}
                </Text>
                <Text>
                    <Text style={styles.bolded}>
🍴 Consumed:
</Text> 
{' '}
{meatItem.consumed ? 'Yes' : 'No'}
                </Text>
            </View>
            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <Button
                        color="red"
                        onPress={() => handleEditButtonPress()}
                        title="🖊️ Edit"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color="orange"
                        onPress={() => handleConsumptionChange()}
                        title={meatItem.consumed ? '❌ Mark as not Consumed' : '✔️ Mark as Consumed'}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bolded: {
        fontWeight: 'bold',
    },
    container: {
        borderColor: '#ccc',
        borderBottomWidth: 1,
        padding: 20,
    },
    button: {
        padding: 10,
    },
    meatItem: {
        width: '100%',
        padding: 10,
        alignSelf: 'center',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
})
