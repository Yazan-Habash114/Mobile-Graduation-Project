import React from 'react'
import { ScrollView, StyleSheet } from "react-native"
import { WebView } from 'react-native-webview'
import { ipAdd, port, springPort } from '../global functions and info/global'
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Map = () => {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [garage, setGarage] = React.useState(null);

  const [accountType, setAccountType] = React.useState(null);
  const [accountId, setAccountId] = React.useState(null);

  const navigation = useNavigation()

  React.useEffect(async () => {
    const id = await AsyncStorage.getItem('id')
    const type = await AsyncStorage.getItem('account')
    axios.get(`http://${ipAdd}:${springPort}/garages/${id}`).then(response => {
      setGarage(response.data)
    })
    setAccountId(id)
    setAccountType(type)
  }, [])

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
      {location && accountId && accountType ? (
        accountType === 'USER' ? (
          <WebView
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
            source={{ uri: `http://${ipAdd}:${port}/using-map/${location.coords.longitude}/${location.coords.latitude}` }}
          />
        ) : (
          <WebView
            nestedScrollEnabled
            originWhitelist={['*']}
            source={{ uri: `http://${ipAdd}:${port}/using-map-react-native-garage/${garage?.garageLocation.longitude}/${garage?.garageLocation.latitude}/${accountId}` }}
          />
        )
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})

export default Map;