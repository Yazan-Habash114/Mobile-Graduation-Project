import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { ipAdd, springPort } from '../../../global functions and info/global';

const OrderedService = ({ item, myId }) => {

    const [enabled, setEnabled] = useState(true)

    return (
        <View style={enabled ? styles.body : styles.bodyDisabled}>
            <Text style={enabled ? styles.text : styles.textDisabled}>{item.notificationText}</Text>
            <TouchableOpacity
                disabled={!enabled}
                onPress={() => {
                    axios.get(`http://${ipAdd}:${springPort}/garage/${myId}/increaseCapacityByOne`).then(resp => {
                        alert('The service has been marked as done')
                        setEnabled(false)
                    })
                }}>
                <Text style={styles.icon}>
                    <MaterialIcons name="done" size={24} color={enabled ? "black" : "white"} />
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fdcb6e',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyDisabled: {
        backgroundColor: 'black',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        flex: 1,
        marginRight: 4,
        color: 'black',
    },
    icon: {
        fontSize: 20,
    },
    textDisabled: {
        fontSize: 18,
        flex: 1,
        marginRight: 4,
        color: 'white',
    },
})

export default OrderedService;