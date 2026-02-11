import React from 'react'

const LoginCards = () => {
  return (
    <div className='min-h-screen bg-gray-50 px-4 md:px-8 lg:px-24 py-12'>
      <div className=" ">
        <div className="flex justify-between items-center gap-18">
          {/* Left text section */}
          <div className="flex-1">
            <h1 className='text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--royal-blue)]  to-[var(--accent-red-dark)] bg-clip-text text-transparent leading-tight'>
              Streamlined Academic Reporting
            </h1>
            
            <p className='text-gray-700 text-lg mb-12 max-w-xl'>
              Comprehensive terminal report management for schools, teachers, students, and parents
            </p>

            {/* Feature cards */}
            <div className='flex gap-6'>
              {/* Manage Students */}
              <div className='flex items-start px-6 gap-1 py-4 shadow bg-gray-100 border-[var(--royal-blue)] border-l-4 rounded-xl '>
                <div className='flex flex-col items-center'>
                  <div className='flex items-center gap-1  px-6'>
                    <svg className='w-8 h-8 text-blue-700' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/>
                    </svg>
                    <h3 className='text-xl font-semibold text-gray-800'>Manage</h3>
                  </div>
                  <p className='text-gray-800'>1000+ Students</p>
                </div>
              </div>

              {/* Real-time Analytics */}
              <div className='flex items-start px-6 gap-1 py-4 shadow bg-gray-100 border-[var(--royal-blue)] border-l-4 rounded-xl '>
                
                <div className='flex flex-col items-center'>
                  <div className='flex items-center gap-3'>
                    <svg className='w-8 h-8 text-blue-700' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z'/>
                    </svg>
                    <h3 className='text-xl font-semibold text-gray-800'>Real-time</h3>
                  </div>
                  <p className='text-gray-800 ml-11'>Analytics</p>
                </div>
              </div>

              {/* Secure & Reliable */}
              <div className='flex items-start px-6 gap-1 py-4 shadow bg-gray-100 border-[var(--royal-blue)] border-l-4 rounded-xl '>
                
                <div>
                  <div className='flex items-center gap-3'>
                    <svg className='w-8 h-8 text-blue-700' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/>
                    </svg>
                    <h3 className='text-xl font-semibold text-gray-800'>Secure &</h3>
                  </div>
                  <p className='text-gray-600 ml-11'>Reliable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right portal login section */}
          <div className="flex-1 max-w-xl">
            <div className='bg-white rounded-3xl border-2 border-blue-700 shadow-lg p-6'>
              {/* Header */}
              <div className='mb-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <svg className='w-6 h-6 text-blue-700' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z'/>
                  </svg>
                  <h2 className='text-2xl font-bold text-[var(--royal-blue)]'>Portal Login</h2>
                </div>
                <p className='text-gray-600'>Access your academic portal</p>
              </div>

              {/* Login cards grid */}
              <div className='grid grid-cols-2 gap-4 mb-6'>
                {/* Student Login */}
                <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-md'>
                  <svg className='w-12 h-12' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z'/>
                  </svg>
                  <span className='font-semibold text-lg'>Student Login</span>
                </button>

                {/* Teacher Login */}
                <button className='bg-green-500 hover:bg-green-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-md'>
                  <svg className='w-12 h-12' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M20 17a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.46c.35.61.54 1.3.54 2h10v11h-9v2m4-10v2H9v13H7v-6H5v6H3v-8H1.5V9a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2M8 4a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2z'/>
                  </svg>
                  <span className='font-semibold text-lg'>Teacher Login</span>
                </button>

                {/* Admin Login */}
                <button className='bg-red-500 hover:bg-red-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-md'>
                  <svg className='w-12 h-12' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z M19.43 12.935c.347-.07.645-.25.863-.493a1.32 1.32 0 0 0 .354-.577c.069-.22.086-.458.05-.687a1.48 1.48 0 0 0-.257-.649 1.32 1.32 0 0 0-.527-.459l-2.01-.85v-1.31c0-.12-.024-.237-.07-.346a.89.89 0 0 0-.495-.495.87.87 0 0 0-.346-.07h-1.05l-.85-2.01a1.32 1.32 0 0 0-.459-.527c-.2-.13-.417-.22-.649-.257a1.48 1.48 0 0 0-.687.05c-.22.07-.417.19-.577.354a1.32 1.32 0 0 0-.493.863l-.24 2.13h-1.31c-.12 0-.237.024-.346.07a.89.89 0 0 0-.495.495.87.87 0 0 0-.07.346v1.05l-2.01.85c-.21.09-.39.23-.527.459a1.32 1.32 0 0 0-.257.649c-.036.23-.019.468.05.687.07.22.19.417.354.577.164.16.361.28.58.353l2.13.24v1.31c0 .12.024.237.07.346.046.11.113.206.195.287.081.082.177.149.287.195.11.046.227.07.346.07h1.05l.85 2.01c.09.21.23.39.459.527.2.13.417.22.649.257.23.036.468.019.687-.05.22-.07.417-.19.577-.354.16-.164.28-.361.353-.58l.24-2.13h1.31c.12 0 .237-.024.346-.07a.89.89 0 0 0 .495-.495.87.87 0 0 0 .07-.346v-1.05l2.01-.85z'/>
                  </svg>
                  <span className='font-semibold text-lg'>Admin Login</span>
                </button>

                {/* Parent Login */}
                <button className='bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-md'>
                  <svg className='w-12 h-12' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/>
                  </svg>
                  <span className='font-semibold text-lg'>Parent Login</span>
                </button>
              </div>

              {/* Footer links */}
              <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
                <a href='#forgot' className='flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/>
                  </svg>
                  Forgot Password?
                </a>
                <a href='#demo' className='flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z'/>
                  </svg>
                  View Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginCards