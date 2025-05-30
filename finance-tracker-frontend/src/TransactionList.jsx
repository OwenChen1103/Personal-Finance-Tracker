import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5013/api/transactions')
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.error('Error', err);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Personal Finance Tracker</h1>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            <strong>{tx.type === 'income' ? '💵' : '💸'} {tx.category}</strong> - ${tx.amount} <br />
            <small>{new Date(tx.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
