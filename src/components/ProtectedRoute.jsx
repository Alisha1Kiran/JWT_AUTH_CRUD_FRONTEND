import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return children;
};

export default ProtectedRoute;