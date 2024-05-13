import { useEffect, useState } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
