import { useEffect, useState } from 'react';
import './TransactionForm.css';

function TransactionForm({ onAdd, existing }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (existing) {
      setText(existing.text);
      setAmount(existing.amount);
      setDueDate(existing.dueDate);
    }
  }, [existing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount || !dueDate) return;
    onAdd({ text, amount: parseFloat(amount), dueDate });
    setText('');
    setAmount('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount (+ income, - expense)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">{existing ? 'Update' : 'Add'} Transaction</button>
    </form>
  );
}

export default TransactionForm;
