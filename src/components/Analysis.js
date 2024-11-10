import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ExportButton from "./ExportButton"; // Import the refactored ExportButton
import getWeekNumber from "../utils/getWeekNumber";
import { userSettingsStore } from "../stores/userSettingsStore";

function Analysis() {
  const transactions = useStore(transactionsStore);
  const userSettings = useStore(userSettingsStore);

  const [timeFrame, setTimeFrame] = useState("monthly");
  const [reportType, setReportType] = useState("trend");

  const handleChangeTimeFrame = (e) => {
    setTimeFrame(e.target.value);
  };
  console.log(timeFrame);

  const handleChangeReportType = (e) => {
    setReportType(e.target.value);
  };

  const transactionsSorted = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Prepare the data for the trend analysis report based on the selected time frame (daily, weekly, monthly, yearly).
  // Each object in the array should have the structure: { key, income, expense }
  // Replace with logic to group transactions by the selected time frame.
  const trendData = transactionsSorted.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    let key = "";

    if (timeFrame === "daily") {
      key = date.toLocaleDateString();
    } else if (timeFrame === "weekly") {
      key = `Week ${getWeekNumber(date)}`;
    } else if (timeFrame === "monthly") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    } else if (timeFrame === "yearly") {
      key = date.getFullYear().toString();
    }

    const existingAcc = acc.find((item) => item.key === key);

    if (existingAcc) {
      existingAcc.income +=
        transaction.type === "income" ? transaction.amount : 0;
      existingAcc.expense +=
        transaction.type === "expense" ? transaction.amount : 0;
    } else {
      acc.push({
        key,
        income: transaction.type === "income" ? transaction.amount : 0,
        expense: transaction.type === "expense" ? transaction.amount : 0,
      });
    }

    return acc;
  }, []);
  // console.log("trendData and ", timeFrame, ": ", trendData);

  // Prepare the data for the budget vs actual report.
  // Each object in the array should have the structure: { key, budget, actual }
  // Replace with logic to compare the actual expenses against the budget.

  const budgetData = transactionsSorted.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    let key = "";

    if (reportType === "budget") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    }

    const existingAcc = acc.find((item) => item.key === key);

    if (existingAcc) {
      existingAcc.Actual +=
        transaction.type === "expense" ? transaction.amount : 0;
    } else {
      acc.push({
        key,
        Budget: Number(userSettings.totalBudgetLimit),
        Actual: transaction.type === "expense" ? transaction.amount : 0,
      });
    }
    return acc;
  }, []);
  // console.log("budgetData: ", budgetData);

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Advanced Analysis
      </Typography>

      {/* Display No Transactions Message */}
      {transactions.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          No transactions available.
        </Typography>
      )}

      {/* Controls */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
            <Select
              labelId="timeframe-select-label"
              id="timeframe-select"
              label="Time Frame"
              // Implement logic to update the time frame state
              value={timeFrame}
              onChange={handleChangeTimeFrame}
              disabled={reportType === "budget"}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="report-type-select-label">Report Type</InputLabel>
            <Select
              labelId="report-type-select-label"
              id="report-type-select"
              label="Report Type"
              // Implement logic to update the report type state
              value={reportType}
              onChange={handleChangeReportType}
            >
              <MenuItem value="trend">Trend Analysis</MenuItem>
              <MenuItem value="budget">Budget vs. Actual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Export Button */}
        {/* Instructions:
                    - Implement the ExportButton component with the appropriate data and headers.
                    - The data and headers should be based on the selected report type. */}
        <Grid item xs={12} sm={6} md={4}>
          <ExportButton
            data={reportType === "trend" ? trendData : budgetData}
            label="Export Report"
            fileName={
              reportType === "trend"
                ? `trend-report-${timeFrame}`
                : "budget-report"
            }
          />
        </Grid>
      </Grid>

      {/* Render the trend analysis chart if 'trend' is selected */}
      {reportType === "trend" && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Income and Expenses Trend
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#28B463"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#E74C3C"
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Render the budget vs actual expenses chart if 'budget' is selected */}
      {/* Implement the Budget vs. Actual Expenses report
                Instructions:
                - Display a bar chart comparing the budgeted amounts to the actual expenses.
                - Use the budgetData array to render the chart.
            */}
      {reportType === "budget" && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Budget vs. Actual Expenses
              </Typography>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Budget" fill="#FFC658" />
                  <Bar dataKey="Actual" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Additional Analysis Sections */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Savings Goals
            </Typography>
            <Typography>No savings goals set.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Net Worth Over Time
            </Typography>
            <Typography>No net worth data available.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;
