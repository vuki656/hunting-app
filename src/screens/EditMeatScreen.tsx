import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import * as React from 'react'
import { useState } from 'react'
import {
 Button,
ScrollView,
StyleSheet,
Text,
TextInput,
View 
} from 'react-native'
import { useSelector } from 'react-redux'
import useToggle from 'react-use/lib/useToggle'

import type { MeatItemType } from '../components/MeatListItem'
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
                species: species,
                cut: cut,
                weight: weight,
                huntSpot: huntSpot,
                huntDate: huntDate.valueOf(),
                consumed: consumed,
            })
            .then(() => {
                alert('Saved Successfully')
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
                <Text style={styles.label}>
💾 QR Code
</Text>
                <TextInput
                    editable={false}
                    style={styles.field}
                    value={selectedMeat.code}
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
                    <Button title="📆 Choose Hunt Date"
onPress={toggleDatePicker} />
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
                        color="red"
                        onPress={() => handleItemDelete()}
                        title="🗑️ Delete"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color="orange"
                        onPress={() => setConsumed()}
                        title={consumed ? '❌ Mark as not Consumed' : '✔️ Mark as Consumed'}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color="green"
                        onPress={() => handleMeatEditSave()}
                        title="💾 Save"
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
    },
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
})
