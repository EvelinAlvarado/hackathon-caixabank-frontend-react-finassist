import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated }) {
  // Instructions:
  // - Check if the user is authenticated.
  // - If the user is not authenticated, redirect them to the login page.
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // - If the user is authenticated, render the child components using <Outlet />.

  return <Outlet />;
}

export default ProtectedRoute;
