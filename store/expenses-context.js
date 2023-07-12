import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => {},
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: ({ id }) => {},
    updateExpense: ({ id, description, amount, date }) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD' : 
            return [action.data, ...state];
        case 'SET' : 
            const inverted = action.data.reverse();
            return inverted;
        case 'UPDATE' : 
            // find expense id to be updated
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.data.id);
            // find expense itself at whole, by founded id
            const updatableExpense = state[updatableExpenseIndex];
            // check updated expense
            const updatedItem = { ...updatableExpense, ...action.data.updatedData}
            // merge old and new/updated data
            const updatedExpenses = [ ...state ];
            // update expense with founded id with new merged updated expense
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses; 
        case 'DELETE' : 
            return state.filter((expense) => expense.id !== action.id);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({ type:'ADD', data : expenseData });
    };

    function setExpenses(expenses) {
        dispatch({ type: 'SET', data: expenses });
    };

    function deleteExpense(id) {
        dispatch({ type:'DELETE', id : id });
    };

    function updateExpense(id, expenseUpdatedData) {
        dispatch({ type:'UPDATE', data : { id : id , updatedData : expenseUpdatedData } });
    };

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }


    return (
        <ExpensesContext.Provider
            value={value}
        >
            { children }
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;