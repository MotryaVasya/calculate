// src/components/AddTransaction.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRANSACTIONS } from '../data/transactions';

const AddTransaction = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    category: '',
    type: 'Расход',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = {
    'Доход': ['Зарплата', 'Фриланс', 'Инвестиции', 'Подарок', 'Премия'],
    'Расход': ['Продукты', 'Транспорт', 'Развлечения', 'ЖКХ', 'Одежда', 'Рестораны', 'Здоровье']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTransaction = {
      id: TRANSACTIONS.length+1, 
      category: formData.category,
      type: formData.type,
      amount: Number(formData.amount),
      date: formData.date
    };

    TRANSACTIONS.push(newTransaction)

    navigate('/transactions');
  };

  return (
    <div className="add-transaction container mt-3">
      <h1 className="h4 mb-3">Добавить операцию</h1>
      
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group mb-3">
          <label className="form-label">Тип операции:</label>
          <select name="type" value={formData.type} onChange={handleChange} className="form-select">
            <option value="Доход">Доход</option>
            <option value="Расход">Расход</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Категория:</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Выберите категорию</option>
            {categories[formData.type].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Сумма:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            className="form-control"
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Дата:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-actions d-grid gap-2">
          <button type="submit" className="submit-button btn btn-primary">
            Добавить операцию
          </button>
          <button 
            type="button" 
            className="cancel-button btn btn-outline-secondary"
            onClick={() => navigate('/transactions')}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;