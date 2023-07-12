import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from '../../constants/styles';


const Input = ({ label, inputStyle, textInputConfig, valid }) => {

    const inputStyles = [styles.input];

    if (!valid) {
        inputStyles.push(styles.invalidInput);
    }

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.container, inputStyle]}>
            <Text style={[styles.labelText, valid ? null : styles.invalidLabel]}> { label } </Text>
            <TextInput {...textInputConfig} style={inputStyles} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    labelText: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    }
})