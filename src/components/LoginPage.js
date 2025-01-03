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
  const { usersList } = useStore(authStore);

  const defaultCredentials = {
    email: "default@example.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please complete all fields.");
      return;
    }

    if (
      email === defaultCredentials.email &&
      password === defaultCredentials.password
    ) {
      const userData = { email, password };
      login(userData);
      navigate("/");
      return;
    }

    const userExists = usersList.find((user) => user.email === email);

    if (userExists) {
      if (userExists.password === password) {
        login(userExists);
        navigate("/");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } else {
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
                // onClick={handleShowDefaultCredentials}
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </Button>
            </Grid>
          </Grid>
        </>
      )}

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
