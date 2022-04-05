import React from "react"
import { Text, ScrollView, StyleSheet, Image, View, Button } from "react-native"
import ProfileImage from "../components/Profile/profile-image/ProfileImage"
import { clearAsyncStorage } from "../global functions and info/global"
import { useNavigation } from "@react-navigation/native"

const Profile = () => {

    const navigation = useNavigation()

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/images/slider-img-3.jpg')}
                style={styles.img}
            />
            <ProfileImage />
            <View style={styles.info}>
                <Text>Name</Text>
                <Text>Email</Text>
            </View>
            <Button title="Sign out" onPress={() => {
                clearAsyncStorage()
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login/Register' }]
                })
                // navigation.navigate('Login/Register')
            }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: 220
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        transform: [{
            translateY: -80
        }]
    }
})

export default Profile