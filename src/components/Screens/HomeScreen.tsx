// Other Imports
import * as React from 'react'
// Native Component Imports
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'

export const HomeScreen = () => {
    return (
        <ImageBackground
            source={
                Platform.OS === "android"
                    ? require("../../../assets/images/backgrounds/android-bc.jpg")
                    : require("../../../assets/images/backgrounds/ios-bc.jpg")
            }
            style={{ width: '100%', height: '100%' }}>
            <View style={styles.view}>
                <Text>Home Screen</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
