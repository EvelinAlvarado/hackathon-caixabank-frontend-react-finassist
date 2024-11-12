import React from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import { Alert, Collapse } from "@mui/material";
import { useFinancialCalculations } from "../custom-hooks/useFinancialCalculations";

function AlertBanner() {
  // const transactions = useStore(transactionsStore);
  const userSettings = useStore(userSettingsStore);
  const { totalExpense, incomeExpensePerCategory } = useFinancialCalculations();

  // Extract the necessary values from user settings (budget limits, category limits, alerts status).
  const { totalBudgetLimit, categoryLimits, alertsEnabled } = userSettings;

  // If alerts are disabled in the settings, return null to avoid rendering the component.
  if (!alertsEnabled) return null;

  // Calculate the total expenses from the transaction data.
  // Replace with logic to calculate total expenses.

  // Check if the total expenses exceed the total budget limit.
  // Replace with logic to compare totalExpenses and totalBudgetLimit.
  const overTotalBudget = totalExpense > totalBudgetLimit;

  // Calculate expenses per category and check if any category limit has been exceeded.

  const exceededCategories = incomeExpensePerCategory
    .filter(({ expense, category }) => expense > categoryLimits[category])
    .map(({ category }) => category); // Replace with logic to check which categories exceeded their limits.

  return (
    <div>
      {/* Total limit alert */}
      <Collapse in={overTotalBudget}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          You have exceeded your total budget limit of {totalBudgetLimit} €!
        </Alert>
      </Collapse>

      {/* Alerts by category */}
      {exceededCategories.map((category) => (
        <Alert severity="warning" sx={{ mb: 2 }} key={category}>
          You have exceeded your budget limit for {category} (
          {categoryLimits[category]} €)!
        </Alert>
      ))}
    </div>
  );
}

export default AlertBanner;
