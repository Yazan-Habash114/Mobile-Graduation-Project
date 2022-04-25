import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapStack from './MapStack';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person';
                        } else if (route.name === 'Map') {
                            iconName = focused ? 'map' : 'map'
                        } else if (route.name === 'Go Home') {
                            iconName = focused ? 'home' : 'home'
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#d63031',
                    tabBarInactiveTintColor: '#2d3436',
                })}
            >
                <Tab.Screen options={{ headerShown: false }} name="Go Home" component={HomeStack} />
                <Tab.Screen options={{ headerShown: false }} name="Profile" component={ProfileStack} />
                <Tab.Screen options={{ headerShown: false }} name="Map" component={MapStack} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})