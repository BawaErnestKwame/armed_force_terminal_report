// src/layout/StudentLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaIdCard, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [studentId, setStudentId] = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [showPw,    setShowPw]    = useState(false);
  const [localErr,  setLocalErr]  = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalErr('');
    if (!studentId.trim()) { setLocalErr('Please enter your Student ID.'); return; }
    if (!email.trim())     { setLocalErr('Please enter your email address.'); return; }
    if (!password.trim())  { setLocalErr('Please enter your password.'); return; }

    const result = await login(email, password, 'student', undefined, studentId.trim());
    if (result.success) navigate(result.redirectTo || '/student', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, var(--royal-blue), var(--royal-blue-dark))' }}>

      {/* Logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img src={logo} alt="" draggable={false} className="select-none"
          style={{ width: '420px', height: '420px', objectFit: 'contain', opacity: 0.06, filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative"
          style={{ border: '2px solid rgba(255,255,255,0.15)' }}>

          {/* Close button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition"
            title="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Header */}
          <div className="px-8 py-6 text-center"
            style={{ background: 'linear-gradient(135deg, var(--royal-blue), var(--royal-blue-dark))' }}>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <img src={logo} alt="AFTS" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-white font-black text-xl">ARMED FORCES SHTS</h1>
            <p className="text-blue-200 text-sm mt-1">Student Portal Login</p>
            <p className="text-blue-300 text-xs mt-0.5">Uaddara Barracks, Kumasi, Ghana</p>
          </div>
          <div className="h-1" style={{ backgroundColor: 'var(--accent-red)' }} />

          {/* Form */}
          <div className="px-8 py-6 space-y-4">

            {/* Demo hint */}
            <div className="px-3 py-2.5 rounded-lg text-xs" style={{ backgroundColor: '#eef2ff', color: 'var(--royal-blue)' }}>
              <span className="font-bold">Demo: </span>
              ID: <span className="font-mono font-bold">AFTS/2024/001</span> · kofi@afts.edu.gh · <span className="font-mono font-bold">student123</span>
            </div>

            {/* Error */}
            {(localErr || error) && (
              <div className="px-3 py-2.5 rounded-lg text-xs font-medium"
                style={{ backgroundColor: '#fff1f2', color: 'var(--accent-red-dark)', border: '1px solid var(--accent-red-light)' }}>
                {localErr || error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--dark-gray)' }}>
                  Student ID
                </label>
                <div className="relative">
                  <FaIdCard size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--royal-blue-light)' }} />
                  <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)}
                    required autoFocus placeholder="e.g. AFTS/2024/031"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border-2 outline-none transition-all font-mono"
                    style={{ borderColor: 'var(--medium-gray)', color: 'var(--dark-gray)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--royal-blue)'}
                    onBlur={e  => e.target.style.borderColor = 'var(--medium-gray)'}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--dark-gray)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--royal-blue-light)' }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    required placeholder="yourname@afts.edu.gh"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border-2 outline-none transition-all"
                    style={{ borderColor: 'var(--medium-gray)', color: 'var(--dark-gray)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--royal-blue)'}
                    onBlur={e  => e.target.style.borderColor = 'var(--medium-gray)'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--dark-gray)' }}>
                  Password
                </label>
                <div className="relative">
                  <FaLock size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--royal-blue-light)' }} />
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    required placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border-2 outline-none transition-all"
                    style={{ borderColor: 'var(--medium-gray)', color: 'var(--dark-gray)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--royal-blue)'}
                    onBlur={e  => e.target.style.borderColor = 'var(--medium-gray)'}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--royal-blue-light)' }}>
                    {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--dark-gray)' }}>
                  <input type="checkbox" className="accent-[var(--royal-blue)]" /> Remember me
                </label>
                <Link to="/forgotPassword" style={{ color: 'var(--accent-red)' }} className="font-medium">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--royal-blue)' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = 'var(--royal-blue-dark)'; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = 'var(--royal-blue)'; }}
              >
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</>
                  : <>Sign In to Student Portal <FaArrowRight size={12} /></>
                }
              </button>
            </form>

            <div className="text-center pt-2">
              <Link to="/" className="text-xs" style={{ color: 'var(--royal-blue)' }}>
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-4">
          ARMED FORCES SHTS · Uaddara Barracks, Kumasi, Ghana
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;