import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import React, { useContext } from 'react';
import OrderedService from '../components/Profile/ordered-service/OrderedService';
import { SocketContext } from '../routes/Tabs';

const OrderedServicesByUsers = () => {

    const { msg, myId } = useContext(SocketContext)

    // Flat List
    const renderOrderService = ({ item }) => {
        return <OrderedService item={item} myId={myId} />
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={msg}
                    renderItem={renderOrderService}
                    keyExtractor={item => item.garageID}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#636e72',
    },
})

export default OrderedServicesByUsers;