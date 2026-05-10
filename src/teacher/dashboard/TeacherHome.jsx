// src/teacher/dashboard/TeacherHome.jsx
// Renders the exact dashboard for the role the teacher chose at login.
// No role switcher. No cross-role navigation.

import React from 'react';
import { useAuth } from '../../context/AuthContext';

import DashSubjectTeacher                                  from '../dashboards/DashSubjectTeacher';
import DashSubjectFormTeacher                              from '../dashboards/DashSubjectFormTeacher';
import { DashHOD, DashHODSubject, DashHODSubjectForm }    from '../dashboards/DashHOD';
import { DashAssistantHOD, DashAssistantHODSubject }       from '../dashboards/DashAssistantHOD';
import DashHouseMaster                                     from '../dashboards/DashHouseMaster';
import { DashWorkshop, DashSports, DashCounsellor }        from '../dashboards/DashWorkshop';
import { DashExamCoord, DashHODExamCoord, DashFormSports } from '../dashboards/DashExamCoord';

const DASHBOARDS = {
  'Subject Teacher':                                DashSubjectTeacher,
  'Subject Teacher + Form Teacher':                 DashSubjectFormTeacher,
  'HOD':                                            DashHOD,
  'HOD + Subject Teacher':                          DashHODSubject,
  'HOD + Subject Teacher + Form Teacher':           DashHODSubjectForm,
  'Assistant HOD':                                  DashAssistantHOD,
  'Assistant HOD + Subject Teacher':                DashAssistantHODSubject,
  'House Master/Mistress':                          DashHouseMaster,
  'Workshop Supervisor':                            DashWorkshop,
  'Sports Master/Mistress':                         DashSports,
  'Guidance Counsellor':                            DashCounsellor,
  'Exam Coordinator':                               DashExamCoord,
  'Subject Teacher + HOD + Exam Coordinator':       DashHODExamCoord,
  'Subject Teacher + Form Teacher + Sports Master': DashFormSports,
};

const TeacherHome = () => {
  const { activeRole } = useAuth();
  const Dashboard = DASHBOARDS[activeRole] || DashSubjectTeacher;
  return <Dashboard />;
};

export default TeacherHome;