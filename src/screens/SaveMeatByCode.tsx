import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'
import useToggle from 'react-use/lib/useToggle'

import firebase from '../firebase'

export const SaveMeatByCodeScreen = (props) => {
    const { navigation } = props

    const [currentUserUid] = useState(firebase.auth().currentUser.uid)
    const [isDatePickerToggled, toggleDatePicker] = useToggle(false)
    const scannedCode = useSelector((state) => state.user.scannedCode)

    const [species, setSpecies] = useState('')
    const [cut, setCut] = useState('')
    const [weight, setWeight] = useState('')
    const [huntSpot, setHuntSpot] = useState('')
    const [huntDate, setHuntDate] = useState(new Date())

    const handleHuntDateChange = (event, selectedDate) => {
        setHuntDate(selectedDate)
        toggleDatePicker()
    }

    const clearForm = () => {
        setSpecies('')
        setCut('')
        setWeight('')
        setHuntSpot('')
        setHuntDate(new Date())
    }

    const handleMeatSave = () => {
        firebase
        .database()
        .ref(`meat/${currentUserUid}/${scannedCode}`)
        .update({
            code: scannedCode,
            species,
            cut,
            weight,
            huntSpot,
            huntDate: huntDate.valueOf(),
            consumed: false,
        })
        .then(() => {
            alert(`Saved Successfully`)
            clearForm()
            navigation.navigate('My List')
        })
        .catch(() => {
            alert('Something wen\'t wrong, please try again.')
            clearForm()
        })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>💾 QR Code</Text>
                <TextInput
                    value={scannedCode}
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
                    <Button title="Choose Hunt Date" onPress={toggleDatePicker} />
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
                        title="💾 Save"
                        onPress={() => handleMeatSave()}
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
        padding: 20,
    },
})


