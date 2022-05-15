import { Text, View, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ipAdd, springPort } from '../global functions and info/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationDetails = ({ route }) => {

    const { notificationItem } = route.params
    const from = notificationItem.from

    const [user, setUser] = useState(null)

    // Image local counter
    const [localCounter, setLocalCounter] = React.useState(-1000)

    useEffect(() => {
        AsyncStorage.getItem('counter').then(value => {
            let temp = parseInt(value)
            setLocalCounter(temp)
        })
    }, [])

    useEffect(() => {
        axios.get(`http://${ipAdd}:${springPort}/users/${from}`).then(response => {
            setUser(response.data)
        })
    }, [])

    return (
        <View style={styles.container}>
            {user ? (
                <Image
                    style={styles.img}
                    source={{ uri: `http://${ipAdd}:${springPort}/users/${user.id}/profileImage/${localCounter}` }}
                />
            ) : null}

            {user ? <Text style={styles.garageName}>{user.username}</Text> : null}

            {user ? (
                <View style={styles.info}>
                    <View style={styles.tuple}>
                        <Text style={styles.rowKey}>Email:</Text>
                        <Text style={styles.rowValue}>{user.email}</Text>
                    </View>
                    <View style={styles.tuple}>
                        <Text style={styles.rowKey}>Phone:</Text>
                        <Text style={styles.rowValue}>{user.phone_number}</Text>
                    </View>
                </View>
            ) : null}

            <Text style={styles.notification}>
                {JSON.parse(notificationItem.notificationText).message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#636e72',
    },
    img: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    garageName: {
        fontSize: 36,
        color: '#d63031',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    info: {
        borderWidth: 2,
        padding: 10,
        borderColor: '#d63031',
        borderBottomLeftRadius: 15,
        borderTopEndRadius: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        display: 'flex',
    },
    tuple: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    rowKey: {
        color: '#ecf0f1',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 5,
    },
    rowValue: {
        color: '#ecf0f1',
        fontSize: 20,
    },
    notification: {
        backgroundColor: '#2d3436',
        marginHorizontal: 10,
        marginVertical: 3,
        borderRadius: 10,
        padding: 10,
        color: '#dfe6e9',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#d63031',
    },
})

export default NotificationDetails;