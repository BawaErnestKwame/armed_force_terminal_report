// src/parent/ParentDashboardLayout.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavLink, Outlet,Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt, FaClipboardList, FaFileAlt,
  FaCalendarCheck, FaUser, FaBars, FaTimes,
  FaSignOutAlt, FaCog, FaChevronDown, FaChild
} from 'react-icons/fa';
import { TERM_INFO, CHILDREN_DATA } from './data/parentData';
import logo from '../assets/logo.png';

// ─── Child context — shared across all parent pages ───────────────────────────
export const ActiveChildContext = createContext(null);
export const useActiveChild = () => useContext(ActiveChildContext);

const NAV_ITEMS = [
  { icon: FaTachometerAlt, label: 'Dashboard',    path: '/parent',              end: true },
  { icon: FaClipboardList, label: "Child's Results",  path: '/parent/results'           },
  { icon: FaFileAlt,       label: 'Report Card',  path: '/parent/reportcard'            },
  { icon: FaCalendarCheck, label: 'Attendance',   path: '/parent/attendance'            },
];

const OTHER_NAV = [
  { icon: FaUser, label: 'Profile',  path: '/parent/profile'  },
  { icon: FaCog,  label: 'Settings', path: '/parent/settings' },
];

// ─── Child switcher dropdown ──────────────────────────────────────────────────
const ChildSwitcher = ({ children, activeId, onSwitch, collapsed }) => {
  const [open, setOpen] = useState(false);
  if (children.length <= 1) return null;

  const active = CHILDREN_DATA[activeId];

  return (
    <div className="relative px-2 mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all"
        style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
      >
        <FaChild className="flex-shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">
              {active ? `${active.firstName} ${active.lastName}` : 'Select child'}
            </span>
            <FaChevronDown size={10} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border z-40 overflow-hidden"
            style={{ borderColor: 'var(--medium-gray)' }}>
            <p className="px-3 py-2 text-xs font-black uppercase text-gray-400 border-b"
              style={{ borderColor: 'var(--medium-gray)' }}>My Children</p>
            {children.map(id => {
              const child = CHILDREN_DATA[id];
              if (!child) return null;
              return (
                <button key={id} onClick={() => { onSwitch(id); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition text-left"
                  style={{ borderBottom: '1px solid var(--medium-gray)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                    style={{ backgroundColor: id === activeId ? 'var(--royal-blue)' : 'var(--success-dark)' }}>
                    {child.firstName[0]}{child.lastName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: 'var(--dark-gray)' }}>
                      {child.firstName} {child.lastName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{child.formClass} · {child.program}</p>
                  </div>
                  {id === activeId && (
                    <span className="text-xs font-bold ml-auto flex-shrink-0" style={{ color: 'var(--royal-blue)' }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────
const ParentDashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Active child — defaults to first child
  const childIds = user?.children || [];
  const [activeChildId, setActiveChildId] = useState(childIds[0] || null);
  const activeChild = activeChildId ? CHILDREN_DATA[activeChildId] : null;

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = () => { logout(); navigate('/parentLogin', { replace: true }); };

  return (
    <ActiveChildContext.Provider value={{ activeChild, activeChildId, setActiveChildId, childIds }}>
      <div className="flex min-h-screen" style={{ backgroundColor: 'var(--light-gray)' }}>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <div
          className={`
            fixed top-0 left-0 h-screen z-50 flex flex-col
            shadow-2xl border-r-4 transition-all duration-300 ease-in-out
            ${collapsed ? 'w-20' : 'w-64'}
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
          style={{
            background: `linear-gradient(180deg, var(--royal-blue), var(--royal-blue-dark))`,
            borderRightColor: 'var(--accent-red)',
          }}
        >
          {/* Branding */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0">
            {!collapsed && (
              <div className="flex items-center gap-2 text-white min-w-0">
              <Link to='/' className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <img src={logo} alt="AFTS" className="w-7 h-7 object-contain" />
                </div>
              </Link>
                <div className="min-w-0">
                  <p className="text-sm font-black leading-tight truncate">ARMED FORCES SHTS</p>
                  <p className="text-xs text-blue-200 italic truncate">Parent Portal</p>
                </div>
              </div>
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

          {/* Parent profile */}
          {!collapsed && (
            <div className="flex flex-col items-center py-4 px-4 border-b border-white/20 flex-shrink-0">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow text-white font-black text-lg uppercase border-2 border-white/20"
                style={{ backgroundColor: '#7c3aed' }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <p className="text-white text-sm font-bold text-center leading-tight">
                {user?.title} {user?.firstName} {user?.lastName}
              </p>
              <p className="text-blue-200 text-xs text-center mt-0.5">{user?.email}</p>
              <div className="mt-2 w-full px-2 py-1.5 rounded-lg text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <p className="text-xs font-bold text-yellow-300">
                  👨‍👩‍👧 {childIds.length} child{childIds.length > 1 ? 'ren' : ''} enrolled
                </p>
              </div>
            </div>
          )}

          {/* Child switcher */}
          {!collapsed && childIds.length > 1 && (
            <div className="px-2 pt-3 pb-1 border-b border-white/10 flex-shrink-0">
              <p className="text-xs font-black px-2 pb-1 uppercase tracking-widest" style={{ color: 'rgba(147,197,253,0.5)' }}>
                Viewing
              </p>
              <ChildSwitcher
                children={childIds}
                activeId={activeChildId}
                onSwitch={setActiveChildId}
                collapsed={collapsed}
              />
              {activeChild && (
                <div className="px-3 py-2 mx-0 rounded-xl mb-2 text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-bold truncate">{activeChild.firstName} {activeChild.lastName}</p>
                  <p className="text-xs text-blue-200 truncate">{activeChild.formClass}</p>
                </div>
              )}
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {!collapsed && (
              <p className="text-xs font-black px-3 pt-1 pb-1 uppercase tracking-widest"
                style={{ color: 'rgba(147,197,253,0.5)' }}>Main</p>
            )}
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <NavLink key={item.path} to={item.path} end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-0.5
                    ${isActive ? 'bg-white/15 text-white border-l-4 shadow-sm' : 'text-blue-200 hover:text-white hover:bg-white/10'}`
                  }
                  style={({ isActive }) => isActive ? { borderLeftColor: 'var(--accent-red)' } : {}}>
                  <Icon className="text-base flex-shrink-0" />
                  {!collapsed && <span className="text-sm">{item.label}</span>}
                </NavLink>
              );
            })}

            {!collapsed && (
              <p className="text-xs font-black px-3 pt-4 pb-1 uppercase tracking-widest"
                style={{ color: 'rgba(147,197,253,0.5)' }}>Others</p>
            )}
            {OTHER_NAV.map(item => {
              const Icon = item.icon;
              return (
                <NavLink key={item.path} to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-0.5
                    ${isActive ? 'bg-white/15 text-white border-l-4 shadow-sm' : 'text-blue-200 hover:text-white hover:bg-white/10'}`
                  }
                  style={({ isActive }) => isActive ? { borderLeftColor: 'var(--accent-red)' } : {}}>
                  <Icon className="text-base flex-shrink-0" />
                  {!collapsed && <span className="text-sm">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/20 flex-shrink-0">
            {!collapsed && (
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 text-xs">System Online</span>
              </div>
            )}
            <button onClick={handleLogout}
              className="flex items-center gap-2 w-full text-white text-sm px-3 py-2 rounded-lg transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-red)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
              <FaSignOutAlt />
              {!collapsed && 'Logout'}
            </button>
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────────────────── */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>

          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm sticky top-0 z-30"
            style={{ borderColor: 'var(--medium-gray)' }}>
            <button onClick={() => setMobileOpen(true)} className="p-1" style={{ color: 'var(--dark-gray)' }}>
              <FaBars className="text-xl" />
            </button>
            <div className="flex items-center gap-2">
              <img src={logo} alt="AFTS" className="w-6 h-6 object-contain" />
              <span className="font-black text-sm" style={{ color: 'var(--royal-blue)' }}>Parent Portal</span>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded"
              style={{ backgroundColor: '#eef2ff', color: 'var(--royal-blue)' }}>
              {TERM_INFO.term}
            </span>
          </div>

          {/* Desktop top bar */}
          <header className="hidden lg:flex items-center justify-between px-6 py-3 bg-white border-b flex-shrink-0"
            style={{ borderColor: 'var(--medium-gray)' }}>
            <p className="text-xs" style={{ color: 'var(--dark-gray)', opacity: 0.7 }}>
              ARMED FORCES SHTS · Parent Portal /{' '}
              <span style={{ color: 'var(--royal-blue)', fontWeight: 700, opacity: 1 }}>
                {user?.title} {user?.lastName}
              </span>
              {activeChild && (
                <> · Viewing: <span style={{ color: '#7c3aed', fontWeight: 700 }}>
                  {activeChild.firstName} {activeChild.lastName}
                </span></>
              )}
            </p>
            <div className="flex items-center gap-3 text-xs">
              {childIds.length > 1 && (
                <div className="flex items-center gap-1">
                  {childIds.map(id => {
                    const c = CHILDREN_DATA[id];
                    return (
                      <button key={id} onClick={() => setActiveChildId(id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition"
                        style={{
                          backgroundColor: id === activeChildId ? '#7c3aed' : '#f5f3ff',
                          color: id === activeChildId ? 'white' : '#7c3aed',
                        }}>
                        <span>{c?.firstName}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <span className="px-3 py-1.5 rounded-lg font-semibold"
                style={{ backgroundColor: '#eef2ff', color: 'var(--royal-blue)' }}>
                📅 {TERM_INFO.academicYear} · {TERM_INFO.term}
              </span>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ActiveChildContext.Provider>
  );
};

export default ParentDashboardLayout;