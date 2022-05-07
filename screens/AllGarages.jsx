import React from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, TextInput } from "react-native"
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'
import Garage from '../components/Garage/Garage'

const AllServices = () => {

    const [garages, setGarages] = React.useState([])
    const [filter, setFilter] = React.useState('')

    // Flat List
    const renderGarages = ({ item }) => {
        return (
            <Garage item={item} />
        );
    };

    React.useEffect(() => {
        axios.get(`http://${ipAdd}:${springPort}/garages`)
            .then(response => {
                setGarages(response.data)
            })
    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for garage by name..."
                    placeholderTextColor="#a8a8a8"
                    onChangeText={(value) => setFilter(value)}
                />
                <FlatList
                    nestedScrollEnabled={true}
                    data={garages.filter(garage => {
                        if (filter !== '')
                            return garage.garageName.indexOf(filter) >= 0
                        return garage
                    })}
                    renderItem={renderGarages}
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
        backgroundColor: '#636e72'
    },
    img: {
        width: 100,
        height: 100,
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

export default AllServices