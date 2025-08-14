import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{color:'#fff', padding:'2rem'}}>Loading...</div>;
  if (!user) return <Navigate to="/auth?mode=login" replace />;
  return children;
}
