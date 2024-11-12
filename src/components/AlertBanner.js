import React from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import { Alert, Collapse } from "@mui/material";
import { useFinancialCalculations } from "../custom-hooks/useFinancialCalculations";

function AlertBanner() {
  const userSettings = useStore(userSettingsStore);
  const { totalExpense, incomeExpensePerCategory } = useFinancialCalculations();
  const { totalBudgetLimit, categoryLimits, alertsEnabled } = userSettings;

  if (!alertsEnabled) return null;

  const overTotalBudget = totalExpense > totalBudgetLimit;

  const exceededCategories = incomeExpensePerCategory
    .filter(({ expense, category }) => expense > categoryLimits[category])
    .map(({ category }) => category);

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
