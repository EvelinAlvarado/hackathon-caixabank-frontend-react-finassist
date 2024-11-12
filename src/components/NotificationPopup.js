import React from "react";
import { Snackbar, Alert, Badge } from "@mui/material";

const NotificationPopup = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity="warning" sx={{ width: "300px" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationPopup;
