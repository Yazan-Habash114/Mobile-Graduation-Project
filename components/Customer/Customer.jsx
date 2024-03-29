import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { ipAdd, springPort } from '../../global functions and info/global'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Customer = ({ item }) => {
    // Image local counter
    const [localCounter, setLocalCounter] = React.useState(-1000)
    const [showHidden, setShowHidden] = React.useState(false)
    const [customerId, setCustomerId] = React.useState(item.id)

    React.useEffect(() => {
        AsyncStorage.getItem('counter').then(value => {
            let temp = parseInt(value)
            setLocalCounter(temp)
        })
    }, []);

    // Flat List
    const renderServices = ({ item }) => {
        let index = -1
        for (let i = 0; i < item.slotTimes?.length; i += 1) {
            if (item.slotTimes[i].bookedUserID == customerId) {
                index = i
            }
        }

        return (
            <View>
                <View style={styles.service}>
                    <Text style={styles.infoHidden}>
                        Service Name: {item.serviceName}
                    </Text>
                    <Text style={styles.infoHidden}>
                        Service Type: {item.serviceType}
                    </Text>
                    {
                        index > -1 ? (
                            <Text style={styles.infoHidden}>
                                Date: {item.slotTimes[index].date}
                            </Text>
                        ) : null
                    }
                    {
                        index > -1 ? (
                            <Text style={styles.infoHidden}>
                                Start Time: {item.slotTimes[index].startTime}
                            </Text>
                        ) : null
                    }
                    {
                        index > -1 ? (
                            <Text style={styles.infoHidden}>
                                End Time: {item?.slotTimes[index].endTime}
                            </Text>
                        ) : null
                    }
                </View>
            </View>
        )
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => setShowHidden(!showHidden)}
        >
            <View style={styles.shown}>
                <Image
                    style={styles.img}
                    source={{ uri: `http://${ipAdd}:${springPort}/users/${item.id}/profileImage/${localCounter}` }}
                />
                <View>
                    <Text style={styles.name}>{item.username}</Text>
                    <Text style={styles.info}>{item.email}</Text>
                    <Text style={styles.info}>{item.phone_number}</Text>
                </View>
            </View>

            {showHidden ? (
                <FlatList
                    nestedScrollEnabled={true}
                    data={item.services}
                    renderItem={renderServices}
                    keyExtractor={item => item.serviceID}
                />
            ) : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d3436',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 15,
    },
    shown: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    service: {
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#ffeaa7',
        paddingHorizontal: 5,
        borderBottomEndRadius: 10,
        borderTopLeftRadius: 10,
    },
    infoHidden: {
        color: '#fdcb6e',
        fontSize: 18,
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 60,
        marginRight: 25,
    },
    name: {
        color: '#d63031',
        fontSize: 24,
        fontWeight: 'bold',
    },
    info: {
        color: '#dfe6e9',
        fontSize: 16,
    },
})

export default Customer