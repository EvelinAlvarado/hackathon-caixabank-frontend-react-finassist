import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore, login } from "../stores/authStore";
import { Box, Button, TextField, Typography, Alert, Grid } from "@mui/material";
import { useStore } from "@nanostores/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();
  const { usersList, currentUser } = useStore(authStore); // Get all status from auth store

  const defaultCredentials = {
    email: "default@example.com",
    password: "password123",
  };
  console.log(email, password);

  // console.log(
  //   "currentUser before handleLogin: ",
  //   currentUser,
  //   "usersList:",
  //   usersList
  // );

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate that fields are not empty
    // Instructions:
    // - Check if the email and password fields are filled.
    if (!email || !password) {
      // - If either is empty, set an appropriate error message.
      setError("Please complete all fields.");
      return;
    }

    // Validate credentials
    // Instructions:
    // - Check if the entered credentials match the default credentials or the stored user credentials.
    // Check for default credentials
    if (
      email === defaultCredentials.email &&
      password === defaultCredentials.password
    ) {
      const userData = { email, password };
      login(userData);
      navigate("/");
      return;
    }

    // - If valid, call the `login` function and navigate to the homepage.
    const userExists = usersList.find((user) => user.email === email);

    if (userExists) {
      if (userExists.password === password) {
        login(userExists);
        navigate("/");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } else {
      // - If invalid, set an error message.
      setError("Invalid credentials. Please register first.");
    }
  };

  const handleShowDefaultCredentials = () => {
    // Show default credentials in case the user requests it
    setEmail(defaultCredentials.email);
    setPassword(defaultCredentials.password);
    setShowCredentials(true);
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
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
      {error && (
        <>
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
          <Grid container mt={2} spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleShowDefaultCredentials}
              >
                Forgot Password
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      {/* Show error message when applicable */}
      {/* - Use the Alert component to display the error message if one exists. */}
      {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}

      {showCredentials && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>Email:</strong> {defaultCredentials.email}
          <br />
          <strong>Password:</strong> {defaultCredentials.password}
        </Alert>
      )}
    </Box>
  );
}

export default LoginPage;
