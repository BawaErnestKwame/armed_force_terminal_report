import React from 'react';
import { Routes, Route } from "react-router-dom";

import Hero from './components/Hero';
import Features from './pages/features/Features';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';

import StudentLogin from './layout/StudentLogin';
import TeacherLogin from './layout/TeacherLogin';
import AdminLogin from './layout/AdminLogin';
import ParentLogin from './layout/ParentLogin';

import Dashboard from './admin/dashboard/Dashboard';
import ForgotPassword from './auth/ForgotPassword';
import MainLayout from './components/MainLayout';

// Admin Pages
import UserManagement from './admin/user-management/UserManagement';
import AcademicYear from './admin/academic-setup/AcademicYear';
import SchoolStructure from './admin/academic-setup/SchoolStructure';
import GradingConfig from './admin/academic-setup/GradingConfig';
import CommentBank from './admin/academic-setup/CommentBank';
import BulkCommunication from './admin/bulkCommunication/BulkCommunication';
import AnalyticsDashboard from './admin/analyticsDashboard/AnalyticsDashboard';

import DashboardLayout from './admin/DashboardLayout';
import Students from './admin/students/Students';
import Parents from './admin/parents/Parents';
import Teacher from './admin/teacher/Teacher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>  <ToastContainer />
    <Routes>
      

      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Hero />} />
        <Route path='features' element={<Features />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
      </Route>

      {/* Login Pages */}
      <Route path='studentLogin' element={<StudentLogin />} />
      <Route path='teacherLogin' element={<TeacherLogin />} />
      <Route path='adminLogin' element={<AdminLogin />} />
      <Route path='parentLogin' element={<ParentLogin />} />
      <Route path='forgotPassword' element={<ForgotPassword />} />

      {/* Admin Dashboard */}
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='userManagement' element={<UserManagement />} />
        <Route path='academicYear' element={<AcademicYear />} />
        <Route path='schoolStructure' element={<SchoolStructure />} />
        <Route path='gradingConfig' element={<GradingConfig />} />
        <Route path='commentBank' element={<CommentBank />} />
        <Route path='teacher' element={<Teacher/> } />
        <Route path='students' element={<Students/> } />
        <Route path='parents' element={<Parents/>} />
        <Route path='bulkCommunication' element={<BulkCommunication />} />
        <Route path='analyticsDashboard' element={<AnalyticsDashboard />} />
      </Route>

    </Routes>
    </>
  );
};

export default App;