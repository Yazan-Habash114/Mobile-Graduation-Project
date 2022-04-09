import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'

const Service = ({ item }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Service Details', {
                service: item
            })}
            style={styles.container}
        >
            <Text style={styles.name}>{item.serviceName}</Text>
            <View style={styles.subSection}>
                <Text style={styles.text}>${item.price}</Text>
                <Text style={styles.text}>By: {item.supportedGarageName}</Text>
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