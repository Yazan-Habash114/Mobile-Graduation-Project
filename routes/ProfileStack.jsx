import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import EditProfile from '../components/Profile/edit-profile/EditProfile';
import Profile from '../screens/Profile';
import AllMyServices from '../screens/AllMyServices';
import AllCustomers from '../screens/MyCustomers';
import EditService from '../screens/EditService';
import AddService from '../screens/AddService';
import EditSlotTimes from '../screens/EditSlotTimes';
import EditSlot from '../screens/EditSlot';
import AddSlot from '../screens/AddSlot';
import BookedServices from '../screens/BookedServices';
import GaragePage from '../screens/GaragePage'
import ServiceDetails from '../screens/ServiceDetails';
import OrderedServicesByUsers from '../screens/OrderedServicesByUsers';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Edit your profile" component={EditProfile} />
                <Stack.Screen name="All My Services" component={AllMyServices} />
                <Stack.Screen name="All My Customers" component={AllCustomers} />
                <Stack.Screen name="Edit Service" component={EditService} />
                <Stack.Screen name="Scheduling The Service" component={EditSlotTimes} />
                <Stack.Screen name="Add New Service" component={AddService} />
                <Stack.Screen name="Edit Slot Time" component={EditSlot} />
                <Stack.Screen name="Add Slot Time" component={AddSlot} />
                <Stack.Screen name="Your Booked Services" component={BookedServices} />
                <Stack.Screen name="Garage Page" component={GaragePage} />
                <Stack.Screen name="Your booked service details" component={ServiceDetails} />
                <Stack.Screen name="Ordered/Booked Services" component={OrderedServicesByUsers} />
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