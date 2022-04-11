import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { ipAdd, springPort } from '../../global functions and info/global'

const Service = ({ item }) => {

    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Garage Page', {
                garage: item
            })}
            style={styles.container}
        >
            <Image
                style={styles.img}
                source={{ uri: `http://${ipAdd}:${springPort}/garages/${item.garageID}/profileImage/-1` }}
            />
            <View>
                <Text style={styles.name}>{item.garageName}</Text>
                <Text style={styles.carType}>Car type: {item.carType}</Text>
                {
                    item.availability ?
                        <Text style={styles.open}>Open</Text> :
                        <Text style={styles.closed}>Closed</Text>
                }
                <Text style={styles.time}>Opened at: {item.garageStartTime}</Text>
                <Text style={styles.time}>Closed at: {item.garageEndTime}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 60,
        marginRight: 25,
    },
    name: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    open: {
        color: 'green',
        fontSize: 16,
    },
    closed: {
        color: 'rgb(200, 38, 50)',
        fontSize: 16,
    },
    carType: {
        color: 'white',
        fontSize: 16,
    },
    time: {
        color: 'white',
    }
})

export default Service