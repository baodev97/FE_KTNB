// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute({ children }) {
  const { informationUser } = useAuth();
  console.log("ProtectedRoute", informationUser);

  if (!informationUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}