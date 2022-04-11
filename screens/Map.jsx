import React from 'react'
import { Text, ScrollView, View, StyleSheet } from "react-native"
import { WebView } from 'react-native-webview'
import { ipAdd, port } from '../global functions and info/global'
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';


const Map = () => {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [id, setId] = React.useState(null);

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
      {location != null ? <WebView
        onMessage={(event) => {
          console.log("EVENT-DATA:", event);
          setId(event.nativeEvent.data);
          console.log(id)
          navigation.navigate('Garage Page', {
            garageId: id,
          })
        }}
        nestedScrollEnabled
        originWhitelist={['*']}
        source={{ uri: `http://${ipAdd}:${port}/using-map/${location.coords.longitude}/${location.coords.latitude}` }}
      /> : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})

export default Map;