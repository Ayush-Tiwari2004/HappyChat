import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('userIdentityJwtToken');
  return token ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('userIdentityJwtToken');
  return token ? <Navigate to="/profile" /> : children;
};
