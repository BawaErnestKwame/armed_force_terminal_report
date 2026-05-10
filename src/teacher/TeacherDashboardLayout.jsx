// src/teacher/TeacherDashboardLayout.jsx
// Sidebar nav is determined ONLY by the role the teacher chose at login.
// No role switcher. No cross-role navigation possible.

import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt, FaBookOpen, FaClipboardList, FaCheckSquare,
  FaCommentDots, FaFileAlt, FaChartBar, FaAward, FaUsers,
  FaBars, FaTimes, FaSignOutAlt, FaCog, FaUser, FaShieldAlt,
  FaUserShield, FaCalendarCheck, FaHome, FaHeart, FaTools,
  FaRunning, FaLayerGroup
} from 'react-icons/fa';
import { TERM_INFO } from './data/teacherData';
import logo from '../assets/logo.png';

// ─── All nav item definitions ─────────────────────────────────────────────────
const N = {
  dashboard:    { icon: FaTachometerAlt, label: 'Dashboard',          path: '/teacher',               end: true  },
  classes:      { icon: FaBookOpen,      label: 'My Classes',          path: '/teacher/classes'                   },
  scores:       { icon: FaClipboardList, label: 'Score Entry',         path: '/teacher/scores'                    },
  attendance:   { icon: FaCheckSquare,   label: 'Attendance',          path: '/teacher/attendance'                },
  comments:     { icon: FaCommentDots,   label: 'Comments',            path: '/teacher/comments'                  },
  reports:      { icon: FaFileAlt,       label: 'Report Cards',        path: '/teacher/reports'                   },
  analytics:    { icon: FaChartBar,      label: 'Analytics',           path: '/teacher/analytics'                 },
  hod:          { icon: FaAward,         label: 'HOD Panel',           path: '/teacher/hod',       badge: 'HOD'   },
  assistantHod: { icon: FaUserShield,    label: 'Asst HOD Panel',      path: '/teacher/assistant-hod', badge: 'AHOD' },
  formclass:    { icon: FaUsers,         label: 'Form Class',          path: '/teacher/formclass', badge: 'FT'    },
  examcoord:    { icon: FaCalendarCheck, label: 'Exam Coordinator',    path: '/teacher/examcoord', badge: 'EC'    },
  house:        { icon: FaHome,          label: 'House Panel',         path: '/teacher/house',     badge: 'HM'    },
  counsellor:   { icon: FaHeart,         label: 'Counselling',         path: '/teacher/counsellor', badge: 'GC'  },
  workshop:     { icon: FaTools,         label: 'Workshop',            path: '/teacher/workshop',  badge: 'WS'    },
  sports:       { icon: FaRunning,       label: 'Sports',              path: '/teacher/sports',    badge: 'SM'    },
};

// ─── Sidebar nav per role combo ───────────────────────────────────────────────
// Only the items relevant to that exact role are shown.
// No item from another role bleeds in.
const SIDEBAR_CONFIG = {

  'Subject Teacher': [
    { section: 'Main',     items: [N.dashboard, N.classes, N.scores, N.attendance] },
    { section: 'Academic', items: [N.comments, N.reports, N.analytics]             },
  ],

  'Subject Teacher + Form Teacher': [
    { section: 'Main',         items: [N.dashboard, N.classes, N.scores, N.attendance] },
    { section: 'Academic',     items: [N.comments, N.reports, N.analytics]             },
    { section: 'Form Teacher', items: [N.formclass]                                    },
  ],

  'HOD': [
    { section: 'Main',       items: [N.dashboard]             },
    { section: 'Department', items: [N.hod, N.analytics]      },
    { section: 'Teaching',   items: [N.scores]                },
  ],

  'HOD + Subject Teacher': [
    { section: 'Main',       items: [N.dashboard, N.classes, N.scores, N.attendance] },
    { section: 'Department', items: [N.hod, N.analytics]                             },
    { section: 'Academic',   items: [N.comments, N.reports]                          },
  ],

  'HOD + Subject Teacher + Form Teacher': [
    { section: 'Main',         items: [N.dashboard, N.classes, N.scores, N.attendance] },
    { section: 'Academic',     items: [N.comments, N.reports, N.analytics]             },
    { section: 'Department',   items: [N.hod]                                          },
    { section: 'Form Teacher', items: [N.formclass]                                    },
  ],

  'Assistant HOD': [
    { section: 'Main',       items: [N.dashboard]                    },
    { section: 'Department', items: [N.assistantHod, N.analytics]    },
    { section: 'Teaching',   items: [N.scores]                       },
  ],

  'Assistant HOD + Subject Teacher': [
    { section: 'Main',       items: [N.dashboard, N.classes, N.scores, N.attendance] },
    { section: 'Department', items: [N.assistantHod, N.analytics]                   },
    { section: 'Academic',   items: [N.comments, N.reports]                         },
  ],

  'House Master/Mistress': [
    { section: 'Main',     items: [N.dashboard]                           },
    { section: 'House',    items: [N.house]                               },
    { section: 'Teaching', items: [N.scores, N.attendance, N.analytics]  },
  ],

  'Workshop Supervisor': [
    { section: 'Main',     items: [N.dashboard]                         },
    { section: 'Workshop', items: [N.workshop]                          },
    { section: 'Teaching', items: [N.classes, N.scores, N.attendance]   },
  ],

  'Sports Master/Mistress': [
    { section: 'Main',     items: [N.dashboard]                         },
    { section: 'Sports',   items: [N.sports]                            },
    { section: 'Teaching', items: [N.classes, N.scores, N.attendance]   },
  ],

  'Guidance Counsellor': [
    { section: 'Main',        items: [N.dashboard]                        },
    { section: 'Counselling', items: [N.counsellor]                       },
    { section: 'Teaching',    items: [N.classes, N.scores, N.attendance]  },
  ],

  'Exam Coordinator': [
    { section: 'Main',         items: [N.dashboard]                  },
    { section: 'Examinations', items: [N.examcoord]                  },
    { section: 'Teaching',     items: [N.scores, N.analytics]        },
  ],

  'Subject Teacher + HOD + Exam Coordinator': [
    { section: 'Main',         items: [N.dashboard, N.classes, N.scores, N.attendance] },
    { section: 'Department',   items: [N.hod, N.analytics]                             },
    { section: 'Examinations', items: [N.examcoord]                                    },
    { section: 'Academic',     items: [N.comments, N.reports]                          },
  ],

  'Subject Teacher + Form Teacher + Sports Master': [
    { section: 'Main',         items: [N.dashboard, N.classes, N.scores, N.attendance] },
    { section: 'Academic',     items: [N.comments, N.reports, N.analytics]             },
    { section: 'Form Teacher', items: [N.formclass]                                    },
    { section: 'Sports',       items: [N.sports]                                       },
  ],
};

