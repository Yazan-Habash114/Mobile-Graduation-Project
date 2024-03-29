import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import NotificationDetails from '../screens/NotificationDetails';
import Notifications from '../screens/Notifications';
import GarageLocationMap from '../screens/GarageLocationMap';

const Stack = createNativeStackNavigator();

export default function NotificationStack({ route }) {

    const { setCounter } = route.params

    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="All Notifications" component={Notifications} initialParams={{ 'setCounter': setCounter }} />
                <Stack.Screen options={{ headerShown: true }} name="User Info" component={NotificationDetails} />
                <Stack.Screen options={{ headerShown: true }} name="Current Garage Location" component={GarageLocationMap} />
            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})