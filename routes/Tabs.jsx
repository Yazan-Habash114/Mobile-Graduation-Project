import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapStack from './MapStack';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdd, socketPort, springPort } from '../global functions and info/global';
import { io } from "socket.io-client";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import NotificationStack from './NotificationStack';

export const SocketContext = React.createContext()

const Tab = createBottomTabNavigator();

export default function Tabs({ route }) {

    const navigation = useNavigation()

    // Notifications from DB
    const [counter, setCounter] = useState(0)
    const [msg, setMsg] = useState([])

    const [socket, setSocket] = useState(null)
    const [myName, setMyName] = useState('')
    const [myId, setMyId] = useState('')

    // Listening to socket
    useEffect(() => {
        // Booking
        socket?.on("booking", message => {
            setCounter(prev => prev + 1)
            setMsg(prev => [...prev, message])
        })

        // Unbooking
        socket?.on("unbooking", message => {
            setCounter(prev => prev + 1)
            setMsg(prev => [...prev, message])
        })

        // Ordering
        socket?.on("ordering", message => {
            setCounter(prev => prev + 1)
            setMsg(prev => [...prev, message])
        })

        // New Garage
        socket?.on("new-garage", message => {
            setCounter(prev => prev + 1)
            setMsg(prev => [...prev, message])
        })
    }, [socket])

    // Get notifications from DB
    useEffect(async () => {
        let accountType = await AsyncStorage.getItem('account');
        const id = await AsyncStorage.getItem('id');

        accountType = accountType === 'USER' ? 'user' : 'garage';
        axios.get(`http://${ipAdd}:${springPort}/${accountType}/${id}/notifications`)
            .then(response => {
                let copy = []
                for (let i = 0; i < response.data.length; i += 1) {
                    copy.push(response.data[i])
                }
                setMsg(copy)
                setCounter(response.data.length)
            })

        if (accountType === 'user') {
            axios.get(`http://${ipAdd}:${springPort}/user/${id}/notifications`).then(
                response => {
                    let copy = []
                    for (let i = 0; i < response.data.length; i += 1) {
                        copy.push(response.data[i])
                    }
                    setMsg(copy)
                    setCounter(response.data.length)
                }
            )
        }
    }, [])

    // Initilaizing
    useEffect(async () => {
        // Connect to socket
        const socketCopy = io.connect(`http://${ipAdd}:${socketPort}`);
        setSocket(socketCopy);

        let accountType = await AsyncStorage.getItem('account');
        const id = await AsyncStorage.getItem('id');

        if (accountType === 'GARAGE') {
            axios.get(`http://${ipAdd}:${springPort}/garages/${id}`).then(response => {
                let name = response.data.garageName
                setMyName(name)
                setMyId(id)
                socketCopy.emit("enter", id, name)
                if (route.params) {
                    const garageRegister = route.params.garageRegister
                    if (garageRegister) {
                        socketCopy.emit("garage-register", { garageName: name })
                        axios.post(
                            `http://${ipAdd}:${springPort}/sendNotificationForAllUsers/fromGarage/${id}`,
                            `New garage "${name}" has joined the app!`,
                            {
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8",
                                    "Accept": "application/json"
                                }
                            }
                        )
                    }
                }
            })
        } else if (accountType === 'USER') {
            axios.get(`http://${ipAdd}:${springPort}/users/${id}`).then(response => {
                let name = response.data.username
                setMyName(name)
                setMyId(id)
                socketCopy.emit("enter", id, name)
            })
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket: socket, myId: myId, myName: myName, msg: msg }}>
            <View style={styles.container}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Go Profile') {
                                iconName = focused ? 'person' : 'person'
                            } else if (route.name === 'Map') {
                                iconName = focused ? 'map' : 'map'
                            } else if (route.name === 'Go Home') {
                                iconName = focused ? 'home' : 'home'
                            } else if (route.name === 'Notifications') {
                                iconName = focused ? 'notifications' : 'notifications'
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#d63031',
                        tabBarInactiveTintColor: '#2d3436',
                    })}
                >
                    <Tab.Screen options={{ headerShown: false }} name="Go Home" component={HomeStack} />
                    <Tab.Screen options={{ headerShown: false }} name="Go Profile" component={ProfileStack} />
                    <Tab.Screen options={{ headerShown: false, tabBarBadge: counter === 0 ? null : counter }} name="Notifications" component={NotificationStack} initialParams={{ 'setCounter': setCounter }} />
                    <Tab.Screen options={{ headerShown: false }} name="Map" component={MapStack} />
                </Tab.Navigator>
            </View>
        </SocketContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})