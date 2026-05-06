import React from 'react';
import { Routes, Route } from "react-router-dom";
import { StudentProvider } from './context/StudentContext';
import ReportTemplateWrapper from './admin/reportTemplate/ReportTemplateWrapper';

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

import DashboardLayout from './admin/DashboardLayout';
import Students from './admin/students/Students';
import Parents from './admin/parents/Parents';
import Teacher from './admin/teacher/Teacher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './admin/profile/Profile';
import Settings from './admin/settings/Settings';
import AcademicStructure1 from './admin/academic-structure1/AcademicStructure1';
import AcademicStructure2 from './admin/academic-structure2/AcademicStructure2';
// Remove this line - DELETE OR COMMENT OUT
// import ReportTemplate from './admin/reportTemplate/ReportTemplate';
import AdditionalInfo from './admin/additional-info/AdditionalInfo';
import AuditLogs from './admin/audit-logs/AuditLogs';

const App = () => {
  return (
    <StudentProvider>
      <ToastContainer />
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
          <Route path='teacher' element={<Teacher />} />
          <Route path='students' element={<Students />} />
          <Route path='parents' element={<Parents />} />
          <Route path='bulkCommunication' element={<BulkCommunication />} />
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
          <Route path='academicStructure1' element={<AcademicStructure1 />} />
          <Route path='academicStructure2' element={<AcademicStructure2 />} />
          {/* Only keep ONE reportTemplate route - use the wrapper */}
          <Route path='reportTemplate' element={<ReportTemplateWrapper />} />
          <Route path='additionalInfo' element={<AdditionalInfo />} />
          <Route path='auditLogs' element={<AuditLogs />} />

  
        </Route>
      </Routes>
    </StudentProvider>
  );
};

export default App;