import React, {useEffect, useState} from "react";
import api from "../services/api";
import './TransactionList.css';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [sortkey, setSortkey] = useState('date');
    const [sortOrder, setSortOrder] = useState('asc');


    useEffect(() => {
        api.get('transactions/')
        .then(response => setTransactions(response.data))
        .catch(error => console.error('Error fetching transaction:', error));
        api.get('accounts/')
        .then(response => setTransactions(response.data))
    }, []);

    const handleSort = (key) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortkey(key);
        setSortOrder(order);

        const sortedTransactions = [...transactions].sort((a, b) => {
            if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return order == 'asc' ? 1 : -1;
            return 0;
        });

        setTransactions(sortedTransactions);
    };

    const getRowClass = (transaction) => {
        if(transaction.transaction_type === 'income') {
            return "transaction-income";
        }

        if (
            transaction.transaction_type === "expense" &&
            transaction.account_budget > 0 &&
            transaction.amount > transaction.account_budget
        ) {
            return "transaction-over-budget";
        }

        return "";
    };

    return (
        <div className="transaction-list-container">
            <h2 className="transaction-list-title">Transaction List</h2>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>
                            <button onClick={() => handleSort('account_name')}>
                                Account {sortkey === 'account_name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('category_name')}>
                                Category {sortkey === 'category_name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('date')}>
                                Date {sortkey === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </button>
                        </th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className={getRowClass(transaction)}>
                            <td>{transaction.id}</td>
                            <td>{transaction.account_name}</td>
                            <td>{transaction.category_name}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;