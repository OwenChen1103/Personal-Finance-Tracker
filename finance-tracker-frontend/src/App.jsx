import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PieChart from './components/FinanceCharts';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5013/api/transactions')
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error('API error:', err));
  }, []);

  const handleAdd = () => {
    const type = prompt('Enter income or expense (I/E):');
    const category = prompt('Enter category:');
    const amount = parseFloat(prompt('Enter amount:'));
    if (!type || !category || isNaN(amount)) return alert('Invalid input');
  
    const newTransaction = {
      type,
      category,
      amount,
      createdAt: new Date().toISOString(),
      note: ""
    };
    axios.post('http://localhost:5013/api/transactions', newTransaction)
      .then(res => {
        setTransactions(prev => [...prev, res.data]);
      })
      .catch(err => {
        console.error('Failed to add transaction:', err);
        alert('Failed to add transaction.');
      });
  };
  
  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;
  
    axios.delete(`http://localhost:5013/api/transactions/${id}`)
      .then(() => {
        setTransactions(prev => prev.filter(tx => tx.id !== id));
      })
      .catch(err => {
        console.error('Failed to delete transaction:', err);
        alert('❌ Failed to delete transaction.');
      });
  };  

  const uniqueCategories = ['All', ...new Set(transactions.map(tx => tx.category))];

  const filteredTransactions = transactions.filter((tx) => {
    const monthIndex = new Date(tx.createdAt).getMonth().toString();
    const monthMatch = selectedMonth === 'All' || monthIndex === selectedMonth;
    const categoryMatch = selectedCategory === 'All' || tx.category === selectedCategory;
    return monthMatch && categoryMatch;
  });

  const totalIncome = filteredTransactions
    .filter(tx => tx.type === 'I')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = filteredTransactions
    .filter(tx => tx.type === 'E')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="container">
      <h1>Personal Finance Tracker</h1>

      <div className="controls">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="All">All Months</option>
          {[...Array(12).keys()].map(i => (
            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button onClick={handleAdd}>➕ Add</button>
      </div>

      <div className="main-layout">
        <div className="left-panel">
          <div className="summary">
            <div>
              <h3>Income</h3>
              <p className="income">${totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <h3>Expense</h3>
              <p className="expense">${totalExpense.toFixed(2)}</p>
            </div>
            <div>
              <h3>Balance</h3>
              <p className="balance">${balance.toFixed(2)}</p>
            </div>
          </div>

          <div className="transaction-list">
            <h2>Transactions</h2>
            <ul>
              {filteredTransactions.map((tx) => (
                <li
                  key={tx.id}
                  className={`transaction-item ${selectedTransaction?.id === tx.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <div>
                    <strong>{tx.type === 'I' ? '💵' : '💸'} {tx.category}</strong> - ${tx.amount}
                    <br />
                    <small>{new Date(tx.createdAt).toLocaleString()}</small>
                  </div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(tx.id);
                  }}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-panel">
        <div className="right-content">
          <div className="pie-chart">
            <PieChart transactions={filteredTransactions} />
          </div>
          {selectedTransaction && (
            <div className="transaction-detail show">
              <h3>Transaction Detail</h3>
              <p><strong>Type:</strong> {selectedTransaction.type === 'I' ? 'Income' : 'Expense'}</p>
              <p><strong>Category:</strong> {selectedTransaction.category}</p>
              <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
              <p><strong>Date:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>

              <label htmlFor="note">Note:</label>
              <textarea
                id="note"
                rows="3"
                value={selectedTransaction.note || ''}
                onChange={(e) =>
                  setSelectedTransaction({ ...selectedTransaction, note: e.target.value })
                }
              />
              <button
                onClick={() => {
                  axios.put(`http://localhost:5013/api/transactions/${selectedTransaction.id}`, selectedTransaction)
                    .then(res => {
                      setTransactions(prev =>
                        prev.map(tx => tx.id === selectedTransaction.id ? res.data : tx)
                      );
                      setSelectedTransaction(res.data); // 更新本地 note 顯示
                      alert('✅ Note saved successfully!');
                    })
                    .catch(err => {
                      console.error(err);
                      alert('❌ Failed to save note');
                    });
                }}
                style={{ marginTop: '0.5rem' }}
              >
                Save Note
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
