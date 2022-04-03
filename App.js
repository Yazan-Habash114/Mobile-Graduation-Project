import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Landing from './screens/Landing';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
      <SafeAreaView style={styles.container}>
        <Landing />
        <StatusBar style="auto" />
        <KeyboardSpacer />
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
