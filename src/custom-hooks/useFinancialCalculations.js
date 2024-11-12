import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";

export const useFinancialCalculations = () => {
  const transactions = useStore(transactionsStore);

  // Calculate total income from transactions
  const totalIncome = [...transactions]
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + t.amount, 0);
  console.log("totalIncome:", totalIncome);

  // Calculate total expenses from transactions
  const totalExpense = [...transactions]
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + t.amount, 0);
  console.log("totalExpense:", totalExpense);

  // Calculate balance based on total income and expenses
  const balance = totalIncome - totalExpense;

  // Add logic to extract unique categories from transactions
  const uniqueCategories = [...new Set(transactions.map((t) => t.category))];
  console.log("Unique Categories:", uniqueCategories);

  // Add logic to calculate income and expense for each category
  const incomeExpensePerCategory = uniqueCategories.map((category) => {
    const categoryTransactions = transactions.filter(
      (t) => t.category === category
    );
    const incomeTotal = categoryTransactions
      .filter((t) => t.type === "income")
      .reduce((total, t) => total + (t.amount || 0), 0);
    const expenseTotal = categoryTransactions
      .filter((t) => t.type === "expense")
      .reduce((total, t) => total + (t.amount || 0), 0);

    return {
      category: category,
      Income: incomeTotal,
      Expense: expenseTotal,
    };
  });

  return { totalIncome, totalExpense, balance, incomeExpensePerCategory };
};
