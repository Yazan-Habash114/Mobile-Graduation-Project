import React from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { clearAsyncStorage } from '../../../global functions and info/global';
import { useNavigation } from '@react-navigation/native';

const ConfirmWindow = ({ setShowWindow }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowWindow(false)}>
                <MaterialIcons name="cancel" size={38} color="rgb(190, 18, 48)" />
            </TouchableOpacity>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your password..."
                    placeholderTextColor={"#a8a8a8"}
                    secureTextEntry={true}
                />
                <Button
                    onPress={() => {
                        clearAsyncStorage()
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login/Register' }]
                        })
                        // navigation.navigate('Login/Register')
                    }}
                    title="Delete Account"
                    color="rgb(190, 18, 48)"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#383838',
        position: 'absolute',
        left: '20%',
        top: '70%',
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
        marginTop: 10,
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
        borderWidth: 2,
        borderColor: "rgb(200, 28, 58)",
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

export default ConfirmWindow