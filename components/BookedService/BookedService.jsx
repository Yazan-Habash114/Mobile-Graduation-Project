import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { ipAdd, springPort } from '../../global functions and info/global'


const BookedService = ({ item, accountId }) => {
    const [supportedGarage, setSupportedGarage] = useState(null)
    const [slotReserved, setSlotReserved] = useState(null)

    const navigation = useNavigation()

    useEffect(() => {
        axios.get(`http://${ipAdd}:${springPort}/garages/${item.supportedGarageID}`)
            .then(response => setSupportedGarage(response.data))
    }, [])

    useEffect(() => {
        for (let i = 0; i < item.slotTimes.length; i = i + 1) {
            if (item.slotTimes[i].bookedUserID === accountId) {
                setSlotReserved(item.slotTimes[i])
            }
        }
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Your booked service details', {
                            service: item
                        })}
                    >
                        <Text style={styles.name}>
                            {item.serviceName}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Garage Page', {
                            garage: supportedGarage
                        })
                    }
                    >
                        <Text style={styles.supportedGarage}>
                            Supported Garage: {item.supportedGarageName}
                        </Text>
                    </TouchableOpacity>
                    {
                        item.rateValue === 0.0 ? (
                            <Text style={styles.info}>
                                Service rate: Not rated yet
                            </Text>
                        ) : (
                            <Text style={styles.info}>
                                Service rate: {item.rateValue.toFixed(1)}/5.0
                            </Text>
                        )
                    }
                    <Text style={styles.info}>
                        Service Type: {item.serviceType}
                    </Text>
                    <Text style={styles.info}>
                        Service Price: {item.price}
                    </Text>
                    {
                        slotReserved ? (
                            <Text style={styles.info}>
                                Date Booked: {slotReserved.date}
                            </Text>
                        ) : null
                    }
                    {
                        slotReserved ? (
                            <Text style={styles.info}>
                                Start time: {slotReserved.startTime}
                            </Text>
                        ) : null
                    }
                    {
                        slotReserved ? (
                            <Text style={styles.info}>
                                End time: {slotReserved.endTime}
                            </Text>
                        ) : null
                    }
                </View>
            </ScrollView>
        </View>
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
    },
    name: {
        color: '#d63031',
        fontSize: 28,
        fontWeight: 'bold',
    },
    info: {
        color: '#dfe6e9',
        fontSize: 16,
    },
    supportedGarage: {
        color: '#fdcb6e',
        fontSize: 20,
    },
})

export default BookedService