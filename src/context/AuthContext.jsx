// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// Redirect map per role
const REDIRECT = {
  admin:   '/dashboard',
  teacher: '/teacher',
  student: '/student',
  parent:  '/parent',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem('afts_user');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  const [activeRole, setActiveRole] = useState(() => {
    try { return localStorage.getItem('afts_active_role') || 'Subject Teacher'; }
    catch { return 'Subject Teacher'; }
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const login = async (email, password, role, chosenTeacherRole = '', studentId = '') => {
    setLoading(true);
    setError('');

    try {
      // Simulate a small network delay
      await new Promise(r => setTimeout(r, 600));

      // Basic validation — fields must not be empty
      if (!email.trim() || !password.trim()) {
        setError('Please enter your email and password.');
        setLoading(false);
        return { success: false };
      }

      // ── FRONTEND MODE ──────────────────────────────────────────────────────
      // Accept any non-empty credentials and log the user in.
      // Replace this block with a real API call when the backend is ready.
      // ───────────────────────────────────────────────────────────────────────
      const roleLower = (role || 'admin').toLowerCase();

      const mockUser = {
        id:         1,
        role:       roleLower,
        name:       email.split('@')[0],   // use email prefix as display name
        email:      email.trim().toLowerCase(),
        redirectTo: REDIRECT[roleLower] || '/dashboard',
        // For students — store the ID they typed
        ...(roleLower === 'student' && studentId ? { studentId } : {}),
      };

      // For teachers — lock the sidebar to the role they selected
      const lockedRole = roleLower === 'teacher'
        ? (chosenTeacherRole || 'Subject Teacher')
        : 'Subject Teacher';

      setUser(mockUser);
      setActiveRole(lockedRole);
      localStorage.setItem('afts_user',       JSON.stringify(mockUser));
      localStorage.setItem('afts_active_role', lockedRole);

      setLoading(false);
      return { success: true, redirectTo: mockUser.redirectTo };

    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    setActiveRole('Subject Teacher');
    localStorage.removeItem('afts_user');
    localStorage.removeItem('afts_active_role');
  };

  return (
    <AuthContext.Provider value={{
      user,
      activeRole,
      loading,
      error,
      login,
      logout,
      isLoggedIn: !!user,
      isAdmin:    user?.role === 'admin',
      isTeacher:  user?.role === 'teacher',
      isStudent:  user?.role === 'student',
      isParent:   user?.role === 'parent',
    }}>
      {children}
    </AuthContext.Provider>
  );
};