import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import firebase from '../firebase'
import { setScannedCode } from '../redux/actions/userActions'

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
        let qrCodeExist = await checkIfQrCodeExists(scannedCode)

        if (qrCodeExist) {
            console.log('code exists')
        } else {
            navigation.navigate('SaveMeat')
            dispatch(setScannedCode(scannedCode))
        }

        setScanned(true)
    }

    const checkIfQrCodeExists = async (scannedCode) => {
        let qrCodeExists = false

        await firebase
        .database()
        .ref(`meat/${currentUserUid}/${scannedCode}`)
        .once('value', snapshot => {
            if (snapshot.exists()) qrCodeExists = true
        })

        return qrCodeExists
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
                    title={'Tap to Scan Again'}
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
