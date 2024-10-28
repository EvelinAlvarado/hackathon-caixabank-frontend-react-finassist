import React, { useState, useMemo, useCallback } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { allCategories } from "../constants/categories";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TransactionForm from "./TransactionForm";

function TransactionList() {
  const transactions = useStore(transactionsStore);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  // Implement delete functionality
  // Instructions:
  // - Implement the logic to delete a transaction by its ID.
  // - Make sure the transactions state/store is updated after deletion.
  const deleteTransaction = useCallback(
    (id) => {
      // Implement functionality to delete a transaction
    },
    [transactions]
  );

  // Implement edit functionality
  // Instructions:
  // - Implement logic to edit a transaction.
  // - Ensure the updated transaction is saved in the store.
  const handleEdit = useCallback((transaction) => {
    // Implement functionality to edit a transaction
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Transaction List
      </Typography>

      {/* Add transaction */}
      {/* Instructions:
                - Implement the logic to open a form for adding a new transaction.
                - Trigger the form/modal through the onClick event. */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          /* onClick={() => {
          }} */
          /* Implement functionality to add transaction */
        >
          Add Transaction
        </Button>
        <TransactionForm handleClose={handleClose} openDialog={openDialog} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FileDownloadIcon />}
        >
          Export Transitions
        </Button>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<FileDownloadIcon />}
        sx={{ marginBottom: 2 }}
      >
        Download Profiler Data
      </Button>

      {/* Filters */}
      {/* Instructions:
                - Implement category and type filters using Material UI's `Select` component.
                - Update the filterCategory and filterType state values when the user makes a selection.
                - Apply the selected filters to the displayed transactions. */}
      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {/* Add additional categories dynamically */}
            {allCategories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-type-label">Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="sort-field-label">Sort By</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table of transactions */}
      {/* Instructions:
                - Render the transactions in a table format using Material UI's `Table` component.
                - For each transaction, display the following details: description, amount, type, category, and date.
                - Implement the action buttons (Edit, Delete) within each row for managing transactions. */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over the transactions and render each transaction as a row.
                            - For each row, add logic for Edit and Delete actions.
                            - Display the transaction data in the respective table cells. */}
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount.toFixed(2)} €</TableCell>
                <TableCell>
                  {transaction.type === "income" ? "Income" : "Expense"}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(transaction)} // Open edit dialog
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteTransaction(transaction.id)} // Delete transaction
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TransactionList;
