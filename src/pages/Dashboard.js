// // // import { useState } from 'react';
// // // import TransactionForm from '../components/TransactionForm';
// // // import TransactionList from '../components/TransactionList';
// // // import './Dashboard.css';

// // // function Dashboard() {
// // //   const [transactions, setTransactions] = useState([]);
// // //   const [editIndex, setEditIndex] = useState(null);

// // //   const addTransaction = (txn) => {
// // //     if (editIndex !== null) {
// // //       const updated = [...transactions];
// // //       updated[editIndex] = txn;
// // //       setTransactions(updated);
// // //       setEditIndex(null);
// // //     } else {
// // //       setTransactions([txn, ...transactions]);
// // //     }
// // //   };

// // //   const handleDelete = (index) => {
// // //     const updated = [...transactions];
// // //     updated.splice(index, 1);
// // //     setTransactions(updated);
// // //   };

// // //   const handleEdit = (index) => {
// // //     setEditIndex(index);
// // //   };

// // //   const total = transactions.reduce((acc, t) => acc + t.amount, 0);

// // //   const sortedTransactions = [...transactions].sort((a, b) => {
// // //     return new Date(b.dueDate) - new Date(a.dueDate);
// // //   });

// // //   return (
// // //     <div className="dashboard">
// // //       <h2>Expense Tracker</h2>
// // //       <div className="balance-card">
// // //         <h3>Current Balance</h3>
// // //         <p className={total >= 0 ? 'green' : 'red'}>₹ {total}</p>
// // //       </div>
// // //       <TransactionForm onAdd={addTransaction} existing={editIndex !== null ? transactions[editIndex] : null} />
// // //       <TransactionList transactions={sortedTransactions} onDelete={handleDelete} onEdit={handleEdit} />
// // //     </div>
// // //   );
// // // }

// // // export default Dashboard;
// // // 📁 src/pages/Dashboard.js
// // import { saveAs } from 'file-saver';
// // import Papa from 'papaparse';
// // import { useEffect, useState } from 'react';
// // import TransactionForm from '../components/TransactionForm';
// // import TransactionList from '../components/TransactionList';
// // import './Dashboard.css';

// // const Dashboard = () => {
// //   const [transactions, setTransactions] = useState([]);
// //   const [editingTransaction, setEditingTransaction] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filters, setFilters] = useState({ category: '', date: '' });
// //   const [budget, setBudget] = useState(5000);

// //   useEffect(() => {
// //     const saved = JSON.parse(localStorage.getItem("transactions"));
// //     if (saved) setTransactions(saved);
// //   }, []);

// //   useEffect(() => {
// //     localStorage.setItem("transactions", JSON.stringify(transactions));
// //   }, [transactions]);

// //   const handleSubmit = (data) => {
// //     if (editingTransaction) {
// //       setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? { ...data, id: t.id } : t));
// //     } else {
// //       setTransactions([...transactions, { ...data, id: Date.now() }]);
// //     }
// //     setEditingTransaction(null);
// //   };

// //   const deleteTransaction = (id) => {
// //     setTransactions(transactions.filter(t => t.id !== id));
// //   };

// //   const editTransaction = (txn) => {
// //     setEditingTransaction(txn);
// //   };

// //   const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
// //   const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

// //   const exportCSV = () => {
// //     const csv = Papa.unparse(transactions);
// //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
// //     saveAs(blob, 'transactions.csv');
// //   };

// //   const filtered = transactions.filter(txn =>
// //     txn.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
// //     (!filters.category || txn.category === filters.category) &&
// //     (!filters.date || txn.date === filters.date)
// //   );

// //   return (
// //     <div className="container">
// //       <h2>Dashboard</h2>

// //       <div className="filters">
// //         <input
// //           type="text"
// //           placeholder="Search by title..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />

// //         <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
// //           <option value="">All Categories</option>
// //           <option value="Food">Food</option>
// //           <option value="Transport">Transport</option>
// //           <option value="Shopping">Shopping</option>
// //         </select>

// //         <input
// //           type="date"
// //           onChange={(e) => setFilters({ ...filters, date: e.target.value })}
// //         />
// //       </div>

// //       <TransactionForm
// //         onSubmit={handleSubmit}
// //         editingTransaction={editingTransaction}
// //         setEditingTransaction={setEditingTransaction}
// //       />

// //       <TransactionList
// //         transactions={filtered}
// //         deleteTransaction={deleteTransaction}
// //         editTransaction={editTransaction}
// //       />

