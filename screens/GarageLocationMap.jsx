import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import React from 'react';
import { ipAdd, port } from '../global functions and info/global';

const GarageLocationMap = ({ route }) => {

    const { notificationItem } = route.params

    const userLng = JSON.parse(notificationItem.notificationText).otherData.locations.driverLocation.lng
    const userLat = JSON.parse(notificationItem.notificationText).otherData.locations.driverLocation.lat
    const agentLng = JSON.parse(notificationItem.notificationText).otherData.locations.agentLocation.lng
    const agentLat = JSON.parse(notificationItem.notificationText).otherData.locations.agentLocation.lat

    console.log(JSON.parse(notificationItem.notificationText).otherData.locations)
    console.log(agentLng)
    return (
        <View style={styles.container}>
            <WebView
                style={styles.map}
                nestedScrollEnabled
                originWhitelist={['*']}
                source={{ uri: `http://${ipAdd}:${port}/using-map/${userLng}/${userLat}/${agentLng}/${agentLat}` }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#636e72',
    },
    map: {
        marginHorizontal: 10,
    }
})

export default GarageLocationMap;