const DEFAULT_NAV = SIDEBAR_CONFIG['Subject Teacher'];

// ─── Component ────────────────────────────────────────────────────────────────
const TeacherDashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, activeRole } = useAuth();

  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    navigate('/teacherLogin', { replace: true });
  };

  // Sidebar sections locked to the chosen role — never changes at runtime
  const navSections = SIDEBAR_CONFIG[activeRole] || DEFAULT_NAV;

  const otherNav = [
    { icon: FaUser, label: 'Profile',  path: '/teacher/profile'  },
    { icon: FaCog,  label: 'Settings', path: '/teacher/settings' },
  ];

  return (
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
        {/* School branding */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2 text-white min-w-0">
              <Link to='/' className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <img src={logo} alt="AFTS" className="w-7 h-7 object-contain" />
              </div>
              </Link>
              <div className="min-w-0">
                <p className="text-sm font-black leading-tight truncate">ARMED FORCES SHTS</p>
                <p className="text-xs text-blue-200 italic truncate">Service With Humanity</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <button onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:text-blue-200 p-1 transition" title="Toggle sidebar">
              <FaBars />
            </button>
            <button onClick={() => setMobileOpen(false)}
              className="lg:hidden text-white hover:text-blue-200 p-1 transition">
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Teacher profile + role badge */}
        {!collapsed && (
          <div className="flex flex-col items-center py-4 px-4 border-b border-white/20 flex-shrink-0">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow text-white font-black text-lg uppercase border-2 border-white/20"
              style={{ backgroundColor: 'var(--accent-red)' }}
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>

            <p className="text-white text-sm font-bold text-center leading-tight">
              {user?.title} {user?.firstName} {user?.lastName}
            </p>
            <p className="text-blue-200 text-xs text-center mt-0.5">{user?.subject}</p>
            <p className="text-blue-300/60 text-xs text-center">{user?.department} Dept · {user?.staffId}</p>

            {/* Role badge — locked to chosen role */}
            <div className="mt-2 w-full px-2 py-1.5 rounded-lg text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-xs font-bold text-yellow-300 leading-snug">🎭 {activeRole}</p>
            </div>
          </div>
        )}

        {/* Role-locked nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="mb-1">
              {/* Section label */}
              {!collapsed && (
                <p className="text-xs font-black px-3 pt-3 pb-1 uppercase tracking-widest"
                  style={{ color: 'rgba(147,197,253,0.5)' }}>
                  {section.section}
                </p>
              )}

              {/* Items */}
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-0.5
                      ${isActive
                        ? 'bg-white/15 text-white border-l-4 shadow-sm'
                        : 'text-blue-200 hover:text-white hover:bg-white/10'
                      }`
                    }
                    style={({ isActive }) => isActive ? { borderLeftColor: 'var(--accent-red)' } : {}}
                  >
                    <Icon className="text-base flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded font-bold flex-shrink-0"
                            style={{ backgroundColor: 'rgba(230,57,70,0.3)', color: '#fca5a5' }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}

          {/* Others — profile & settings always visible */}
          {!collapsed && (
            <p className="text-xs font-black px-3 pt-3 pb-1 uppercase tracking-widest"
              style={{ color: 'rgba(147,197,253,0.5)' }}>
              Others
            </p>
          )}
          {otherNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-0.5
                  ${isActive
                    ? 'bg-white/15 text-white border-l-4 shadow-sm'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`
                }
                style={({ isActive }) => isActive ? { borderLeftColor: 'var(--accent-red)' } : {}}
              >
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-white text-sm px-3 py-2 rounded-lg transition-all"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-red)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
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
            <span className="font-black text-sm" style={{ color: 'var(--royal-blue)' }}>Teacher Portal</span>
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
            ARMED FORCES SHTS · Teacher Portal /{' '}
            <span style={{ color: 'var(--royal-blue)', opacity: 1, fontWeight: 700 }}>
              {user?.title} {user?.lastName}
            </span>
            {' '}·{' '}
            <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
              {activeRole}
            </span>
          </p>
          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-lg font-semibold"
              style={{ backgroundColor: '#eef2ff', color: 'var(--royal-blue)' }}>
              📅 {TERM_INFO.academicYear} · {TERM_INFO.term} · Track {TERM_INFO.track}
            </span>
            <span className="px-3 py-1.5 rounded-lg font-semibold"
              style={{ backgroundColor: '#fffbeb', color: '#92400e' }}>
              🔁 Double Track
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboardLayout;