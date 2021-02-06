import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import React, { useState } from 'react'
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
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
                consumed: false,
                cut: cut,
                huntDate: huntDate.valueOf(),
                huntSpot: huntSpot,
                species: species,
                weight: weight,
            })
            .then(() => {
                alert('Saved Successfully')
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
                <Text style={styles.label}>
                    💾 QR Code
                </Text>
                <TextInput
                    editable={false}
                    style={styles.field}
                    value={scannedCode}
                />
                <Text style={styles.label}>
                    🦌 Species
                </Text>
                <TextInput
                    onChangeText={setSpecies}
                    placeholder="Species"
                    style={styles.field}
                    value={species}
                />
                <Text style={styles.label}>
                    🍗 Cut
                </Text>
                <TextInput
                    onChangeText={setCut}
                    placeholder="Cut"
                    style={styles.field}
                    value={cut}
                />
                <Text style={styles.label}>
                    📅 Hunt Date
                </Text>
                <TextInput
                    editable={false}
                    placeholder="📅 Hunt Date"
                    style={styles.field}
                    value={moment(huntDate).format('DD MM YYYY')}
                />
                <View>
                    <Button
                        onPress={toggleDatePicker}
                        title="Choose Hunt Date"
                    />
                </View>
                <View>
                    {isDatePickerToggled && (
                        <DateTimePicker
                            onChange={handleHuntDateChange}
                            value={huntDate}
                        />
                    )}
                </View>
                <Text style={styles.label}>
                    🗺️ Hunt Spot
                </Text>
                <TextInput
                    onChangeText={setHuntSpot}
                    placeholder="Hunt Spot"
                    style={styles.field}
                    value={huntSpot}
                />
                <Text style={styles.label}>
                    ⚖ Weight (Kg)
                </Text>
                <TextInput
                    onChangeText={setWeight}
                    placeholder="Weight (Kg)"
                    style={styles.field}
                    value={weight}
                />
                <View style={styles.button}>
                    <Button
                        color="green"
                        onPress={() => {
                            handleMeatSave()
                        }}
                        title="💾 Save"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color="red"
                        onPress={() => navigation.goBack()}
                        title="🔙  Cancel"
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
    },
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
    },
    field: {
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 5,
        paddingBottom: 5,
        width: '100%',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 30,
    },
})
