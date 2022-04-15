import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Cart from '../components/Profile/cart/Cart';
import EditProfile from '../components/Profile/edit-profile/EditProfile';
import OrderServices from '../components/Profile/order-services/OrderServices';
import Profile from '../screens/Profile';
import AllMyServices from '../screens/AllMyServices';
import AllCustomers from '../screens/MyCustomers';
import EditService from '../screens/EditService';
import SlotTime from '../components/SlotTime/SlotTime';
import AddService from '../screens/AddService';
import EditSlotTimes from '../screens/EditSlotTimes';
import EditSlot from '../screens/EditSlot';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Edit your profile" component={EditProfile} />
                <Stack.Screen name="Your ordered services" component={OrderServices} />
                <Stack.Screen name="Your cart" component={Cart} />
                <Stack.Screen name="All My Services" component={AllMyServices} />
                <Stack.Screen name="All My Customers" component={AllCustomers} />
                <Stack.Screen name="Edit Service" component={EditService} />
                <Stack.Screen name="Scheduling The Service" component={EditSlotTimes} />
                <Stack.Screen name="Add New Service" component={AddService} />
                <Stack.Screen name="Edit Slot Time" component={EditSlot} />
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