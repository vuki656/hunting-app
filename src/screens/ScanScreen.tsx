import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setScannedCode } from '../redux/actions/userActions'

export const ScanScreen = (props) => {
    const { navigation } = props

    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        getCameraAccess()
    }, [])

    const getCameraAccess = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === 'granted')
    }

    // Todo implement check if exists
    const handleQrCodeRead = ({ data: scannedCode }) => {
        navigation.navigate('SaveMeat')
        dispatch(setScannedCode(scannedCode))
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
