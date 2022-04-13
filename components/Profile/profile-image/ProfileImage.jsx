import React from "react"
import { StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import { ipAdd, springPort } from "../../../global functions and info/global"
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";


const ProfileImage = ({ accountObj, accountType, accountId }) => {

    const [counter, setCounter] = React.useState(-1)
    // const [image, setImage] = React.useState(null)

    const choosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        // Upload to DB
        const formData = new FormData();
        formData.append('images', {
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
            uri: result.uri,
        })

        formData.append('file', myImg);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post(
            `http://${ipAdd}:${springPort}/${accountType === 'GARAGE' ? 'garages' : 'users'}/${accountId}/profile/uploadProfileImage`,
            formData,
            config
        ).then(response => {
            console.log(response.data)
            setCounter(counter + 1)
        })

        if (!result.cancelled) {
            // setImage(result.uri);
            return;
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={choosePhoto}>
            <ImageBackground
                source={{
                    uri: `http://${ipAdd}:${springPort}/${accountType === 'GARAGE' ? 'garages' : 'users'}/${accountId}/profileImage/${counter}`
                }}
                style={styles.img}
                imageStyle={{ borderRadius: 100 }}
            />
        </TouchableOpacity>
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