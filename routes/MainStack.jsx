import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import LandingForm from '../screens/LandingForm';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={{ headerShown: false }} name="Login/Register" component={LandingForm} />
                    <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
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