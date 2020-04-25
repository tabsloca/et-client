import React, { useContext, useEffect } from 'react';
import { Transactions } from './Transactions';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);
    useEffect(() => {
        getTransactions();
    }, []);
    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(e => (<Transactions transaction={e} key={e._id} />))}
            </ul>
        </>
    )
}
