import {
    Text,
    View,
    StyleSheet,
    Image,
} from "react-native";
import SignIn from "../signin/SignIn";
import SignUp from "../signup/SignUp";
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Form = () => {

    const [slide, setSlide] = React.useState(0)

    const max = 999999999
    const min = -999999999

    AsyncStorage.setItem('counter', '' + Math.floor(Math.random() * (max - min) + min))

    AsyncStorage.setItem('loggedIn', 'true')
    AsyncStorage.setItem('id', '5')
    AsyncStorage.setItem('account', 'GARAGE')
    // AsyncStorage.setItem('account', 'USER')

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/iDrive.jpg')} style={styles.logo} />
            {
                slide == 0 ?
                    <View style={styles.formSlide}>
                        <Text style={styles.header}>Sign Up</Text>
                        <SignUp setSlide={setSlide} />
                    </View> :
                    <View style={styles.formSlide}>
                        <Text style={styles.header}>Sign In</Text>
                        <SignIn setSlide={setSlide} />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3f3f3f",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column'
    },
    formSlide: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgb(198, 14, 48)',
        borderBottomEndRadius: 15,
        borderTopRightRadius: 15,
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        paddingVertical: 15,
        backgroundColor: '#343434'
    },
    header: {
        color: 'white',
        fontSize: 25,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
        borderRadius: 100,
    }
})

export default Form