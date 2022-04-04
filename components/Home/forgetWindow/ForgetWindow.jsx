import React from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';

const ForgetWindow = ({ setShowForget }) => {

    const [code, setCode] = React.useState('')

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowForget(false)}>
                <MaterialIcons name="cancel" size={38} color="rgb(190, 18, 48)" />
            </TouchableOpacity>
            <View style={styles.form}>
                <Text style={styles.label}>Enter code sent to your email:</Text>
                <TextInput
                    onChangeText={(value) => setCode(value)}
                    style={styles.input}
                    placeholder="Code"
                    placeholderTextColor="#a8a8a8"
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    placeholderTextColor={code === "555" ? "#a8a8a8" : "#585858"}
                    secureTextEntry={true}
                    editable={code === "555"}
                />
                <Button
                    title="Reset Password"
                    color="rgb(190, 18, 48)"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        position: 'absolute',
        left: '20%',
        top: '50%',
        transform: [{
            translateX: -10,
        }, {
            translateY: -180
        }],
        zIndex: 10,
        width: '70%',
        display: 'flex',
        alignItems: 'flex-start',
        borderRadius: 5,
        padding: 5,
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
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
        marginBottom: 10,
        width: '100%',
    },
    label: {
        color: 'white',
        marginTop: 5
    }
})

export default ForgetWindow