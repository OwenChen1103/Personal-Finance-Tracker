# 💸 Personal Finance Tracker

A modern and responsive web app for managing personal finances. Easily track your income and expenses by category, add notes to each transaction, and visualize spending with pie charts.

---

## ✨ Features

- Add / delete income and expense transactions
- Filter by month and category
- View real-time summary (income, expenses, balance)
- Visualize expenses by category (Pie Chart)
- Add and edit notes for each transaction
- Smooth UI animations and dark theme

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Axios, Chart.js (`react-chartjs-2`)
- **Backend**: .NET Web API (C#)
- **Styling**: CSS3, Google Fonts (Inter)
- **Charts**: Chart.js wrapped by `react-chartjs-2`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/OwenChen1103/Personal-Finance-Tracker.git
cd Personal-Finance-Tracker

### 2. Install dependencies

```bash
npm install
cd finance-tracker-frontend
npm install
cd ../finance-tracker-backend/FinanceTracker.Api
dotnet restore
```

### 3. Run the project

```bash
npm start
```

This command will:

- Start the **frontend** at [http://localhost:5173](http://localhost:5173)
- Start the **backend** at [http://localhost:5013](http://localhost:5013)

> This is made possible by the `start` script in the root `package.json`, which uses `concurrently` to launch both services at once.

