import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { ipAdd, springPort } from '../../../global functions and info/global';
import { useNavigation } from '@react-navigation/native';
import { SocketContext } from '../../../routes/Tabs';

const OrderedService = ({ item, myId }) => {

    const [enabled, setEnabled] = useState(!item.isDone)

    const navigation = useNavigation()

    const { msg, setMsg } = useContext(SocketContext)

    return (
        <View style={enabled ? styles.body : styles.bodyDisabled}>
            <TouchableOpacity
                disabled={!enabled}
                onPress={() => {
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
                    axios.get(`http://${ipAdd}:${springPort}/garage/${myId}/increaseCapacityByOne`).then(resp => { })
                    axios.post(
                        `http://${ipAdd}:${springPort}/garage/${myId}/setNotificationDone/${item.notificationId}`,
                        {
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                                "Accept": "application/json"
                            }
                        }
                    ).then(response => {
                        let copy = [...msg]
                        for (let i = 0; i < copy.length; i += 1) {
                            if (copy[i].notificationId == item.notificationId) {
                                copy[i].isDone = true
                            }
                        }
                        setMsg(copy)
                        setEnabled(false)
                        alert('The service has been marked as done')
                    })
                }}>
                {enabled ? (
                    <Text style={styles.icon}>
                        <Text>Mark as done</Text>
                        <MaterialIcons name="done" size={24} color={enabled ? "black" : "white"} />
                    </Text>
                ) : (
                    <Text style={styles.icon}>
                        <Text style={styles.done}>Done</Text>
                    </Text>
                )}
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
    done: {
        fontSize: 22,
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default OrderedService;