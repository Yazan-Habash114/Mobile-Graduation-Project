import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  LogBox
} from 'react-native';
import MainStack from './routes/MainStack';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

LogBox.ignoreAllLogs(true)

export default function App() {
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
