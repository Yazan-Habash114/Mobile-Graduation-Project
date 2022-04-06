import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Cart from '../components/Profile/cart/Cart';
import EditProfile from '../components/Profile/edit-profile/EditProfile';
import OrderServices from '../components/Profile/order-services/OrderServices';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
                <Stack.Screen name="Edit your profile" component={EditProfile} />
                <Stack.Screen name="Your ordered services" component={OrderServices} />
                <Stack.Screen name="Your cart" component={Cart} />
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