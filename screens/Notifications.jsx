import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../routes/Tabs';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = ({ route }) => {

    const { msg } = useContext(SocketContext)
    const { setCounter } = route.params

    const navigation = useNavigation()

    useEffect(() => {
        AsyncStorage.getItem('counter').then(value => {
            let temp = parseInt(value)
            setLocalCounter(temp)
        })
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setCounter(0)
        })
        return unsubscribe
    }, [navigation])

    // Flat List
    const renderNotification = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('User Info', { from: item.from, notificationText: item.notificationText })
            }}>
                <Text style={styles.notification}>{item.notificationText}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={msg.reverse()}
                    renderItem={renderNotification}
                    keyExtractor={item => item.notificationId}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#636e72',
        paddingTop: 5,
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

export default Notifications;