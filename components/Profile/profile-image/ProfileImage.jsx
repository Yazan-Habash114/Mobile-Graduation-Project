import React from "react"
import { StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import { ipAdd, springPort } from "../../../global functions and info/global"
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileImage = ({ accountObj, accountType, accountId }) => {

    // Image local counter
    const [localCounter, setLocalCounter] = React.useState(-1000)

    React.useEffect(() => {
        console.log('before async = ' + localCounter)
        AsyncStorage.getItem('counter').then(value => {
            let temp = parseInt(value)
            setLocalCounter(temp)
            console.log('temp = ' + temp)
        });
    }, [localCounter])

    const choosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            // Upload to DB
            // ImagePicker saves the taken photo to disk and returns a local URI to it
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;


            const formData = new FormData();
            formData.append('file', {
                uri: result.uri,
                type: type,
                name: filename
            })

            var xhr = new XMLHttpRequest();
            xhr.open('POST', `http://${ipAdd}:${springPort}/${accountType === 'GARAGE' ? 'garages' : 'users'}/${accountId}/profile/uploadProfileImage/`);

            // console.log('OPENED', xhr.status);

            // xhr.onprogress = function () {
            //     console.log('LOADING', xhr.status);
            // };

            xhr.onload = function () {
                // console.log('DONE', xhr.status);
                console.log(localCounter)
                setLocalCounter(localCounter + 1)
                AsyncStorage.setItem('counter', '' + (localCounter + 1))
            };

            xhr.setRequestHeader('Content-Type', 'multipart/form-data')
            xhr.send(formData)
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={choosePhoto}>
            <ImageBackground
                source={{
                    uri: `http://${ipAdd}:${springPort}/${accountType === 'GARAGE' ? 'garages' : 'users'}/${accountId}/profileImage/${localCounter}`
                }}
                style={styles.img}
                imageStyle={{ borderRadius: 100 }}
            />
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 100,
        height: 170,
        width: 170,
        borderWidth: 5,
        borderColor: '#ffeaa7',
        marginVertical: 5,
        transform: [{
            translateY: -80
        }]
    },
    img: {
        width: '100%',
        height: '100%',
    }
})

export default ProfileImage