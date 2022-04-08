import React from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, SafeAreaView } from "react-native"
import Service from '../components/Service/Service'
import { services } from './services'

const AllServices = () => {

    const sections = [
        {
            title: 'Maintenance'
        },
        {
            title: 'Electrical Services'
        },
        {
            title: 'Car Washing'
        }
    ]

    const renderSections = ({ item }) => {
        return (
            <View style={styles.serviceType}>
                <Text style={styles.typeTitle}>{item.title}</Text>
                <FlatList
                    nestedScrollEnabled={true}
                    data={services}
                    renderItem={renderList}
                    keyExtractor={item => item.serviceId}
                />
            </View>
        )
    }

    const renderList = ({ item }) => {
        return (
            <Service item={item} />
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={sections}
                    renderItem={renderSections}
                    keyExtractor={item => item.title}
                />
                {/* <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Maintenance</Text>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={services}
                        renderItem={renderList}
                        keyExtractor={item => item.serviceId}
                    />
                </View>
                <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Electrical Services</Text>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={services}
                        renderItem={renderList}
                        keyExtractor={item => item.serviceId}
                    />
                </View>
                <View style={styles.serviceType}>
                    <Text style={styles.typeTitle}>Car Washing</Text>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={services}
                        renderItem={renderList}
                        keyExtractor={item => item.serviceId}
                    />
                </View> */}
            </SafeAreaView>
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