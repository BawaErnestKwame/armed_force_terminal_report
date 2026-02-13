import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { ArrowRightToLine } from 'lucide-react';
import SchoolIcon from '@mui/icons-material/School';
import { GiTeacher } from "react-icons/gi";
import { RiParentFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const LoginCards = () => {
  return (
    <div className=' bg-gray-50 px-4 md:px-8 lg:px-24 py-8'>
    
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        
        {/* Left text section */}
        <div className="flex-1 w-full">
          <h1 className='text-5xl font-bold mb-2 bg-gradient-to-r from-[var(--royal-blue)] to-[var(--accent-red-dark)] bg-clip-text text-transparent '>
            Streamlined Academic Reporting
          </h1>
          
          <p className='text-gray-700 text-lg mb-3 max-w-xl'>
            Comprehensive terminal report management for schools, teachers, students, and parents
          </p>

          {/* Feature cards */}
          <div className='flex flex-col sm:flex-row gap-6'>
            
            {/* Manage Students */}
            <div className='flex items-start px-6 gap-1 py-4 shadow bg-gray-100 border-[var(--royal-blue)] border-l-4 rounded-xl w-full'>
              <div className='flex flex-col items-center'>
                <div className='flex items-center gap-1 px-6'>
                  <h3 className='text-xl font-semibold text-gray-800'>Manage</h3>
                </div>
                <p className='text-gray-800'>5000+ Students</p>
              </div>
            </div>

            {/* Real-time Analytics */}
            <div className='flex items-start px-6 gap-1 py-4 shadow bg-gray-100 border-[var(--royal-blue)] border-l-4 rounded-xl w-full'>
              <div className='flex flex-col items-center'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-xl font-semibold text-gray-800'>Real-time</h3>
                </div>
                <p className='text-gray-800 ml-11'>Analytics</p>
              </div>
            </div>

            {/* Secure & Reliable */}
            <div className='flex items-start px-6 gap-1 py-4 shadow bg-gray-100 border-[var(--royal-blue)] border-l-4 rounded-xl w-full'>
              <div>
                <div className='flex items-center gap-3'>
                  <h3 className='text-xl font-semibold text-gray-800'>Secure &</h3>
                </div>
                <p className='text-gray-600 ml-11'>Reliable</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right portal login section */}
        <div className="flex-1 w-full max-w-xl">
          <div className='bg-white rounded-3xl border-2 border-blue-700 shadow-lg p-6'>
            
            <div className='mb-4'>
              <div className='flex items-center gap-2 mb-2'>
                < ArrowRightToLine className='text-[var(--royal-blue)]' />
                <h2 className='text-2xl font-bold text-[var(--royal-blue)]'>Portal Login</h2>
              </div>
              <p className='text-gray-600'>Access your academic portal</p>
            </div>

            {/* Login cards grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
              
              <Link to='/studentLogin' className='bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-md'>
              <button className='flex flex-col items-center' >
                <AccessibilityNewIcon sx={{
                fontSize: 40,
                color: "white",
              }}/>
                <span className='font-semibold text-lg'>Student Login</span>  
              </button>
              </Link>

              <Link to='teacherLoging' className='bg-green-500 cursor-pointer hover:bg-green-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-md'>
              <button className='flex flex-col items-center'>
                 <GiTeacher  size={48} />
                <span className='font-semibold text-lg'>Teacher Login</span>
              </button>
              
              </Link>

             <Link to='/adminLogin'  className='bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-md'>
              <button className='flex flex-col items-center'>
                 <SchoolIcon sx={{
                fontSize: 40,
                color: "white",
              }}/>
                <span className='font-semibold text-lg'>Admin Login</span>
              </button>
             
             </Link>

             <Link to='/parentLogint' className='bg-purple-600 cursor-pointer hover:bg-purple-700 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-md'>
              <button className='flex flex-col items-center'>
                 <RiParentFill size={48} />
                <span className='font-semibold text-lg'>Parent Login</span>
              </button>
             
             </Link>

            </div>

            {/* Footer links */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-200'>
              <a href='#forgot' className='flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium'>
                Forgot Password?
              </a>
              <a href='#demo' className='flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium'>
                <PlayArrowIcon/>
                View Demo
              </a>
            </div>

          </div>
        </div>

      </div>
   
    </div>
  )
}

export default LoginCards
