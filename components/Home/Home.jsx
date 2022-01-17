import {
    Text,
    ScrollView,
    View,
    StyleSheet,
    Image,
} from "react-native";

const Home = () => {
    return (
        <ScrollView style={styles.contents}>
            <Text>Write your pages here... {"\n"}Navbar is static through all pages</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contents: {
        backgroundColor: "gray",
        width: '100%',
    },
})

export default Home