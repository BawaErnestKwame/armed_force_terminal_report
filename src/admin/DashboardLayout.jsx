import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  FaGraduationCap,
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaDatabase,
  FaFileAlt,
  FaBullhorn,
  FaChartPie,
  FaSignOutAlt,
  FaAngleRight,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const DashboardLayout = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("academic")) {
      setOpenMenu(2);
    }
  }, [location.pathname]);

  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaUsers />, label: 'User Management', path: 'userManagement' },
    {
      icon: <FaCalendarAlt />,
      label: 'Academic Setup',
      children: [
        { label: "Academic Year/Term", path: "academicYear" },
        { label: "School Structure", path: "schoolStructure" },
        { label: "Grading Configuration", path: "gradingConfig" },
        { label: "Comment Bank", path: "commentBank" },
      ]
    },
    { icon: <FaClipboardList />, label: 'Audit Logs', path: 'auditLogs' },
    { icon: <FaDatabase />, label: 'Backup Status', path: 'backupStatus' },
    { icon: <FaFileAlt />, label: 'Report Templates', path: 'reportTemplates' },
    { icon: <FaBullhorn />, label: 'Bulk Communication', path: 'bulkCommunication' },
    { icon: <FaChartPie />, label: 'Analytics Dashboard', path: 'analyticsDashboard' },
  ];

  return (
    <div className="flex">

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col
          shadow-2xl border-r-4 border-red-600
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: 'linear-gradient(180deg, var(--royal-blue), var(--royal-blue-dark))'
        }}
      >

        {/* TOP */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <NavLink to="/">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
                  <FaGraduationCap className="text-red-500 text-xl" />
                </div>
                <h1 className="text-white text-sm font-bold tracking-wide">
                  EXCELLENCE
                </h1>
              </div>
            </NavLink>
          )}

          <div className="flex items-center gap-2">
            <button onClick={() => setCollapsed(!collapsed)}>
              <FaBars className="text-white" />
            </button>

            {/* MOBILE CLOSE */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden"
            >
              <FaTimes className="text-white" />
            </button>
          </div>
        </div>

        {/* PROFILE */}
        {!collapsed && (
          <div className="flex flex-col items-center py-4 border-b border-white/20">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-2 shadow">
              <FaUsers className="text-white text-xl" />
            </div>
            <p className="text-white text-sm font-semibold">
              System Administrator
            </p>
            <span className="text-xs text-blue-200">
              admin@excellence.edu.gh
            </span>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">

          {navItems.map((item, index) => {

            const isChildActive = item.children?.some(child =>
              location.pathname.includes(child.path)
            );

            return (
              <div key={item.label} className="relative group">

                {/* NORMAL LINK */}
                {!item.children ? (
                  <NavLink
                    to={item.path}
                    end={item.path === '/dashboard'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300
                      ${isActive
                        ? 'bg-white/10 text-white border-l-4 border-red-500 shadow'
                        : 'text-blue-200 hover:text-white hover:bg-white/10'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                ) : (
                  <div>

                    {/* PARENT */}
                    <div
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-300
                      ${isChildActive ? 'bg-white/10 text-white' : 'text-blue-200 hover:text-white hover:bg-white/10'}
                      `}
                    >
                      <span className="text-lg">{item.icon}</span>

                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>

                          {/* ROTATING ARROW */}
                          <FaAngleRight
                            className={`transition-transform duration-300 ${
                              openMenu === index ? 'rotate-90' : ''
                            }`}
                          />
                        </>
                      )}
                    </div>

                    {/* SUBMENU */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openMenu === index && !collapsed ? 'max-h-40' : 'max-h-0'
                      }`}
                    >
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.label}
                            to={child.path}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                              `block text-sm px-2 py-1 rounded transition-all duration-200
                              ${isActive
                                ? 'bg-red-500 text-white shadow'
                                : 'text-blue-200 hover:text-white hover:bg-white/10'
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TOOLTIP */}
                {collapsed && (
                  <div className="absolute left-16 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded shadow">
                      {item.label}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/20">
          {!collapsed && (
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-300 text-xs">System Online</span>
            </div>
          )}

          <button className="flex items-center gap-2 w-full text-white text-sm px-3 py-2 rounded-lg bg-[var(--royal-blue-dark)] hover:bg-[var(--royal-blue)] transition-all">
            <FaSignOutAlt />
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>

        {/* TOPBAR */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow">
          <button onClick={() => setMobileOpen(true)}>
            <FaBars />
          </button>
          <h2 className="font-bold text-blue-900">Dashboard</h2>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;