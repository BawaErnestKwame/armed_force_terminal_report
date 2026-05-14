// src/layout/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login, loading, error } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password, 'admin');
    if (result.success) {
      navigate(result.redirectTo || '/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 text-center border-b-4 border-red-600">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaShieldAlt className="text-yellow-400 text-3xl" />
          </div>
          <h1 className="text-xl font-bold">ARMED FORCES SHTS</h1>
          <p className="text-blue-200 text-sm mt-1">Admin Portal</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 text-center">Admin Sign In</h2>

          {/* Demo hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
            <strong>Demo:</strong> admin@afts.edu.gh / admin123
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@afts.edu.gh"
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-blue-900" /> Remember me
              </label>
              <Link to="/forgotPassword" className="text-blue-700 hover:underline text-xs">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</>
              ) : 'Sign In as Admin'}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 mt-4">
            Are you a teacher?{' '}
            <Link to="/teacherLogin" className="text-blue-700 hover:underline">Teacher Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;