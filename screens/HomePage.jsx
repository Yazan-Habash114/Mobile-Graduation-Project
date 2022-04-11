import React from 'react'
import { Text, View, StyleSheet, Button, ScrollView, FlatList } from "react-native"
import { useNavigation } from '@react-navigation/native'


const HomePage = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
            <Button
                title="All Services"
                onPress={() => navigation.navigate('Service Stack')}
            />
            <Button
                title="All Garages"
                onPress={() => navigation.navigate('Garage Stack')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default HomePage