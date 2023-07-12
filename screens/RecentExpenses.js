import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext, useEffect, useState } from 'react';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const RecentExpenses = () => {
    const expenseCtx = useContext(ExpensesContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getExpenses() {
            setIsLoading(true);

            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!')
            }

            setIsLoading(false);
        };

        getExpenses();
    }, []);

    const recentExpenses = expenseCtx.expenses.filter((expense) => { 
        const today = new Date();
        const day7Ago = getDateMinusDays(today , 7);

        return (expense.date >= day7Ago) && (expense.date <= today);
    });

    function errorHandler() {
        setError(null);
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error && !isLoading) {
        return <ErrorMessage  message={error} onConfirm={errorHandler}/>
    }

    return (
        <ExpensesOutput expenses={recentExpenses} fallbackText='No expenses registered for last 7 days.' expensesPeriod="Last 7 days" />
    )
}

export default RecentExpenses;