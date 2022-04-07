import React from 'react'
import { Text, View, StyleSheet } from "react-native"

const GaragePage = ({ route }) => {
    const { garageId } = route.params



    return (
        <View style={styles.container}>
            <Text>Garage screen for garage {garageId}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
})

export default GaragePage