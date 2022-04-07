import React from 'react'
import { Text, View, StyleSheet, Button, ScrollView } from "react-native"
import DatePicker from 'react-native-neat-date-picker'
import Service from '../components/Service/Service'


const HomePage = () => {

    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [date, setDate] = React.useState(null)

    let d = new Date()
    d.setDate(d.getDate() - 1)

    const onConfirm = (date) => {
        setShowDatePicker(false)
        setDate(date.dateString)
    }

    return (
        <View style={styles.container}>
            {/* <Text>Home screen</Text> */}
            {/* <Button title={'open'} onPress={() => setShowDatePicker(true)} />
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                minDate={d}
                startDate={d}
                onCancel={() => setShowDatePicker(false)}
                onConfirm={onConfirm}
            />
            <Text>{date}</Text> */}
            <ScrollView contentContainerStyle={{ width: '100%' }}>
                <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Maintenance</Text>
                    <Service />
                    <Service />
                    <Service />
                </View>
                <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Electrical Services</Text>
                    <Service />
                    <Service />
                </View>
                <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Car Washing</Text>
                    <Service />
                    <Service />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#3f3f3f'
    },
    serviceType: {
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderTopWidth: 0,
        borderRadius: 15,
        marginVertical: 15,
        padding: 5,
    },
    typeTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    }
})

export default HomePage