import React from 'react'
import bg from "../assets/mainbg.jpg"
import { FaGraduationCap } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const StudenLogin = () => {
  return (
    <div className='w-full min-h-screen flex'>

      {/* left content */}
      <div
        className='w-1/2 bg-cover bg-center flex items-center justify-center'
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* logo */}
        <div className="text-white text-center">
          <Link to="/">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto">
            <FaGraduationCap className="text-black" />
          </div>
          </Link>
          <h1 className="text-2xl font-bold mt-4">
            EXCELLENCE ACADEMY
          </h1>
        </div>
      </div>

      {/* right content */}
      <div className='w-1/2 bg-white'>
        {/* login form here */}
      </div>

    </div>
  )
}

export default StudenLogin
