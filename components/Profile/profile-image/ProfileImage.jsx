import React from "react"
import { Text, StyleSheet, View, ImageBackground } from "react-native"

const ProfileImage = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/images/iDrive.jpg')}
                style={styles.img}
                imageStyle={{ borderRadius: 100 }}
            ></ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 100,
        height: 170,
        width: 170,
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 5,
        transform: [{
            translateY: -80
        }]
    },
    img: {
        width: '100%',
        height: '100%',
    }
})

export default ProfileImage