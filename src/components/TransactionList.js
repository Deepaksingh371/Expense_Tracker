import './TransactionList.css';

function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <div className="txn-list">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((txn, index) => (
          <li key={index} className={txn.amount >= 0 ? 'income' : 'expense'}>
            <div>
              <strong>{txn.text}</strong> <br />
              <small>Due: {txn.dueDate}</small>
            </div>
            <span>₹{txn.amount}</span>
            <div className="btn-group">
              <button onClick={() => onEdit(index)}>✏️</button>
              <button onClick={() => onDelete(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
