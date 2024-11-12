import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  setUserSettings,
  userSettingsStore,
} from "../stores/userSettingsStore";
import {
  resetBudgetAlert,
  updateBudgetAlert,
} from "../stores/budgetAlertStore";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { expenseCategories } from "../constants/categories";

function Settings() {
  const userSettings = useStore(userSettingsStore);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(
    userSettings.alertsEnabled
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(
    userSettings.totalBudgetLimit
  );
  const [categoryLimits, setCategoryLimits] = useState(
    userSettings.categoryLimits
  );

  useEffect(() => {
    setAlertsEnabled(userSettings.alertsEnabled);
    setTotalBudgetLimit(userSettings.totalBudgetLimit);
    setCategoryLimits(userSettings.categoryLimits);
  }, [userSettings]);

  const handleOnChangeAlertsEnabled = (e) => {
    const isChecked = e.target.checked;
    setAlertsEnabled(isChecked);
    setUserSettings({
      ...userSettings,
      alertsEnabled: isChecked,
    });
  };

  const handleCategoryChange = (event, category) => {
    const value = parseFloat(event.target.value);
    setCategoryLimits((prevLimits) => ({
      ...prevLimits,
      [category]: !isNaN(value) && value >= 0 ? value : 0,
    }));
  };

  const handleSave = () => {
    const categoriesValues = Object.values(categoryLimits);

    const totalCategoryLimits = categoriesValues.reduce(
      (acc, value) => acc + value,
      0
    );

    // - Validate the total category limits.
    const isAnyCategoryExceeded = categoriesValues.some(
      (value) => value > totalBudgetLimit
    );

    if (isAnyCategoryExceeded) {
      setSuccessMessage("");
      setError(
        `The total limits cannot exceed the total budget limit of ${totalBudgetLimit} €`
      );
      return;
    } else if (totalCategoryLimits > totalBudgetLimit) {
      setSuccessMessage("");
      setError("");
      setBudgetExceeded(true);
      updateBudgetAlert(
        `The total limits exceed your budget limit of ${totalBudgetLimit} €!`
      );
      return;
    } else {
      setError("");
      setBudgetExceeded(false);
      setUserSettings({
        ...userSettings,
        totalBudgetLimit,
        categoryLimits,
        alertsEnabled,
      });
      setSuccessMessage("Settings saved successfully!");
      resetBudgetAlert();
    }
  };

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Settings
      </Typography>

      <FormControlLabel
        control={<Switch color="primary" />}
        label="Enable Alerts"
        checked={alertsEnabled}
        onChange={handleOnChangeAlertsEnabled}
      />

      <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Total Budget Limit (€)
        </Typography>
        <TextField
          type="number"
          name="totalBudgetLimit"
          fullWidth
          margin="normal"
          inputProps={{ min: 0, step: "0.01" }}
          sx={{ mt: 1 }}
          value={totalBudgetLimit}
          onChange={(e) => setTotalBudgetLimit(e.target.value)}
        />
      </Paper>

      <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography
          variant="h6"
          color="tex
        t.secondary"
        >
          Category Budget Limits (€)
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {expenseCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <TextField
                label={category}
                type="number"
                fullWidth
                margin="normal"
                inputProps={{ min: 0, step: "0.01" }}
                value={categoryLimits[category] || ""}
                onChange={(event) => handleCategoryChange(event, category)}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ boxShadow: 2 }}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>

      {budgetExceeded && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          You have exceeded your budget limit of {totalBudgetLimit} €!
        </Alert>
      )}

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

export default Settings;
