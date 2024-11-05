import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { Paper, Typography } from "@mui/material";

function Statistics() {
  const transactions = useStore(transactionsStore);

  // Filter transactions by 'expense' type
  // Instructions:
  // - Implement logic to filter the transactions array to only include expenses.
  // Replace with logic to filter expenses
  const expenses = transactions.filter((t) => t.type === "expense");
  // console.log("expenses:", expenses);

  // Calculate total expense
  // Instructions:
  // - Sum the amounts of all expense transactions.
  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0); // Replace with logic to calculate total expense

  // console.log("totalExpense:", totalExpense);

  // Get unique dates from expenses
  // Instructions:
  // - Extract the unique dates from the expense transactions.
  // - Calculate the average daily expense.
  const uniqueDates = [...new Set(expenses.map((t) => t.date))]; // Replace with logic to get unique dates
  console.log("uniqueDates:", uniqueDates);
  const averageDailyExpense =
    uniqueDates.length > 0 ? totalExpense / uniqueDates.length : 0; // Replace with logic to calculate average daily expense

  // Find the category with the highest spending
  // Instructions:
  // - Use the categoryExpenses object to accumulate the total amount spent in each category.
  const categoryExpenses = {};
  expenses.forEach((t) => {
    if (!categoryExpenses[t.category]) {
      categoryExpenses[t.category] = 0;
    }
    categoryExpenses[t.category] += t.amount;
  });
  // console.log("categoryExpenses:", categoryExpenses);
  // - Implement logic to determine which category has the highest total expense.
  // - Ensure that `maxCategory` contains the category with the highest spending.
  // Replace with logic to calculate expenses per category
  let maxCategory = { name: null, amount: 0 };
  for (const [category, amount] of Object.entries(categoryExpenses)) {
    if (amount > maxCategory.amount) {
      maxCategory = { name: category, amount: amount };
    }
  }
  // console.log("maxCategory:", maxCategory);

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
