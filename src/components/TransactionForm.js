import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  addTransaction,
  setTransactions,
  transactionsStore,
} from "../stores/transactionStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Alert,
} from "@mui/material";
import { categoryKeywords } from "../constants/categoryKeywords";
import { allCategories } from "../constants/categories";

function TransactionForm({ transactionToEdit, handleClose, openDialog }) {
  const transactions = useStore(transactionsStore);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Other Expenses");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  const assignCategory = (desc) => {
    const lowerDesc = desc.toLowerCase();

    for (let cat in categoryKeywords) {
      const keywords = categoryKeywords[cat];
      console.log("Revisando categoría:", cat);

      for (let keyword of keywords) {
        if (keyword.toLowerCase().startsWith(lowerDesc)) {
          return cat;
        }
      }
    }
    return "Other Expenses";
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("Other Expenses");
    setDate(new Date().toISOString().split("T")[0]);
    setError("");
  };

  useEffect(() => {
    if (!transactionToEdit && description) {
      setCategory(assignCategory(description));
    }
  }, [description, transactionToEdit]);

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount); //.toString()
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
      setDate(transactionToEdit.date);
    } else {
      resetForm();
    }
  }, [transactionToEdit]);

  useEffect(() => {
    if (!openDialog) {
      resetForm();
    }
  }, [openDialog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category) {
      setError("All fields are required.");
      return;
    } else {
      setError("");
    }

    const transaction = {
      id: transactionToEdit ? transactionToEdit.id : Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    if (transactionToEdit) {
      const updatedTransactions = transactions.map((t) =>
        t.id === transactionToEdit.id ? transaction : t
      );
      setTransactions(updatedTransactions);
    } else {
      addTransaction(transaction);
    }
    console.log("transaction:", transaction);
    handleClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                margin="normal"
                name="description"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount (€)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
                inputProps={{ min: 0, step: "0.01" }}
                name="amount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                  name="type"
                  inputProps={{ name: "filterTypeForm" }}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  name="category"
                  inputProps={{ name: "filterCategoryForm" }}
                >
                  {allCategories.map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                      selected={category === "Other Expenses"}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Select Date"
                type="date"
                margin="normal"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: 2,
            }}
          >
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add-transaction-button"
            >
              {transactionToEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogActions>
        {error && (
          <DialogContent>
            <Alert severity="error">{error}</Alert>
          </DialogContent>
        )}
      </form>
    </Dialog>
  );
}

export default TransactionForm;
