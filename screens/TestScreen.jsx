import React from "react"
import { Text, Button } from "react-native"

const TestScreen = ({ navigation }) => {
    return (
        <Button onPress={() => navigation.navigate('Login/Register')} title="Go to form" />
    )
}

export default TestScreen