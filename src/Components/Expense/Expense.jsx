import React, { useState } from 'react';

const Expense = ({ addExpense }) => {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ moneySpent, description, category });
    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Money Spent:
        <input type="text" value={moneySpent} onChange={(e) => setMoneySpent(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          {/* Add more categories as needed */}
        </select>
      </label>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default Expense;
