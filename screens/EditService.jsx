import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import { ipAdd, springPort } from '../global functions and info/global'

const EditService = ({ route }) => {
    const { service } = route.params

    // States
    const [name, setName] = useState(service.serviceName)
    const [canDeliver, setCanDeliver] = useState(service.canDeliver)
    const [description, setDescription] = useState(service.serviceDescription)
    const [price, setPrice] = useState(service.price)
    const [time, setTime] = useState(service.serviceTime)
    const [type, setType] = useState(service.serviceType)
    const [update, setUpdate] = useState(false)

    const save = () => {
        if (name !== '' && description !== '' && !Number.isNaN(price) && time !== '' && type !== '') {
            axios.post(
                `http://${ipAdd}:${springPort}/services/${service.serviceID}/editService`,
                {
                    serviceName: name,
                    serviceType: type,
                    serviceDescription: description,
                    price: price,
                    serviceTime: time,
                    canDeliver: canDeliver,
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json"
                    }
                }
            ).then(() => {
                alert('The service has been updated')
                setUpdate(!update)
            })
        } else {
            alert('Check all fields filled')
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ width: '100%' }}>
                <Image
                    style={styles.img}
                    source={{ uri: `http://${ipAdd}:${springPort}/garages/${service.supportedGarageID}/profileImage/-1` }}
                />

                <Text style={styles.serviceName}>{service.serviceName}</Text>

                <View style={styles.info}>
                    <View style={styles.slot}>
                        <Text style={styles.key}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#a8a8a8"
                            defaultValue={service.serviceName}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View style={styles.slot}>
                        <Text style={styles.key}>Type:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#a8a8a8"
                            defaultValue={service.serviceType}
                            onChangeText={text => setType(text)}
                        />
                    </View>
                    <View style={styles.slot}>
                        <Text style={styles.key}>Price:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            placeholderTextColor="#a8a8a8"
                            defaultValue={"" + service.price}
                            keyboardType="numeric"
                            onChangeText={text => setPrice(parseFloat(text))}
                        />
                    </View>
                    <View style={styles.slot}>
                        <Text style={styles.key}>Desc:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            placeholderTextColor="#a8a8a8"
                            defaultValue={service.serviceDescription}
                            onChangeText={text => setDescription(text)}
                        />
                    </View>
                    <View style={styles.slot}>
                        <Text style={styles.key}>Time:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Service Time"
                            placeholderTextColor="#a8a8a8"
                            defaultValue={service.serviceTime}
                            onChangeText={text => setTime(text)}
                        />
                    </View>
                    <View style={styles.slot}>
                        <Text style={styles.key}>delivered?</Text>
                        <Picker
                            style={styles.dropList}
                            onValueChange={(itemValue, itemIndex) => setCanDeliver(itemValue)}
                            selectedValue={service.canDeliver}
                        >
                            <Picker.Item label="True" value={true} />
                            <Picker.Item label="False" value={false} />
                        </Picker>
                    </View>
                    <TouchableOpacity onPress={save}>
                        <Text style={styles.confirm}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f3f3f',
    },
    img: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    serviceName: {
        fontSize: 36,
        color: '#d63031',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    info: {
        borderWidth: 2,
        padding: 10,
        borderColor: '#e74c3c',
        borderBottomLeftRadius: 15,
        borderTopEndRadius: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        display: 'flex',
    },
    slot: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    key: {
        color: '#ecf0f1',
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'black',
        padding: 5,
        paddingLeft: 7,
        color: 'white',
        fontSize: 17,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        width: 200,
    },
    dropList: {
        width: '45%',
        color: 'white',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 5,
    },
    confirm: {
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: '#e74c3c',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        color: '#ecf0f1',
    },
})

export default EditService