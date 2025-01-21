import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import './AddTransaction.css';

const AddTransaction = () => {
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const [account, setAccount] = useState('');
    const [category, setCategory] = useState('');
    const [transactionType, setTransactionType] = useState('income');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        api.get('accounts/').then(response => setAccounts(response.data));
        api.get('categories/').then(response => setCategories(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('transactions/', {
            account,
            category,
            transaction_type: transactionType,
            amount,
            date,
            description,
        })
        .then(() => {
            alert('Transaction added successfully');
            setAccount('');
            setCategory('');
            setTransactionType('income');
            setAmount('');
            setDate('');
            setDescription('');
            navigate("/transactions");
        })
        .catch(error => console.error('Error adding transaction:', error));
    };

    return (
        <div className="add-transaction-container">
            <h2 className="add-transaction-title">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="add-transaction-form">
            <div className="form-group">
            <label htmlFor="account">Account (ID):</label>
            <select 
            id='account' 
            value={account} 
            onChange={(e) => setAccount(e.target.value)}>
                <option value="">Select an account</option>
                {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                        {acc.name}
                    </option>
                ))}
            </select>
            </div>
            
            <div className="form-group">
            <label htmlFor="category">Category (ID):</label>
            <select 
            id='category'
            value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            </div>
            <div className="form-group">
            <label htmlFor="transaction-type">Type:</label>
            <select
                id="transaction-type"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input 
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            />
            </div>
            <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
            id="date" 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
            />
            </div>
            <button type="submit" className="add-transaction-button">Add Transaction</button>
        </form>
        </div>
    );
};

export default AddTransaction;