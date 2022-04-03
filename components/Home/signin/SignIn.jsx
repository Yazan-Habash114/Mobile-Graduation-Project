import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const SignIn = ({ setSlide }) => {
    return (
        <TouchableOpacity onPress={() => setSlide(0)}>
            <Text>Go to sign up</Text>
        </TouchableOpacity>
    )
}

export default SignIn