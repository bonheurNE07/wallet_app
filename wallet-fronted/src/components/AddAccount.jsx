import React, { useState } from "react";
import api from '../services/api';
import './AddAccount.css';

// componenet for adding aa new account
const AddAccount = () => {
    const [name, setName] = useState(''); // defining the state for account name
    const [balance, setBalance] = useState(''); // state for account balance
    
    // handle form submition
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default from behavior
        api.post('accounts/', { name, balance }) // make API call to add account
        .then(() => {
            alert('Account added successfully.');
            // reset the fields fter notify user on success
            setName('');
            setBalance('');
        })
        .catch(error => console.error('Erroraadding account:', error));
    };

    return (
        <div className="add-account-container">
            <h2 className="add-account-title">Add Account</h2>
            <form onSubmit={handleSubmit} className="add-account-form">
                <div className="form-group">
                    <label htmlFor="account-name">Name:</label>
                    <input 
                        id="account-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter account name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="account-balance">Balance:</label>
                    <input 
                    id="account-balance"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)} 
                    placeholder="Enter initial balance"
                    />
                </div>
            <button type="submit" className="add-account-button">Add Acount</button>
        </form>
        </div>
    );
};

export default AddAccount;