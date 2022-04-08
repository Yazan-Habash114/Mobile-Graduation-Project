import React from 'react'
import { Text, View, StyleSheet, ScrollView } from "react-native"
import Service from '../components/Service/Service'
import { useNavigation } from '@react-navigation/native'

const AllServices = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ width: '100%' }}>
                <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Maintenance</Text>
                    <Service onPress={() => alert('fff')} />
                    <Service />
                    <Service />
                </View>
                <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Electrical Services</Text>
                    <Service />
                    <Service />
                </View>
                <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Car Washing</Text>
                    <Service />
                    <Service />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#3f3f3f'
    },
    serviceType: {
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderTopWidth: 0,
        borderRadius: 15,
        marginVertical: 15,
        padding: 5,
    },
    typeTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    }
})

export default AllServices