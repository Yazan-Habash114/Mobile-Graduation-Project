import React from "react"
import { Text, ScrollView, StyleSheet, Image, View, TouchableOpacity } from "react-native"
import ProfileImage from "../components/Profile/profile-image/ProfileImage"
import { clearAsyncStorage, ipAdd, springPort } from "../global functions and info/global"
import { useNavigation } from "@react-navigation/native"
import ConfirmWindow from "../components/Profile/confirm-window/ConfirmWindow"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const Profile = () => {

    const [accountType, setAccountType] = React.useState('');
    const [accountObj, setAccountObj] = React.useState(null);
    const [accountId, setAccountId] = React.useState(null);

    React.useEffect(() => {
        AsyncStorage.getItem('account').then(value => {
            if (value === 'GARAGE') {
                AsyncStorage.getItem('id').then(value => {
                    axios.get(`http://${ipAdd}:${springPort}/garages/${parseInt(value)}`).then(response => {
                        setAccountType('GARAGE');
                        setAccountObj(response.data);
                        setAccountId(response.data.garageID);
                    })
                })
            } else if (value === 'USER') {
                AsyncStorage.getItem('id').then(value => {
                    axios.get(`http://${ipAdd}:${springPort}/users/${parseInt(value)}`).then(response => {
                        setAccountType('USER');
                        setAccountObj(response.data);
                        setAccountId(response.data.id);
                    })
                })
            }
        })
    }, []);

    const navigation = useNavigation()

    const [showConfirmWindow, setShowWindow] = React.useState(false)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/images/slider-img-3.jpg')}
                style={styles.img}
            />
            <ProfileImage
                accountObj={accountObj}
                accountType={accountType}
                accountId={accountId}
            />
            <View style={styles.info}>
                <Text style={styles.infoItem}>
                    {
                        accountObj ?
                            (accountType === 'GARAGE' ?
                                accountObj.garageName :
                                accountObj.username) : null
                    }
                </Text>
                <Text style={styles.infoItem}>
                    {
                        accountObj != null ?
                            (
                                accountType === 'GARAGE' ?
                                    accountObj.garageEmail :
                                    accountObj.email
                            ) : null
                    }
                </Text>
            </View>
            <View style={styles.bar}>
                <TouchableOpacity onPress={() => navigation.navigate('Edit your profile')}>
                    <Text style={styles.barElements}>Edit profile</Text>
                </TouchableOpacity>

                {
                    accountType === "GARAGE" ? (
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('All My Services', accountObj)}>
                            <Text style={styles.barElements}>All My Services</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('Your cart')}>
                            <Text style={styles.barElements}>Your Cart</Text>
                        </TouchableOpacity>
                    )
                }

                {
                    accountType === "GARAGE" ? (
                        <TouchableOpacity onPress={() => navigation.navigate('All My Customers', accountId)}>
                            <Text style={styles.barElements}>My Customers</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('Your ordered services')}>
                            <Text style={styles.barElements}>Ordered Services</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={styles.bar}>
                <TouchableOpacity onPress={() => setShowWindow(true)}>
                    <Text style={styles.barElements}>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    clearAsyncStorage()
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login/Register' }]
                    })
                    // navigation.navigate('Login/Register')
                }}>
                    <Text style={styles.barElements}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            {showConfirmWindow ? <ConfirmWindow setShowWindow={setShowWindow} /> : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#636e72',
    },
    img: {
        width: '100%',
        height: 220,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        transform: [{
            translateY: -80
        }],
    },
    infoItem: {
        color: '#fdcb6e',
        fontSize: 18,
        textAlign: 'center',
    },
    bar: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '95%',
        marginVertical: 10,
        transform: [{
            translateY: -80
        }]
    },
    barElements: {
        fontSize: 18,
        color: '#dfe6e9',
        backgroundColor: '#d63031',
        padding: 5,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 20,
        textAlign: 'center',
    }
})

export default Profile