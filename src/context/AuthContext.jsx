// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { MOCK_TEACHERS } from '../teacher/data/teacherData';
import { MOCK_STUDENTS } from '../student/data/studentData';
import { MOCK_PARENTS }  from '../parent/data/parentData';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const ADMIN_USERS = [
  {
    id: 100, role: 'admin',
    name: 'System Administrator',
    email: 'admin@excellence.edu.gh',
    password: 'admin123',
    redirectTo: '/dashboard',
  },
];

const ALL_USERS = [
  ...MOCK_TEACHERS.map(t => ({ ...t, role: 'teacher' })),
  ...MOCK_STUDENTS,
  ...MOCK_PARENTS,
  ...ADMIN_USERS,
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem('afts_user'); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });

  // activeRole is only used for teachers — set once at login, locked until logout
  const [activeRole, setActiveRole] = useState(() => {
    try { return localStorage.getItem('afts_active_role') || 'Subject Teacher'; }
    catch { return 'Subject Teacher'; }
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const login = async (email, password, role, chosenTeacherRole = 'Subject Teacher', studentId = '') => {
    setLoading(true);
    setError('');
    try {
      await new Promise(r => setTimeout(r, 700));

      const found = ALL_USERS.find(
        u => u.email === email && u.password === password && u.role === role
      );

      if (!found) {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
        return { success: false };
      }

      // Extra check for students — must also match their Student ID
      if (role === 'student' && studentId) {
        if (found.studentId !== studentId) {
          setError('Student ID does not match. Please check and try again.');
          setLoading(false);
          return { success: false };
        }
      }

      const { password: _, ...safe } = found;
      const lockedRole = role === 'teacher' ? chosenTeacherRole : '';

      setUser(safe);
      setActiveRole(lockedRole || 'Subject Teacher');
      localStorage.setItem('afts_user', JSON.stringify(safe));
      localStorage.setItem('afts_active_role', lockedRole || 'Subject Teacher');

      setLoading(false);
      return { success: true, redirectTo: safe.redirectTo };

    } catch {
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