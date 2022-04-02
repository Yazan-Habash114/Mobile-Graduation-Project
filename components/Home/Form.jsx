import {
    Text,
    View,
    StyleSheet,
} from "react-native";
import SignUp from "./signup/SignUp";


const Form = () => {
    return (
        <View style={styles.container}>
            <View style={styles.formSlide}>
                <Text style={styles.header}>Sign Up</Text>
                <SignUp />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2f2f2f",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    formSlide: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgb(198, 14, 48)',
        borderBottomEndRadius: 15,
        borderTopRightRadius: 15,
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#2a2a2a'
    },
    header: {
        color: 'white',
        fontSize: 25,
    }
})

export default Form