import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import AllServices from '../screens/AllServices';
import ServiceDetails from '../screens/ServiceDetails';

const Stack = createNativeStackNavigator();

const ServiceStack = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="All Services" component={AllServices} />
                <Stack.Screen options={{ headerShown: false }} name="Service Details" component={ServiceDetails} />
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

export default ServiceStack;