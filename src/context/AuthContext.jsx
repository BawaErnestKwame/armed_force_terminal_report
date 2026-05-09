// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { MOCK_TEACHERS } from '../teacher/data/teacherData';

const AuthContext = createContext();
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const OTHER_USERS = [
  { id: 100, role: 'admin',   name: 'System Administrator', email: 'admin@excellence.edu.gh', password: 'admin123',   redirectTo: '/dashboard' },
  { id: 101, role: 'student', name: 'Kofi Asante',          email: 'kofi@afts.edu.gh',        password: 'student123', redirectTo: '/student'   },
  { id: 102, role: 'parent',  name: 'Mr Asante',            email: 'parent@afts.edu.gh',      password: 'parent123',  redirectTo: '/parent'    },
];

const ALL_USERS = [
  ...MOCK_TEACHERS.map(t => ({ ...t, role: 'teacher' })),
  ...OTHER_USERS,
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem('afts_user'); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });

  // activeRole — the role the teacher chose at login
  // defaults to 'Subject Teacher' if not set
  const [activeRole, setActiveRole] = useState(() => {
    try { return localStorage.getItem('afts_active_role') || 'Subject Teacher'; }
    catch { return 'Subject Teacher'; }
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const login = async (email, password, role, chosenTeacherRole = 'Subject Teacher') => {
    setLoading(true); setError('');
    try {
      await new Promise(r => setTimeout(r, 700));
      const found = ALL_USERS.find(
        u => u.email === email && u.password === password && u.role === role
      );
      if (!found) {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
        return { success: false };
      }
      const { password: _, ...safe } = found;
      setUser(safe);
      // store chosen role for teachers
      const roleToStore = role === 'teacher' ? chosenTeacherRole : '';
      setActiveRole(roleToStore || 'Subject Teacher');
      localStorage.setItem('afts_user', JSON.stringify(safe));
      localStorage.setItem('afts_active_role', roleToStore || 'Subject Teacher');
      setLoading(false);
      return { success: true, redirectTo: safe.redirectTo };
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return { success: false };
    }
  };

  // Teacher can switch role from dashboard without logging out
  const switchRole = (newRole) => {
    setActiveRole(newRole);
    localStorage.setItem('afts_active_role', newRole);
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
      switchRole,
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