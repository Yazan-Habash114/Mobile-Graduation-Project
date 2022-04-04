import LandingForm from '../screens/LandingForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import TestScreen from '../screens/TestScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer style={styles.container}>
                <Stack.Navigator>
                    <Stack.Screen name="Login/Register" component={LandingForm} />
                    <Stack.Screen name="Test Screen" component={TestScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})