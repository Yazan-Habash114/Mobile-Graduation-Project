import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';

const SignUp = () => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#f8f8f8"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#f8f8f8"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#f8f8f8"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#f8f8f8"
            />
            <View style={styles.accountType}>
                <Text style={styles.typeSpan}>Account Type:</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.haveAccount}>Have an account ?</Text>
            </TouchableOpacity>
            <Button
                style={styles.submitButton}
                title="Create Account"
                color="rgb(190, 18, 48)"
            >
            </Button>
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
    accountType: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    typeSpan: {
        color: 'white',
        fontSize: 20,
        marginRight: 10,
    },
    haveAccount: {
        marginBottom: 10,
        color: "rgb(190, 18, 47)",
    },
})
export default SignUp