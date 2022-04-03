import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Root from './screens/Root';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'; import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './screens/Landing';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
    //   <SafeAreaView style={styles.container}>
    //     <Root />
    //     <StatusBar style="auto" />
    //     <KeyboardSpacer />
    //   </SafeAreaView>
    // </TouchableWithoutFeedback>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Landing} />
      </Stack.Navigator>
    </NavigationContainer>
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
