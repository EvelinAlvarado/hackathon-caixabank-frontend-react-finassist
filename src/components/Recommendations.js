import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        if (false) {
          throw new Error("Failed to load data.");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const expenses = transactions.filter((t) => t.type === "expense");
      const currentMonth = new Date().getMonth();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

      let expenseThisMonth = 0;
      expenses.forEach((el) => {
        const expenseMonth = new Date(el.date).getMonth();
        if (currentMonth === expenseMonth) {
          expenseThisMonth += el.amount;
        }
      });

      let expenseLastMonth = 0;
      expenses.forEach((el) => {
        const expenseMonth = new Date(el.date).getMonth();
        if (lastMonth === expenseMonth) {
          expenseLastMonth += el.amount;
        }
      });

      if (!expenseLastMonth) {
        setMessage("This is your first month recording expenses. Keep it up!");
      } else if (expenseThisMonth > expenseLastMonth) {
        const percentageIncrease = (
          ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) *
          100
        ).toFixed(2);
        setMessage(
          `Your expenses have increased by ${percentageIncrease}% compared to last month. Consider reviewing your expenses.`
        );
      } else if (expenseThisMonth < expenseLastMonth) {
        const percentageDecrease = (
          ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) *
          100
        ).toFixed(2);
        setMessage(
          `Great job! You have reduced your expenses by ${percentageDecrease}% compared to last month.`
        );
      } else {
        setMessage("Your expenses remain the same as last month.");
      }
    }
  }, [loading, error, transactions]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Paper
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Recommendations</Typography>
        <Typography>{message}</Typography>
      </Paper>
    </Box>
  );
}

export default Recommendations;
