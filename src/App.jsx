import React from 'react'
import Navbar from "./components/common/Navbar"
import {Routes, Route} from "react-router-dom"
import Hero from './components/Hero'
import Footer from './components/common/Footer'
import Features  from './pages/features/Features'
import Contact from './pages/contact/Contact'
import About from './pages/about/About'

// layout

import StudentLogin from './layout/StudenLogin'
import TeacherLogin from './layout/TeacherLoging'
import AdminLogin from './layout/AdminLogin'
import ParentLogin from './layout/ParentLogin'
const App = () => {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/features' element={<Features/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Footer/>

      <Routes>
        <Route path='/studentLogin' element={<StudentLogin/> } />
        <Route path='/teacherLogin' element={<TeacherLogin/> } />
        <Route path='/adminLogin' element={<AdminLogin/> } />
        <Route path='/parentLogin' element={<ParentLogin/> } />

     
      </Routes>
    </>
  )
}

export default App
