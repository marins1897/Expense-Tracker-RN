import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext } from 'react';

const AllExpenses = () => {
    const expenseCtx = useContext(ExpensesContext);

    return (
        <ExpensesOutput expenses={expenseCtx.expenses} fallbackText='No registered expenses found.' expensesPeriod="Total" />
    )
}

export default AllExpenses;

const styles = StyleSheet.create({

});