// //       <div className="summary card">
// //         <p>Total Income: ₹{income}</p>
// //         <p>Total Expense: ₹{expense}</p>
// //         <p>Balance: ₹{income - expense}</p>
// //         <p>Budget Limit: ₹{budget}</p>
// //         {expense > budget && (
// //           <p className="alert">⚠️ Budget limit exceeded!</p>
// //         )}
// //         <button onClick={exportCSV}>⬇️ Export CSV</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import { saveAs } from 'file-saver';
// import Papa from 'papaparse';
// import { useEffect, useState } from 'react';
// import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
// import TransactionForm from '../components/TransactionForm';
// import TransactionList from '../components/TransactionList';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [editingTransaction, setEditingTransaction] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({ category: '', date: '' });
//   const [budget, setBudget] = useState(5000);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("transactions"));
//     if (saved) setTransactions(saved);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   const handleSubmit = (data) => {
//     if (editingTransaction) {
//       setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? { ...data, id: t.id } : t));
//     } else {
//       setTransactions([...transactions, { ...data, id: Date.now() }]);
//     }
//     setEditingTransaction(null);
//   };

//   const deleteTransaction = (id) => {
//     setTransactions(transactions.filter(t => t.id !== id));
//   };

//   const editTransaction = (txn) => {
//     setEditingTransaction(txn);
//   };

//   const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
//   const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

//   const exportCSV = () => {
//     const csv = Papa.unparse(transactions);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'transactions.csv');
//   };

//   const filtered = transactions.filter(txn =>
//     txn.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (!filters.category || txn.category === filters.category) &&
//     (!filters.date || txn.date === filters.date)
//   );

//   const pieData = [
//     { name: 'Income', value: income },
//     { name: 'Expense', value: expense }
//   ];

//   const pieColors = ['#00b894', '#d63031'];

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>

//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
//           <option value="">All Categories</option>
//           <option value="Food">Food</option>
//           <option value="Transport">Transport</option>
//           <option value="Shopping">Shopping</option>
//         </select>

//         <input
//           type="date"
//           onChange={(e) => setFilters({ ...filters, date: e.target.value })}
//         />
//       </div>

//       <TransactionForm
//         onSubmit={handleSubmit}
//         editingTransaction={editingTransaction}
//         setEditingTransaction={setEditingTransaction}
//       />

//       <TransactionList
//         transactions={filtered}
//         deleteTransaction={deleteTransaction}
//         editTransaction={editTransaction}
//       />

//       <div className="summary">
//         <p><strong>Total Income:</strong> ₹{income}</p>
//         <p><strong>Total Expense:</strong> ₹{expense}</p>
//         <p><strong>Balance:</strong> ₹{income - expense}</p>
//         <p><strong>Budget Limit:</strong> ₹{budget}</p>
//         {expense > budget && (
//           <p className="alert">⚠️ Budget limit exceeded!</p>
//         )}
//         <button onClick={exportCSV}>⬇️ Export CSV</button>
//       </div>

//       <div className="chart-box">
//         <PieChart width={250} height={250}>
//           <Pie
//             dataKey="value"
//             data={pieData}
//             outerRadius={80}
//             label
//           >
//             {pieData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// 📁 src/pages/Dashboard.js
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import './Dashboard.css';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: '', date: '' });
  const [budget, setBudget] = useState(5000);
  const COLORS = ['#00C49F', '#FF8042'];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) setTransactions(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleSubmit = (data) => {
    if (editingTransaction) {
      setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? { ...data, id: t.id } : t));
    } else {
      setTransactions([...transactions, { ...data, id: Date.now() }]);
    }
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (txn) => {
    setEditingTransaction(txn);
  };

  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const exportCSV = () => {
    const csv = Papa.unparse(transactions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'transactions.csv');
  };

  const filtered = transactions.filter(txn =>
    txn.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filters.category || txn.category === filters.category) &&
    (!filters.date || txn.date === filters.date)
  );

  const pieData = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense }
  ];

  const barData = Object.values(transactions.reduce((acc, txn) => {
    const cat = txn.category || 'Other';
    acc[cat] = acc[cat] || { category: cat, income: 0, expense: 0 };
    acc[cat][txn.type] += txn.amount;
    return acc;
  }, {}));

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
        </select>

        <input
          type="date"
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      <TransactionForm
        onSubmit={handleSubmit}
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />

      <TransactionList
        transactions={filtered}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />

      <div className="summary">
        <p><strong>Total Income:</strong> ₹{income}</p>
        <p><strong>Total Expense:</strong> ₹{expense}</p>
        <p><strong>Balance:</strong> ₹{income - expense}</p>
        <p><strong>Budget Limit:</strong> ₹{budget}</p>
        {expense > budget && <p className="alert">⚠️ Budget limit exceeded!</p>}
        <button onClick={exportCSV}>⬇️ Export CSV</button>
      </div>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#00C49F" />
            <Bar dataKey="expense" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
