import React from 'react'
import { Text, View, StyleSheet } from "react-native"

const ServiceDetails = ({ route }) => {

    const { service } = route.params

    return (
        <View style={styles.container}>
            <Text>{service.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default ServiceDetails