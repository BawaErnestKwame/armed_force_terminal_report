import React from 'react'
import { Routes, Route } from "react-router-dom"

import Hero from './components/Hero'
import Features from './pages/features/Features'
import Contact from './pages/contact/Contact'
import About from './pages/about/About'

import StudentLogin from './layout/StudentLogin'
import TeacherLogin from './layout/TeacherLogin'
import AdminLogin from './layout/AdminLogin'
import ParentLogin from './layout/ParentLogin'


import DashboardLayout from './admin/DashboardLayout'
import ForgotPassword from './auth/ForgotPassword'
import UserManagement from './admin/user-management/UserManagement'
import MainLayout from './components/MainLayout'

const App = () => {
  return (
    <Routes>

      {/* Public Layout */}
      <Route element={<MainLayout/>}>

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


      {/* Admin Dashboard Layout */}
      <Route path='/dashboardLayout' element={<DashboardLayout />}>

        <Route path='/userManagement' element={<UserManagement />} />

      </Route>

    </Routes>
  )
}

export default App