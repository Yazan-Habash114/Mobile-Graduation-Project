import React from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native"
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'
import Customer from '../components/Customer/Customer'

const MyCustomers = ({ route }) => {

    const accountId = route.params

    const [customers, setCustomers] = React.useState([])

    // Flat List
    const renderCustomers = ({ item }) => {
        return <Customer item={item} />
    };

    React.useEffect(() => {
        // Update API
        axios.get(`http://${ipAdd}:${springPort}/garage/${accountId}/getAllGarageCustomers`)
            .then(response => setCustomers(response.data))
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                {customers.length == 0 ? (
                    <Text style={styles.noCustomers}>
                        No Customers Available
                    </Text>
                ) : null}
                <FlatList
                    nestedScrollEnabled={true}
                    data={customers}
                    renderItem={renderCustomers}
                    keyExtractor={item => item.customerId}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#636e72'
    },
    img: {
        width: 100,
        height: 100,
    },
    noCustomers: {
        fontSize: 30,
        color: '#d63031',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default MyCustomers