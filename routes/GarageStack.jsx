import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import GaragePage from '../screens/GaragePage';
import AllGarages from '../screens/AllGarages';

const Stack = createNativeStackNavigator();

const ServiceStack = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name="All Garages" component={AllGarages} />
                <Stack.Screen name="Garage Page" component={GaragePage} />
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