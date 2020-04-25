/* eslint-disable react/react-in-jsx-scope */
import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
    transactions: [],
    error: [],
    loading: true
}

// Create context
export const GlobalContext = createContext(initialState)

//Provider Component
export const GlobalProvider = ({ children }) => {
    //reducer
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/transactions');
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        }
        catch(err){
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response.data.error
            })
        }
    }
    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        }
        catch(err){
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response.data.error
            })
        }
    }
    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/api/transactions`, transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        }
        catch(err){
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response.data.error
            })
        }
    }

    return (
    <GlobalContext.Provider 
        value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            addTransaction,
            deleteTransaction
        }}>
        {children}
    </GlobalContext.Provider>
    );
}