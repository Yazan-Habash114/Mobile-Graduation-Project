import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import GaragePage from '../screens/GaragePage';
import GarageServices from '../screens/GarageServices';
import ServiceDetails from '../screens/ServiceDetails';
import EditService from '../screens/EditService';
import AddService from '../screens/AddService';
import Map from '../screens/Map';

const Stack = createNativeStackNavigator();

const MapStack = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="iDrive Map" component={Map} />
                <Stack.Screen name="Garage Page" component={GaragePage} />
                <Stack.Screen name="Garage Services" component={GarageServices} />
                <Stack.Screen name="Service Details" component={ServiceDetails} />
                <Stack.Screen name="Edit Service" component={EditService} />
                <Stack.Screen name="Add New Service" component={AddService} />
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

export default MapStack;