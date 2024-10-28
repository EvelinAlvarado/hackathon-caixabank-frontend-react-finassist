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
} from "@mui/material";
import { categoryKeywords } from "../constants/categoryKeywords";
import { allCategories } from "../constants/categories";
import { Input } from "@mui/icons-material";

function TransactionForm({ transactionToEdit, handleClose, openDialog }) {
  const transactions = useStore(transactionsStore);

  // Local state variables
  // Instructions:
  // - Ensure the form fields are correctly initialized when in "edit mode."
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Other Expenses");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Implement the function to assign a category based on description keywords
  const assignCategory = (desc) => {
    // Instructions:
    // - Loop through `categoryKeywords` to find matching keywords
    // - If a keyword is found in the description, return the category
    // - Return 'Other Expenses' if no category is found
    const lowerDesc = desc.toLowerCase();

    for (let category in categoryKeywords) {
      const keywords = categoryKeywords[category];

      for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i].toLowerCase();
        if (lowerDesc.includes(keyword)) {
          return category;
        }
      }
    }
    return "Other Expenses";
  };

  // Auto-assign a category if adding a new transaction
  useEffect(() => {
    if (!transactionToEdit) {
      // Instructions:
      // - Call the `assignCategory` function to determine the category based on the description
      // - Then, update the category state with the result
    }

    // Instructions: Add the proper dependencies to the useEffect hook
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Instructions:
    // - Validate that all fields are filled in.
    // - If editing, update the transaction in the store.
    // - If adding a new transaction, create it and save it to the store.
    // - The transaction type should be either "income" or "expense".
    // - Ensure the transaction has the following structure: { id, description, amount, type, category, date }
    if (!description || !amount || !type || !category || !date) {
      alert("All fields are required.");
      return;
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
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                required
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
                required
                inputProps={{ min: 0, step: "0.01" }}
                name="amount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
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
                  {/* Instructions: Use the `allCategories` imported file to render the categories as menu items */}
                  {allCategories.map((category) => (
                    <MenuItem value={category}>{category}</MenuItem>
                  ))}
                  <MenuItem value="Other Expenses" selected>
                    Other Expenses
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Fill in the remaining field for date type */}
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
      </form>
    </Dialog>
  );
}

export default TransactionForm;
