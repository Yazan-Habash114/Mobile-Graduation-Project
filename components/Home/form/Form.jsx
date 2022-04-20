import {
    Text,
    View,
    StyleSheet,
    Image,
} from "react-native";
import SignIn from "../signin/SignIn";
import SignUp from "../signup/SignUp";
import LocationPanel from "../LocationPanel/LocationPanel";
import React from 'react';


const Form = () => {

    const [slide, setSlide] = React.useState(0)

    if (slide === 3) {
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/images/iDrive.jpg')} style={styles.logo} />
                <View style={styles.formSlide}>
                    <Text style={styles.header}>Choose Location and time</Text>
                    <LocationPanel setSlide={setSlide} />
                </View>
            </View>
        );
    }

    else {
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/images/iDrive.jpg')} style={styles.logo} />
                {
                    slide === 0 ?
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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#636e72",
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
        borderColor: '#d63031',
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        paddingVertical: 15,
        backgroundColor: '#2d3436'
    },
    header: {
        color: '#dfe6e9',
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