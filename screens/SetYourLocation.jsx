import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { WebView } from 'react-native-webview';
import { ipAdd, port, springPort } from '../global functions and info/global';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketContext } from '../routes/Tabs';

const SetYourLocation = ({ route }) => {

    const { text } = route.params

    const { socket, myId } = useContext(SocketContext)

    const [location, setLocation] = useState()
    const [userLocation, setUserLocation] = useState([])
    const [garage, setGarage] = useState(null)

    useEffect(() => {
        axios.get(`http://${ipAdd}:${springPort}/users/${parseInt(JSON.parse(text).senderId)}/location`).then(resp => {
            setUserLocation(resp.data)
        })
    }, [])

    useEffect(() => {
        axios.get(`http://${ipAdd}:${springPort}/garages/${myId}`).then(resp => setGarage(resp.data))
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    if (!location) {
                        alert('Set your location')
                    } else {
                        alert("User has been notified with your current location")
                        const notification = {
                            type: 'notification-tracking',
                            senderId: myId,
                            senderName: garage.garageName,
                            receiverId: parseInt(JSON.parse(text).senderId),
                            receiverName: JSON.parse(text).senderName,
                            message: `${garage.garageName} has reached new location. Click here to track on map`,
                            otherData: {
                                serviceId: null,
                                slotId: null,
                                locations: {
                                    driverLocation: { lng: userLocation[0], lat: userLocation[1] },
                                    agentLocation: { lng: location.lng, lat: location.lat },
                                }
                            }
                        }
                        socket.emit("notification-tracking", notification)
                        axios.post(
                            `http://${ipAdd}:${springPort}/sendNotificationToUser/${parseInt(JSON.parse(text).senderId)}/fromGarage/${myId}`,
                            JSON.stringify(notification),
                            {
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8",
                                    "Accept": "application/json"
                                }
                            }
                        ).then(response => console.log('Notification inserted to DB'))
                    }
                }}
                style={styles.buttonBackground}
            >
                <Text style={styles.buttonText}>Notify User</Text>
            </TouchableOpacity>

            {
                location ? <Text style={styles.span}>
                    Your Current Location: ({location.lng.toFixed(2)}, {location.lat.toFixed(2)})
                </Text>
                    : null
            }

            {
                userLocation && garage ? (
                    <WebView
                        onMessage={event => {
                            let locationString = event.nativeEvent.data
                            setLocation({
                                lng: parseFloat(locationString.split(',')[0]),
                                lat: parseFloat(locationString.split(',')[1]),
                            })
                        }}
                        style={styles.map}
                        nestedScrollEnabled
                        originWhitelist={['*']}
                        source={{ uri: `http://${ipAdd}:${port}/using-map/${userLocation[0]}/${userLocation[1]}/${garage.garageLocation.longitude}/${garage.garageLocation.latitude}` }}
                    />
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#636e72',
    },
    span: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    map: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    buttonBackground: {
        backgroundColor: '#d63031',
        margin: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default SetYourLocation;