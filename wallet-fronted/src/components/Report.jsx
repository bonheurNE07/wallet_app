import React, { useState } from "react";
import api from "../services/api";
import './Report.css';

const Report = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [transactions, setTransactions] = useState([]);

    const handleGenerateReport = () => {
        console.log('clicked');
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }
        console.log(startDate);
        api.get(`transactions/?date__gte=${startDate}&date__lte=${endDate}`)
        .then((response) => setTransactions(response.data))
        .catch((error) => console.error("Error fetching report: ", error));
    };

    const totalIncome = transactions
        .filter((transaction) => transaction.transaction_type === "income")
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    const totalExpense = transactions
        .filter((transaction) => transaction.transaction_type === "expense")
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    return (
        <div className="report-container">
            <h2 className="report-title">Generate Report</h2>
            <div className="report-form">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button className="btn" onClick={handleGenerateReport}>Generate Report</button>
            </div>

            <h3 className="report-subtitle">Transaction Report</h3>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Account</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
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

            <div className="report-totals">
                <p className="total-income">Total Income: ${totalIncome.toFixed(2)}</p>
                <p className="total-expense">Total Expense: ${totalExpense.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Report;