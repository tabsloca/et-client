/* eslint-disable react/react-in-jsx-scope */
import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
    transactions: []
}

// Create context
export const GlobalContext = createContext(initialState)

//Provider Component
export const GlobalProvider = ({ children }) => {
    //reducer
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }
    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }    

    return (
    <GlobalContext.Provider 
        value={{
            transactions: state.transactions, 
            deleteTransaction,
            addTransaction
        }}>
        {children}
    </GlobalContext.Provider>
    );
}