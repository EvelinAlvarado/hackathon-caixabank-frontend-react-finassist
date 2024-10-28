import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function RecentTransactions({ transactions }) {
  // Recent transactions
  // Instructions:
  // - Sort the transactions by date, showing the most recent first.
  // - Extract only the last 5 transactions for display.
  const recentTransactions = []; // Implement logic to get the last 5 transactions

  return (
    <div>
      <h3 style={{ marginTop: "18px", marginBottom: "18px" }}>
        Recent Transactions
      </h3>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Instructions:
                            - Map over the recentTransactions array and render each transaction in a table row.
                            - For each row, display the transaction's description, amount, type (income/expense), category, and date.
                            - Ensure that the amount is formatted to two decimal places. */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecentTransactions;
