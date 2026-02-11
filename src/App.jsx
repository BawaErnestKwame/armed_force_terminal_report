import React from 'react'
import Navbar from "./components/common/Navbar"
import {Routes, Route} from "react-router-dom"
import Hero from './components/Hero'
import Footer from './components/common/Footer'


const App = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Routes>
      
    </Routes>

    <Footer/>


    </>
  )
}

export default App