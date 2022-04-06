import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native"

const EditProfile = () => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#d0d0d0"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#d0d0d0"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: 'white', fontSize: 18 }}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#595959',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'black',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1.5,
        borderColor: 'rgb(190, 36, 66)',
        borderRadius: 10,
        marginHorizontal: 10,
        color: 'white',
    },
    button: {
        marginHorizontal: 90,
        backgroundColor: 'rgb(200, 46, 66)',
        padding: 8,
        borderRadius: 10,
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
    }
})

export default EditProfile