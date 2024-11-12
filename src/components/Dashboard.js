import React, { Profiler, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import ExportButton from "./ExportButton";
import DownloadProfilerData from "./DownloadProfilerData";
import { onRenderCallback } from "../utils/onRenderCallback";
import { transactionsStore } from "../stores/transactionStore";
import { useFinancialCalculations } from "../custom-hooks/useFinancialCalculations";

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import("./AnalysisGraph"));
const BalanceOverTime = React.lazy(() => import("./BalanceOverTime"));
const Statistics = React.lazy(() => import("./Statistics"));
const Recommendations = React.lazy(() => import("./Recommendations"));
const RecentTransactions = React.lazy(() => import("./RecentTransactions"));

function Dashboard() {
  const transactions = useStore(transactionsStore);
  const { totalIncome, totalExpense, balance } = useFinancialCalculations();

  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Financial Summary
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ExportButton data={transactions} label="Export Transactions" />
          <DownloadProfilerData />
        </Box>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Income
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#2e7d32" }}
                data-testid="total-income"
              >
                {totalIncome.toFixed(2)} €
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Expenses
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#d32f2f" }}
                data-testid="total-expenses"
              >
                {totalExpense.toFixed(2)} €
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Balance
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: `${
                    totalIncome > totalExpense ? "#2e7d32" : "#d32f2f"
                  }`,
                }}
                data-testid="balance"
              >
                {`${balance >= 0 ? "+" : "-"}${Math.abs(balance).toFixed(2)}`} €
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <AnalysisGraph />
            </Suspense>
          </Grid>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <BalanceOverTime />
            </Suspense>
          </Grid>
        </Grid>

        {/* Statistics and Recommendations Section */}
        <Grid container spacing={4} direction="row" sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <Statistics />
            </Suspense>
          </Grid>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <Recommendations />
            </Suspense>
          </Grid>
        </Grid>

        {/* Recent Transactions Section */}
        <Box
          sx={{
            width: "100%",
            mt: 7,
          }}
        >
          <Typography variant="h5">Recent Transactions</Typography>
          <Suspense fallback={<CircularProgress />}>
            <RecentTransactions transactions={transactions} />
          </Suspense>
        </Box>
      </Box>
    </Profiler>
  );
}

export default Dashboard;
