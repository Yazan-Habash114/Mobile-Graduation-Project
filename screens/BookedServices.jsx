import React from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, Text, TextInput } from "react-native"
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'
import BookedService from '../components/BookedService/BookedService'
import { useNavigation } from '@react-navigation/native'

const BookedServices = ({ route }) => {

    const accountId = route.params

    const [bookedServices, setBookedServices] = React.useState([])
    const [filter, setFilter] = React.useState('')

    const navigation = useNavigation()

    // Flat List
    const renderBookedServices = ({ item }) => {
        return <BookedService item={item} accountId={accountId} />
    };

    React.useEffect(() => {
        // Update API
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ipAdd}:${springPort}/users/${accountId}/bookedServices`)
                .then(response => setBookedServices(response.data))
        })
        return unsubscribe
    }, [navigation]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for garage by name..."
                    placeholderTextColor="#a8a8a8"
                    onChangeText={(value) => setFilter(value)}
                />
                {bookedServices.length == 0 ? (
                    <Text style={styles.noBookedServices}>
                        No Services has been booked
                    </Text>
                ) : null}
                <FlatList
                    nestedScrollEnabled={true}
                    data={bookedServices.filter(service => {
                        if (filter !== '')
                            return service.serviceName.indexOf(filter) >= 0
                        return service
                    })}
                    renderItem={renderBookedServices}
                    keyExtractor={item => item.serviceID}
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
    noBookedServices: {
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

export default BookedServices