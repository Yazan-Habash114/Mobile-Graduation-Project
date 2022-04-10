import React from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from "react-native"
import { WebView } from 'react-native-webview'
import { ipAdd, apiKey, springPort } from "../global functions and info/global"
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ServiceDetails = ({ route }) => {
    const { service } = route.params

    const [serviceID, setServiceID] = React.useState(null);
    const [canDeliver, setCanDeliver] = React.useState(null);
    const [slotTimes, setSlotTimes] = React.useState(null);
    const [garageId, setGarageId] = React.useState(null);
    const [garageLocation, setGarageLocation] = React.useState(null);

    const [choosedSlot, setChoosedSlot] = React.useState(null);
    const [reservedSlot, setReservedSlot] = React.useState(null);

    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [myAccountId, setMyAccountId] = React.useState(null);

    React.useEffect(() => {
        setServiceID(service.serviceID);
        setCanDeliver(service.canDeliver);
        setSlotTimes(service.slotTimes);
        setGarageId(service.supportedGarageID);
        setGarageLocation(service.supportedGarageLocation);
    }, [slotTimes]);

    const navigation = useNavigation()

    const changeSlotState = (slot) => {
        setChoosedSlot(slot)
    }

    const renderList = ({ item }) => {
        AsyncStorage.getItem('id').then(value => {
            setMyAccountId(parseInt(value))
        })

        if (item.booked && item.bookedUserID == myAccountId) {
            setReservedSlot(item)
        }

        if (item.booked) {
            if (myAccountId != item.bookedUserID) {
                return (
                    <TouchableOpacity disabled={true}>
                        <Text style={styles.reservedSlot}>
                            {item.startTime} - {item.endTime}, Reserved
                        </Text>
                    </TouchableOpacity>
                )
            }
        }
        return (
            <TouchableOpacity
                disabled={reservedSlot && reservedSlot.slotTimeID != item.slotTimeID}
                onPress={() => changeSlotState(item)}
            >
                <Text style={styles.slot}>
                    {item.startTime} - {item.endTime}
                </Text>
            </TouchableOpacity>
        );
    };

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            // console.log(location.coords.longitude)
            // console.log(location.coords.latitude)
            // console.log('GarageLocation: ' + garageLocation.longitude)
            // console.log('GarageLocation: ' + garageLocation.latitude)
        })();
    }, [])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ width: '100%' }}>
                <Image
                    source={require('../assets/images/iDrive_New.jpg')}
                    style={styles.img}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>{service.name}</Text>
                    <View style={styles.info}>
                        <View style={styles.keys}>
                            <Text style={styles.key}>Supporting Garage: </Text>
                            <Text style={styles.key}>Price: </Text>
                        </View>
                        <View style={styles.values}>
                            <TouchableOpacity onPress={() => navigation.navigate('Garage', {
                                garageId: garageId,
                            })}>
                                <Text style={styles.value}>{service.supportedGarageName}</Text>
                            </TouchableOpacity>
                            <Text style={styles.value}>${service.price}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{service.serviceDescription}</Text>

                    <Text style={styles.headers}>
                        Choose a suitable date to book the service
                    </Text>

                    <View style={styles.timeSlots}>
                        <FlatList
                            nestedScrollEnabled={true}
                            data={slotTimes}
                            renderItem={renderList}
                            keyExtractor={item => item.slotTimeID}
                        />
                    </View>

                    <Text style={styles.headers}>
                        You have reserved: {reservedSlot ? (reservedSlot.startTime + " - " + reservedSlot.endTime) : "nothing"}
                    </Text>

                    <Text style={styles.headers}>
                        You have choosed: {choosedSlot ? (choosedSlot.startTime + " - " + choosedSlot.endTime) : "nothing"}
                    </Text>

                    {
                        reservedSlot ?
                            (
                                <TouchableOpacity
                                    onPress={() => {
                                        axios.get(`http://${ipAdd}:${springPort}/users/${myAccountId}/garages/${garageId}/services/unBookService/${serviceID}/slotTime/${reservedSlot.slotTimeID}`)
                                            .then(res => console.log(res.data))
                                        let copy = [...slotTimes]
                                        copy.some((obj) => {
                                            if (obj.slotTimeID == reservedSlot.slotTimeID) {
                                                obj.booked = false
                                                obj.bookedUserID = -1
                                                return true;    // breaks out of the loop
                                            }
                                        });
                                        setReservedSlot(null)
                                        setSlotTimes(copy)
                                    }}
                                >
                                    <Text style={styles.confirmBooking}>Confirm Unbooking</Text>
                                </TouchableOpacity>
                            ) :
                            (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (choosedSlot != null) {
                                            axios.get(`http://${ipAdd}:${springPort}/users/${myAccountId}/garages/${garageId}/services/bookService/${serviceID}/slotTime/${choosedSlot.slotTimeID}`)
                                                .then(res => console.log(res.data))
                                            let copy = [...slotTimes]
                                            copy.some((obj) => {
                                                if (obj.slotTimeID == choosedSlot.slotTimeID) {
                                                    obj.booked = true
                                                    obj.bookedUserID = myAccountId
                                                    return true;    // breaks out of the loop
                                                }
                                            });
                                            setReservedSlot(choosedSlot)
                                            setSlotTimes(copy)
                                        } else {
                                            alert("You should choose a time to confirm booking")
                                        }
                                    }}
                                >
                                    <Text style={styles.confirmBooking}>Confirm Booking</Text>
                                </TouchableOpacity>
                            )
                    }

                    {
                        canDeliver ? (
                            <Text style={styles.headers}>
                                Or, order the service according to your location
                            </Text>
                        ) : null
                    }

                    {
                        canDeliver ? (
                            <TouchableOpacity
                                style={styles.order}
                                onPress={() => alert('The service has been booked')}
                            >
                                <Text style={styles.orderText}>ORDER THIS SERVICE</Text>
                            </TouchableOpacity>
                        ) : null
                    }

                    {/* {location != null ? <WebView
                        nestedScrollEnabled
                        style={styles.map}
                        originWhitelist={['*']}
                        source={{ uri: `http://${ipAdd}:${port}/using-map/${location.coords.longitude}/${location.coords.latitude}/${garageLocation.longitude}/${garageLocation.latitude}` }}
                    /> : null} */}
                </View>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: '100%',
        height: 200,
    },
    content: {
        borderWidth: 2,
        borderColor: 'orange',
        display: 'flex',
        alignItems: 'stretch',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    info: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    keys: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    values: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    key: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 30,
    },
    value: {
        fontSize: 16,
        marginLeft: 30,
    },
    description: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 18,
        marginHorizontal: 10,
    },
    headers: {
        fontSize: 16,
        marginTop: 15,
        marginHorizontal: 10,
    },
    timeSlots: {
        marginBottom: 10,
        padding: 10,
    },
    slot: {
        fontSize: 18,
        backgroundColor: 'rgb(200, 38, 58)',
        marginVertical: 10,
        padding: 10,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
    },
    reservedSlot: {
        fontSize: 18,
        backgroundColor: 'black',
        marginVertical: 10,
        padding: 10,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
    },
    map: {
        backgroundColor: 'gray',
        borderRadius: 5,
        height: 400,
        marginHorizontal: 10,
    },
    order: {
        backgroundColor: 'black',
        margin: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    orderText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
    confirmBooking: {
        fontSize: 18,
        backgroundColor: '#333',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
    }
})

export default ServiceDetails