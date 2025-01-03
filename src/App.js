import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
import { lightTheme, darkTheme } from "./theme"; // Import both themes
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import Analysis from "./components/Analysis";
import Settings from "./components/Settings";
import Footer from "./components/Footer";
import SupportPage from "./components/SupportPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { authStore } from "./stores/authStore";
import { useStore } from "@nanostores/react";
import BudgetAlert from "./components/BudgetAlert";
import { ContactsProvider } from "./context/ContactsContext";
import ForgotPasswordPage from "./components/ForgotPasswordPage";

function App() {
  const auth = useStore(authStore);

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ContactsProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Container sx={{ flex: 1, mt: 4 }}>
              {auth.isAuthenticated && <BudgetAlert />}
              <Routes>
                {/* Protected routes */}
                <Route
                  element={
                    <ProtectedRoute isAuthenticated={auth.isAuthenticated} />
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/transactions" element={<TransactionList />} />
                  <Route path="/analysis" element={<Analysis />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/support" element={<SupportPage />} />
                </Route>

                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
              </Routes>
            </Container>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </ContactsProvider>
  );
}

export default App;
