import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import DatePicker from 'react-native-neat-date-picker'
import { ipAdd, springPort } from '../global functions and info/global'

const EditSlot = ({ route }) => {
    const { slot } = route.params

    const [startTime, setStartTime] = useState(slot.startTime)
    const [endTime, setEndTime] = useState(slot.endTime)
    const [date, setDate] = useState(slot.date)
    const [showDatePicker, setShowDatePicker] = React.useState(false)

    // Date
    let d = new Date()
    d.setDate(d.getDate() - 1)

    // Date picker
    const onConfirm = (date) => {
        setShowDatePicker(false)
        setDate(date.dateString)
    }

    // Date Time picker state (Start Time)
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);

    const showStartTimePicker = () => setStartTimePickerVisibility(true);

    const hideStartTimePicker = () => setStartTimePickerVisibility(false);

    const handleConfirmStart = (time) => {
        hideStartTimePicker();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let startTime = ''
        // setTime()
        if (hours < 10) {
            if (minutes < 10) {
                startTime = "0" + hours + ":0" + minutes + ":00"
            }
            else {
                startTime = "0" + hours + ":" + minutes + ":00"
            }
        } else {
            if (minutes < 10) {
                startTime = hours + ":0" + minutes + ":00"
            }
            else {
                startTime = hours + ":" + minutes + ":00"
            }
        }
        console.log(startTime)
        setStartTime(startTime)
    };

    // Date Time picker state (End Time)
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

    const showEndTimePicker = () => setEndTimePickerVisibility(true);

    const hideEndTimePicker = () => setEndTimePickerVisibility(false);

    const handleConfirmEnd = (time) => {
        hideEndTimePicker();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let endTime = ''
        // setTime()
        if (hours < 10) {
            if (minutes < 10) {
                endTime = "0" + hours + ":0" + minutes + ":00"
            }
            else {
                endTime = "0" + hours + ":" + minutes + ":00"
            }
        } else {
            if (minutes < 10) {
                endTime = hours + ":0" + minutes + ":00"
            }
            else {
                endTime = hours + ":" + minutes + ":00"
            }
        }
        console.log(endTime)
        setEndTime(endTime)
    };

    // Save Changes
    const saveChanges = () => {
        // Call API
        axios.post(
            `http://${ipAdd}:${springPort}/services/${slot.slotTimeID}/editSlotTime`,
            {
                "date": date,
                "startTime": startTime,
                "endTime": endTime
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json"
                }
            }
        ).then(response => alert('Slot time edited successfully'))
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.section}>
                    <TouchableOpacity onPress={showStartTimePicker}>
                        <Text style={styles.btn}>Edit Start Time</Text>
                    </TouchableOpacity>
                    <Text style={styles.span}>{startTime}</Text>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity onPress={showEndTimePicker}>
                        <Text style={styles.btn}>Edit End Time</Text>
                    </TouchableOpacity>
                    <Text style={styles.span}>{endTime}</Text>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.btn}>Edit Date</Text>
                    </TouchableOpacity>
                    <Text style={styles.span}>{date}</Text>
                </View>
                <TouchableOpacity onPress={saveChanges}>
                    <Text style={styles.confirm}>Save Changes</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmStart}
                    onCancel={hideStartTimePicker}
                />
                <DateTimePicker
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmEnd}
                    onCancel={hideEndTimePicker}
                />
                <DatePicker
                    isVisible={showDatePicker}
                    mode={'single'}
                    minDate={d}
                    startDate={d}
                    onCancel={() => setShowDatePicker(false)}
                    onConfirm={onConfirm}
                    colorOptions={{
                        headerColor: 'rgb(200, 28, 48)',
                        weekDaysColor: 'rgb(200, 28, 48)',
                        selectedDateBackgroundColor: 'rgb(200, 28, 48)',
                        confirmButtonColor: 'rgb(200, 28, 48)',
                        changeYearModalColor: 'rgb(200, 28, 48)',
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#636e72',
        display: 'flex',
    },
    form: {
        backgroundColor: '#2d3436',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 40,
        borderRadius: 10,
    },
    section: {
        backgroundColor: '#b2bec3',
        marginVertical: 10,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
    },
    btn: {
        textAlign: 'center',
        marginRight: 10,
        fontSize: 18,
    },
    span: {
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 10,
    },
    confirm: {
        backgroundColor: '#ff7675',
        fontSize: 18,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})

export default EditSlot