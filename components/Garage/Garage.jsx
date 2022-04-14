import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { ipAdd, springPort } from '../../global functions and info/global'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Service = ({ item }) => {

    const navigation = useNavigation()

    // Image local counter
    const [localCounter, setLocalCounter] = React.useState(-1000)

    React.useEffect(() => {
        AsyncStorage.getItem('counter').then(value => {
            let temp = parseInt(value)
            setLocalCounter(temp)
        })
    }, [])

    // Authentication
    const [auth, setAuth] = React.useState(false)

    React.useEffect(() => {
        let idCheck = false
        let accountType = ''
        AsyncStorage.getItem('id').then(value => {
            if (parseInt(value) === item.garageID) {
                idCheck = true
            }
            AsyncStorage.getItem('account').then(value => {
                if (value === 'GARAGE') {
                    accountType = 'GARAGE'
                } else if (value === 'USER') {
                    accountType = 'USER'
                }
                if (idCheck || accountType === 'USER') {
                    setAuth(true)
                }
            })
        })
    }, [])

    return (
        <TouchableOpacity
            onPress={() => {
                auth ? navigation.navigate('Garage Page', {
                    garage: item
                }) : null
            }}
            style={styles.container}
        >
            <Image
                style={styles.img}
                source={{ uri: `http://${ipAdd}:${springPort}/garages/${item.garageID}/profileImage/${localCounter}` }}
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
        backgroundColor: '#2d3436',
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
        color: '#d63031',
        fontSize: 24,
        fontWeight: 'bold',
    },
    open: {
        color: 'green',
        fontSize: 16,
    },
    closed: {
        color: '#d63031',
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