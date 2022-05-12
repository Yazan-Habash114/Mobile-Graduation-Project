import AsyncStorage from "@react-native-async-storage/async-storage"

export const ipAdd = '10.0.0.8'   // Change it to your pc ip address
export const springPort = '8080'  // Change it to your project port #
export const socketPort = '5000'
export const port = '3000'
export const apiKey = "q2yukmABGuRvQD9NhkGAABCOYtIMoHFD"

export const clearAsyncStorage = async () => {
    await AsyncStorage.clear()
}