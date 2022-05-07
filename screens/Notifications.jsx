import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../routes/Tabs';

const Notifications = () => {

    const { msg } = useContext(SocketContext)

    return (
        <Text>Length = {msg.length}</Text>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#636e72',
    },
})

export default Notifications;