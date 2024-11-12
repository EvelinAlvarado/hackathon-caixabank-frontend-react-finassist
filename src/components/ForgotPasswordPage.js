import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useStore } from "@nanostores/react";
import { authStore } from "../stores/authStore";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const auth = useStore(authStore);
  const usersList = auth.usersList;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    const userExists = usersList.find((user) => user.email === email);

    if (userExists) {
      setError("");
      setSuccessMessage(
        "A recovery email has been sent. Please check your inbox."
      );
      return;
    } else {
      setSuccessMessage("");
      setError("Email is not found. Please register");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        marginY: 8,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          // required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send Reset Link
        </Button>
      </form>
      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default ForgotPasswordPage;
