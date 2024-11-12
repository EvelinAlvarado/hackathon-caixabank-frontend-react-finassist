import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { Paper, Typography } from "@mui/material";

function Statistics() {
  const transactions = useStore(transactionsStore);
  const expenses = transactions.filter((t) => t.type === "expense");
  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

  const uniqueDates = [...new Set(expenses.map((t) => t.date))];
  console.log("uniqueDates:", uniqueDates);
  const averageDailyExpense =
    uniqueDates.length > 0 ? totalExpense / uniqueDates.length : 0;

  const categoryExpenses = {};
  expenses.forEach((t) => {
    if (!categoryExpenses[t.category]) {
      categoryExpenses[t.category] = 0;
    }
    categoryExpenses[t.category] += t.amount;
  });

  let maxCategory = { name: null, amount: 0 };
  for (const [category, amount] of Object.entries(categoryExpenses)) {
    if (amount > maxCategory.amount) {
      maxCategory = { name: category, amount: amount };
    }
  }

  return (
    <Paper sx={{ padding: 2, mt: 2 }}>
      <Typography variant="h6">Key Statistics</Typography>
      <Typography>
        Average Daily Expense: {averageDailyExpense.toFixed(2)} €
      </Typography>
      <Typography>
        Highest Spending Category:{" "}
        {maxCategory.name
          ? `${maxCategory.name} (${maxCategory.amount.toFixed(2)} €)`
          : "No data available"}
      </Typography>
    </Paper>
  );
}

export default Statistics;
