import React from 'react'
import { Routes, Route } from "react-router-dom"

import Hero from './components/Hero'
import Features from './pages/features/Features'
import Contact from './pages/contact/Contact'
import About from './pages/about/About'

import StudentLogin from './layout/StudenLogin'
import TeacherLogin from './layout/TeacherLoging'
import AdminLogin from './layout/AdminLogin'
import ParentLogin from './layout/ParentLogin'

import MainLaout from './components/MainLaout'
import Dashboard from './admin/Dashboard'
import ForgotPassword from './auth/ForgotPassword'
import UserManagement from './admin/user-management/UserManagement'

const App = () => {
  return (
    <Routes>

      {/* Public Layout */}
      <Route element={<MainLaout />}>

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
      <Route path='/dashboard' element={<Dashboard />}>

        <Route path='userManagement' element={<UserManagement />} />

      </Route>

    </Routes>
  )
}

export default App