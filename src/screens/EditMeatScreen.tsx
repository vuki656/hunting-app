import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import * as React from 'react'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
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

    return (
        <View style={styles.container}>
            <Text>
                Scanned code: {selectedMeat.code}
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
            <View>
                <Button
                    color="blue"
                    title={consumed ? 'Mark as not Consumed' : 'Mark as Consumed'}
                    onPress={() => setConsumed()}
                />
            </View>
            <Button
                color="red"
                title="Save"
                onPress={() => handleMeatEditSave()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
