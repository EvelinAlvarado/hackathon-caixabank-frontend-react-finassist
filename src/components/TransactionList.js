import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { setTransactions, transactionsStore } from "../stores/transactionStore";
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
  TablePagination,
} from "@mui/material";
import { allCategories } from "../constants/categories";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TransactionForm from "./TransactionForm";
import TransactionRow from "./TransactionRow";
import ExportButton from "./ExportButton";

function TransactionList() {
  const transactions = useStore(transactionsStore);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setTransactionToEdit(null);
  };

  const deleteTransaction = useCallback(
    (id) => {
      const updatedTransactions = transactions.filter((t) => t.id !== id);
      setTransactions(updatedTransactions);
    },
    [transactions]
  );

  const handleEdit = useCallback((transaction) => {
    setTransactionToEdit(transaction);
    handleClickOpen();
  }, []);

  const filteredTransactions = useMemo(() => {
    const categoryAndType = transactions.filter((transaction) => {
      const matchesCategory =
        filterCategory === "" || transaction.category === filterCategory;
      const matchesType = filterType === "" || transaction.type === filterType;

      return matchesCategory && matchesType;
    });

    const sortedTransactions = categoryAndType.sort((a, b) => {
      if (sortField === "amount") {
        return b.amount - a.amount;
      } else if (sortField === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

    return sortedTransactions;
  }, [transactions, filterCategory, filterType, sortField]);

  useEffect(() => {
    setPage(0);
  }, [filterCategory, filterType]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Transaction List
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Transaction
        </Button>
        <TransactionForm
          transactionToEdit={transactionToEdit}
          handleClose={handleClose}
          openDialog={openDialog}
        />
        <ExportButton
          data={transactions}
          label="Export Transactions"
          fileName="transactions"
        />
      </Box>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<FileDownloadIcon />}
        sx={{ marginBottom: 2 }}
      >
        Download Profiler Data
      </Button>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {allCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
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
      <TableContainer component={Paper} sx={{ marginY: 4 }}>
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
            {filteredTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TransactionRow
                  transaction={transaction}
                  onEdit={() => handleEdit(transaction)}
                  onDelete={() => deleteTransaction(transaction.id)}
                />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default TransactionList;
