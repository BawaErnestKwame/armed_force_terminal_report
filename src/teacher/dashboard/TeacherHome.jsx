// src/teacher/dashboard/TeacherHome.jsx
// Renders the exact dashboard for the role chosen at login.
// 6 roles only. No switcher. No cross-role access.

import React from 'react';
import { useAuth } from '../../context/AuthContext';

import DashSubjectTeacher       from '../dashboards/DashSubjectTeacher';
import DashSubjectFormTeacher   from '../dashboards/DashSubjectFormTeacher';
import DashFormTeacherHOD       from '../dashboards/DashFormTeacherHOD';
import { DashExamCoord }        from '../dashboards/DashExamCoord';
import {
  DashHODSubject,
  DashHODSubjectForm,
} from '../dashboards/DashHOD';

// ─── 6 role combos → dashboard component ─────────────────────────────────────
const DASHBOARDS = {
  'Subject Teacher':                         DashSubjectTeacher,
  'Subject Teacher + Form Teacher':          DashSubjectFormTeacher,
  'Subject Teacher + HOD':                   DashHODSubject,
  'Subject Teacher + Form Teacher + HOD':    DashHODSubjectForm,
  'Examiner':                                DashExamCoord,
};

const TeacherHome = () => {
  const { activeRole } = useAuth();
  const Dashboard = DASHBOARDS[activeRole] || DashSubjectTeacher;
  return <Dashboard />;
};

export default TeacherHome;