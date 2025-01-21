import React, {Children} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddAccount from './components/AddAccount';
import AddCategory from './components/AddCategory';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import AddBudget from './components/AddBudget';
import Report from './components/Report';

import './App.css'; // import global css

// PrivateRoute component: restricts access to authenticated users
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken"); // check for token in localStorage
  return token ? children : <Navigate to="/login" />; // Redirect to login if not authenticated or render children if authenticated
};

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
          {/* public routes */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          {/* private routes*/}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/add-account' element={<PrivateRoute><AddAccount /></PrivateRoute>} />
          <Route path='/add-category' element={<PrivateRoute><AddCategory /></PrivateRoute>} />
          <Route path='/add-transaction' element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
          <Route path='/transactions' element={<PrivateRoute><TransactionList /></PrivateRoute>} />
          <Route path="/add-budget" element={<PrivateRoute><AddBudget /></PrivateRoute>} />
          <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;