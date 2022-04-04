import React from "react"
import { Text, ScrollView, StyleSheet, Image, View } from "react-native"
import ProfileImage from "../components/Profile/profile-image/ProfileImage"

const Profile = () => {
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