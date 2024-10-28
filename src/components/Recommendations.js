import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data loading and handle possible errors
    // Instructions:
    // - Set loading to true before fetching the data.
    // - After a delay (simulated with setTimeout), set loading to false.
    // - You may simulate an error by setting the error state.
    setLoading(true);
    setTimeout(() => {
      // Simulate error in case of failure (optional)
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    // Show a loading indicator while data is being fetched
    return <CircularProgress />;
  }

  if (error) {
    // Display an error message if something goes wrong
    return <Typography color="error">{error}</Typography>;
  }

  // Implement logic to compare expenses between months
  // Instructions:
  // - Use the transactions to calculate expenses for the current and previous months.
  // - Filter transactions by type ('expense') and by month/year.
  // - Compare the total expenses of this month with last month.

  const expenses = []; // Implement logic to filter and extract expenses
  const expenseThisMonth = 0; // Calculate total expenses for the current month
  const expenseLastMonth = 0; // Calculate total expenses for the last month

  // Generate a message based on the comparison between months
  // Instructions:
  // - If there are no expenses for last month, display a message encouraging the user to keep recording.
  // - If expenses have increased, calculate the percentage increase and suggest reviewing expenses.
  // - If expenses have decreased, congratulate the user and show the percentage decrease.
  // - If expenses are the same, notify the user that their spending hasn't changed.

  const message = ""; // Implement logic to generate the appropriate message based on the comparison

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
