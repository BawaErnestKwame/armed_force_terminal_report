// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { TEACHERS, STUDENTS, PARENTS } from '../data/schoolData';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// All admin accounts — add any email variant here
const ADMIN_USERS = [
  { id:100, role:'admin', name:'System Administrator', email:'admin@afts.edu.gh',       password:'admin123', redirectTo:'/dashboard' },
  { id:101, role:'admin', name:'System Administrator', email:'admin@excellence.edu.gh',  password:'admin123', redirectTo:'/dashboard' },
  { id:102, role:'admin', name:'System Administrator', email:'admin@armedforces.edu.gh', password:'admin123', redirectTo:'/dashboard' },
];

// Flat list of all users across all roles
const ALL_USERS = [
  ...TEACHERS.map(t => ({ ...t, role:'teacher' })),
  ...STUDENTS.map(s => ({ ...s, role:'student' })),
  ...PARENTS.map(p => ({ ...p, role:'parent'  })),
  ...ADMIN_USERS,
];

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
      await new Promise(r => setTimeout(r, 600));

      // Normalise inputs
      const emailLower = (email || '').trim().toLowerCase();
      const passTrim   = (password || '').trim();
      const roleLower  = (role || '').trim().toLowerCase();

      // Find user — match on email + password + role
      const found = ALL_USERS.find(u =>
        u.email.toLowerCase() === emailLower &&
        u.password === passTrim &&
        u.role === roleLower
      );

      if (!found) {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
        return { success: false };
      }

      const { password: _, ...safe } = found;

      // For teachers — lock their sidebar role
      // Priority: chosen at login > assigned in data > default
      const lockedRole = roleLower === 'teacher'
        ? (chosenTeacherRole && chosenTeacherRole !== 'Subject Teacher'
            ? chosenTeacherRole
            : safe.teacherRole || 'Subject Teacher')
        : '';

      setUser(safe);
      setActiveRole(lockedRole || 'Subject Teacher');
      localStorage.setItem('afts_user', JSON.stringify(safe));
      localStorage.setItem('afts_active_role', lockedRole || 'Subject Teacher');

      setLoading(false);
      return { success: true, redirectTo: safe.redirectTo || `/${roleLower}` };

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