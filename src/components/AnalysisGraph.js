import React from "react";
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
import { useFinancialCalculations } from "../custom-hooks/useFinancialCalculations";

function AnalysisGraph() {
  const { incomeExpensePerCategory } = useFinancialCalculations();

  const data = incomeExpensePerCategory;
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
