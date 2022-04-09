import React from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from "react-native"
import { WebView } from 'react-native-webview'
import { ipAdd, port, apiKey } from "../global functions and info/global"
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const ServiceDetails = ({ route }) => {
    const { service } = route.params

    const [canDeliver, setCanDeliver] = React.useState(service.canDeliver)
    const [slotTimes, setSlotTimes] = React.useState(service.slotTimes)
    const [garageId, setGarageId] = React.useState(service.supportedGarageID)
    const [garageLocation, setGarageLocation] = React.useState(service.supportedGarageLocation)

    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    const navigation = useNavigation()

    const renderList = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => alert(item.slotTimeID)}>
                <Text style={styles.slot}>{item.startTime} - {item.endTime}</Text>
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
            console.log(location.coords.longitude)
            console.log(location.coords.latitude)
            console.log('GarageLocation: ' + garageLocation.longitude)
            console.log('GarageLocation: ' + garageLocation.latitude)
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

                    {location != null ? <WebView
                        nestedScrollEnabled
                        style={styles.map}
                        originWhitelist={['*']}
                        source={{ uri: `http://${ipAdd}:${port}/using-map/${location.coords.longitude}/${location.coords.latitude}/${garageLocation.longitude}/${garageLocation.latitude}` }}
                    /> : null}
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
    }
})

export default ServiceDetails