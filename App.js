import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Landing from './screens/Landing';

export default function App() {
  return (
    <View style={styles.container}>
      <Landing />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 30,
  },
});
