import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Home from '../screens/HomePage';
import ProblemDiagnosis from '../screens/ProblemDiagnosis';
import GarageStack from './GarageStack';
import ServiceStack from './ServiceStack';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="Service Stack" component={ServiceStack} />
                <Stack.Screen options={{ headerShown: false }} name="Garage Stack" component={GarageStack} />
                <Stack.Screen name="Problem Diagnosis" component={ProblemDiagnosis} />
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

export default HomeStack;