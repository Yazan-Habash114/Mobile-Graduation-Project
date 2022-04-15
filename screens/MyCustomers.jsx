import React from 'react'
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native"
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'
import Customer from '../components/Customer/Customer'

const MyCustomers = ({ route }) => {
    const accountId = route.params

    const [customers, setCustomers] = React.useState([])

    // Flat List
    const renderCustomers = ({ item }) => {
        return (
            <Customer item={item} />
        );
    };

    React.useEffect(() => {
        // axios.get(`http://${ipAdd}:${springPort}/garages`)
        //     .then(response => {
        //         setGarages(response.data)
        //     })
    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={customers}
                    renderItem={renderCustomers}
                    keyExtractor={item => item.id}
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
    }
})

export default MyCustomers