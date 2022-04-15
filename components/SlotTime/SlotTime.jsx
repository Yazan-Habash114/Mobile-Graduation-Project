import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';

const SlotTime = ({ item }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Scheduling The Service', {
                    service: item
                })
            }}
            style={styles.container}
        >
            <Feather name="clock" size={24} color="#ffeaa7" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        backgroundColor: '#d63031',
        marginVertical: 10,
        marginLeft: 5,
        padding: 15,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        color: '#ffeaa7',
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
})

export default SlotTime