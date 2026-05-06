// admin/teacher/TeacherDashboard.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, ClipboardList, CheckCircle2, MessageSquare,
  FileText, BarChart3, Award, Users, Shield, Menu, X, Bell, Calendar, LogOut
} from 'lucide-react';
import HomeSection from './components/HomeSection';
import ClassesSection from './components/ClassesSection';
import ScoreEntrySection from './components/ScoreEntrySection';
import AttendanceSection from './components/AttendanceSection';
import CommentsSection from './components/CommentsSection';
import ReportCardsSection from './components/ReportCardsSection';
import AnalyticsSection from './components/AnalyticsSection';
import HODPanel from './components/HODPanel';
import FormClassPanel from './components/FormClassPanel';
import ExaminerPanel from './components/ExaminerPanel';

const TeacherDashboard = () => {
  const location = useLocation();
  const { teacher } = location.state || {};
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!teacher) {
    return <div className="text-center py-10 text-gray-500">No instructor data available.</div>;
  }

  const isHOD = teacher.roles.includes('HOD');
  const isFormTeacher = teacher.roles.includes('FORM_TEACHER');
  const isExaminer = teacher.roles.includes('EXAMINER');

  const NAV_ITEMS = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: BookOpen },
    { id: 'scores', label: 'Score Entry', icon: ClipboardList },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle2 },
    { id: 'comments', label: 'Cadet Comments', icon: MessageSquare },
    { id: 'reports', label: 'Report Cards', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ...(isHOD ? [{ id: 'hod', label: 'HOD Panel', icon: Award, badge: 'HOD' }] : []),
    ...(isFormTeacher ? [{ id: 'formclass', label: 'Form Class', icon: Users, badge: 'FT' }] : []),
    ...(isExaminer ? [{ id: 'examiner', label: 'Examiner Panel', icon: Shield, badge: 'EX' }] : []),
  ];

  const renderSection = () => {
    switch (activeTab) {
      case 'home': return <HomeSection teacher={teacher} />;
      case 'classes': return <ClassesSection teacher={teacher} />;
      case 'scores': return <ScoreEntrySection teacher={teacher} />;
      case 'attendance': return <AttendanceSection teacher={teacher} />;
      case 'comments': return <CommentsSection teacher={teacher} />;
      case 'reports': return <ReportCardsSection teacher={teacher} />;
      case 'analytics': return <AnalyticsSection teacher={teacher} />;
      case 'hod': return <HODPanel teacher={teacher} />;
      case 'formclass': return <FormClassPanel teacher={teacher} />;
      case 'examiner': return <ExaminerPanel teacher={teacher} />;
      default: return <HomeSection teacher={teacher} />;
    }
  };

  const activeLabel = NAV_ITEMS.find(n => n.id === activeTab)?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-blue-900 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="px-5 py-5 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"><Shield size={18} className="text-yellow-400" /></div>
            <div><p className="text-white font-bold text-sm">ARMED FORCES SHTS</p><p className="text-blue-300 text-xs">Service With Humanity</p></div>
          </div>
        </div>
        <div className="px-5 py-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">{teacher.name.charAt(0)}</div>
            <div><p className="text-white font-semibold text-sm truncate">{teacher.name}</p><p className="text-blue-300 text-xs">{teacher.subject}</p></div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {['Subject Teacher', ...teacher.roles.filter(r => r !== 'SUBJECT_TEACHER')].map(r => (
              <span key={r} className="text-xs px-1.5 py-0.5 bg-blue-800 text-blue-200 rounded">{r.replace('_', ' ')}</span>
            ))}
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'bg-white text-blue-900' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}>
                <Icon size={16} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${active ? 'bg-blue-900 text-white' : 'bg-blue-800 text-blue-300'}`}>{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-blue-800">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-300 hover:bg-blue-800 hover:text-white text-sm transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"><Menu size={18} /></button>
            <div><h1 className="font-bold text-gray-800 text-lg">{activeLabel}</h1><p className="text-xs text-gray-400">Home / Instructor / <span className="text-blue-700">{activeLabel}</span></p></div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{renderSection()}</main>
      </div>
    </div>
  );
};

export default TeacherDashboard;