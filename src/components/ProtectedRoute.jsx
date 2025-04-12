import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    toast.error("Login First")
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;