import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
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

    // todo remove uuid and buffer
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
        <View style={styles.container}>
            <Text>
                Scanned code: {scannedCode}
            </Text>
            <TextInput
                value={species}
                style={styles.input}
                placeholder="Species"
                onChangeText={setSpecies}
            />
            <TextInput
                value={cut}
                style={styles.input}
                placeholder="Cut"
                onChangeText={setCut}
            />
            <View>
                <Button title="Choose Hunt Date" onPress={toggleDatePicker} />
            </View>
            <Text>Hunt Date: {moment(huntDate).format('DD MM YYYY')}</Text>
            <View>
                {isDatePickerToggled && (
                    <DateTimePicker
                        value={huntDate}
                        onChange={handleHuntDateChange}
                    />
                )}
            </View>
            <TextInput
                value={weight}
                style={styles.input}
                placeholder="Weight (Kg)"
                onChangeText={setWeight}
            />
            <TextInput
                value={huntSpot}
                style={styles.input}
                placeholder="Hunt Spot"
                onChangeText={setHuntSpot}
            />
            <Button
                color="red"
                title="Save"
                onPress={() => handleMeatSave()}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: '100%',
        marginBottom: 20,
        paddingBottom: 5,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
})


