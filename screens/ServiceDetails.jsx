import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native"
import { WebView } from 'react-native-webview'
import { ipAdd, apiKey, springPort, port } from "../global functions and info/global"
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Slider from '@react-native-community/slider';
import { SocketContext } from '../routes/Tabs'

const ServiceDetails = ({ route }) => {
    const { service } = route.params

    const [serviceID, setServiceID] = React.useState(null);
    const [canDeliver, setCanDeliver] = React.useState(null);
    const [slotTimes, setSlotTimes] = React.useState(null);

    const [garage, setGarage] = React.useState(null);
    const [garageId, setGarageId] = React.useState(null);
    const [garageLocation, setGarageLocation] = React.useState(null);

    const [choosedSlot, setChoosedSlot] = React.useState(null);
    const [reservedSlot, setReservedSlot] = React.useState(null);

    const [location, setLocation] = React.useState(null);
    const [myAccountId, setMyAccountId] = React.useState(null);

    const [rating, setRating] = React.useState(0)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ipAdd}:${springPort}/garages/${service.supportedGarageID}`).then(response => setGarage(response.data)).catch(error => console.log('error'))
            setServiceID(service.serviceID);
            setCanDeliver(service.canDeliver);
            setSlotTimes(service.slotTimes);
            setGarageId(service.supportedGarageID);
            setGarageLocation(service.supportedGarageLocation);
        })
        return unsubscribe
    }, [slotTimes, navigation]);

    const navigation = useNavigation()

    const { socket, myId, myName } = React.useContext(SocketContext)

    const changeSlotState = (slot) => {
        setChoosedSlot(slot)
    }

    const sliderHandler = (value) => {
        let floatValue = value.toFixed(1)
        axios.post(
            `http://${ipAdd}:${springPort}/services/rateService/${service.serviceID}`,
            floatValue,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json"
                }
            }
        )
        setRating(value)
    }

    const components = [{ title: "image" }, { title: "content" }]

    const renderComponents = ({ item }) => {
        if (item.title === 'image') {
            return (
                <Image
                    source={require('../assets/images/iDrive_New.jpg')}
                    style={styles.img}
                />
            )
        } else if (item.title === 'content') {
            return (
                <View style={styles.content}>
                    <Text style={styles.title}>{service.name}</Text>
                    <View style={styles.info}>
                        <View style={styles.row}>
                            {garage ? (
                                <View style={styles.row}>
                                    <Text style={styles.key}>Supporting Garage: </Text>
                                    <TouchableOpacity onPress={() => {
                                        setGarageLocation(null)
                                        navigation.navigate('Garage Page', {
                                            garage: garage,
                                        })
                                    }}>
                                        <Text style={styles.value}>{garage.garageName}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.key}>Name: </Text>
                            <Text style={styles.value}>{service.serviceName}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.key}>Price: </Text>
                            <Text style={styles.value}>${service.price}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.key}>Rating: </Text>

                            {
                                service.rateValue === 0.0 ? (
                                    <Text style={styles.value}>Not rated yet</Text>
                                ) : (
                                    <Text style={styles.value}>{service.rateValue.toFixed(1)}/5.0</Text>
                                )
                            }
                        </View>
                    </View>
                    <Text style={styles.description}>{service.serviceDescription}</Text>

                    <Text style={styles.headers}>
                        Choose a suitable time to book the service
                    </Text>

                    <View style={styles.timeSlots}>
                        <FlatList
                            nestedScrollEnabled={true}
                            data={slotTimes}
                            renderItem={renderList}
                            keyExtractor={item => item.slotTimeID}
                        />
                    </View>

                    <Text style={styles.choosenReserved}>
                        You have choosen: {choosedSlot ? (choosedSlot.startTime + " - " + choosedSlot.endTime) : "nothing"}
                    </Text>

                    <Text style={styles.choosenReserved}>
                        You have reserved: {reservedSlot ? (reservedSlot.startTime + " - " + reservedSlot.endTime) : "nothing"}
                    </Text>

                    {
                        reservedSlot ?
                            (
                                <TouchableOpacity
                                    onPress={() => {
                                        axios.get(`http://${ipAdd}:${springPort}/users/${myAccountId}/garages/${garageId}/services/unBookService/${serviceID}/slotTime/${reservedSlot.slotTimeID}`)
                                            .then(res => console.log(res.data))
                                        let copy = [...slotTimes]
                                        let slotObj = undefined
                                        copy.some((obj) => {
                                            if (obj.slotTimeID == reservedSlot.slotTimeID) {
                                                slotObj = obj
                                                obj.booked = false
                                                obj.bookedUserID = -1
                                                return true;    // breaks out of the loop
                                            }
                                        });
                                        setReservedSlot(null)
                                        setSlotTimes(copy)
                                        alert('You have cancelled booking the service successfully')
                                        socket.emit("notification-unbooking", {
                                            senderId: myId,
                                            senderName: myName,
                                            receiverId: garageId,
                                            slotObj: slotObj
                                        })
                                    }}
                                >
                                    <Text style={styles.confirmUnbooking}>Cancel Booking</Text>
                                </TouchableOpacity>
                            ) :
                            (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (choosedSlot != null) {
                                            axios.get(`http://${ipAdd}:${springPort}/users/${myAccountId}/garages/${garageId}/services/bookService/${serviceID}/slotTime/${choosedSlot.slotTimeID}`)
                                                .then(res => console.log(res.data))
                                            let copy = [...slotTimes]
                                            let slotObj = undefined
                                            copy.some((obj) => {
                                                if (obj.slotTimeID == choosedSlot.slotTimeID) {
                                                    slotObj = obj
                                                    obj.booked = true
                                                    obj.bookedUserID = myAccountId
                                                    return true;    // breaks out of the loop
                                                }
                                            });
                                            setReservedSlot(choosedSlot)
                                            setSlotTimes(copy)
                                            alert('You have booked the service successfully')
                                            socket.emit("notification-booking", {
                                                senderId: myId,
                                                senderName: myName,
                                                receiverId: garageId,
                                                slotObj: slotObj
                                            })
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
                                onPress={() => alert('The service has been ordered')}
                            >
                                <Text style={styles.orderText}>ORDER THIS SERVICE</Text>
                            </TouchableOpacity>
                        ) : null
                    }

                    <View style={styles.slider}>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            value={0}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#dfe6e9"
                            thumbTintColor="#d63031"
                            step={0.5}
                            onSlidingComplete={value => sliderHandler(value)}
                        />
                        <Text style={styles.ratingText}>Set Rating: {rating}</Text>
                    </View>

                    {/* {location && garageLocation ? <WebView
                        nestedScrollEnabled
                        style={styles.map}
                        originWhitelist={['*']}
                        source={{ uri: `http://${ipAdd}:${port}/using-map/${location.coords.longitude}/${location.coords.latitude}/${garageLocation.longitude}/${garageLocation.latitude}` }}
                    /> : null} */}
                </View>
            )
        }
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

    return (
        <View style={styles.container}>
            <FlatList
                nestedScrollEnabled={true}
                data={components}
                renderItem={renderComponents}
                keyExtractor={item => item.title}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d3436'
    },
    img: {
        width: '100%',
        height: 200,
    },
    content: {
        borderWidth: 4,
        borderColor: '#d63031',
        margin: 5,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'stretch',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#dfe6e9',
    },
    info: {
        marginVertical: 10,
        display: 'flex',
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    key: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
        color: '#d63031',
    },
    value: {
        fontSize: 16,
        marginLeft: 10,
        color: '#dfe6e9',
    },
    description: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 18,
        marginHorizontal: 10,
        color: '#dfe6e9',
    },
    headers: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 15,
        marginHorizontal: 10,
        color: '#d63031',
    },
    timeSlots: {
        padding: 10,
    },
    slot: {
        fontSize: 18,
        backgroundColor: '#b2bec3',
        marginVertical: 10,
        padding: 10,
        color: '#2d3436',
        borderRadius: 10,
        textAlign: 'center',
    },
    reservedSlot: {
        fontSize: 18,
        backgroundColor: '#d63031',
        marginVertical: 10,
        padding: 10,
        color: '#dfe6e9',
        borderRadius: 10,
        textAlign: 'center',
    },
    map: {
        backgroundColor: 'gray',
        borderRadius: 5,
        height: 400,
        marginHorizontal: 10,
        marginVertical: 15,
    },
    order: {
        backgroundColor: '#d63031',
        margin: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    orderText: {
        color: '#dfe6e9',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
    choosenReserved: {
        fontSize: 18,
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#d63031',
    },
    confirmBooking: {
        fontSize: 18,
        backgroundColor: '#d63031',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
    },
    confirmUnbooking: {
        fontSize: 18,
        backgroundColor: '#636e72',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
    },
    slider: {
        display: 'flex',
        alignItems: 'center',
    },
    ratingText: {
        color: 'white',
        fontSize: 18,
    },
})

export default ServiceDetails