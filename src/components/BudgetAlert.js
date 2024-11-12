// src/components/BudgetAlert.js
import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import {
  budgetAlertStore,
  resetBudgetAlert,
  updateBudgetAlert,
} from "../stores/budgetAlertStore"; // Importar el store de alertas
import { useFinancialCalculations } from "../custom-hooks/useFinancialCalculations";
import AlertBanner from "./AlertBanner";

const BudgetAlert = () => {
  const userSettings = useStore(userSettingsStore);
  const budgetAlert = useStore(budgetAlertStore);
  const { totalExpense } = useFinancialCalculations();

  // Instructions:
  // - Calculate the total expenses from the transactions.
  // Replace with the total expenses calculation.

  // Determine if the budget has been exceeded
  // Replace with a comparison of totalExpense and userSettings.totalBudgetLimit
  const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;
  console.log("budgetExceeded:", budgetExceeded);
  console.log("totalExpense:", totalExpense);
  console.log(
    "userSettingsStore.totalBudgetLimit:",
    userSettingsStore.totalBudgetLimit
  );

  // Use the useEffect hook to update the budgetAlertStore when the budget is exceeded
  useEffect(() => {
    // Instructions:
    // - If the budget has been exceeded, set the `isVisible` property in the `budgetAlertStore` to true and provide a warning message.
    if (budgetExceeded) {
      updateBudgetAlert(
        `You have exceeded your total budget limit of ${userSettings.totalBudgetLimit} €!`
      );
      // resetBudgetAlert();
    } else {
      // - If the budget has not been exceeded, set `isVisible` to false and clear the message.
      resetBudgetAlert();
    }
  }, [budgetExceeded, userSettings.totalBudgetLimit]);

  return (
    // Conditional rendering of the alert
    // Instructions:
    // - If the budget is exceeded, return an `Alert` component with the appropriate message and severity.
    // Replace with conditional rendering logic
    budgetExceeded ? <AlertBanner /> : null
  );
};

export default BudgetAlert;
