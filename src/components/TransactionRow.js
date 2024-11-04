import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";

function TransactionRow({ transaction, onEdit, onDelete }) {
  return (
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
      <TableCell>
        {/* Add functionality for the edit button */}
        <Button
          variant="outlined"
          onClick={onEdit} // Open edit dialog
          sx={{ marginRight: 2 }}
        >
          Edit
        </Button>
        {/* Add functionality for the delete button */}
        <Button
          variant="outlined"
          color="error"
          onClick={onDelete} // Delete transaction
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

/* <TableRow key={transaction.id}>
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
                      sx={{ marginRight: 2 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteTransaction(transaction.id)} // Delete transaction
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow> */

export default TransactionRow;
