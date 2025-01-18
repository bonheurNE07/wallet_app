import React, { useState, useEffect} from "react";
import api from "../services/api";
import './AddBudget.css'

const AddBudget = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [budget, setBudget] = useState("");

    useEffect(() => {
        api.get("accounts/")
        .then((response) => setAccounts(response.data))
        .catch((error) => console.error("Error fetching accounts:", error));
    }, []);

    const handleSetBudget = () => {
        api.patch(`accounts/${selectedAccount}/`, { budget })
        .then(() => {
            alert("Budget set succesfully!");
            setBudget("");
            setSelectedAccount("");
        })
        .catch((error) => console.error("Error setting budget:", error));
    };

    return (
        <div className="add-budget-container">
            <h2 className="add-budget-title">Set Budget</h2>
            <div className="add-budget-form">
                <label>
                    Account:
                    <select
                        value={selectedAccount}
                        onChange={(e) => setSelectedAccount(e.target.value)}
                    >
                        <option value="">Select an account</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Budget:
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Enter budget"
                    />
                </label>
                <button className="btn" onClick={handleSetBudget}>Set Budget</button>
            </div>
        </div>
    );
    
};

export default AddBudget;