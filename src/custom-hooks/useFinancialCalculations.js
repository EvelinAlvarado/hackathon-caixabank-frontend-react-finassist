import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";

export const useFinancialCalculations = () => {
  const transactions = useStore(transactionsStore);

  const totalIncome = [...transactions]
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + t.amount, 0);
  console.log("totalIncome:", totalIncome);

  const totalExpense = [...transactions]
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + t.amount, 0);
  console.log("totalExpense:", totalExpense);

  const balance = totalIncome - totalExpense;

  const uniqueCategories = [...new Set(transactions.map((t) => t.category))];
  console.log("Unique Categories:", uniqueCategories);

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
