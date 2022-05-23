import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomePage = () => {

    const navigation = useNavigation()

    const [accountType, setAccountType] = useState('')

    useEffect(async () => setAccountType(await AsyncStorage.getItem('account')), [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image
                    source={require('../assets/images/iDrive_New.jpg')}
                    style={styles.image}
                />
                <Text style={styles.mainTitle}>
                    Stay in touch with iDrive, make your driving easier
                </Text>
                <View style={styles.content}>
                    {
                        accountType !== 'GARAGE' ? (
                            <View style={styles.slide}>
                                <Image
                                    source={require('../assets/images/working.jpg')}
                                    style={styles.slideImage}
                                />
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Problem Diagnosis')}
                                >
                                    <Text style={styles.buttonStyle}>Check Your Problem</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }
                    <View style={styles.slide}>
                        <Image
                            source={require('../assets/images/setting.jpg')}
                            style={styles.slideImage}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Service Stack')}>
                            <Text style={styles.buttonStyle}>Show All Services</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={require('../assets/images/slider-img-2.jpg')}
                            style={styles.slideImage}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Garage Stack')}>
                            <Text style={styles.buttonStyle}>Show All Garages</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#dfe6e9',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    mainTitle: {
        color: '#2d3436',
        fontSize: 20,
        marginHorizontal: 10,
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#b2bec3',
        borderRadius: 5,
    },
    content: {
        display: 'flex',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    slide: {
        backgroundColor: '#b2bec3',
        marginVertical: 2,
        padding: 10,
        borderRadius: 5,
    },
    slideImage: {
        width: '100%',
        height: 170,
    },
    buttonStyle: {
        backgroundColor: '#d63031',
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
})

export default HomePage