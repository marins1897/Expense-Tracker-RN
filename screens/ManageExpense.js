import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const expenseCtx = useContext(ExpensesContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const selectedExpense = expenseCtx.expenses.find((expense) => {
        return expense.id === editedExpenseId;
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    const confirmExpenseHandler = async (expenseData) => {
        setIsLoading(true);
        try {
            if ( isEditing ) {
                // locally
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                // firebase
                updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id : id });
            }
            navigation.goBack();

        } catch (error) {
            setError('Failed to add data!')
            setIsLoading(false);
        }
    }

    const cancelExpenseHandler = () => {
        navigation.goBack();
    }

    const deleteExpenseHandler = async () => {
        setIsLoading(true);

        try{
            // firebase
            await deleteExpense(editedExpenseId);
            // locally
            expenseCtx.deleteExpense(editedExpenseId);

            navigation.goBack();
        } catch (error) {
            setError('Could not delete!');
            setIsLoading(false);
        }
    }

    function errorHandler() {
        setError(null);
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error && !isLoading) {
        return <ErrorMessage message={error} onConfirm={errorHandler} />
    }

    return (
        <>
        <View style={styles.container}>

            <ExpenseForm onCancel={cancelExpenseHandler}
                        onConfirm={confirmExpenseHandler}
                        submitButtonLabel={!isEditing ? 'Add' : 'Update'} 
                        defaultValues={selectedExpense}
            />

            {isEditing && 
            ( <View style={styles.deleteContainer}>
                            <IconButton iconName="trash"
                                    color={GlobalStyles.colors.error500} 
                                    size={24}
                                    onPress={deleteExpenseHandler} 
                            />
            </View>)}
        </View>
        </>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }

});