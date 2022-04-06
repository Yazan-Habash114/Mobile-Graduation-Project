import AsyncStorage from "@react-native-async-storage/async-storage"

export const ipAdd = '10.0.0.9' // Change it to your pc ip address
export const port = '3000'

export const clearAsyncStorage = async () => {
    await AsyncStorage.clear()
}