import React, {useEffect, useState} from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

import { Bar, Pie } from "react-chartjs-2";
import api from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [categoryExpenses, setCategoryExpenses] = useState({});

    useEffect(() => {
        api.get("transactions/")
        .then((response) => {
            const data = response.data;
            console.log("API Data: ", data);
            let totalIncome = 0;
            let totalExpense = 0;
            const categoryExpenseMap = {};

            data.forEach((transaction) => {
                const amount = parseFloat(transaction.amount);

                if (transaction.transaction_type === "income"){
                    totalIncome += amount;
                } else if (transaction.transaction_type === "expense") {
                    totalExpense += amount;

                    if (categoryExpenseMap[transaction.category_name]) {
                        categoryExpenseMap[transaction.category_name] += amount;
                    } else {
                        categoryExpenseMap[transaction.category_name] = amount;
                    }
                }
            });

            console.log("income", totalIncome);

            setTransactions(data);
            setIncome(totalIncome);
            setExpense(totalExpense);
            setCategoryExpenses(categoryExpenseMap);
        })
        .catch((error) => console.error("error fetching transactions: ", error));
    }, []);

    const barData = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                label: "Amount",
                data: [income, expense],
                backgroundColor: ["#4caf50", "#f44336"],
            },
        ],
    };

    const pieData = {
        labels: Object.keys(categoryExpenses),
        datasets: [
            {
                label: "Expenses",
                data: Object.values(categoryExpenses),
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#4caf50",
                    "#f44336",
                    "#9c27b0",
                ],
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="chart-container">
                <div className="chart-item">
                    <h3>Income vs Expense</h3>
                    <Bar data={barData} />
                </div>
                <div className="chart-item">
                    <h3>Category-Wise Expenses</h3>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;