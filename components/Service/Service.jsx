import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Service = ({ item }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => {
                AsyncStorage.getItem('account').then(value => {
                    if (value === 'USER') {
                        navigation.navigate('Service Details', {
                            service: item
                        })
                    } else if (value === 'GARAGE') {
                        navigation.navigate('Edit Service', {
                            service: item
                        })
                    }
                })
            }}
            style={styles.container}
        >
            <Text style={styles.name}>{item.serviceName}</Text>
            <View style={styles.subSection}>
                <Text style={styles.text}>Price: ${item.price}</Text>
                <Text style={styles.text}>Rate: {item.rateValue.toFixed(1)}/5.0</Text>
            </View>
            <Text style={styles.text}>
                By: {item.supportedGarageName ? item.supportedGarageName : null}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d63031',
        marginVertical: 10,
        padding: 15,
        borderRadius: 15,
        display: 'flex',
    },
    name: {
        color: '#ffeaa7',
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#ffeaa7',
        paddingBottom: 5,
    },
    text: {
        fontSize: 17,
        color: '#dfe6e9',
        marginTop: 10,
    },
    subSection: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    }
})

export default Service