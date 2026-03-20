import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  FaBars
} from 'react-icons/fa';

const Sidebar = ({collapsed, setCollapsed}) => {

  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeSub, setActiveSub] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboardLayout' },
    { icon: <FaUsers />, label: 'User Management', path: '/userManagement' },

    {
      icon: <FaCalendarAlt />,
      label: 'Academic Setup',
      hasArrow: true,
      children: [
        { label: "Academic Year/Term", path: "/academicYear" },
        { label: "School Structure", path: "/schoolStructure" },
        { label: "Grading Configuration", path: "/gradingConfig" },
        { label: "Comment Bank", path: "/commentBank" },
      ]
    },

    { icon: <FaClipboardList />, label: 'Audit Logs', path: '/auditLogs' },
    { icon: <FaDatabase />, label: 'Backup Status', path: '/backupStatus' },
    { icon: <FaFileAlt />, label: 'Report Templates', path: '/reportTemplates' },
    { icon: <FaBullhorn />, label: 'Bulk Communication', path: '/bulkCommunication' },
    { icon: <FaChartPie />, label: 'Analytics Dashboard', path: '/analyticsDashboard' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen flex flex-col shadow-xl border-r-4 border-red-600 z-50
      transition-all duration-300 ease-in-out
      ${collapsed ? 'w-20' : 'w-64'}`}
      style={{
        background: 'linear-gradient(180deg, var(--royal-blue) 0%, var(--royal-blue-dark) 100%)'
      }}
    >

      {/* Top */}
      <div className="flex items-center justify-between p-4">

        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <FaGraduationCap className="text-red-500 text-xl" />
            </div>
            <h1 className="text-white text-sm font-bold">EXCELLENCE</h1>
          </div>
        )}

        <button onClick={() => setCollapsed(!collapsed)} className={collapsed ? 'mx-auto' : ''}>
          <FaBars className="text-white text-lg" />
        </button>

      </div>

      {/* Profile */}
      {!collapsed && (
        <div className="flex flex-col items-center py-4 border-b border-white/20">
          <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-2">
            <FaUsers className="text-white text-xl" />
          </div>

          <p className="text-white text-sm font-semibold">
            System Administrator
          </p>

          <span className="text-xs text-blue-300">
            admin@excellence.edu.gh
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">

        {navItems.map((item, index) => (

          <div key={item.label} className="relative group">

            {/* Main Menu */}
            <div
              onClick={() => {
                setActiveNav(item.label);
                if (item.children) {
                  setOpenMenu(openMenu === index ? null : index);
                }
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 cursor-pointer transition-all duration-200
              ${activeNav === item.label
                  ? 'text-white bg-white/10 border-l-4 border-red-500'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
            >

              <span className="text-lg flex-shrink-0">{item.icon}</span>

              {!collapsed && (
                <>
                  {!item.children ? (
                    <Link to={item.path} className="flex-1">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex-1">{item.label}</span>
                  )}

                  {item.hasArrow && (
                    <FaAngleRight
                      className={`text-xs transition-transform duration-300 ${
                        openMenu === index ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </>
              )}

            </div>

            {/* Tooltip (when collapsed) */}
            {collapsed && (
              <div className="absolute left-16 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            )}

            {/* Submenu */}
            {item.children && openMenu === index && !collapsed && (

              <div className="ml-8 mb-2 transition-all duration-300">

                {item.children.map((child) => (

                  <Link
                    to={child.path}
                    key={child.label}
                    onClick={() => setActiveSub(child.label)}
                  >
                    <div
                      className={`text-sm py-1 px-2 rounded cursor-pointer transition-all duration-200
                      ${activeSub === child.label
                          ? 'bg-red-500 text-white'
                          : 'text-blue-200 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {child.label}
                    </div>
                  </Link>

                ))}

              </div>

            )}

          </div>

        ))}

      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">

        {!collapsed && (
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-green-300 text-xs">System: Online</span>
          </div>
        )}

        <button className="flex items-center gap-2 w-full text-white text-sm px-3 py-2 rounded-lg bg-[var(--royal-blue-dark)] hover:bg-[var(--royal-blue)] transition-all duration-200">
          <FaSignOutAlt />
          {!collapsed && "Logout"}
        </button>

      </div>

    </div>
  );
};

export default Sidebar;