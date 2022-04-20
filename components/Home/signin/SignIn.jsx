import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native'
import ForgetWindow from '../forgetWindow/ForgetWindow';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { ipAdd, springPort } from '../../../global functions and info/global';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ setSlide }) => {

    const [accountType, setAccountType] = React.useState('User')
    const [showForget, setShowForget] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            {showForget ? <ForgetWindow setShowForget={setShowForget} /> : null}
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
                onChangeText={(value) => setPassword(value)}
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
            <TouchableOpacity onPress={() => { setShowForget(true) }}>
                <Text style={styles.forget}>
                    Forget Password?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSlide(0)}>
                <Text style={styles.haveAccount}>Have an account ?</Text>
            </TouchableOpacity>
            <Button
                title="Login"
                color="#d63031"
                onPress={() => {
                    axios.post(
                        `http://${ipAdd}:${springPort}/${accountType === 'User' ? 'users' : 'garages'}/login`,
                        JSON.stringify([email, password]),
                        {
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                                "Accept": "application/json"
                            }
                        }
                    ).then(response => {
                        if (response.data == -1) {
                            alert('Incorrect email or password')
                        } else {
                            const max = 999999999
                            const min = -999999999

                            AsyncStorage.setItem('counter', '' + Math.floor(Math.random() * (max - min) + min))

                            AsyncStorage.setItem('loggedIn', 'true')
                            AsyncStorage.setItem('id', '' + response.data)
                            accountType === 'User' ? (
                                AsyncStorage.setItem('account', 'USER')
                            ) : (
                                AsyncStorage.setItem('account', 'GARAGE')
                            )

                            // navigation.navigate('Tabs')
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Tabs' }]
                            })
                        }
                    })
                }}
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
    typeSpan: {
        color: '#dfe6e9',
        fontSize: 20,
        marginRight: 10,
    },
    dropList: {
        width: '45%',
        color: 'white',
        backgroundColor: '#d63031',
        marginTop: 5,
    },
    haveAccount: {
        marginBottom: 10,
        color: "#d63031",
        fontSize: 16,
    },
    forget: {
        color: '#dfe6e9',
        marginBottom: 20,
    },
})

export default SignIn