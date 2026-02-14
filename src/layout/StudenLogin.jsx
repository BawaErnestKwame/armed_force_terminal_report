import React, { useState } from 'react'
import bg from "../assets/mainbg.jpg"
import { FaGraduationCap, FaShieldAlt, FaChartLine, FaFileAlt, FaComments, FaCloud, FaUsers, FaCheckCircle, FaUser, FaLock, FaEye, FaEyeSlash, FaKey, FaChalkboardTeacher, FaUserShield, FaUserFriends } from "react-icons/fa";
import { Link } from 'react-router-dom';

const StudentLogin = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { selectedRole, username, password, rememberMe });
  };

  const handleDemoAccess = (role) => {
    console.log(`Demo access for ${role}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* LEFT SIDE */}
      <div
        className="lg:w-1/2 w-full bg-cover bg-center px-4 md:px-8 lg:px-16 py-6 md:py-12 flex flex-col justify-between"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Logo */}
        <div className="text-white flex items-center gap-4 mb-6">
          <Link to="/">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center">
              <FaGraduationCap className="text-red-500 text-3xl md:text-4xl" />
            </div>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">EXCELLENCE ACADEMY</h1>
            <p className="text-base md:text-lg italic mt-2">"Knowledge, Excellence, Integrity"</p>
          </div>
        </div>

        {/* System Features */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 md:p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-white text-sm" />
            </div>
            <h2 className="text-xl md:text-2xl  font-semibold text-red-400">System Features</h2>
          </div>
          <div className="space-y-2 text-white md:space-y-3">
            <div className="flex items-center gap-2 md:gap-3">
              <FaShieldAlt className="text-lg md:text-xl" />
              <span className="text-sm md:text-base">Secure Grade Management</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaChartLine className="text-lg md:text-xl" />
              <span className="text-sm md:text-base">Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaFileAlt className="text-lg md:text-xl" />
              <span className="text-sm md:text-base">Digital Report Cards</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaComments className="text-lg md:text-xl" />
              <span className="text-sm md:text-base">Parent-Teacher Communication</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaCloud className="text-lg md:text-xl" />
              <span className="text-sm md:text-base">Cloud Backup & Recovery</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-6">
          <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg">
            <FaUsers className="text-xl" />
            <span className="font-semibold text-sm md:text-base">1,250+ Active Users</span>
          </div>
          <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg">
            <FaCheckCircle className="text-xl" />
            <span className="font-semibold text-sm md:text-base">99.8% Uptime</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-white text-xs md:text-sm">
          <hr className="w-full bg-white/20 mb-3" />
          <p className="flex items-center gap-2">
            <FaShieldAlt /> Secure login powered by SSL encryption
          </p>
          <p className="mt-1">© 2024 Excellence Academy. All rights reserved.</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-1/2 w-full bg-gray-50 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border-2 border-blue-700 p-6 md:p-8">
          {/* Login Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaKey className="text-blue-700 text-2xl" />
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700">Portal Login</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base">Enter your credentials to access the academic portal</p>
          </div>

          {/* Role Selection */}
          <div className="mb-4 md:mb-6 grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
            {[
              { role: 'student', icon: FaGraduationCap, label: 'Student' },
              { role: 'teacher', icon: FaChalkboardTeacher, label: 'Teacher' },
              { role: 'admin', icon: FaUserShield, label: 'Admin' },
              { role: 'parent', icon: FaUserFriends, label: 'Parent' },
            ].map(({ role, icon: Icon, label }) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`p-2 md:p-4 rounded-lg border-2 transition-all ${
                  selectedRole === role
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                <Icon className="text-2xl md:text-3xl mx-auto mb-1 md:mb-2" />
                <span className="font-semibold text-sm md:text-base">{label}</span>
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            {/* Username */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-blue-700 font-semibold">
                <FaUser /> Username/ID
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username or ID"
                  className="w-full pl-10 pr-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-blue-700 font-semibold">
                <FaLock /> Password
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-blue-700"
                />
                <span className="text-gray-700 text-sm">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-red-500 text-sm font-semibold hover:underline flex items-center gap-1">
                <FaKey className="text-xs" /> Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              <FaKey /> Login to Portal
            </button>
          </form>

          {/* Quick Demo */}
          <div className="mt-4 md:mt-6">
            <p className="text-center text-gray-600 text-sm mb-2">Quick Demo Access:</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleDemoAccess('student')}
                className="flex-1 py-2 px-4 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-blue-700 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <FaGraduationCap /> Student Demo
              </button>
              <button
                onClick={() => handleDemoAccess('teacher')}
                className="flex-1 py-2 px-4 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-blue-700 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <FaChalkboardTeacher /> Teacher Demo
              </button>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-blue-700 font-semibold hover:underline inline-flex items-center gap-2">
              ← Back to Home Page
            </Link>
          </div>

          {/* Security Alert */}
          <div className="mt-4 md:mt-6 bg-red-50 border-l-4 border-red-500 p-3 md:p-4 rounded">
            <div className="flex items-start gap-3">
              <FaShieldAlt className="text-red-500 text-xl mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Security Alert:</p>
                <p className="text-sm text-gray-700">This is a protected system. Unauthorized access is prohibited.</p>
              </div>
            </div>
          </div>

          {/* Help Link */}
          <div className="mt-2 md:mt-4 text-center">
            <Link to="/help" className="text-gray-600 text-sm hover:text-blue-700 inline-flex items-center gap-1">
              <span className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs">?</span>
              Need help logging in?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentLogin
