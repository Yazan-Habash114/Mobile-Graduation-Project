import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdd, springPort } from '../../../global functions and info/global';

const SignUp = ({ setSlide }) => {

    const [accountType, setAccountType] = useState('User')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [phone, setPhone] = useState('')

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#a8a8a8"
                onChangeText={(value) => setUsername(value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#a8a8a8"
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#a8a8a8"
                secureTextEntry={true}
                onChangeText={(value) => setPassowrd(value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#a8a8a8"
                keyboardType="numeric"
                onChangeText={(value) => setPhone(value)}
            />
            <View style={styles.accountType}>
                <Text style={styles.typeSpan}>Account Type:</Text>
                <Picker
                    style={styles.dropList}
                    onValueChange={(itemValue, itemIndex) => setAccountType(itemValue)}
                    selectedValue={accountType}
                >
                    <Picker.Item label="User" value="User" />
                    <Picker.Item label="Garage" value="Garage" />
                </Picker>
            </View>
            <TouchableOpacity onPress={() => setSlide(1)}>
                <Text style={styles.haveAccount}>Have an account ?</Text>
            </TouchableOpacity>
            <Button onPress={() => {
                axios.post(
                    `http://${ipAdd}:${springPort}/${accountType === "User" ? 'users' : 'garages'}/signup`,
                    JSON.stringify([username, email, phone, password]),
                    {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "Accept": "application/json"
                        }
                    }
                ).then(response => {
                    const max = 999999999
                    const min = -999999999

                    AsyncStorage.setItem('counter', '' + Math.floor(Math.random() * (max - min) + min))

                    AsyncStorage.setItem('loggedIn', 'true')
                    AsyncStorage.setItem('id', '' + response.data)
                    AsyncStorage.setItem('password', password)
                    accountType === 'User' ? (
                        AsyncStorage.setItem('account', 'USER')
                    ) : (
                        AsyncStorage.setItem('account', 'GARAGE')
                    )
                    alert('New account created successfully')
                    if (accountType === 'Garage') {
                        setSlide(3)
                    }
                })
            }}
                title="Create Account"
                color="#d63031"
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
    accountType: {
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    dropList: {
        width: '45%',
        color: 'white',
        backgroundColor: '#d63031',
        marginTop: 5,
    },
    typeSpan: {
        color: '#dfe6e9',
        fontSize: 20,
        marginRight: 10,
    },
    haveAccount: {
        marginBottom: 10,
        color: "#d63031",
        fontSize: 18
    },
})
export default SignUp