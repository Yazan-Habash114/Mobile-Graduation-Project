import { StyleSheet, Text, View } from "react-native";

const Navbar = () => {
    return (
        <View style={styles.container}>
            <Text>Item1</Text>
            <Text>Item2</Text>
            <Text>Item3</Text>
            <Text>Item4</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        width: '100%',
        padding: 10,
    },
})

export default Navbar