# Wallet Application

## Overview
A wallet application that allows users to:
- Track income and expenses.
- Generate reports for specific time periods.
- Set budgets for accounts and get notified when exceeded.
- Visualize income vs expenses and category-wise breakdowns using charts.

## Features
1. Add Accounts, Categories, and Transactions.
2. Set budgets for accounts.
3. Generate reports based on a date range.
4. Visualize data through interactive charts.

## Technology Stack
- **Frontend:** React, Chart.js
- **Backend:** Django REST Framework
- **Database:** SQLite (development)

## Installation
1. Clone the repository:
```bash
https://github.com/bonheurNE07/wallet_app.git
2. Install dependencies:
```bash
pip install -r requirements.txt
```
### Backend Setup
3. Apply migrations:
```bash
python manage.py migrate
```
4. Start the development server:
```bash
python manage.py runserver
```
### Frontend Setup

1. Clone the repository:
```bash
cd wallet_frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```

## Deployment
### Backend
Deployed on **Render**.

### Frontend
Deployed on **Netlify**.

## Live Demo

Frontend URL: https://wallet-app-bne.netlify.app/
Backend URL: https://wallet-app-1mdo.onrender.com

## How to Use
   **1. Signup**: Create a new account or login if you already have one.
   
   **2. Dashboard**: View a summary of your transactions and visualizations.
   
   **3. Add Accounts**: Manage multiple financial accounts.
   
   **4. Set Budgets**: Assign budgets to your accounts.
   
   **5. Add Transactions**: Record income and expenses.
   
   **6. Generate Reports**: View financial reports for a specific time range.

