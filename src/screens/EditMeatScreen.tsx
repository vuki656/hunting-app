import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import * as React from 'react'
import { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'
import useToggle from 'react-use/lib/useToggle'

import { MeatItemType } from '../components/MeatListItem'
import firebase from '../firebase'

export const EditMeatScreen = (props) => {
    const { navigation } = props

    const selectedMeat: MeatItemType = useSelector((state) => state.user.selectedMeat)
    const [isDatePickerToggled, toggleDatePicker] = useToggle(false)
    const [currentUserUid] = useState(firebase.auth().currentUser.uid)

    const [species, setSpecies] = useState(selectedMeat.species)
    const [cut, setCut] = useState(selectedMeat.cut)
    const [weight, setWeight] = useState(selectedMeat.weight)
    const [huntSpot, setHuntSpot] = useState(selectedMeat.huntSpot)
    const [consumed, setConsumed] = useToggle(selectedMeat.consumed)

    const [huntDate, setHuntDate] = useState(new Date(selectedMeat.huntDate))

    const handleHuntDateChange = (event, selectedDate) => {
        setHuntDate(selectedDate)
        toggleDatePicker()
    }

    const handleMeatEditSave = () => {
        firebase
        .database()
        .ref(`meat/${currentUserUid}/${selectedMeat.code}`)
        .update({
            species,
            cut,
            weight,
            huntSpot,
            huntDate: huntDate.valueOf(),
            consumed,
        })
        .then(() => {
            alert(`Saved Successfully`)
            navigation.navigate('My List')
        })
        .catch(() => {
            alert('Something wen\'t wrong, please try again.')
        })
    }

    const handleItemDelete = () => {
        firebase
        .database()
        .ref(`meat/${currentUserUid}/${selectedMeat.code}`)
        .remove()
        .then(() => {
            navigation.navigate('My List')
        })
        .catch(() => {
            alert('Something wen\'t wrong, please try again.')
        })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>💾 QR Code</Text>
                <TextInput
                    value={selectedMeat.code}
                    style={styles.field}
                    editable={false}
                />
                <Text style={styles.label}>🦌 Species</Text>
                <TextInput
                    value={species}
                    style={styles.field}
                    placeholder="Species"
                    onChangeText={setSpecies}
                />
                <Text style={styles.label}>🍗 Cut</Text>
                <TextInput
                    value={cut}
                    style={styles.field}
                    placeholder="Cut"
                    onChangeText={setCut}
                />
                <Text style={styles.label}>📅 Hunt Date</Text>
                <TextInput
                    value={moment(huntDate).format('DD MM YYYY')}
                    style={styles.field}
                    placeholder="📅 Hunt Date"
                    editable={false}
                />
                <View>
                    <Button title="📆 Choose Hunt Date" onPress={toggleDatePicker} />
                </View>
                <View>
                    {isDatePickerToggled && (
                        <DateTimePicker
                            value={huntDate}
                            onChange={handleHuntDateChange}
                        />
                    )}
                </View>
                <Text style={styles.label}>🗺️ Hunt Spot</Text>
                <TextInput
                    value={huntSpot}
                    style={styles.field}
                    placeholder="Hunt Spot"
                    onChangeText={setHuntSpot}
                />
                <Text style={styles.label}>⚖ Weight (Kg)</Text>
                <TextInput
                    value={weight}
                    style={styles.field}
                    placeholder="Weight (Kg)"
                    onChangeText={setWeight}
                />

                <View style={styles.button}>
                    <Button
                        color="red"
                        title="🗑️ Delete"
                        onPress={() => handleItemDelete()}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color="orange"
                        title={consumed ? '❌ Mark as not Consumed' : '✔️ Mark as Consumed'}
                        onPress={() => setConsumed()}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color="green"
                        title="💾 Save"
                        onPress={() => handleMeatEditSave()}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
    },
    field: {
        width: '100%',
        paddingBottom: 5,
        marginBottom: 5,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    label: {
        marginTop: 30,
        fontWeight: 'bold',
    },
    button: {
        padding: 5,
    },
})
