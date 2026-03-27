import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FaGraduationCap } from "react-icons/fa";

import {
  FaTachometerAlt, FaUsers, FaCalendarAlt, FaClipboardList,
  FaDatabase, FaFileAlt, FaBullhorn, FaChartPie,
  FaBolt, FaBell, FaSearch, FaHeart, FaShieldAlt,
  FaUserPlus, FaDownload, FaSitemap, FaEdit,
  FaUserGraduate, FaChalkboardTeacher, FaSchool,
  FaExclamationTriangle, FaClock, FaCheckCircle,
  FaSignOutAlt, FaAngleRight
} from 'react-icons/fa';


const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const stats = [
    { icon: <FaUserGraduate />, value: '1,245', label: 'Total Students', change: '↑ 5% from last term', changeColor: 'text-green-500', bg: 'bg-blue-400' },
    { icon: <FaChalkboardTeacher />, value: '78', label: 'Teaching Staff', change: '— No change', changeColor: 'text-yellow-500', bg: 'bg-green-500' },
    { icon: <FaSchool />, value: '42', label: 'Active Classes', change: '↑ 2 new classes', changeColor: 'text-green-500', bg: 'bg-purple-500' },
    { icon: <FaFileAlt />, value: '89%', label: 'Reports Completed', change: '! 11% pending', changeColor: 'text-red-500', bg: 'bg-red-500' },
  ];

  const recentActivity = [
    { icon: <FaUserPlus />, iconBg: 'bg-green-500', title: 'New teacher account created', desc: 'Mrs. Akosua Mensah added to Mathematics Department', time: '10 minutes ago', timeColor: 'text-blue-600' },
    { icon: <FaExclamationTriangle />, iconBg: 'bg-yellow-500', title: 'Report submission deadline approaching', desc: '3 teachers have not submitted Term 3 grades', time: '1 hour ago', timeColor: 'text-blue-600' },
    { icon: <FaDatabase />, iconBg: 'bg-blue-500', title: 'Automated backup completed', desc: 'Daily backup successful - 2.3GB of data secured', time: '2 hours ago', timeColor: 'text-blue-600' },
    { icon: <FaFileAlt />, iconBg: 'bg-green-600', title: 'Report cards generated', desc: 'Form 2 Science reports exported for printing', time: '4 hours ago', timeColor: 'text-blue-600' },
  ];

  const quickActions = [
    { icon: <FaUserPlus />, label: 'Add New User' },
    { icon: <FaCalendarAlt />, label: 'Setup New Term' },
    { icon: <FaBullhorn />, label: 'Send Announcement' },
    { icon: <FaDownload />, label: 'Backup Now' },
    { icon: <FaSitemap />, label: 'Manage Classes' },
    { icon: <FaEdit />, label: 'Edit Report Template' },
  ];

  const notifications = [
    {
      icon: <span className="text-red-500 text-xl">!</span>,
      iconBg: 'bg-red-100 border-l-4 border-red-500',
      title: 'System Maintenance Scheduled',
      desc: 'Scheduled for Saturday, 2:00 AM - 4:00 AM',
      action: { label: 'Dismiss', style: 'border border-gray-400 text-gray-700' }
    },
    {
      icon: <span className="text-blue-500 text-xl font-bold">i</span>,
      iconBg: 'bg-blue-50 border-l-4 border-blue-500',
      title: 'New Feature Available',
      desc: 'Bulk SMS messaging now supports attachments',
      action: { label: 'Learn More', style: 'border border-gray-400 text-gray-700' }
    },
    {
      icon: <FaClock className="text-yellow-500" />,
      iconBg: 'bg-yellow-50 border-l-4 border-yellow-500',
      title: 'License Renewal Required',
      desc: 'System license expires in 15 days',
      action: { label: 'Renew Now', style: 'border border-gray-400 text-gray-700' }
    },
  ];

  const events = [
    { day: '25', month: 'JUN', title: 'Term 3 Examinations Begin', desc: 'All classes | 8:00 AM - 3:00 PM', badge: 'Upcoming', badgeStyle: 'border border-blue-400 text-blue-500 rounded-full' },
    { day: '30', month: 'JUN', title: 'Grade Submission Deadline', desc: 'All teachers must submit final grades', badge: 'Deadline', badgeStyle: 'border border-red-400 text-red-500 rounded-full' },
    { day: '05', month: 'JUL', title: 'Report Card Distribution', desc: "Parents' day for report collection", badge: 'Scheduled', badgeStyle: 'border border-blue-700 text-blue-800 rounded-full' },
  ];

  return (
    <div className="flex w-full min-h-screen font-sans" style={{ fontFamily: 'Segoe UI, sans-serif' }}>

    

      {/* Spacer that matches the sidebar width so main content is never hidden behind it */}
      <div
        className="flex-shrink-0 transition-all duration-300 ease-in-out"
        style={{ width: collapsed ? '80px' : '256px' }}
      />

      {/* Main Content — takes all remaining space */}
      <div className="flex-1 min-w-0 bg-gray-50 overflow-y-auto">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--royal-blue-dark)' }}>Admin Dashboard</h2>
            <p className="text-sm text-gray-500">Home / Admin / <span className="text-red-500 font-medium">Dashboard</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">
              <FaBolt className="text-gray-600" />
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center relative hover:bg-gray-100">
              <FaBell className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">
              <FaSearch className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2 text-white px-4 py-2 rounded-lg ml-2 bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] border-b-2 border-red-700">
              <FaCalendarAlt />
              <div className="text-xs leading-tight">
                <div className="font-bold">Academic Year: 2023/2024</div>
                <div>Term 3 | Track A</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className={`w-14 h-14 ${stat.bg} rounded-xl flex items-center justify-center text-white text-2xl shadow`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className={`text-xs font-medium mt-1 ${stat.changeColor}`}>{stat.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">

            {/* System Health */}
            <div className="rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] border-b-4 border-red-700 px-4 py-6 flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <FaHeart className="text-pink-400" /> System Health Status
                </div>
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">All Systems Operational</span>
              </div>
              <div className="bg-white mx-4 mb-4 rounded-lg p-5 space-y-5">
                {/* Server Uptime */}
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                    <span>▤</span> Server Uptime
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: '99.8%', background: 'linear-gradient(90deg, var(--royal-blue), #e53935)' }}></div>
                  </div>
                  <div className="text-right text-sm font-bold text-gray-700 mt-1">99.8%</div>
                </div>
                {/* DB Storage */}
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                    <span>🗄</span> Database Storage
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: '65%', background: 'linear-gradient(90deg, var(--royal-blue), #e53935)' }}></div>
                  </div>
                  <div className="text-right text-sm font-bold text-gray-700 mt-1">65% (2.3GB/3.5GB)</div>
                </div>
                {/* Security */}
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                    <FaShieldAlt /> Security Status
                  </div>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <FaCheckCircle /> All Checks Passed
                  </div>
                </div>
              </div>
            </div>

            {/* Recent System Activity */}
            <div className="rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] border-b-4 border-red-700 px-4 py-6 flex items-center gap-2 text-white font-bold text-base">
                <FaClock className="text-blue-300" /> Recent System Activity
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <button className="text-red-400 text-sm font-semibold hover:text-red-300">View All</button>
              </div>
              <div className="bg-white mx-4 mb-4 rounded-lg divide-y divide-gray-100">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-4">
                    <div className={`w-9 h-9 ${a.iconBg} rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0`}>
                      {a.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{a.title}</p>
                      <p className="text-gray-500 text-xs">{a.desc}</p>
                      <p className={`text-xs font-medium mt-0.5 ${a.timeColor}`}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6">

            {/* Quick Actions */}
            <div className="rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] border-b-4 border-red-700 flex items-center gap-2 px-6 py-4 text-white font-bold text-base">
                <FaBolt className="text-yellow-400" /> Quick Actions
              </div>
              <div className="bg-gray-50 mx-4 mb-4 rounded-lg grid grid-cols-2 gap-3 p-4">
                {quickActions.map((action, i) => (
                  <button key={i} className="flex flex-col items-center gap-2 bg-white rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-blue-50 transition-all">
                    <span className="text-2xl" style={{ color: 'var(--royal-blue-dark)' }}>{action.icon}</span>
                    <span className="text-sm font-medium text-center" style={{ color: 'var(--royal-blue-dark)' }}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Notifications + Events */}
            <div className="space-y-6">

              {/* Important Notifications */}
              <div className="rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] border-b-4 border-red-700 flex items-center gap-2 text-white font-bold text-base px-6 py-4 w-full">
                  <FaBell /> Important Notifications
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-white text-sm font-semibold">3 New</span>
                </div>
                <div className="bg-white mx-4 mb-4 rounded-lg divide-y divide-gray-100">
                  {notifications.map((n, i) => (
                    <div key={i} className={`p-4 ${n.iconBg}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span>{n.icon}</span>
                        <p className="font-bold text-gray-800 text-sm">{n.title}</p>
                      </div>
                      <p className="text-gray-500 text-xs mb-2">{n.desc}</p>
                      <button className={`text-xs px-3 py-1 rounded ${n.action.style} hover:bg-gray-100`}>
                        {n.action.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Upcoming Events */}
          <div className="shadow-lg w-full">
            <div className="bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] px-6 py-4 border-b-4 border-red-700 flex items-center justify-between rounded-t-2xl mt-20">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <FaCalendarAlt /> Upcoming Academic Events
              </div>
              <button className="text-red-400 text-sm font-semibold hover:text-red-300">Full Calendar</button>
            </div>
            <div className="mt-4 gap-4 mx-4 mb-4 rounded-lg divide-y divide-gray-100">
              {events.map((ev, i) => (
                <div key={i} className="flex items-center mb-2 gap-4 p-4">
                  <div className="border-2 rounded-lg px-3 py-2 text-center min-w-[54px]" style={{ borderColor: 'var(--royal-blue-dark)' }}>
                    <div className="text-lg font-bold leading-none" style={{ color: 'var(--royal-blue-dark)' }}>{ev.day}</div>
                    <div className="text-xs font-semibold" style={{ color: 'var(--royal-blue)' }}>{ev.month}</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: 'var(--royal-blue-dark)' }}>{ev.title}</p>
                    <p className="text-gray-500 text-xs">{ev.desc}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 ${ev.badgeStyle}`}>{ev.badge}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="p-8">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;