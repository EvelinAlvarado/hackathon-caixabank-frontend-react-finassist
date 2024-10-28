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

  // Instructions:
  // - Sort the transactions by date to display the balance over time.
  // - Calculate the cumulative balance as you iterate through the sorted transactions.
  // - Each object in the 'data' array should be of the form: { date, Balance }, where 'date' is the transaction date and 'Balance' is the cumulative balance at that date.
  const data = []; // Replace with logic to calculate cumulative balance for each date.

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
