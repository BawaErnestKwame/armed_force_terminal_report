// src/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Maps each role to its login page
const LOGIN_PAGES = {
  admin:   '/adminLogin',
  teacher: '/teacherLogin',
  student: '/studentLogin',
  parent:  '/parentLogin',
};

/**
 * Usage:
 *   <ProtectedRoute allowedRole="admin">
 *     <DashboardLayout />
 *   </ProtectedRoute>
 *
 *   <ProtectedRoute allowedRole="teacher">
 *     <TeacherDashboardLayout />
 *   </ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();

  // Not logged in at all → go to the relevant login page
  if (!isLoggedIn) {
    return (
      <Navigate
        to={LOGIN_PAGES[allowedRole] || '/adminLogin'}
        state={{ from: location }}   // so login can redirect back after success
        replace
      />
    );
  }

  // Logged in but wrong role → redirect to their own portal
  if (user.role !== allowedRole) {
    return <Navigate to={user.redirectTo} replace />;
  }

  // Correct role → render the page
  return children;
};

export default ProtectedRoute;