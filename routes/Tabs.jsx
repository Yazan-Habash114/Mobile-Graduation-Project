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
import React from 'react';

export const SocketContext = React.createContext()

const Tab = createBottomTabNavigator();

export default function App() {

    const [socket, setSocket] = React.useState(null)
    const [myName, setMyName] = React.useState('')
    const [myId, setMyId] = React.useState('')

    React.useEffect(async () => {
        // Connect to socket
        const socketCopy = io.connect(`http://${ipAdd}:${socketPort}`);
        setSocket(socketCopy);

        const accountType = await AsyncStorage.getItem('account');
        const id = await AsyncStorage.getItem('id');

        if (accountType === 'GARAGE') {
            axios.get(`http://${ipAdd}:${springPort}/garages/${id}`).then(response => {
                let name = response.data.username
                setMyName(name)
                setMyId(id)
                socketCopy.emit("enter", id, name)
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
        <SocketContext.Provider value={{ socket: socket, myId: myId, myName: myName }}>
            <View style={styles.container}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Go Profile') {
                                iconName = focused ? 'person' : 'person';
                            } else if (route.name === 'Map') {
                                iconName = focused ? 'map' : 'map'
                            } else if (route.name === 'Go Home') {
                                iconName = focused ? 'home' : 'home'
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