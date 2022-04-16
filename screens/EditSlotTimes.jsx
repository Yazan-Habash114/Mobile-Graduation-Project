import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'
import { Ionicons } from '@expo/vector-icons'

const EditSlotTimes = ({ route }) => {
    const { service } = route.params

    const navigation = useNavigation()

    const [id, setId] = useState(0)
    const [slots, setSlots] = useState(null)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ipAdd}:${springPort}/services/${service.serviceID}/gatAllSlotTimesForService`).then(response => {
                setSlots(response.data)
            })
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => AsyncStorage.getItem('id').then(value => setId(parseInt(value))), [])

    const deleteSlot = (slotTimeID) => {
        // Call API
        axios.delete(`http://${ipAdd}:${springPort}/garage/${id}/service/${service.serviceID}/deleteSlotTime/${slotTimeID}`).then(resp => alert(resp.data))
        let copy = [...slots]
        let index = 0
        for (let i = 0; i < copy.length; i = i + 1) {
            if (copy[i].slotTimeID === slotTimeID) {
                index = i
            }
        }
        copy.splice(index, 1)
        setSlots(copy)
    }

    // Flat List
    const renderList = ({ item }) => {
        return (
            <View style={styles.slot}>
                <View style={styles.info}>
                    <Text style={styles.row}>Start Time: {item.startTime}</Text>
                    <Text style={styles.row}>End Time: {item.endTime}</Text>
                    <Text style={styles.row}>Date: {item.date}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Edit Slot Time', { slot: item })}
                    style={styles.edit}
                >
                    <MaterialIcons name="edit" size={24} color="#ffeaa7" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => deleteSlot(item.slotTimeID)}
                    style={styles.edit}
                >
                    <MaterialIcons name="delete" size={24} color="#ffeaa7" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{service.serviceName}</Text>
            <TouchableOpacity
                style={styles.addSlot}
                onPress={() => navigation.navigate('Add Slot Time', {
                    service: service
                })}>
                <Text style={styles.addSlotText}>Add New Slot Time</Text>
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
            <FlatList
                nestedScrollEnabled={true}
                data={slots}
                renderItem={renderList}
                keyExtractor={item => item.slotTimeID}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#636e72',
    },
    title: {
        fontSize: 38,
        color: '#dfe6e9',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    slot: {
        borderWidth: 2,
        borderColor: '#d63031',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        borderRadius: 10,
        margin: 10,
    },
    info: {
        borderWidth: 3,
        borderColor: '#d63031',
        backgroundColor: '#2d3436',
        flex: 1,
        padding: 5,
    },
    row: {
        color: '#dfe6e9',
        fontSize: 20,
        fontWeight: 'bold',
    },
    edit: {
        flex: 0.2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d63031',
    },
    addSlot: {
        backgroundColor: '#00b894',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addSlotText: {
        color: '#dfe6e9',
        fontSize: 17,
        fontWeight: 'bold',
    },
})

export default EditSlotTimes