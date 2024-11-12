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
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

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
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {transaction.type === "income" ? "Income" : "Expense"}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString("en-US")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecentTransactions;
