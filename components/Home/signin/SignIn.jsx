import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native'
import ForgetWindow from '../forgetWindow/ForgetWindow'

const SignIn = ({ setSlide }) => {

    const [showForget, setShowForget] = React.useState(false)

    return (
        <View style={styles.container}>
            {showForget ? <ForgetWindow setShowForget={setShowForget} /> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#a8a8a8"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#a8a8a8"
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => { setShowForget(true) }}>
                <Text style={styles.forget}>
                    Forget Password?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSlide(0)}>
                <Text style={styles.haveAccount}>Have an account ?</Text>
            </TouchableOpacity>
            <Button
                title="Create Account"
                color="rgb(190, 18, 48)"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    input: {
        backgroundColor: 'black',
        padding: 5,
        paddingLeft: 7,
        color: 'white',
        fontSize: 17,
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 10,
        borderRadius: 6,
        width: '100%',
    },
    haveAccount: {
        marginBottom: 10,
        color: "rgb(190, 18, 47)",
        fontSize: 16,
    },
    forget: {
        color: 'white',
        marginBottom: 20,
    },
})

export default SignIn