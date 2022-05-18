import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { ipAdd, port, springPort } from '../../../global functions and info/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const LocationPanel = ({ setSlide }) => {

    const [startTime, setStartTime] = useState('No start time chosen yet')
    const [endTime, setEndTime] = useState('No end time chosen yet')
    const [location, setLocation] = useState('')
    const [id, setId] = useState(null)
    const [carType, setCarType] = useState('BMW')

    const navigation = useNavigation()

    useEffect(() => {
        const getId = async () => {
            const accountId = await AsyncStorage.getItem('id')
            setId(accountId)
        }
        getId()
    }, [])

    // Date Time picker state (Start Time)
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);

    const showStartTimePicker = () => setStartTimePickerVisibility(true);

    const hideStartTimePicker = () => setStartTimePickerVisibility(false);

    const handleStartConfirm = (time) => {
        hideStartTimePicker();
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
        setStartTime(tempTime)
    };

    // Date Time picker state (End Time)
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

    const showEndTimePicker = () => setEndTimePickerVisibility(true);

    const hideEndTimePicker = () => setEndTimePickerVisibility(false);

    const handleEndConfirm = (time) => {
        hideEndTimePicker();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let tempTime = ''

        let startHour = parseInt(startTime.split(':')[0])

        if (startHour < hours) {
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
            setEndTime(tempTime)
        } else {
            alert('You should choose suitable start and end time')
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <WebView
                    onMessage={event => setLocation(event.nativeEvent.data)}
                    nestedScrollEnabled
                    originWhitelist={['*']}
                    source={{ uri: `http://${ipAdd}:${port}/using-map/setLocation` }}
                />
            </View>
            <TouchableOpacity
                style={styles.timePicker}
                onPress={showStartTimePicker}
            >
                <Text style={styles.timePickerText}>
                    Choose Start Time
                </Text>
                <Feather name="clock" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.time}>{startTime}</Text>

            <TouchableOpacity
                style={styles.timePicker}
                onPress={showEndTimePicker}
            >
                <Text style={styles.timePickerText}>
                    Choose End Time
                </Text>
                <Feather name="clock" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.time}>{endTime}</Text>

            <Picker
                style={styles.dropList}
                onValueChange={(itemValue, itemIndex) => setCarType(itemValue)}
                selectedValue={carType}
            >
                <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz" />
                <Picker.Item label="Skoda" value="Skoda" />
                <Picker.Item label="VW" value="VW" />
            </Picker>

            <DateTimePicker
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartConfirm}
                onCancel={hideStartTimePicker}
            />
            <DateTimePicker
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndConfirm}
                onCancel={hideEndTimePicker}
            />
            <Button onPress={() => {
                const longitude = location.split(',')[0]
                const latitude = location.split(',')[1]
                axios.post(
                    `http://${ipAdd}:${springPort}/garages/${id}/setLocation`,
                    {
                        longitude: longitude,
                        latitude: latitude
                    },
                    {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "Accept": "application/json"
                        }
                    }
                ).then(reponse => {
                    axios.post(
                        `http://${ipAdd}:${springPort}/garages/${id}/profile/setGarageStartAndEndTime`,
                        JSON.stringify([startTime, endTime, carType]),
                        {
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                                "Accept": "application/json"
                            }
                        }
                    ).then(response => {
                        alert('New garage account created')
                        // navigation.navigate('Tabs')
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Tabs', params: { garageRegister: true } }]
                        })
                    })
                })
            }}
                title="Finish registration"
                color="#d63031"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    map: {
        height: 250,
        width: '100%',
    },
    goBackToReg: {
        marginBottom: 10,
        color: "#d63031",
        fontSize: 18
    },
    dropList: {
        width: '45%',
        color: 'white',
        backgroundColor: '#d63031',
        marginVertical: 10,
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
        marginTop: 10,
    },
    timePickerText: {
        color: 'white',
        fontSize: 18,
    },
    time: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
    }
})
export default LocationPanel