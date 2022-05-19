import React from 'react'
import { Text, ScrollView, View, StyleSheet } from "react-native"
import { WebView } from 'react-native-webview'
import { ipAdd, port, springPort } from '../global functions and info/global'
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const ExpertSystemMap = ({ route }) => {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [garage, setGarage] = React.useState(null)

    let { inference } = route.params

    const navigation = useNavigation()

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, [])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {location == null ? <WebView
                onMessage={(event) => {
                    // console.log("EVENT-DATA:", event);
                    // console.log(event.nativeEvent.data);
                    axios.get(`http://${ipAdd}:${springPort}/garages/${event.nativeEvent.data}`).then(response => {
                        navigation.navigate('Garage Page', {
                            garage: response.data,
                        })
                    })
                }}
                nestedScrollEnabled
                originWhitelist={['*']}
                source={{ uri: `http://${ipAdd}:${port}/using-map-expert-system/${35.25648120531551}/${32.22952612635228}/${inference.problem}/${inference.carType}` }}
            /> : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
})

export default ExpertSystemMap;