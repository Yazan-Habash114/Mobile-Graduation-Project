import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { ipAdd, springPort } from '../../../global functions and info/global';
import { useNavigation } from '@react-navigation/native';
import { SocketContext } from '../../../routes/Tabs';

const OrderedService = ({ item, myId }) => {

    const [enabled, setEnabled] = useState(true)

    const navigation = useNavigation()

    const { msg, setMsg } = useContext(SocketContext)

    return (
        <View style={enabled ? styles.body : styles.bodyDisabled}>
            <TouchableOpacity onPress={() => {
                if (JSON.parse(item.notificationText).type === 'notification-ordering') {
                    navigation.navigate('Set Your Location', { text: item.notificationText })
                }
            }}>
                <Text style={enabled ? styles.text : styles.textDisabled}>
                    {JSON.parse(item.notificationText).message}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                disabled={!enabled}
                onPress={() => {
                    axios.get(`http://${ipAdd}:${springPort}/garage/${myId}/increaseCapacityByOne`).then(resp => {
                        alert('The service has been marked as done')
                        setEnabled(false)
                    })
                }}>
                <Text style={styles.icon}>
                    <Text style={styles.iconText}>Mark as done</Text>
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
        flexDirection: 'column',
        alignItems: 'center',
    },
    bodyDisabled: {
        backgroundColor: 'black',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: 5,
    },
    icon: {
        fontSize: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textDisabled: {
        fontSize: 18,
        marginRight: 4,
        color: 'white',
    },
})

export default OrderedService;