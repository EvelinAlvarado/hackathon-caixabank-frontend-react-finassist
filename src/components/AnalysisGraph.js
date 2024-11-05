import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

function AnalysisGraph() {
  const transactions = useStore(transactionsStore);

  // Unique categories
  // Instructions:
  // - Extract unique categories from the transactions
  // - This should gather all the categories used in the 'category' field of the transactions
  // Add logic to extract unique categories from transactions
  const uniqueCategories = [...new Set(transactions.map((t) => t.category))];
  console.log("Unique Categories:", uniqueCategories);

  // Chart data
  // Instructions:
  // - Aggregate income and expense data for each category
  // - For each category, calculate the total 'income' and 'expense'
  // - The data array should return an object like this for each category: { category, Income, Expense }
  // Add logic to calculate income and expense for each category
  const data = uniqueCategories.map((category) => {
    const categoryTransactions = transactions.filter(
      (t) => t.category === category
    );
    const incomeTotal = categoryTransactions
      .filter((t) => t.type === "income")
      .reduce((total, t) => total + (t.amount || 0), 0);
    const expenseTotal = categoryTransactions
      .filter((t) => t.type === "expense")
      .reduce((total, t) => total + (t.amount || 0), 0);

    return {
      category: category,
      Income: incomeTotal,
      Expense: expenseTotal,
    };
  });
  console.log("data:", data);

  return (
    <Paper
      sx={{
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5">Income and Expenses by Category</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default AnalysisGraph;
