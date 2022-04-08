import React from 'react'
import { Text, View, StyleSheet, Button, ScrollView, FlatList } from "react-native"
import DatePicker from 'react-native-neat-date-picker'
import { data } from './data'
import { useNavigation } from '@react-navigation/native'


const HomePage = () => {

    const navigation = useNavigation()

    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [date, setDate] = React.useState(null)
    const [id, setId] = React.useState('')

    let d = new Date()
    d.setDate(d.getDate() - 1)

    const onConfirm = (date) => {
        setShowDatePicker(false)
        setDate(date.dateString)
    }

    const renderList = ({ item }) => {
        return (
            <View style={styles.listItem}>
                <Text
                    onPress={() => setId(item.userId)}
                    style={{ marginVertical: 8, backgroundColor: '#ddd' }}>{item.title}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
            <Button
                title="All Services"
                onPress={() => navigation.navigate('All Services')}
            />
            <Button
                title="All Garages"
                onPress={() => navigation.navigate('All Garages')}
            />
            {/* <Button title={'open'} onPress={() => setShowDatePicker(true)} />
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                minDate={d}
                startDate={d}
                onCancel={() => setShowDatePicker(false)}
                onConfirm={onConfirm}
            />
            <Text>{date}</Text> */}
        </View>
        // <View style={styles.container}>
        //     <FlatList data={data} renderItem={renderList} keyExtractor={item => item.userId} />
        //     <Text>id = {id}</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default HomePage