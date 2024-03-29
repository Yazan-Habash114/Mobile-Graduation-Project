import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { ipAdd, port, springPort } from '../global functions and info/global'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GaragePage = ({ route }) => {
    const { garage } = route.params

    const navigation = useNavigation()

    // Image local counter
    const [localCounter, setLocalCounter] = React.useState(-1000)

    React.useEffect(() => {
        AsyncStorage.getItem('counter').then(value => {
            let temp = parseInt(value)
            setLocalCounter(temp)
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image
                    style={styles.img}
                    source={{ uri: `http://${ipAdd}:${springPort}/garages/${garage.garageID}/profileImage/${localCounter}` }}
                />
                <Text style={styles.garageName}>{garage.garageName}</Text>

                <View style={styles.info}>
                    <View style={styles.tuple}>
                        <Text style={styles.rowKey}>Email:</Text>
                        <Text style={styles.rowValue}>{garage.garageEmail}</Text>
                    </View>
                    <View style={styles.tuple}>
                        <Text style={styles.rowKey}>Phone:</Text>
                        <Text style={styles.rowValue}>{garage.garagePhoneNumber}</Text>
                    </View>
                    <View style={styles.tuple}>
                        <Text style={styles.rowKey}>Start Time:</Text>
                        <Text style={styles.rowValue}>{garage.garageStartTime}</Text>
                    </View>
                    <View style={styles.tuple}>
                        <Text style={styles.rowKey}>End Time:</Text>
                        <Text style={styles.rowValue}>{garage.garageEndTime}</Text>
                    </View>
                    <View style={styles.tuple}>
                        <Text style={styles.rowKey}>Car Type:</Text>
                        <Text style={styles.rowValue}>{garage.carType}</Text>
                    </View>
                    <View style={styles.tuple}>
                        <Text style={styles.rowKey}>Status:</Text>
                        {
                            garage.availability ?
                                <Text style={styles.rowValueOpen}>Open</Text> :
                                <Text style={styles.rowValueClosed}>Closed</Text>
                        }
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Garage Services', {
                    garage: garage
                })}>
                    <Text style={styles.services}>{garage.garageName} services</Text>
                </TouchableOpacity>

                {garage ? (
                    <WebView
                        style={styles.map}
                        nestedScrollEnabled
                        originWhitelist={['*']}
                        source={{ uri: `http://${ipAdd}:${port}/contactMap/${garage.garageLocation.longitude}/${garage.garageLocation.latitude}` }}
                    />
                ) : null}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#636e72',
    },
    img: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    garageName: {
        fontSize: 36,
        color: '#d63031',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    info: {
        borderWidth: 2,
        padding: 10,
        borderColor: '#d63031',
        borderBottomLeftRadius: 15,
        borderTopEndRadius: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        display: 'flex',
    },
    tuple: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    rowKey: {
        color: '#ecf0f1',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
    rowValue: {
        color: '#ecf0f1',
        fontSize: 20,
    },
    rowValueClosed: {
        fontSize: 18,
        color: '#d63031',
    },
    rowValueOpen: {
        fontSize: 18,
        color: '#2ecc71',
    },
    services: {
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: '#d63031',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        color: '#ecf0f1',
    },
    map: {
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        height: 200,
    }
})

export default GaragePage