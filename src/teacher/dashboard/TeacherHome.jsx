// src/teacher/dashboard/TeacherHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, ClipboardList, FileText, Activity, BookMarked,
  Bell, RefreshCw, Edit3, ChevronRight, CheckCircle2,
  AlertCircle, Award, Shield, Home, Heart, Wrench,
  Trophy, Calendar, Clock, ChevronDown, TrendingUp,
  BarChart3, Star, Building2
} from 'lucide-react';
import {
  TERM_INFO, CLASSES_DATA, NOTIFICATIONS,
  DEPT_TEACHERS, YEAR_GROUP_DATA, EXAM_DATA,
  HOUSE_DATA, COUNSELLOR_DATA, WAEC_DATA,
  WORKSHOP_DATA, SPORTS_DATA, FORM_CLASS_STUDENTS,
  getGradeColor
} from '../data/teacherData';
import { StatCard, RolePill, LoadBar, NotifIcon, Avatar } from '../components/TeacherUI';
import { useAuth } from '../../context/AuthContext';

// ─── Role switcher component ──────────────────────────────────────────────────
const RoleSwitcher = ({ user, activeRole, onSwitch }) => {
  const [open, setOpen] = useState(false);
  const allRoles = ['Subject Teacher', ...(user?.additionalRoles || [])];

  if (allRoles.length <= 1) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
      >
        <span>Viewing as: <strong>{activeRole}</strong></span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border z-50 overflow-hidden min-w-[200px]"
          style={{ borderColor: 'var(--medium-gray)' }}
        >
          <p className="px-3 py-2 text-xs font-bold uppercase text-gray-400 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
            Switch Role
          </p>
          {allRoles.map(role => (
            <button
              key={role}
              onClick={() => { onSwitch(role); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-gray-50"
              style={{ color: role === activeRole ? 'var(--royal-blue)' : 'var(--dark-gray)' }}
            >
              {role}
              {role === activeRole && <CheckCircle2 size={14} style={{ color: 'var(--royal-blue)' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Base stats (every teacher) ───────────────────────────────────────────────
const BaseStats = ({ user, navigate }) => {
  const totalStudents = CLASSES_DATA.reduce((s, c) => s + c.students, 0);
  const pendingCA     = CLASSES_DATA.filter(c => !c.caSubmitted).length;
  const pendingExam   = CLASSES_DATA.filter(c => !c.examSubmitted).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Users}         label="Total Students"     value={totalStudents}    sub={`${(user?.classes||[]).length} classes`} color="bg-blue-600"   onClick={() => navigate('/teacher/classes')} />
      <StatCard icon={ClipboardList} label="Pending CA Scores"  value={pendingCA}        sub="classes awaiting"   color={pendingCA  > 0 ? 'bg-red-600' : 'bg-green-600'} onClick={() => navigate('/teacher/scores')} />
      <StatCard icon={FileText}      label="Pending Exam Scores" value={pendingExam}     sub="classes awaiting"   color={pendingExam > 0 ? 'bg-orange-500' : 'bg-green-600'} onClick={() => navigate('/teacher/scores')} />
      <StatCard icon={Activity}      label="Teaching Load"      value={`${user?.currentPeriods||0}/${user?.maxPeriods||30}`} sub="periods/week" color="bg-purple-600" />
    </div>
  );
};

// ─── My classes quick view (every teacher) ────────────────────────────────────
const MyClassesWidget = ({ navigate }) => (
  <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)' }}>
    <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
      <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
        <BookMarked size={15} style={{ color: 'var(--royal-blue)' }} /> My Classes
      </h3>
      <button onClick={() => navigate('/teacher/classes')} className="text-xs flex items-center gap-1" style={{ color: 'var(--royal-blue)' }}>
        View all <ChevronRight size={12} />
      </button>
    </div>
    <div className="divide-y" style={{ borderColor: 'var(--medium-gray)' }}>
      {CLASSES_DATA.map(cls => (
        <div key={cls.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#eef2ff' }}>
            <BookMarked size={14} style={{ color: 'var(--royal-blue)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="font-semibold text-sm" style={{ color: 'var(--dark-gray)' }}>{cls.name}</p>
              <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                style={{ backgroundColor: cls.track === 'A' ? '#fefce8' : '#f0fdf4', color: cls.track === 'A' ? '#854d0e' : 'var(--success-dark)' }}>
                Track {cls.track}
              </span>
              {cls.isFormClass && <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#eef2ff', color: 'var(--royal-blue)' }}>Form Class</span>}
            </div>
            <p className="text-xs text-gray-400">{cls.students} students · {cls.program}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-right space-y-0.5">
              <div className="flex items-center gap-1 text-xs" style={{ color: cls.caSubmitted ? 'var(--success-dark)' : 'var(--accent-red)' }}>
                {cls.caSubmitted ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />} CA
              </div>
              <div className="flex items-center gap-1 text-xs" style={{ color: cls.examSubmitted ? 'var(--success-dark)' : 'var(--warning)' }}>
                {cls.examSubmitted ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />} Exam
              </div>
            </div>
            <button onClick={() => navigate('/teacher/scores')} className="p-1.5 rounded-lg" style={{ color: 'var(--royal-blue)' }}>
              <Edit3 size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Notifications widget (every teacher) ────────────────────────────────────
const NotificationsWidget = () => (
  <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)' }}>
    <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
      <Bell size={15} style={{ color: 'var(--royal-blue)' }} />
      <h3 className="font-semibold text-sm" style={{ color: 'var(--dark-gray)' }}>Notifications</h3>
      <span className="ml-auto w-5 h-5 rounded-full text-white text-xs flex items-center justify-center" style={{ backgroundColor: 'var(--accent-red)' }}>
        {NOTIFICATIONS.length}
      </span>
    </div>
    <div className="divide-y" style={{ borderColor: 'var(--medium-gray)' }}>
      {NOTIFICATIONS.map(n => (
        <div key={n.id} className="px-4 py-3 hover:bg-gray-50">
          <div className="flex gap-2">
            <NotifIcon type={n.type} />
            <div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--dark-gray)' }}>{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Role-specific dashboard widgets ─────────────────────────────────────────

const FormTeacherWidget = ({ navigate }) => {
  const a1s    = FORM_CLASS_STUDENTS.filter(s => s.grade === 'A1').length;
  const avgAtt = Math.round(FORM_CLASS_STUDENTS.reduce((s,st) => s + st.attendance, 0) / FORM_CLASS_STUDENTS.length);
  const atRisk = FORM_CLASS_STUDENTS.filter(s => s.attendance < 85 || ['D7','E8','F9'].includes(s.grade));

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid var(--info)' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <Users size={15} style={{ color: 'var(--info)' }} /> Form Class Overview
        </h3>
        <button onClick={() => navigate('/teacher/formclass')} className="text-xs flex items-center gap-1" style={{ color: 'var(--info)' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Students',   value: FORM_CLASS_STUDENTS.length, color: 'var(--royal-blue)'  },
            { label: 'A1 Grades',  value: a1s,                        color: 'var(--success-dark)' },
            { label: 'Avg Attend', value: `${avgAtt}%`,               color: 'var(--warning)'      },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--light-gray)' }}>
              <p className="text-xl font-black" style={{ color }}>{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
        {atRisk.length > 0 && (
          <div className="rounded-lg p-3 border" style={{ backgroundColor: '#fff1f2', borderColor: 'var(--accent-red-light)' }}>
            <p className="text-xs font-bold mb-1.5" style={{ color: 'var(--accent-red)' }}>
              ⚠ {atRisk.length} student{atRisk.length > 1 ? 's' : ''} need attention
            </p>
            <div className="flex flex-wrap gap-1">
              {atRisk.map(s => (
                <span key={s.id} className="text-xs px-2 py-0.5 rounded bg-white border" style={{ borderColor: 'var(--accent-red-light)', color: 'var(--dark-gray)' }}>
                  {s.name.split(' ')[0]} <span className={`font-bold ${getGradeColor(s.grade)}`}>({s.grade})</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HODWidget = ({ navigate }) => {
  const overloaded = DEPT_TEACHERS.filter(t => t.load >= 90).length;
  const avgLoad    = Math.round(DEPT_TEACHERS.reduce((s,t) => s + t.load, 0) / DEPT_TEACHERS.length);
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid #7c3aed' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <Award size={15} style={{ color: '#7c3aed' }} /> Department Overview
        </h3>
        <button onClick={() => navigate('/teacher/hod')} className="text-xs flex items-center gap-1" style={{ color: '#7c3aed' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Teachers',   value: DEPT_TEACHERS.length, color: '#7c3aed'              },
            { label: 'Avg Load',   value: `${avgLoad}%`,        color: avgLoad >= 85 ? 'var(--accent-red)' : 'var(--success-dark)' },
            { label: 'Overloaded', value: overloaded,            color: overloaded > 0 ? 'var(--accent-red)' : 'var(--success-dark)' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--light-gray)' }}>
              <p className="text-xl font-black" style={{ color }}>{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {DEPT_TEACHERS.slice(0, 3).map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <Avatar name={t.name} size="sm" color={i === 0 ? 'bg-purple-700' : 'bg-blue-600'} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: 'var(--dark-gray)' }}>{t.name}</p>
                <p className="text-xs text-gray-400">{t.subject}</p>
              </div>
              <div className="w-20 flex-shrink-0"><LoadBar pct={t.load} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExamCoordWidget = ({ navigate }) => {
  const daysToExam = Math.ceil((new Date(EXAM_DATA.startDate) - new Date()) / (1000 * 60 * 60 * 24));
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid var(--warning)' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <Calendar size={15} style={{ color: 'var(--warning)' }} /> Exam Coordinator
        </h3>
        <button onClick={() => navigate('/teacher/examcoord')} className="text-xs flex items-center gap-1" style={{ color: 'var(--warning)' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4">
        <div className="rounded-xl p-4 text-center mb-3" style={{ background: 'linear-gradient(135deg, var(--royal-blue), var(--royal-blue-dark))' }}>
          <p className="text-white text-xs mb-1">Exam begins in</p>
          <p className="text-white font-black text-3xl">{daysToExam > 0 ? daysToExam : 0}</p>
          <p className="text-blue-200 text-xs">days</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--light-gray)' }}>
            <p className="font-black text-lg" style={{ color: 'var(--royal-blue)' }}>{EXAM_DATA.totalSubjects}</p>
            <p className="text-xs text-gray-400">Subjects</p>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--light-gray)' }}>
            <p className="font-black text-lg" style={{ color: EXAM_DATA.pendingScores.length > 0 ? 'var(--accent-red)' : 'var(--success-dark)' }}>
              {EXAM_DATA.pendingScores.length}
            </p>
            <p className="text-xs text-gray-400">Pending Scores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HouseWidget = ({ navigate }) => {
  const present = HOUSE_DATA.students.filter(s => s.status === 'present').length;
  const feeDue  = HOUSE_DATA.students.filter(s => s.fees !== 'paid').length;
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid var(--accent-red)' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <Home size={15} style={{ color: 'var(--accent-red)' }} /> {HOUSE_DATA.houseName}
        </h3>
        <button onClick={() => navigate('/teacher/house')} className="text-xs flex items-center gap-1" style={{ color: 'var(--accent-red)' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Total',    value: HOUSE_DATA.totalStudents, color: 'var(--royal-blue)'  },
          { label: 'Present',  value: present,                  color: 'var(--success-dark)' },
          { label: 'Fees Due', value: feeDue,                   color: feeDue > 0 ? 'var(--warning)' : 'var(--success-dark)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--light-gray)' }}>
            <p className="text-xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CounsellorWidget = ({ navigate }) => {
  const high    = COUNSELLOR_DATA.cases.filter(c => c.priority === 'high' && c.status === 'ongoing').length;
  const ongoing = COUNSELLOR_DATA.cases.filter(c => c.status === 'ongoing').length;
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid var(--success-dark)' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <Heart size={15} style={{ color: 'var(--success-dark)' }} /> Counselling Cases
        </h3>
        <button onClick={() => navigate('/teacher/counsellor')} className="text-xs flex items-center gap-1" style={{ color: 'var(--success-dark)' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Total Cases',  value: COUNSELLOR_DATA.cases.length, color: 'var(--royal-blue)'  },
          { label: 'Ongoing',      value: ongoing,                       color: 'var(--warning)'      },
          { label: 'High Priority',value: high,                          color: high > 0 ? 'var(--accent-red)' : 'var(--success-dark)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--light-gray)' }}>
            <p className="text-xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const WAECWidget = ({ navigate }) => {
  const daysToWAEC = Math.ceil((new Date(WAEC_DATA.subjects[0]?.date) - new Date()) / (1000 * 60 * 60 * 24));
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid var(--accent-red-dark)' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <Shield size={15} style={{ color: 'var(--accent-red-dark)' }} /> WASSCE Countdown
        </h3>
        <button onClick={() => navigate('/teacher/waec')} className="text-xs flex items-center gap-1" style={{ color: 'var(--accent-red)' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4">
        <div className="rounded-xl p-4 text-center mb-3" style={{ background: 'linear-gradient(135deg, var(--accent-red-dark), var(--accent-red))' }}>
          <p className="text-white text-xs mb-1">WASSCE {WAEC_DATA.examYear} begins in</p>
          <p className="text-white font-black text-3xl">{daysToWAEC > 0 ? daysToWAEC : 0}</p>
          <p className="text-red-200 text-xs">days · {WAEC_DATA.candidates} candidates</p>
        </div>
        <p className="text-xs text-center text-gray-500">
          Your duties: <strong style={{ color: 'var(--dark-gray)' }}>{WAEC_DATA.invigilationDuties.length} invigilation sessions</strong>
        </p>
      </div>
    </div>
  );
};

const WorkshopWidget = ({ navigate }) => {
  const faulty = WORKSHOP_DATA.equipment.reduce((s, e) => s + e.faulty, 0);
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid #92400e' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <Wrench size={15} style={{ color: '#92400e' }} /> {WORKSHOP_DATA.workshopName}
        </h3>
        <button onClick={() => navigate('/teacher/workshop')} className="text-xs flex items-center gap-1" style={{ color: '#92400e' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Capacity',  value: WORKSHOP_DATA.capacity,             color: 'var(--royal-blue)'   },
          { label: 'Equipment', value: WORKSHOP_DATA.equipment.length,     color: 'var(--success-dark)'  },
          { label: 'Faulty',    value: faulty,                              color: faulty > 0 ? 'var(--accent-red)' : 'var(--success-dark)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--light-gray)' }}>
            <p className="text-xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SportsWidget = ({ navigate }) => {
  const totalAthletes = SPORTS_DATA.teams.reduce((s, t) => s + t.members, 0);
  const nextEvent     = SPORTS_DATA.upcomingEvents[0];
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid #0369a1' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <Trophy size={15} style={{ color: '#0369a1' }} /> Sports Overview
        </h3>
        <button onClick={() => navigate('/teacher/sports')} className="text-xs flex items-center gap-1" style={{ color: '#0369a1' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--light-gray)' }}>
            <p className="text-xl font-black" style={{ color: '#0369a1' }}>{SPORTS_DATA.teams.length}</p>
            <p className="text-xs text-gray-400">Teams</p>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--light-gray)' }}>
            <p className="text-xl font-black" style={{ color: 'var(--success-dark)' }}>{totalAthletes}</p>
            <p className="text-xs text-gray-400">Athletes</p>
          </div>
        </div>
        {nextEvent && (
          <div className="flex items-center gap-2 p-2 rounded-lg text-xs" style={{ backgroundColor: '#f0f9ff' }}>
            <Calendar size={12} style={{ color: '#0369a1' }} className="flex-shrink-0" />
            <span className="font-medium" style={{ color: '#0369a1' }}>Next: {nextEvent.event}</span>
            <span className="text-gray-400 ml-auto">
              {new Date(nextEvent.date).toLocaleDateString('en-GB', { day:'numeric', month:'short' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const YearGroupWidget = ({ navigate }) => {
  const submitted = YEAR_GROUP_DATA.formTeachers.filter(t => t.caSubmitted).length;
  const total     = YEAR_GROUP_DATA.formTeachers.length;
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)', borderLeft: '4px solid var(--success-dark)' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--dark-gray)' }}>
          <TrendingUp size={15} style={{ color: 'var(--success-dark)' }} /> {YEAR_GROUP_DATA.yearGroup} Overview
        </h3>
        <button onClick={() => navigate('/teacher/yeargroup')} className="text-xs flex items-center gap-1" style={{ color: 'var(--success-dark)' }}>
          Full view <ChevronRight size={12} />
        </button>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Students', value: YEAR_GROUP_DATA.totalStudents, color: 'var(--royal-blue)' },
          { label: 'Classes',  value: total,                          color: 'var(--info)'        },
          { label: 'CA Submitted', value: `${submitted}/${total}`,   color: submitted === total ? 'var(--success-dark)' : 'var(--warning)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--light-gray)' }}>
            <p className="text-xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Widget map: role → widget component ─────────────────────────────────────
const ROLE_WIDGETS = {
  'Form Teacher':           FormTeacherWidget,
  'HOD':                    HODWidget,
  'Assistant HOD':          HODWidget,
  'Year Group Coordinator': YearGroupWidget,
  'Exam Coordinator':       ExamCoordWidget,
  'House Master':           HouseWidget,
  'House Mistress':         HouseWidget,
  'Guidance Counsellor':    CounsellorWidget,
  'WAEC Supervisor':        WAECWidget,
  'Workshop Supervisor':    WorkshopWidget,
  'Sports Master':          SportsWidget,
  'Sports Mistress':        SportsWidget,
};

// ─── Main TeacherHome ─────────────────────────────────────────────────────────
const TeacherHome = () => {
  const navigate             = useNavigate();
  const { user, activeRole, switchRole } = useAuth();
  const termProgress         = Math.round((TERM_INFO.weeksGone / TERM_INFO.weeksTotal) * 100);

  // Show widget for the chosen active role (not for Subject Teacher — that's the base)
  const ActiveWidget = activeRole !== 'Subject Teacher' ? ROLE_WIDGETS[activeRole] : null;

  return (
    <div className="space-y-6">

      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--royal-blue), var(--royal-blue-dark))' }}
      >
        <div className="absolute right-0 top-0 w-64 h-full opacity-10 pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-white absolute -right-12 -top-12" />
          <div className="w-32 h-32 rounded-full bg-white absolute right-8 bottom-4" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm mb-1">Welcome back,</p>
            <h2 className="text-xl sm:text-2xl font-black">
              {user?.title} {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-blue-300 text-xs mt-0.5">{user?.subject} · {user?.department} Dept</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <RolePill role="Subject Teacher" />
              {(user?.additionalRoles || []).map(r => <RolePill key={r} role={r} />)}
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            {/* Role switcher */}
            <RoleSwitcher user={user} activeRole={activeRole} onSwitch={switchRole} />
            {/* Term card */}
            <div className="rounded-xl p-3 text-center min-w-[130px]" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <p className="text-blue-200 text-xs">{TERM_INFO.academicYear}</p>
              <p className="font-bold text-sm">{TERM_INFO.term} · Track {TERM_INFO.track}</p>
              <p className="text-blue-200 text-xs mt-1">Wk {TERM_INFO.weeksGone}/{TERM_INFO.weeksTotal}</p>
              <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <div className="h-full rounded-full" style={{ width: `${termProgress}%`, backgroundColor: '#facc15' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base stats */}
      <BaseStats user={user} navigate={navigate} />

      {/* Role widget — shown prominently if a specific role is active */}
      {ActiveWidget && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--dark-gray)', opacity: 0.5 }}>
            <Star size={11} /> Dashboard for: {activeRole}
          </p>
          <ActiveWidget navigate={navigate} />
        </div>
      )}

      {/* Classes + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MyClassesWidget navigate={navigate} />
        </div>
        <NotificationsWidget />
      </div>

      {/* Track Schedule */}
      <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: 'var(--medium-gray)' }}>
        <h3 className="font-semibold text-sm flex items-center gap-2 mb-4" style={{ color: 'var(--dark-gray)' }}>
          <RefreshCw size={15} style={{ color: 'var(--royal-blue)' }} />
          Double Track Schedule — {TERM_INFO.academicYear} {TERM_INFO.term}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl p-4 border" style={{ backgroundColor: '#fefce8', borderColor: '#fde68a' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--warning)' }} />
              <span className="font-semibold text-sm" style={{ color: '#78350f' }}>Track A — Currently In Session</span>
            </div>
            <p className="text-xs" style={{ color: '#92400e' }}>
              {new Date(TERM_INFO.startDate).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })} –{' '}
              {new Date(TERM_INFO.endDate).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}
            </p>
            <p className="text-xs font-semibold mt-1" style={{ color: '#78350f' }}>Week {TERM_INFO.weeksGone} / {TERM_INFO.weeksTotal}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
              <span className="font-semibold text-sm" style={{ color: '#14532d' }}>Track B — On Vacation</span>
            </div>
            <p className="text-xs" style={{ color: '#166534' }}>{TERM_INFO.trackBSchedule}</p>
            <p className="text-xs font-semibold mt-1" style={{ color: '#14532d' }}>Scores due before track resumes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;