// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }    from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import ProtectedRoute      from './auth/ProtectedRoute';
import MainLayout    from './components/MainLayout';
import Hero          from './components/Hero';
import Features      from './pages/features/Features';
import Contact       from './pages/contact/Contact';
import About         from './pages/about/About';
import AdminLogin    from './layout/AdminLogin';
import TeacherLogin  from './layout/TeacherLogin';
import StudentLogin  from './layout/StudentLogin';
import ParentLogin   from './layout/ParentLogin';
import ForgotPassword from './auth/ForgotPassword';
import DashboardLayout    from './admin/DashboardLayout';
import Dashboard          from './admin/dashboard/Dashboard';
import UserManagement     from './admin/user-management/UserManagement';
import AcademicYear       from './admin/academic-setup/AcademicYear';
import SchoolStructure    from './admin/academic-setup/SchoolStructure';
import GradingConfig      from './admin/academic-setup/GradingConfig';
import CommentBank        from './admin/academic-setup/CommentBank';
import BulkCommunication  from './admin/bulkCommunication/BulkCommunication';
import Students           from './admin/students/Students';
import Parents            from './admin/parents/Parents';
import Teacher            from './admin/teacher/Teacher';
import Profile            from './admin/profile/Profile';
import Settings           from './admin/settings/Settings';
import AcademicStructure1 from './admin/academic-structure1/AcademicStructure1';
import AcademicStructure2 from './admin/academic-structure2/AcademicStructure2';
import ReportTemplateWrapper from './admin/reportTemplate/ReportTemplateWrapper';
import AdditionalInfo     from './admin/additional-info/AdditionalInfo';
import AuditLogs          from './admin/audit-logs/AuditLogs';
import TeacherDashboardLayout from './teacher/TeacherDashboardLayout';
import TeacherHome            from './teacher/dashboard/TeacherHome';
import TeacherClasses         from './teacher/classes/TeacherClasses';
import TeacherScores          from './teacher/scores/TeacherScores';
import TeacherAttendance      from './teacher/attendance/TeacherAttendance';
import TeacherComments        from './teacher/comments/TeacherComments';
import TeacherAnalytics       from './teacher/analytics/TeacherAnalytics';
import TeacherHODPanel        from './teacher/hod/TeacherHODPanel';
import TeacherFormClass       from './teacher/formclass/TeacherFormClass';
import TeacherAssistantHOD    from './teacher/assistant-hod/TeacherAssistantHOD';
import TeacherYearGroup       from './teacher/yeargroup/TeacherYearGroup';
import TeacherExamCoord       from './teacher/examcoord/TeacherExamCoord';
import TeacherHousePanel      from './teacher/house/TeacherHousePanel';
import TeacherCounsellor      from './teacher/counsellor/TeacherCounsellor';
import TeacherWAEC            from './teacher/waec/TeacherWAEC';
import TeacherWorkshop        from './teacher/workshop/TeacherWorkshop';
import TeacherSports          from './teacher/sports/TeacherSports';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <AuthProvider>
    <StudentProvider>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/'        element={<Hero />} />
          <Route path='features' element={<Features />} />
          <Route path='about'    element={<About />} />
          <Route path='contact'  element={<Contact />} />
        </Route>
        <Route path='/adminLogin'     element={<AdminLogin />} />
        <Route path='/teacherLogin'   element={<TeacherLogin />} />
        <Route path='/studentLogin'   element={<StudentLogin />} />
        <Route path='/parentLogin'    element={<ParentLogin />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<ProtectedRoute allowedRole="admin"><DashboardLayout /></ProtectedRoute>}>
          <Route index                     element={<Dashboard />} />
          <Route path='userManagement'     element={<UserManagement />} />
          <Route path='academicYear'       element={<AcademicYear />} />
          <Route path='schoolStructure'    element={<SchoolStructure />} />
          <Route path='gradingConfig'      element={<GradingConfig />} />
          <Route path='commentBank'        element={<CommentBank />} />
          <Route path='teacher'            element={<Teacher />} />
          <Route path='students'           element={<Students />} />
          <Route path='parents'            element={<Parents />} />
          <Route path='bulkCommunication'  element={<BulkCommunication />} />
          <Route path='profile'            element={<Profile />} />
          <Route path='settings'           element={<Settings />} />
          <Route path='academicStructure1' element={<AcademicStructure1 />} />
          <Route path='academicStructure2' element={<AcademicStructure2 />} />
          <Route path='reportTemplate'     element={<ReportTemplateWrapper />} />
          <Route path='additionalInfo'     element={<AdditionalInfo />} />
          <Route path='auditLogs'          element={<AuditLogs />} />
        </Route>
        <Route path='/teacher' element={<ProtectedRoute allowedRole="teacher"><TeacherDashboardLayout /></ProtectedRoute>}>
          <Route index                element={<TeacherHome />} />
          <Route path='classes'       element={<TeacherClasses />} />
          <Route path='scores'        element={<TeacherScores />} />
          <Route path='attendance'    element={<TeacherAttendance />} />
          <Route path='comments'      element={<TeacherComments />} />
          <Route path='reports'       element={<TeacherHome />} />
          <Route path='analytics'     element={<TeacherAnalytics />} />
          <Route path='profile'       element={<Profile />} />
          <Route path='settings'      element={<Settings />} />
          <Route path='hod'           element={<TeacherHODPanel />} />
          <Route path='formclass'     element={<TeacherFormClass />} />
          <Route path='assistant-hod' element={<TeacherAssistantHOD />} />
          <Route path='yeargroup'     element={<TeacherYearGroup />} />
          <Route path='examcoord'     element={<TeacherExamCoord />} />
          <Route path='house'         element={<TeacherHousePanel />} />
          <Route path='counsellor'    element={<TeacherCounsellor />} />
          <Route path='waec'          element={<TeacherWAEC />} />
          <Route path='workshop'      element={<TeacherWorkshop />} />
          <Route path='sports'        element={<TeacherSports />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </StudentProvider>
  </AuthProvider>
);

export default App;