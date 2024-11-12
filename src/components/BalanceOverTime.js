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
import { Paper, Typography } from "@mui/material";

function BalanceOverTime() {
  const transactions = useStore(transactionsStore);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const balanceByDate = {};
  let cumulativeBalance = 0;

  sortedTransactions.forEach((transaction) => {
    const date = new Date(transaction.date).toLocaleDateString("en-US");

    cumulativeBalance +=
      transaction.type === "income" ? transaction.amount : -transaction.amount;
    balanceByDate[date] = cumulativeBalance;
  });

  const data = Object.entries(balanceByDate).map(([date, balance]) => ({
    date,
    Balance: balance,
  }));

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
