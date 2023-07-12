import { View, StyleSheet, Text } from "react-native";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

const ErrorMessage = ({ message, onConfirm }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>
                An error occurred!
            </Text>
            <Text style={styles.text}>
                { message }
            </Text>
            <Button onPress={onConfirm}>Ok</Button>
        </View>
    )
}

export default ErrorMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})