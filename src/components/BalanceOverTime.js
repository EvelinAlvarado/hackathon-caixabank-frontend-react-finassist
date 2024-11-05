import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { colors, Paper, Typography } from "@mui/material";

function BalanceOverTime() {
  const transactions = useStore(transactionsStore);

  // Instructions:
  // - Sort the transactions by date to display the balance over time.
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const balanceByDate = {};
  let cumulativeBalance = 0;
  // - Calculate the cumulative balance as you iterate through the sorted transactions.
  sortedTransactions.forEach((transaction) => {
    const date = new Date(transaction.date).toLocaleDateString("en-US");

    cumulativeBalance +=
      transaction.type === "income" ? transaction.amount : -transaction.amount;
    // accumulate until actual date
    balanceByDate[date] = cumulativeBalance;
  });

  // console.log("balanceByDate", balanceByDate);
  // - Each object in the 'data' array should be of the form: { date, Balance }, where 'date' is the transaction date and 'Balance' is the cumulative balance at that date.
  // Replace with logic to calculate cumulative balance for each date.
  const data = Object.entries(balanceByDate).map(([date, balance]) => ({
    date,
    Balance: balance,
  }));
  // console.log("data:", data);

  return (
    <Paper
      sx={{
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5">Balance Over Time</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default BalanceOverTime;
