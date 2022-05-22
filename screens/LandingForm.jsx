import React, { useState, createContext } from "react"
import Form from "../components/Home/form/Form"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const LandingForm = () => {

    const navigation = useNavigation()
    const [random, setRandom] = useState(0)

    {
        AsyncStorage.getItem('loggedIn').then(value => {
            value === 'true' ? navigation.reset({
                index: 0,
                routes: [{ name: 'Tabs' }]
            }) : null
        })
    }
    return (<Form />)
}

export default LandingForm