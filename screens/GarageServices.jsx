import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from "react-native"
import Service from '../components/Service/Service'
import DatePicker from 'react-native-neat-date-picker'
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'

const GarageServices = ({ route }) => {
    const { garage } = route.params

    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [date, setDate] = React.useState(new Date().format('yyyy-MM-dd'))

    const [maintenance, setMaintenance] = React.useState([])
    const [electrical, setElectrical] = React.useState([])
    const [carWashing, setCarWashing] = React.useState([])

    let d = new Date()
    d.setDate(d.getDate() - 1)

    // Date picker
    const onConfirm = (date) => {
        setShowDatePicker(false)
        setDate(date.dateString)
    }

    // Flat List
    const sections = [
        {
            title: 'Maintenance'
        },
        {
            title: 'Electrical Services'
        },
        {
            title: 'Car Washing'
        }
    ]

    // Flat List
    const renderSections = ({ item }) => {
        return (
            <View style={styles.serviceType}>
                <Text style={styles.typeTitle}>{item.title}</Text>
                {item.title === 'Maintenance' ? <FlatList
                    nestedScrollEnabled={true}
                    data={maintenance}
                    renderItem={renderList}
                    keyExtractor={item => item.serviceID}
                /> : null}
                {item.title === 'Electrical Services' ? <FlatList
                    nestedScrollEnabled={true}
                    data={electrical}
                    renderItem={renderList}
                    keyExtractor={item => item.serviceID}
                /> : null}
                {item.title === 'Car Washing' ? <FlatList
                    nestedScrollEnabled={true}
                    data={carWashing}
                    renderItem={renderList}
                    keyExtractor={item => item.serviceID}
                /> : null}
            </View>
        )
    }

    // Flat List
    const renderList = ({ item }) => {
        return (
            <Service item={item} />
        );
    };

    React.useEffect(() => {
        axios.get(`http://${ipAdd}:${springPort}/garages/${garage.garageID}/services/Maintenance/byDate/${date}`)
            .then(response => {
                setMaintenance(response.data)
            })
        axios.get(`http://${ipAdd}:${springPort}/garages/${garage.garageID}/services/Electrical/byDate/${date}`)
            .then(response => {
                setElectrical(response.data)
            })
        axios.get(`http://${ipAdd}:${springPort}/garages/${garage.garageID}/services/Car%20Washing/byDate/${date}`)
            .then(response => {
                setCarWashing(response.data)
            })
    }, [date])

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.chooseDate}>Choose Date</Text>
                </TouchableOpacity>

                <Text style={styles.dateSpan}>All services on {date}</Text>

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

                <FlatList
                    nestedScrollEnabled={true}
                    data={sections}
                    renderItem={renderSections}
                    keyExtractor={item => item.title}
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
        color: 'white',
        fontWeight: 'bold'
    },
    chooseDate: {
        backgroundColor: 'rgb(200, 28, 48)',
        color: 'white',
        padding: 10,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    dateSpan: {
        marginHorizontal: 10,
        marginVertical: 10,
        color: 'white',
        fontSize: 18,
        fontStyle: 'italic',
    }
})

export default GarageServices