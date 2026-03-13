import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGraduationCap } from "react-icons/fa";
import {
  FaTachometerAlt, FaUsers, FaCalendarAlt, FaClipboardList,
  FaDatabase, FaFileAlt, FaBullhorn, FaChartPie,
  FaSignOutAlt, FaAngleRight
} from 'react-icons/fa';

const Sidebar = () => {

  const [activeNav, setActiveNav] = useState('Dashboard');
  const [openMenu, setOpenMenu] = useState(null);

  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboard' },

    { icon: <FaUsers />, label: 'User Management', path: '/userManagement' },

    {
      icon: <FaCalendarAlt />,
      label: 'Academic Setup',
      path: '/academicSetup',
      hasArrow: true,
      children: [
        { label: "Academic Year/Term", path: "academicYear" },
        { label: "School Structure", path: "/schoolStructure" },
        { label: "Grading Configuration", path: "/gradindingConfig" },
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
    <div>

      {/* Sidebar */}
      <div
        className="flex fixed top-0 left-0  h-full mb-10 flex-col w-64 border-r-4 border-red-600 shadow-xl flex-shrink-0"
        style={{ background: 'linear-gradient(180deg, var(--royal-blue) 0%, var(--royal-blue-dark) 100%)' }}
      >

        {/* Logo */}
        <div className="flex items-center gap-3 p-4 pb-2">
          <Link to="/">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <FaGraduationCap className="text-red-500 text-2xl" />
            </div>
          </Link>

          <div>
            <h1 className="text-white text-sm font-bold leading-tight">
              EXCELLENCE <br /> ACADEMY
            </h1>

            <span className="text-xs bg-gray-600 text-gray-200 px-2 py-0.5 rounded mt-1 inline-block">
              Admin Portal
            </span>
          </div>
        </div>


        {/* Admin Profile */}
        <div
          className="flex flex-col gap-4 md:flex-row items-center py-5 mx-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}
        >

          <div className="w-14 h-14 rounded-full bg-[var(--accent-red)] flex items-center justify-center mb-2 shadow-lg">
            <FaUsers className="text-white text-2xl" />
          </div>

          <div>
            <p className="text-white font-semibold text-sm">
              System Administrator
            </p>

            <p className="text-blue-300 text-xs">
              admin@excellence.edu.gh
            </p>

            <span className="mt-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              SUPER ADMIN
            </span>
          </div>

        </div>


        {/* Navigation */}
        <nav className="flex-1 py-4 px-2">

          {navItems.map((item, index) => (

            <div key={item.label}>

              {/* Main Menu */}
              <div
                onClick={() => {
                  setActiveNav(item.label)

                  if (item.children) {
                    setOpenMenu(openMenu === index ? null : index)
                  }
                }}

                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all cursor-pointer
                ${activeNav === item.label
                    ? 'text-white border-l-4 border-red-500'
                    : 'text-blue-200 hover:text-white'}`}

                style={activeNav === item.label ? { backgroundColor: 'var(--royal-blue)' } : {}}
              >

                <span className="text-base">
                  {item.icon}
                </span>

                <Link to={item.path} className="flex-1 text-left">
                  {item.label}
                </Link>

                {item.hasArrow && (
                  <FaAngleRight
                    className={`text-xs transition-transform ${openMenu === index ? 'rotate-90' : ''}`}
                  />
                )}

              </div>


              {/* Submenu */}
              {item.children && openMenu === index && (

                <div className="ml-8 mb-2">

                  {item.children.map((child) => (

                    <Link to={child.path} key={child.label}>

                      <div className="text-blue-200 hover:text-white text-sm py-1 cursor-pointer">
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
        <div
          className="p-4 mb-500"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
        >

          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>

            <span className="text-green-300 text-xs">
              System: Online
            </span>
          </div>


          <button
            className="flex items-center gap-2 w-full text-white text-sm px-4 py-2 rounded-lg transition-all"
            style={{ backgroundColor: 'var(--royal-blue-dark)' }}

            onMouseEnter={e =>
              e.currentTarget.style.backgroundColor = 'var(--royal-blue)'
            }

            onMouseLeave={e =>
              e.currentTarget.style.backgroundColor = 'var(--royal-blue-dark)'
            }
          >

            <FaSignOutAlt />
            Logout

          </button>

        </div>

      </div>

    </div>
  )
}

export default Sidebar