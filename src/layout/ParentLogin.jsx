// src/layout/ParentLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const ParentLogin = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [localErr, setLocalErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalErr('');
    if (!email.trim() || !password.trim()) {
      setLocalErr('Please enter both email and password.');
      return;
    }
    const result = await login(email, password, 'parent');
    if (result.success) navigate('/parent', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #5b21b6, #4c1d95)' }}>

      {/* Logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img src={logo} alt="" draggable={false} className="select-none"
          style={{ width: '420px', height: '420px', objectFit: 'contain', opacity: 0.06, filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ border: '2px solid rgba(255,255,255,0.15)' }}>

          {/* Header */}
          <div className="px-8 py-6 text-center"
            style={{ background: 'linear-gradient(135deg, #5b21b6, #4c1d95)' }}>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <img src={logo} alt="AFTS" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-white font-black text-xl">ARMED FORCES SHTS</h1>
            <p className="text-purple-200 text-sm mt-1">Parent / Guardian Portal Login</p>
            <p className="text-purple-300 text-xs mt-0.5">Uaddara Barracks, Kumasi, Ghana</p>
          </div>
          <div className="h-1" style={{ backgroundColor: 'var(--accent-red)' }} />

          {/* Form */}
          <div className="px-8 py-6 space-y-4">

            {/* Demo hint */}
            <div className="px-3 py-2.5 rounded-lg text-xs" style={{ backgroundColor: '#f5f3ff', color: '#5b21b6' }}>
              <span className="font-bold">Demo: </span>
              parent@afts.edu.gh / <span className="font-mono font-bold">parent123</span>
            </div>

            {/* Error */}
            {(localErr || error) && (
              <div className="px-3 py-2.5 rounded-lg text-xs font-medium"
                style={{ backgroundColor: '#fff1f2', color: 'var(--accent-red-dark)', border: '1px solid var(--accent-red-light)' }}>
                {localErr || error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--dark-gray)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#7c3aed' }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    required autoFocus placeholder="parent@afts.edu.gh"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border-2 outline-none transition-all"
                    style={{ borderColor: 'var(--medium-gray)', color: 'var(--dark-gray)' }}
                    onFocus={e => e.target.style.borderColor = '#7c3aed'}
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
                  <FaLock size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#7c3aed' }} />
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    required placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border-2 outline-none transition-all"
                    style={{ borderColor: 'var(--medium-gray)', color: 'var(--dark-gray)' }}
                    onFocus={e => e.target.style.borderColor = '#7c3aed'}
                    onBlur={e  => e.target.style.borderColor = 'var(--medium-gray)'}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#7c3aed' }}>
                    {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--dark-gray)' }}>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/forgotPassword" style={{ color: 'var(--accent-red)' }} className="font-medium">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-60"
                style={{ backgroundColor: '#5b21b6' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#4c1d95'; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#5b21b6'; }}
              >
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</>
                  : <>Sign In to Parent Portal <FaArrowRight size={12} /></>
                }
              </button>
            </form>

            <div className="text-center pt-2">
              <Link to="/" className="text-xs" style={{ color: '#7c3aed' }}>
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

export default ParentLogin;