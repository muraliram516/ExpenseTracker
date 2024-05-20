import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, remove, set } from 'firebase/database';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editExpenseId, setEditExpenseId] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const expensesRef = ref(db, 'expenses');

    // Fetch expenses from Firebase Realtime Database
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expensesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setExpenses(expensesArray);
      }
    });
  }, []);

  const handleAddExpense = () => {
    const db = getDatabase();
    const expensesRef = ref(db, 'expenses');

    // Add new expense to Firebase
    push(expensesRef, {
      moneySpent,
      description,
      category
    });

    // Clear input fields
    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

  const handleDeleteExpense = (id) => {
    const db = getDatabase();
    const expenseRef = ref(db, `expenses/${id}`);

    // Remove expense from Firebase
    remove(expenseRef)
      .then(() => {
        console.log("Expense successfully deleted");
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
      });
  };

  const handleEditExpense = (expense) => {
    setEditExpenseId(expense.id);
    setMoneySpent(expense.moneySpent);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  const handleSubmitEdit = () => {
    const db = getDatabase();
    const expenseRef = ref(db, `expenses/${editExpenseId}`);

    // Update expense in Firebase
    set(expenseRef, {
      moneySpent,
      description,
      category
    })
      .then(() => {
        setEditExpenseId(null);
        setMoneySpent('');
        setDescription('');
        setCategory('');
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
      });
  };

  return (
    <div>
      <h1>Expenses</h1>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          value={moneySpent}
          onChange={(e) => setMoneySpent(e.target.value)}
          placeholder="Money Spent"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.moneySpent} - {expense.description} - {expense.category}
            <button onClick={() => handleEditExpense(expense)}>Edit</button>
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editExpenseId && (
        <div>
          <h2>Edit Expense</h2>
          <form onSubmit={handleSubmitEdit}>
            <input
              type="text"
              value={moneySpent}
              onChange={(e) => setMoneySpent(e.target.value)}
              placeholder="Money Spent"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Expenses;
