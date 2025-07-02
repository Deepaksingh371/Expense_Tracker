import { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import './Dashboard.css';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addTransaction = (txn) => {
    if (editIndex !== null) {
      const updated = [...transactions];
      updated[editIndex] = txn;
      setTransactions(updated);
      setEditIndex(null);
    } else {
      setTransactions([txn, ...transactions]);
    }
  };

  const handleDelete = (index) => {
    const updated = [...transactions];
    updated.splice(index, 1);
    setTransactions(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.dueDate) - new Date(a.dueDate);
  });

  return (
    <div className="dashboard">
      <h2>Expense Tracker</h2>
      <div className="balance-card">
        <h3>Current Balance</h3>
        <p className={total >= 0 ? 'green' : 'red'}>₹ {total}</p>
      </div>
      <TransactionForm onAdd={addTransaction} existing={editIndex !== null ? transactions[editIndex] : null} />
      <TransactionList transactions={sortedTransactions} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default Dashboard;
