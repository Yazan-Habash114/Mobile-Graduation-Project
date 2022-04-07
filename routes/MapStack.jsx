import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import GaragePage from '../screens/GaragePage';
import Map from '../screens/Map';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="iDrive Map" component={Map} />
                <Stack.Screen name="Garage" component={GaragePage} />
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

export default ProfileStack;