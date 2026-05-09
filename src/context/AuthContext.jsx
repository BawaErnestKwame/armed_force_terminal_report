// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// ─── Mock users (replace with real API calls) ─────────────────────────────────
const MOCK_USERS = [
  {
    id: 1,
    role: 'admin',
    name: 'System Administrator',
    email: 'admin@excellence.edu.gh',
    password: 'admin123',
    redirectTo: '/dashboard',
  },
  {
    id: 2,
    role: 'teacher',
    staffId: 'AFTS/TCH/003',
    title: 'Dr',
    firstName: 'Kwame',
    lastName: 'Osei',
    email: 'osei@afts.edu.gh',
    password: 'teacher123',
    additionalRoles: ['HOD', 'Form Teacher', 'WAEC Supervisor'],
    redirectTo: '/teacher',
  },
  {
    id: 3,
    role: 'student',
    name: 'Kofi Asante',
    email: 'kofi@afts.edu.gh',
    password: 'student123',
    redirectTo: '/student',
  },
  {
    id: 4,
    role: 'parent',
    name: 'Mr Asante',
    email: 'parent@afts.edu.gh',
    password: 'parent123',
    redirectTo: '/parent',
  },
];

export const AuthProvider = ({ children }) => {
  // In production: load from localStorage / token on mount
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('afts_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  // ── Login ──────────────────────────────────────────────────────────────────
  // In production: replace with fetch('/api/auth/login', { method: 'POST', body: ... })
  const login = async (email, password, role) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API delay
      await new Promise(res => setTimeout(res, 800));

      const found = MOCK_USERS.find(
        u => u.email === email && u.password === password && u.role === role
      );

      if (!found) {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
        return { success: false };
      }

      // Remove password before storing
      const { password: _pw, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('afts_user', JSON.stringify(safeUser));
      setLoading(false);
      return { success: true, redirectTo: safeUser.redirectTo };

    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return { success: false };
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    localStorage.removeItem('afts_user');
  };

  // ── Role helpers ───────────────────────────────────────────────────────────
  const isAdmin   = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';
  const isParent  = user?.role === 'parent';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout,
      isAdmin,
      isTeacher,
      isStudent,
      isParent,
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};