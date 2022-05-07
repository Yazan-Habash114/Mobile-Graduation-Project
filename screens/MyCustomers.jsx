import React from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, Text, TextInput } from "react-native"
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'
import Customer from '../components/Customer/Customer'

const MyCustomers = ({ route }) => {

    const accountId = route.params

    const [customers, setCustomers] = React.useState([])
    const [filter, setFilter] = React.useState('')

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
                <TextInput
                    style={styles.input}
                    placeholder="Search for garage by name..."
                    placeholderTextColor="#a8a8a8"
                    onChangeText={(value) => setFilter(value)}
                />
                {customers.length == 0 ? (
                    <Text style={styles.noCustomers}>
                        No Customers Available
                    </Text>
                ) : null}
                <FlatList
                    nestedScrollEnabled={true}
                    data={customers.filter(customer => {
                        if (filter !== '')
                            return customer.username.indexOf(filter) >= 0
                        return customer
                    })}
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
    input: {
        backgroundColor: 'black',
        padding: 10,
        paddingLeft: 7,
        color: 'white',
        fontSize: 17,
        borderWidth: 1,
        borderColor: "gray",
        margin: 10,
        borderRadius: 6,
    },
})

export default MyCustomers