import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUp = ({ setSlide }) => {

    const [accountType, setAccountType] = React.useState('User Account')

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#a8a8a8"
            />
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
            <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#a8a8a8"
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
                // axios.get('http://10.0.0.8:8080/users/5').then(response => {
                //     alert(response.data.email)
                //     // alert(AsyncStorage.getItem('type'))
                // })
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Tabs' }]
                })
                // navigation.navigate('Tabs')
            }}
                title="Create Account"
                color="#d63031"
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