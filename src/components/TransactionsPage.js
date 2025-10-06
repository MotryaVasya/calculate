// src/components/TransactionsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TRANSACTIONS } from '../data/transactions';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('Все');
  const [balance, setBalance] = useState(0);

  
  const calculateBalance = (transactionsList) => {
      const totalIncome = transactionsList
      .filter(t => t.type === 'Доход')
      .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpense = transactionsList
      .filter(t => t.type === 'Расход')
      .reduce((sum, t) => sum + t.amount, 0);
      
      setBalance(totalIncome - totalExpense);
    };
    
    const filteredTransactions = filter === 'Все' 
    ? transactions 
    : transactions.filter(t => t.type === filter);
    
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };
    
    useEffect(() => {
      setTransactions(TRANSACTIONS);
      calculateBalance(TRANSACTIONS);
    }, []);

  return (
    <div className="transactions-page container mt-3">
        <h1 className="h4 mb-3">Калькулятор бюджета</h1>
        
        <div className="balance-section card p-3 mb-3">
        <h2 className="h6 mb-0">Текущий баланс: <span className={balance >= 0 ? 'text-success' : 'text-danger'}>{balance} ₽</span></h2>
        </div>

        <div className="filter-buttons btn-group mb-3" role="group">
        <button 
            className={`btn btn-sm ${filter === 'Все' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleFilterChange('Все')}
        >
            Все
        </button>
        <button 
            className={`btn btn-sm ${filter === 'Доход' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => handleFilterChange('Доход')}
        >
            Доходы
        </button>
        <button 
            className={`btn btn-sm ${filter === 'Расход' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => handleFilterChange('Расход')}
        >
            Расходы
        </button>
      </div>

      <div className="transactions-list">
        <h2 className="h5 mb-2">Список операций</h2>
        {filteredTransactions.map(transaction => (
            <div key={transaction.id} className={`transaction-item card mb-2 ${transaction.type === 'Доход' ? 'border-success' : 'border-danger'}`}>
            <div className="card-body py-2">
                <div className="d-flex justify-content-between align-items-center">
                <div className="transaction-info">
                    <span className="category fw-bold">{transaction.category}</span>
                    <div className="transaction-details">
                    <small className="text-muted">{transaction.type} • {transaction.date}</small>
                    </div>
                </div>
                <span className={`amount badge ${transaction.type === 'Доход' ? 'bg-success' : 'bg-danger'}`}>
                    {transaction.amount} ₽
                </span>
                </div>
            </div>
            </div>
        ))}
      </div>

      <Link to="/add" className="add-button btn btn-primary w-100 mt-3">
        Добавить операцию
      </Link>
    </div>
  );
};

export default TransactionsPage;