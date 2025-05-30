import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ transactions }) {
  const expenseData = transactions.filter(tx => tx.type === 'E');
  const categoryTotals = {};
  expenseData.forEach(tx => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      label: 'Expenses by Category',
      data: Object.values(categoryTotals),
      backgroundColor: ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#c084fc'],
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h3 style={{ textAlign: 'center' }}>Expenses by Category</h3>
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default PieChart;
