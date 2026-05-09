// src/admin/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt, FaUsers, FaCalendarAlt, FaClipboardList,
  FaDatabase, FaFileAlt, FaBullhorn, FaSignOutAlt,
  FaBars, FaTimes, FaUser, FaCog
} from 'react-icons/fa';

const DashboardLayout = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { logout, user } = useAuth();

  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    navigate('/adminLogin', { replace: true });
  };

  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard',           path: '/dashboard' },
    { icon: <FaUsers />,         label: 'User Management',     path: 'userManagement' },
    { icon: <FaCalendarAlt />,   label: 'Academic Structure 1', path: 'academicStructure1' },
    { icon: <FaClipboardList />, label: 'Academic Structure 2', path: 'academicStructure2' },
    { icon: <FaClipboardList />, label: 'Report Template',     path: 'reportTemplate' },
    { icon: <FaClipboardList />, label: 'Additional Info',     path: 'additionalInfo' },
    { icon: <FaClipboardList />, label: 'View Teacher',        path: 'teacher' },
    { icon: <FaDatabase />,      label: 'View Students',       path: 'students' },
    { icon: <FaFileAlt />,       label: 'View Parents',        path: 'parents' },
    { icon: <FaBullhorn />,      label: 'Audit Logs',          path: 'auditLogs' },
  ];

  const otherItems = [
    { icon: <FaUser />, label: 'Profile',  path: 'profile' },
    { icon: <FaCog />,  label: 'Settings', path: 'settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col shadow-2xl border-r-4 border-red-600
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ background: 'linear-gradient(180deg, var(--royal-blue, #1e3a8a), var(--royal-blue-dark, #1e3a8a))' }}
      >
        {/* Branding */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0">
          {!collapsed && (
            <NavLink to="/" className="flex items-center gap-2 text-white min-w-0">
              <div className="bg-white p-1 rounded-lg shadow-md flex-shrink-0">
                <img src={logo} alt="Logo" className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold leading-tight truncate">ARMED FORCES SHTS</h1>
                <p className="text-xs italic text-blue-200 truncate">Service With Humanity</p>
              </div>
            </NavLink>
          )}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <button onClick={() => setCollapsed(!collapsed)} className="text-white hover:text-blue-200 p-1 transition">
              <FaBars />
            </button>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white hover:text-blue-200 p-1 transition">
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Profile */}
        {!collapsed && (
          <div className="flex flex-col items-center py-4 px-4 border-b border-white/20 flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-2 shadow">
              <FaUsers className="text-white text-xl" />
            </div>
            <p className="text-white text-sm font-semibold text-center">
              {user?.name || 'System Administrator'}
            </p>
            <span className="text-xs text-blue-200 text-center mt-0.5">{user?.email}</span>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive ? 'bg-white/10 text-white border-l-4 border-red-500 shadow' : 'text-blue-200 hover:text-white hover:bg-white/10'}`
              }
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="text-sm truncate">{item.label}</span>}
            </NavLink>
          ))}

          {!collapsed && (
            <p className="text-xs font-bold text-gray-400 px-3 pt-4 pb-1 uppercase tracking-wider">Others</p>
          )}

          {otherItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive ? 'bg-white/10 text-white border-l-4 border-red-500' : 'text-blue-200 hover:text-white hover:bg-white/10'}`
              }
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300 text-xs">System Online</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-white text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="text-gray-600 hover:text-blue-900 p-1">
            <FaBars className="text-xl" />
          </button>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-6 h-6" />
            <h2 className="font-bold text-blue-900 text-sm">Admin Dashboard</h2>
          </div>
          <div className="w-8" />
        </div>

        <div className="flex-1 p-4 sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;