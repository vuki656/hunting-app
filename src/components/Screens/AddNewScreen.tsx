// Other Imports
import React from "react"
// Native Component Imports
import { StyleSheet, Text, View } from "react-native"

export const AddNewScreen = () => {
    return (
        <View style={styles.view}>
            <Text>Add New Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
