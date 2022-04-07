import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"


const Service = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.name}>Service Name</Text>
            <View style={styles.subSection}>
                <Text style={styles.text}>$100</Text>
                <Text style={styles.text}>By: Garage Name</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(200, 28, 48)',
        marginVertical: 10,
        padding: 15,
        borderRadius: 15,
        display: 'flex',
    },
    name: {
        color: '#222',
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#222',
        paddingBottom: 5,
    },
    text: {
        fontSize: 17,
        color: '#ddd',
        marginTop: 10,
    },
    subSection: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    }
})

export default Service