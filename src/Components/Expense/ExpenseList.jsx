import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <strong>{expense.description}</strong>: {expense.moneySpent} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
