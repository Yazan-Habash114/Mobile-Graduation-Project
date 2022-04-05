import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import MainStack from './routes/MainStack';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  AsyncStorage.setItem('loggedIn', 'true')

  return (
    <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
      <SafeAreaView style={styles.container}>
        <MainStack />
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginTop: 30,
  },
});
