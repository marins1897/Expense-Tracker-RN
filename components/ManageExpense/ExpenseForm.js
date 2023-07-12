import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";


const ExpenseForm = ({ onConfirm, onCancel, submitButtonLabel, defaultValues }) => {
    const [inputs, setInputs] = useState({
        amount:{
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true //defaultValues ? true : false, // !!defaultValues - same result
        },
        date: {
             value : defaultValues ? getFormattedDate(defaultValues.date) : '',
             isValid: true
            },
        description:{
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        },
    });

    function inputChangedHandler(inputIdentifier ,enteredValue) {
        setInputs((prevValues) => {
            return {
                ...prevValues,
                [inputIdentifier] : { value : enteredValue , isValid: true },
            }
        })
    };

    function submitHandler() {

        const expenseData = {
            amount: +inputs.amount.value,
            date: inputs.date.value,
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.length === 10;
        // const expenseData = { date: new Date(inputs.date.value)...}
        //      const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid Input', 'Please check your input values!');
            setInputs((currInputs) => {
                return {
                    amount: { value: currInputs.amount.value, isValid: amountIsValid },
                    date: { value: currInputs.date.value, isValid: dateIsValid },
                    description: { value: currInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        }

        if (dateIsValid) {
            expenseData.date = new Date(expenseData.date);
        }

        onConfirm(expenseData);
    }

    const formIsInvalid = 
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;


    return (
        <View style={styles.container}>
            <Text style={styles.title}> Your Expense </Text>
            <View style={styles.marginContainer}>

            <View style={styles.inlineContainer}>

            <Input label="Amount" valid={inputs.amount.isValid}
            textInputConfig={{ 
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'amount'),
              value: inputs.amount.value,
            }} 
            inputStyle={styles.rowInput}
            />

            <Input label="Date" valid={inputs.date.isValid}
            textInputConfig={{
                keyboardType: 'default',
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangedHandler.bind(this, 'date'),
                value: inputs.date.value,
            }}
            inputStyle={styles.rowInput}
            />
            </View>

            <Input label="Description" valid={inputs.description.isValid}
            textInputConfig={{
                keyboardType: 'default',
                multiline: true,
                autocorrect: false, // default is true
                //autoCapitalize: 'characters' // sentences is default
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value,
            }} />

            {formIsInvalid && <Text style={styles.errorText}> Invalid input values. Please check your data. </Text>}
            </View>

            <View style={styles.buttonContainer}>

                <Button mode='flat' onPress={onCancel} btnStyle={styles.button}>
                    <Text>Cancel</Text>
                </Button>

                <Button onPress={submitHandler} btnStyle={styles.button}>
                    {submitButtonLabel}
                </Button>

            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    inlineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    marginContainer: {
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
        fontWeight: 'bold',
    }
})