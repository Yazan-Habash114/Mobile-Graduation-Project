import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native"
import { Feather } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdd, springPort } from '../../../global functions and info/global';
import { Picker } from '@react-native-picker/picker';

const EditProfile = ({ route }) => {

    const { accountObj } = route.params
    const { accountType } = route.params
    const { accountId } = route.params

    const [username, setUsername] = useState(accountObj.garageName)
    const [password, setPassword] = useState('')
    const [capacity, setCapacity] = useState(accountObj.capacity)
    const [phone, setPhone] = useState()
    const [carType, setCarType] = useState('Mercedes-Benz')

    const [startTime, setStartTime] = useState('No start time chosen yet')
    const [endTime, setEndTime] = useState('No end time chosen yet')

    useEffect(() => {
        const getPass = async () => {
            const password = await AsyncStorage.getItem('password')
            setPassword(password)
        }
        getPass()

        let number = accountType === 'GARAGE' ?
            accountObj.garagePhoneNumber : accountObj.phone_number
        setPhone(number)

        if (accountType === 'GARAGE') {
            setStartTime(accountObj.garageStartTime)
            setEndTime(accountObj.garageEndTime)
        }
    }, [password])


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

    const saveChanges = () => {
        let data = undefined
        if (accountType === 'GARAGE') {
            data = [username, password, startTime, endTime, capacity, phone, carType]
        } else if (accountType === 'USER') {
            data = [username, password, phone]
        }
        axios.post(
            `http://${ipAdd}:${springPort}/${accountType === 'GARAGE' ?
                'garages' : 'users'}/${accountId}/profile/${accountType === 'GARAGE' ?
                    'editGarageNameAndPasswordAndTimes' : 'editUserNameAndPassword'}`,
            JSON.stringify(data),
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json"
                }
            }
        ).then(response => alert('Profile edited successfully'))
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
        >
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#d0d0d0"
                onChangeText={value => setUsername(value)}
                defaultValue={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#d0d0d0"
                secureTextEntry={true}
                defaultValue={"" + password}
                onChangeText={value => setPassword(value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#d0d0d0"
                defaultValue={"" + phone}
                keyboardType="numeric"
                onChangeText={value => setPhone(value)}
            />
            {
                accountType === 'GARAGE' ? (
                    <TextInput
                        style={styles.input}
                        placeholder="Capacity"
                        placeholderTextColor="#d0d0d0"
                        defaultValue={"" + capacity}
                        keyboardType="numeric"
                        onChangeText={value => setCapacity(value)}
                    />
                ) : null
            }
            {
                accountType === 'GARAGE' ? (
                    <View style={styles.timeBox}>
                        <Picker
                            style={styles.dropList}
                            onValueChange={(itemValue, itemIndex) => setCarType(itemValue)}
                            selectedValue={carType}
                        >
                            <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz" />
                            <Picker.Item label="VW" value="VW" />
                            <Picker.Item label="Skoda" value="Skoda" />
                        </Picker>
                    </View>
                ) : null
            }
            {
                accountType === 'GARAGE' ? (
                    <View style={styles.timeBox}>
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
                    </View>
                ) : null
            }
            <TouchableOpacity
                style={styles.button}
                onPress={saveChanges}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>Save Changes</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#636e72',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#2d3436',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1.5,
        borderColor: '#d63031',
        borderRadius: 10,
        marginHorizontal: 10,
        color: 'white',
    },
    button: {
        marginHorizontal: 90,
        backgroundColor: '#d63031',
        padding: 8,
        borderRadius: 10,
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
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
    },
    timeBox: {
        alignItems: 'center'
    },
    dropList: {
        width: '55%',
        color: 'white',
        backgroundColor: '#d63031',
        marginVertical: 10,
    },
})

export default EditProfile