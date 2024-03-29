import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditService = ({ route }) => {
    const { service } = route.params

    const [id, setId] = React.useState(0)

    // Image local counter
    const [localCounter, setLocalCounter] = React.useState(-1000)

    React.useEffect(() => {
        AsyncStorage.getItem('counter').then(value => {
            let temp = parseInt(value)
            setLocalCounter(temp)
        })
        AsyncStorage.getItem('id').then(value => setId(parseInt(value)))
    }, [])

    // Date Time picker state
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showTimePicker = () => setTimePickerVisibility(true);

    const hideTimePicker = () => setTimePickerVisibility(false);

    const handleConfirm = (time) => {
        hideTimePicker();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let tempTime = ''
        // setTime()
        if (hours < 10) {
            if (minutes < 10) {
                tempTime = "0" + hours + ":0" + minutes + ":00"
            }
            else {
                tempTime = "0" + hours + ":" + minutes + ":00"
            }
        } else {
            if (minutes < 10) {
                tempTime = hours + ":0" + minutes + ":00"
            }
            else {
                tempTime = hours + ":" + minutes + ":00"
            }
        }
        console.log(tempTime)
        setTime(tempTime)
    };

    // States
    const [name, setName] = useState(service.serviceName)
    const [canDeliver, setCanDeliver] = useState(service.canDeliver)
    const [description, setDescription] = useState(service.serviceDescription)
    const [price, setPrice] = useState(service.price)
    const [time, setTime] = useState(service.serviceTime)
    const [type, setType] = useState(service.serviceType)

    const saveChanges = () => {
        if (name !== '' && description !== '' && !Number.isNaN(price) && time !== '' && type !== '') {
            axios.post(
                `http://${ipAdd}:${springPort}/services/${service.serviceID}/editService`,
                {
                    serviceName: name,
                    serviceType: type,
                    serviceDescription: description,
                    price: price,
                    serviceTime: time,
                    canDeliver: canDeliver,
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json"
                    }
                }
            ).then(() => alert('The service has been updated'))
        } else {
            alert('Check all fields filled')
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ width: '100%' }}>
                <Image
                    style={styles.img}
                    source={{ uri: `http://${ipAdd}:${springPort}/garages/${id}/profileImage/${localCounter}` }}
                />

                <Text style={styles.serviceName}>{service.serviceName}</Text>

                <View style={styles.form}>
                    <View style={styles.slot}>
                        <Text style={styles.key}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#a8a8a8"
                            defaultValue={service.serviceName}
                            onChangeText={text => setName(text)}
                        />
                    </View>

                    <View style={styles.slot}>
                        <Text style={styles.key}>Price:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            placeholderTextColor="#a8a8a8"
                            defaultValue={"" + service.price}
                            keyboardType="numeric"
                            onChangeText={text => setPrice(parseFloat(text))}
                        />
                    </View>

                    <View style={styles.slot}>
                        <Text style={styles.key}>Desc:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            placeholderTextColor="#a8a8a8"
                            defaultValue={service.serviceDescription}
                            onChangeText={text => setDescription(text)}
                        />
                    </View>

                    <View style={styles.slot}>
                        <Text style={styles.key}>Time:</Text>
                        <View>
                            <TouchableOpacity
                                style={styles.timePicker}
                                onPress={showTimePicker}
                            >
                                <Text style={styles.timePickerText}>
                                    Show Time Picker
                                </Text>
                                <Feather name="clock" size={24} color="white" />
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleConfirm}
                                onCancel={hideTimePicker}
                            />
                        </View>
                    </View>

                    <View style={styles.slot}>
                        <Text style={styles.key}>Type:</Text>
                        <Picker
                            style={styles.dropList}
                            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                            selectedValue={type}
                        >
                            <Picker.Item label="Maintenance" value="Maintenance" />
                            <Picker.Item label="Electrical" value="Electrical" />
                            <Picker.Item label="Car Washing" value="Car Washing" />
                        </Picker>
                    </View>

                    <View style={styles.slot}>
                        <Text style={styles.key}>deliver</Text>
                        <Picker
                            style={styles.dropList}
                            onValueChange={(itemValue, itemIndex) => setCanDeliver(itemValue)}
                            selectedValue={service.canDeliver}
                        >
                            <Picker.Item label="True" value={true} />
                            <Picker.Item label="False" value={false} />
                        </Picker>
                    </View>

                    <TouchableOpacity onPress={saveChanges}>
                        <Text style={styles.confirm}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f3f3f',
    },
    img: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    serviceName: {
        fontSize: 36,
        color: '#d63031',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        borderWidth: 2,
        padding: 10,
        borderColor: '#e74c3c',
        borderBottomLeftRadius: 15,
        borderTopEndRadius: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        display: 'flex',
    },
    slot: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    key: {
        color: '#ecf0f1',
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'black',
        padding: 5,
        paddingLeft: 7,
        color: 'white',
        fontSize: 17,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        width: 200,
    },
    dropList: {
        width: '60%',
        color: 'white',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 5,
    },
    confirm: {
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: '#e74c3c',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        color: '#ecf0f1',
    },
    timePicker: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'gray',
        color: 'white',
        padding: 8,
        paddingLeft: 7,
        width: 200,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    timePickerText: {
        color: 'white',
        fontSize: 18,
    },
})

export default EditService