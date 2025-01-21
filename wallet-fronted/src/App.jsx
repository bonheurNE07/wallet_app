import React, { Children } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router'
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddAccount from './components/AddAccount';
import AddCategory from './components/AddCategory';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import AddBudget from './components/AddBudget';
import Report from './components/Report';

import './App.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
}

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1 className="app-titlee">Wallet Application</h1>
          <ul className="nav-links">
            <li>
              <Link to='/'>Dashboard</Link>
            </li>
            <li>
              <Link to='/add-account'>Add Account</Link>
            </li>
            <li>
              <Link to='/add-category'>Add Category</Link>
            </li>
            <li>
              <Link to='/add-transaction'>Add Transaction</Link>
            </li>
            <li>
              <Link to='/transactions'>Transactions</Link>
            </li>
            <li>
              <Link to='/add-budget'>Set Budget</Link>
            </li>
            <li>
              <Link to="/report">Generate Report</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/add-account' element={<AddAccount />} />
          <Route path='/add-category' element={<AddCategory />} />
          <Route path='/add-transaction' element={<AddTransaction />} />
          <Route path='/transactions' element={<TransactionList />} />
          <Route path="/add-budget" element={<AddBudget />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;