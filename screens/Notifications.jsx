import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { SocketContext } from '../routes/Tabs';

const Notifications = () => {

    const { msg } = useContext(SocketContext)

    // Flat List
    const renderNotification = ({ item }) => {
        return (
            <TouchableOpacity>
                <Text style={styles.notification}>{item}</Text>
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