import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import firebase from '../firebase'
import { setScannedCode, setSelectedMeat } from '../redux/actions/userActions'

export const ScanScreen = (props) => {
    const { navigation } = props

    const dispatch = useDispatch()
    const [currentUserUid] = useState(firebase.auth().currentUser.uid)
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        getCameraAccess()
    }, [])

    const getCameraAccess = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === 'granted')
    }

    const handleQrCodeRead = async ({ data: scannedCode }) => {
        let existingMeat = await checkIfQrCodeExists(scannedCode)

        if (existingMeat) {
            dispatch(setSelectedMeat(existingMeat))
            navigation.navigate('EditMeat')
        } else {
            dispatch(setScannedCode(scannedCode))
            navigation.navigate('SaveMeat')
        }

        setScanned(true)
    }

    // Checks if QR code exists and returns the meat if true
    const checkIfQrCodeExists = async (scannedCode) => {
        let existingMeat = null

        await firebase
        .database()
        .ref(`meat/${currentUserUid}/${scannedCode}`)
        .once('value', meatItem => {
            if (meatItem.exists()) existingMeat = meatItem.val()
        })

        return existingMeat
    }

    return (
        <View style={styles.container}>
            {hasPermission && (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleQrCodeRead}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            {scanned && (
                <Button
                    color="orange"
                    title={'📷 Tap to Scan Again'}
                    onPress={() => setScanned(false)}
                />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
})
