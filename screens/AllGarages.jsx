import React from 'react'
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native"
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'
import Garage from '../components/Garage/Garage'

const AllServices = () => {

    const [garages, setGarages] = React.useState([])

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
                <FlatList
                    nestedScrollEnabled={true}
                    data={garages}
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
        backgroundColor: '#3f3f3f'
    },
    img: {
        width: 100,
        height: 100,
    }
})

export default AllServices