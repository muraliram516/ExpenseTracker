// components/Expenses.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, remove, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses, addExpense, editExpense, deleteExpense } from '../store/expensesSlice';
import './Expenses.css';

const Expenses = () => {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editExpenseId, setEditExpenseId] = useState(null);
  const expenses = useSelector((state) => state.expenses.items);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const dispatch = useDispatch();

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
        dispatch(setExpenses(expensesArray));
      }
    });
  }, [dispatch]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const expensesRef = ref(db, 'expenses');

    // Add new expense to Firebase
    push(expensesRef, {
      moneySpent,
      description,
      category
    }).then((res) => {
      dispatch(addExpense({ id: res.key, moneySpent, description, category }));
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
        dispatch(deleteExpense(id));
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

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const expenseRef = ref(db, `expenses/${editExpenseId}`);

    // Update expense in Firebase
    set(expenseRef, {
      moneySpent,
      description,
      category
    })
      .then(() => {
        dispatch(editExpense({ id: editExpenseId, moneySpent, description, category }));
        setEditExpenseId(null);
        setMoneySpent('');
        setDescription('');
        setCategory('');
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
      });
  };

  const handleDownload = () => {
    const csvContent = [
      ['Description', 'Money Spent', 'Category'],
      ...expenses.map(expense => [expense.description, expense.moneySpent, expense.category])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'expenses.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h1>Expenses</h1>
      <form onSubmit={editExpenseId ? handleSubmitEdit : handleAddExpense}>
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
        <button type="submit">{editExpenseId ? 'Update Expense' : 'Add Expense'}</button>
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
      {totalAmount > 10000 && (
        <div>
          <button className="premium-button">Activate Premium</button>
          <button onClick={handleDownload}>Download Expenses as CSV</button>
        </div>
      )}
    </div>
  );
};

export default Expenses;

// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, push, onValue, remove, set } from 'firebase/database';
// import { useDispatch, useSelector } from 'react-redux';
// import { setExpenses, addExpense, editExpense, deleteExpense } from '../store/expensesSlice';
// import './Expenses.css';

// const Expenses = () => {
//   const [moneySpent, setMoneySpent] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [editExpenseId, setEditExpenseId] = useState(null);
//   const expenses = useSelector((state) => state.expenses.items);
//   const totalAmount = useSelector((state) => state.expenses.totalAmount);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const db = getDatabase();
//     const expensesRef = ref(db, 'expenses');

//     // Fetch expenses from Firebase Realtime Database
//     onValue(expensesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const expensesArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key]
//         }));
//         dispatch(setExpenses(expensesArray));
//       }
//     });
//   }, [dispatch]);

//   const handleAddExpense = (e) => {
//     e.preventDefault();
//     const db = getDatabase();
//     const expensesRef = ref(db, 'expenses');

//     // Add new expense to Firebase
//     push(expensesRef, {
//       moneySpent,
//       description,
//       category
//     }).then((res) => {
//       dispatch(addExpense({ id: res.key, moneySpent, description, category }));
//     });

//     // Clear input fields
//     setMoneySpent('');
//     setDescription('');
//     setCategory('');
//   };

//   const handleDeleteExpense = (id) => {
//     const db = getDatabase();
//     const expenseRef = ref(db, `expenses/${id}`);

//     // Remove expense from Firebase
//     remove(expenseRef)
//       .then(() => {
//         dispatch(deleteExpense(id));
//         console.log("Expense successfully deleted");
//       })
//       .catch((error) => {
//         console.error("Error deleting expense:", error);
//       });
//   };

//   const handleEditExpense = (expense) => {
//     setEditExpenseId(expense.id);
//     setMoneySpent(expense.moneySpent);
//     setDescription(expense.description);
//     setCategory(expense.category);
//   };

//   const handleSubmitEdit = (e) => {
//     e.preventDefault();
//     const db = getDatabase();
//     const expenseRef = ref(db, `expenses/${editExpenseId}`);

//     // Update expense in Firebase
//     set(expenseRef, {
//       moneySpent,
//       description,
//       category
//     })
//       .then(() => {
//         dispatch(editExpense({ id: editExpenseId, moneySpent, description, category }));
//         setEditExpenseId(null);
//         setMoneySpent('');
//         setDescription('');
//         setCategory('');
//       })
//       .catch((error) => {
//         console.error("Error updating expense:", error);
//       });
//   };

//   return (
//     <div>
//       <h1>Expenses</h1>
//       <form onSubmit={editExpenseId ? handleSubmitEdit : handleAddExpense}>
//         <input
//           type="text"
//           value={moneySpent}
//           onChange={(e) => setMoneySpent(e.target.value)}
//           placeholder="Money Spent"
//         />
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//         />
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Category"
//         />
//         <button type="submit">{editExpenseId ? 'Update Expense' : 'Add Expense'}</button>
//       </form>
//       <ul>
//         {expenses.map((expense) => (
//           <li key={expense.id}>
//             {expense.moneySpent} - {expense.description} - {expense.category}
//             <button onClick={() => handleEditExpense(expense)}>Edit</button>
//             <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       {totalAmount > 10000 && <button className="premium-button">Activate Premium</button>}
//     </div>
//   );
// };

// export default Expenses;
