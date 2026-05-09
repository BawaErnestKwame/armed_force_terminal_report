// src/teacher/dashboard/TeacherHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ClipboardList, FileText, Activity, BookMarked, Bell, RefreshCw, Edit3, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { LOGGED_IN_TEACHER, TERM_INFO, CLASSES_DATA, NOTIFICATIONS } from '../data/teacherData';
import { StatCard, RolePill, LoadBar, NotifIcon } from '../components/TeacherUI';

const TeacherHome = () => {
  const navigate = useNavigate();
  const teacher  = LOGGED_IN_TEACHER;

  const totalStudents = CLASSES_DATA.reduce((s, c) => s + c.students, 0);
  const pendingCA     = CLASSES_DATA.filter(c => !c.caSubmitted).length;
  const pendingExam   = CLASSES_DATA.filter(c => !c.examSubmitted).length;
  const termProgress  = Math.round((TERM_INFO.weeksGone / TERM_INFO.weeksTotal) * 100);

  return (
    <div className="space-y-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden border-b-4 border-[var(--accent-red)]">
        {/* <div className="absolute right-0 top-0 w-64 h-full opacity-10 pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-white absolute -right-12 -top-12" />
          <div className="w-32 h-32 rounded-full bg-white absolute right-8 bottom-4" />
        </div> */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm mb-1">Welcome back,</p>
            <h2 className="text-xl sm:text-2xl font-bold">{teacher.title} {teacher.firstName} {teacher.lastName}</h2>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <RolePill role="Subject Teacher" />
              {teacher.additionalRoles.map(r => <RolePill key={r} role={r} />)}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center min-w-[140px]">
            <p className="text-blue-200 text-xs mb-1">{TERM_INFO.academicYear}</p>
            <p className="font-bold">{TERM_INFO.term} · Track {TERM_INFO.track}</p>
            <p className="text-blue-200 text-xs mt-1">Week {TERM_INFO.weeksGone} of {TERM_INFO.weeksTotal}</p>
            <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${termProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}         label="Total Students"    value={totalStudents}  sub={`${teacher.classes.length} classes`} color="bg-blue-600"   onClick={() => navigate('/teacher/classes')} />
        <StatCard icon={ClipboardList} label="Pending CA Scores" value={pendingCA}      sub="classes awaiting"  color={pendingCA  > 0 ? 'bg-red-600'    : 'bg-green-600'} onClick={() => navigate('/teacher/scores')} />
        <StatCard icon={FileText}      label="Pending Exam"      value={pendingExam}    sub="classes awaiting"  color={pendingExam > 0 ? 'bg-orange-500' : 'bg-green-600'} onClick={() => navigate('/teacher/scores')} />
        <StatCard icon={Activity}      label="Teaching Load"     value={`${teacher.currentPeriods}/${teacher.maxPeriods}`} sub="periods this week" color="bg-purple-600" />
      </div>

      {/* Classes + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* My Classes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
              <BookMarked size={15} className="text-blue-900" /> My Classes
            </h3>
            <button onClick={() => navigate('/teacher/classes')} className="text-xs text-blue-700 hover:underline flex items-center gap-1">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {CLASSES_DATA.map(cls => (
              <div key={cls.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <BookMarked size={15} className="text-blue-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="font-semibold text-gray-800 text-sm">{cls.name}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${cls.track === 'A' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>Track {cls.track}</span>
                    {cls.isFormClass && <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Form Class</span>}
                  </div>
                  <p className="text-xs text-gray-400">{cls.students} students · {cls.program}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className={`flex items-center gap-1 text-xs ${cls.caSubmitted ? 'text-green-600' : 'text-red-500'}`}>
                      {cls.caSubmitted ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />} CA
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${cls.examSubmitted ? 'text-green-600' : 'text-orange-500'}`}>
                      {cls.examSubmitted ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />} Exam
                    </div>
                  </div>
                  <button onClick={() => navigate('/teacher/scores')} className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition">
                    <Edit3 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100">
            <Bell size={15} className="text-blue-900" />
            <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
            <span className="ml-auto w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{NOTIFICATIONS.length}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className="px-4 py-3">
                <div className="flex gap-2">
                  <NotifIcon type={n.type} />
                  <div>
                    <p className="text-xs text-gray-700 leading-relaxed">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Track Schedule */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4 text-sm">
          <RefreshCw size={15} className="text-blue-900" />
          Double Track Schedule — {TERM_INFO.academicYear} {TERM_INFO.term}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="font-semibold text-yellow-800 text-sm">Track A — Currently In Session</span>
            </div>
            <p className="text-xs text-yellow-700">Start: {new Date(TERM_INFO.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-xs text-yellow-700">End: {new Date(TERM_INFO.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-xs font-semibold text-yellow-800 mt-2">Week {TERM_INFO.weeksGone} / {TERM_INFO.weeksTotal}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-semibold text-green-800 text-sm">Track B — On Vacation</span>
            </div>
            <p className="text-xs text-green-700">{TERM_INFO.trackBSchedule}</p>
            <p className="text-xs text-green-600 mt-1">Your Track B classes: Form 2B, Form 3B</p>
            <p className="text-xs font-semibold text-green-800 mt-1">Scores due before track resumes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;