import React from "react"
import { Text, ScrollView, StyleSheet, Image, View, TouchableOpacity } from "react-native"
import ProfileImage from "../components/Profile/profile-image/ProfileImage"
import { clearAsyncStorage } from "../global functions and info/global"
import { useNavigation } from "@react-navigation/native"
import ConfirmWindow from "../components/Profile/confirm-window/ConfirmWindow"

const Profile = () => {

    const navigation = useNavigation()

    const [showConfirmWindow, setShowWindow] = React.useState(false)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/images/slider-img-3.jpg')}
                style={styles.img}
            />
            <ProfileImage />
            <View style={styles.info}>
                <Text style={styles.infoItem}>Name</Text>
                <Text style={styles.infoItem}>Email</Text>
            </View>
            <View style={styles.bar}>
                <TouchableOpacity onPress={() => navigation.navigate('Edit your profile')}>
                    <Text style={styles.barElements}>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Your cart')}>
                    <Text style={styles.barElements}>Your Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Your ordered services')}>
                    <Text style={styles.barElements}>Ordered Services</Text>
                </TouchableOpacity>
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
        }]
    },
    infoItem: {
        color: '#fdcb6e',
        fontSize: 18,
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