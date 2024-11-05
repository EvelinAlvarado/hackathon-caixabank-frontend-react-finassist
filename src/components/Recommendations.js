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
    // Simulate data loading and handle possible errors
    // Instructions:
    // - Set loading to true before fetching the data.
    // - After a delay (simulated with setTimeout), set loading to false.
    // - You may simulate an error by setting the error state.
    setLoading(true);
    setTimeout(() => {
      // Simulate error in case of failure (optional)
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
    // Implement logic to compare expenses between months
    // Instructions:
    // - Use the transactions to calculate expenses for the current and previous months.
    // - Filter transactions by type ('expense') and by month/year.
    // - Compare the total expenses of this month with last month.
    if (!loading && !error) {
      const expenses = transactions.filter((t) => t.type === "expense"); // Implement logic to filter and extract expenses
      const currentMonth = new Date().getMonth();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

      // Calculate total expenses for the current month
      let expenseThisMonth = 0;
      expenses.forEach((el) => {
        const expenseMonth = new Date(el.date).getMonth();
        if (currentMonth === expenseMonth) {
          expenseThisMonth += el.amount;
        }
      });

      // Calculate total expenses for the last month
      let expenseLastMonth = 0;
      expenses.forEach((el) => {
        const expenseMonth = new Date(el.date).getMonth();
        if (lastMonth === expenseMonth) {
          expenseLastMonth += el.amount;
        }
      });

      if (!expenseLastMonth) {
        // - If there are no expenses for last month, display a message encouraging the user to keep recording.
        setMessage("This is your first month recording expenses. Keep it up!");
      } else if (expenseThisMonth > expenseLastMonth) {
        // - If expenses have increased, calculate the percentage increase and suggest reviewing expenses.
        const percentageIncrease = (
          ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) *
          100
        ).toFixed(2);
        setMessage(
          `Your expenses have increased by ${percentageIncrease}% compared to last month. Consider reviewing your expenses.`
        );
      } else if (expenseThisMonth < expenseLastMonth) {
        // - If expenses have decreased, congratulate the user and show the percentage decrease.
        const percentageDecrease = (
          ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) *
          100
        ).toFixed(2);
        setMessage(
          `Great job! You have reduced your expenses by ${percentageDecrease}% compared to last month.`
        );
      } else {
        // - If expenses are the same, notify the user that their spending hasn't changed.
        setMessage("Your expenses remain the same as last month.");
      }
    }
  }, [loading, error, transactions]);

  if (loading) {
    // Show a loading indicator while data is being fetched
    return <CircularProgress />;
  }

  if (error) {
    // Display an error message if something goes wrong
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
        {/* Display the recommendation message according to the change in expenditure */}
        <Typography>{message}</Typography>
      </Paper>
    </Box>
  );
}

export default Recommendations;
