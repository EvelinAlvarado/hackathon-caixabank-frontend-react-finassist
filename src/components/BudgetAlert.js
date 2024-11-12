import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import {
  resetBudgetAlert,
  updateBudgetAlert,
} from "../stores/budgetAlertStore";
import { useFinancialCalculations } from "../custom-hooks/useFinancialCalculations";
import AlertBanner from "./AlertBanner";

const BudgetAlert = () => {
  const userSettings = useStore(userSettingsStore);
  const { totalExpense } = useFinancialCalculations();

  const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;

  useEffect(() => {
    if (budgetExceeded) {
      updateBudgetAlert(
        `You have exceeded your total budget limit of ${userSettings.totalBudgetLimit} €!`
      );
    } else {
      resetBudgetAlert();
    }
  }, [budgetExceeded, userSettings.totalBudgetLimit]);

  return budgetExceeded ? <AlertBanner /> : null;
};

export default BudgetAlert;
