import React from 'react'
import { Text, View, StyleSheet } from "react-native"

const GaragePage = ({ route }) => {
    const { garage } = route.params

    return (
        <View style={styles.container}>
            <Text>Garage screen for garage {garage.garageID}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default GaragePage