import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, BookOpen, ClipboardList, MessageSquare,
  FileText, BarChart3, Users, Building2, Bell, Search,
  ChevronRight, Calendar, Clock, CheckCircle2, AlertCircle,
  TrendingUp, TrendingDown, Award, Shield, Menu, X,
  Edit3, Save, RotateCcw, Eye, Printer, Check, Minus,
  Star, Target, BookMarked, GraduationCap, Activity,
  ChevronDown, ChevronUp, Hash, Flag, User, LogOut,
  RefreshCw, Download, Filter, Info
} from 'lucide-react';

// ─── Logged-in Teacher (simulate context/auth) ────────────────────────────────
const LOGGED_IN_TEACHER = {
  id: 3,
  staffId: 'AFTS/TCH/003',
  title: 'Dr',
  firstName: 'Kwame',
  lastName: 'Osei',
  email: 'osei@afts.edu.gh',
  phone: '+233 24 555 6666',
  department: 'Science',
  subject: 'Integrated Science',
  qualification: 'PhD',
  employmentType: 'Permanent',
  track: 'Both',
  dateJoined: '2015-03-10',
  additionalRoles: ['HOD', 'Form Teacher', 'WAEC Supervisor'],
  formClass: 'Form 3 Science B',
  maxPeriods: 30,
  currentPeriods: 28,
  classes: ['Form 1A', 'Form 1B', 'Form 2B', 'Form 3B'],
};

// ─── Sample Data ──────────────────────────────────────────────────────────────
const TERM_INFO = {
  academicYear: '2024/2025',
  term: 'Term 2',
  track: 'A',
  startDate: '2025-01-06',
  endDate: '2025-04-11',
  weeksTotal: 14,
  weeksGone: 9,
  trackBSchedule: 'Track B resumes: April 14, 2025',
};

const CLASSES_DATA = [
  {
    id: 1, name: 'Form 1A', program: 'General Science', track: 'A',
    students: 42, subject: 'Integrated Science',
    caSubmitted: true, examSubmitted: false,
    caAvg: 24.8, examAvg: null,
    attendanceRate: 94,
  },
  {
    id: 2, name: 'Form 1B', program: 'General Science', track: 'A',
    students: 40, subject: 'Integrated Science',
    caSubmitted: true, examSubmitted: false,
    caAvg: 22.1, examAvg: null,
    attendanceRate: 91,
  },
  {
    id: 3, name: 'Form 2B', program: 'General Science', track: 'B',
    students: 38, subject: 'Integrated Science',
    caSubmitted: false, examSubmitted: false,
    caAvg: null, examAvg: null,
    attendanceRate: 88,
  },
  {
    id: 4, name: 'Form 3B', program: 'General Science', track: 'B',
    students: 36, subject: 'Integrated Science',
    caSubmitted: true, examSubmitted: true,
    caAvg: 26.4, examAvg: 58.2,
    attendanceRate: 96,
    isFormClass: true,
  },
];

const FORM_CLASS_STUDENTS = [
  { id: 1, name: 'Kofi Asante',    studentId: 'AFTS/2024/031', gender: 'Male',   ca: 28, exam: 62, total: 90, grade: 'A1', attendance: 96 },
  { id: 2, name: 'Ama Darko',      studentId: 'AFTS/2024/032', gender: 'Female', ca: 26, exam: 58, total: 84, grade: 'A1', attendance: 100 },
  { id: 3, name: 'Yaw Mensah',     studentId: 'AFTS/2024/033', gender: 'Male',   ca: 24, exam: 50, total: 74, grade: 'B3', attendance: 88 },
  { id: 4, name: 'Efua Boateng',   studentId: 'AFTS/2024/034', gender: 'Female', ca: 22, exam: 45, total: 67, grade: 'B3', attendance: 92 },
  { id: 5, name: 'Nana Owusu',     studentId: 'AFTS/2024/035', gender: 'Male',   ca: 20, exam: 42, total: 62, grade: 'C4', attendance: 84 },
  { id: 6, name: 'Abena Frimpong', studentId: 'AFTS/2024/036', gender: 'Female', ca: 27, exam: 60, total: 87, grade: 'A1', attendance: 98 },
];

const DEPT_TEACHERS = [
  { name: 'Dr Kwame Osei',    subject: 'Integrated Science', classes: 4, load: 93, status: 'active' },
  { name: 'Cpt Samuel Adjei', subject: 'Physics',            classes: 3, load: 80, status: 'active' },
  { name: 'Mrs Grace Ampofo', subject: 'Chemistry',          classes: 3, load: 75, status: 'active' },
  { name: 'Mr Ebo Mensah',    subject: 'Biology',            classes: 4, load: 87, status: 'active' },
  { name: 'Lt Esi Tawiah',    subject: 'Elective Maths',     classes: 2, load: 60, status: 'active' },
];

const NOTIFICATIONS = [
  { id: 1, type: 'warning', message: 'CA scores for Form 2B not yet submitted. Deadline: Friday.', time: '2 hours ago' },
  { id: 2, type: 'info',    message: 'Term 2 exam timetable has been published by the Exam Coordinator.', time: '1 day ago' },
  { id: 3, type: 'success', message: 'Form 3B report cards approved by Headmaster.', time: '2 days ago' },
  { id: 4, type: 'info',    message: 'HOD meeting scheduled for Friday 10:00 AM — Science Block.', time: '3 days ago' },
];

const SCORE_ENTRY_STUDENTS = [
  { id: 1, studentId: 'AFTS/2024/001', name: 'Kofi Asante',    ca: 27, exam: '' },
  { id: 2, studentId: 'AFTS/2024/002', name: 'Ama Owusu',      ca: 25, exam: '' },
  { id: 3, studentId: 'AFTS/2024/003', name: 'Yaw Boateng',    ca: 28, exam: '' },
  { id: 4, studentId: 'AFTS/2024/004', name: 'Efua Mensah',    ca: 22, exam: '' },
  { id: 5, studentId: 'AFTS/2024/005', name: 'Nana Adjei',     ca: 26, exam: '' },
  { id: 6, studentId: 'AFTS/2024/006', name: 'Abena Tetteh',   ca: 24, exam: '' },
];

const ATTENDANCE_STUDENTS = [
  { id: 1, name: 'Kofi Asante',  studentId: 'AFTS/2024/001', status: 'present' },
  { id: 2, name: 'Ama Owusu',    studentId: 'AFTS/2024/002', status: 'present' },
  { id: 3, name: 'Yaw Boateng',  studentId: 'AFTS/2024/003', status: 'absent' },
  { id: 4, name: 'Efua Mensah',  studentId: 'AFTS/2024/004', status: 'present' },
  { id: 5, name: 'Nana Adjei',   studentId: 'AFTS/2024/005', status: 'late' },
  { id: 6, name: 'Abena Tetteh', studentId: 'AFTS/2024/006', status: 'present' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getGradeColor = (grade) => {
  const map = { A1: 'text-green-600 bg-green-50', B2: 'text-blue-600 bg-blue-50', B3: 'text-blue-500 bg-blue-50',
    C4: 'text-yellow-600 bg-yellow-50', C5: 'text-orange-500 bg-orange-50', C6: 'text-orange-600 bg-orange-50',
    D7: 'text-red-500 bg-red-50', E8: 'text-red-600 bg-red-50', F9: 'text-red-700 bg-red-50' };
  return map[grade] || 'text-gray-600 bg-gray-50';
};

const LoadBar = ({ pct, showLabel = true }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all ${pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
        style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
    {showLabel && <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>}
  </div>
);

const Avatar = ({ name, size = 'md', color = 'bg-blue-900' }) => {
  const parts = name.split(' ');
  const initials = parts.length >= 2 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : name[0];
  const s = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-14 h-14 text-lg' };
  return <div className={`${s[size]} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>{initials}</div>;
};

const RolePill = ({ role }) => {
  const map = {
    'HOD': 'bg-purple-100 text-purple-700',
    'Form Teacher': 'bg-blue-100 text-blue-700',
    'WAEC Supervisor': 'bg-red-100 text-red-700',
    'Subject Teacher': 'bg-gray-100 text-gray-600',
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[role] || 'bg-gray-100 text-gray-600'}`}>{role}</span>;
};

const NotifIcon = ({ type }) => {
  if (type === 'warning') return <AlertCircle size={15} className="text-yellow-500 flex-shrink-0 mt-0.5" />;
  if (type === 'success') return <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />;
  return <Info size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />;
};

// ─── Section: Home / Overview ─────────────────────────────────────────────────
const HomeSection = ({ teacher, onNavigate }) => {
  const totalStudents = CLASSES_DATA.reduce((s, c) => s + c.students, 0);
  const pendingCA  = CLASSES_DATA.filter(c => !c.caSubmitted).length;
  const pendingExam = CLASSES_DATA.filter(c => !c.examSubmitted).length;
  const termProgress = Math.round((TERM_INFO.weeksGone / TERM_INFO.weeksTotal) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <div className="w-48 h-48 rounded-full bg-white absolute -right-12 -top-12" />
          <div className="w-32 h-32 rounded-full bg-white absolute right-8 bottom-4" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm mb-1">Welcome back,</p>
              <h2 className="text-2xl font-bold">{teacher.title} {teacher.firstName} {teacher.lastName}</h2>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <RolePill role="Subject Teacher" />
                {teacher.additionalRoles.map(r => <RolePill key={r} role={r} />)}
              </div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center min-w-[140px]">
              <p className="text-blue-200 text-xs mb-1">{TERM_INFO.academicYear}</p>
              <p className="font-bold text-lg">{TERM_INFO.term} · Track {TERM_INFO.track}</p>
              <p className="text-blue-200 text-xs mt-1">Week {TERM_INFO.weeksGone} of {TERM_INFO.weeksTotal}</p>
              <LoadBar pct={termProgress} showLabel={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users,         label: 'Total Students',    value: totalStudents, sub: `${teacher.classes.length} classes`,       color: 'bg-blue-600',   onClick: () => onNavigate('classes') },
          { icon: ClipboardList, label: 'Pending CA Scores', value: pendingCA,     sub: 'classes awaiting entry', color: pendingCA > 0 ? 'bg-red-600' : 'bg-green-600', onClick: () => onNavigate('scores') },
          { icon: FileText,      label: 'Pending Exam',      value: pendingExam,   sub: 'classes awaiting entry', color: pendingExam > 0 ? 'bg-orange-500' : 'bg-green-600', onClick: () => onNavigate('scores') },
          { icon: Activity,      label: 'Teaching Load',     value: `${teacher.currentPeriods}/${teacher.maxPeriods}`, sub: 'periods this week', color: 'bg-purple-600', onClick: null },
        ].map(({ icon: Icon, label, value, sub, color, onClick }) => (
          <div key={label} onClick={onClick} className={`bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}>
            <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
              <Icon size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-500 truncate">{label}</p>
              <p className="text-xs text-blue-600 font-medium">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Classes + Notifications row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* My Classes Quick View */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><BookOpen size={16} className="text-blue-900" />My Classes</h3>
            <button onClick={() => onNavigate('classes')} className="text-xs text-blue-700 hover:underline flex items-center gap-1">View all <ChevronRight size={12} /></button>
          </div>
          <div className="divide-y divide-gray-50">
            {CLASSES_DATA.map(cls => (
              <div key={cls.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <BookMarked size={16} className="text-blue-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800 text-sm">{cls.name}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${cls.track === 'A' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      Track {cls.track}
                    </span>
                    {cls.isFormClass && <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Form Class</span>}
                  </div>
                  <p className="text-xs text-gray-400">{cls.students} students · {cls.program}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className={`flex items-center gap-1 text-xs ${cls.caSubmitted ? 'text-green-600' : 'text-red-500'}`}>
                      {cls.caSubmitted ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                      CA
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${cls.examSubmitted ? 'text-green-600' : 'text-orange-500'}`}>
                      {cls.examSubmitted ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                      Exam
                    </div>
                  </div>
                  <button onClick={() => onNavigate('scores')} className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition">
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Bell size={15} className="text-blue-900" />Notifications
              <span className="w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{NOTIFICATIONS.length}</span>
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className="px-4 py-3 hover:bg-gray-50 transition">
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
        <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <RefreshCw size={16} className="text-blue-900" />Double Track Schedule — {TERM_INFO.academicYear} {TERM_INFO.term}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="font-semibold text-yellow-800 text-sm">Track A (Gold) — Currently In Session</span>
            </div>
            <p className="text-xs text-yellow-700">Start: {new Date(TERM_INFO.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-xs text-yellow-700">End: {new Date(TERM_INFO.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-xs font-medium text-yellow-800 mt-2">Week {TERM_INFO.weeksGone} / {TERM_INFO.weeksTotal} in progress</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-semibold text-green-800 text-sm">Track B (Green) — On Vacation</span>
            </div>
            <p className="text-xs text-green-700">{TERM_INFO.trackBSchedule}</p>
            <p className="text-xs text-green-600 mt-2">Track B classes: Form 2B, Form 3B</p>
            <p className="text-xs font-medium text-green-800 mt-1">Scores due before track resumes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Section: My Classes ──────────────────────────────────────────────────────
const ClassesSection = ({ onNavigate }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold text-gray-800">My Classes & Subjects</h2>
      <span className="text-sm text-gray-500">{CLASSES_DATA.length} classes assigned</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CLASSES_DATA.map(cls => (
        <div key={cls.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
          <div className={`h-1.5 ${cls.track === 'A' ? 'bg-yellow-500' : 'bg-green-500'}`} />
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800 text-lg">{cls.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cls.track === 'A' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>Track {cls.track}</span>
                  {cls.isFormClass && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Form Class</span>}
                </div>
                <p className="text-sm text-gray-500">{cls.program} · {cls.subject}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-blue-900 font-bold text-lg">{cls.students}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Students</p>
                <p className="font-bold text-gray-800">{cls.students}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Attendance</p>
                <p className={`font-bold ${cls.attendanceRate >= 90 ? 'text-green-600' : cls.attendanceRate >= 75 ? 'text-yellow-600' : 'text-red-500'}`}>{cls.attendanceRate}%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">CA Avg</p>
                <p className="font-bold text-gray-800">{cls.caAvg ? `${cls.caAvg}/30` : '—'}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">CA Scores</span>
                <span className={`font-medium ${cls.caSubmitted ? 'text-green-600' : 'text-red-500'}`}>
                  {cls.caSubmitted ? '✓ Submitted' : '⚠ Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Exam Scores</span>
                <span className={`font-medium ${cls.examSubmitted ? 'text-green-600' : 'text-orange-500'}`}>
                  {cls.examSubmitted ? '✓ Submitted' : '⚠ Pending'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => onNavigate('scores')} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
                <Edit3 size={13} /> Enter Scores
              </button>
              <button onClick={() => onNavigate('attendance')} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
                <ClipboardList size={13} /> Attendance
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Section: Score Entry ─────────────────────────────────────────────────────
const ScoreSection = () => {
  const [selectedClass, setSelectedClass] = useState(CLASSES_DATA[0]);
  const [scoreType, setScoreType] = useState('ca');
  const [scores, setScores] = useState(
    SCORE_ENTRY_STUDENTS.reduce((acc, s) => ({ ...acc, [s.id]: { ca: s.ca || '', exam: s.exam || '' } }), {})
  );
  const [saved, setSaved] = useState(false);

  const updateScore = (studentId, type, value) => {
    const max = type === 'ca' ? 30 : 70;
    const num = Math.min(Math.max(0, parseInt(value) || 0), max);
    setScores(prev => ({ ...prev, [studentId]: { ...prev[studentId], [type]: value === '' ? '' : num } }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getTotal = (id) => {
    const ca   = parseInt(scores[id]?.ca)   || 0;
    const exam = parseInt(scores[id]?.exam) || 0;
    return ca + exam;
  };

  const getGrade = (total) => {
    if (total >= 80) return 'A1';
    if (total >= 70) return 'B2';
    if (total >= 65) return 'B3';
    if (total >= 60) return 'C4';
    if (total >= 55) return 'C5';
    if (total >= 50) return 'C6';
    if (total >= 45) return 'D7';
    if (total >= 40) return 'E8';
    return 'F9';
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-800">Score Entry</h2>
        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
            <CheckCircle2 size={14} /> Scores saved successfully
          </div>
        )}
      </div>

      {/* Class & Type Selectors */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Select Class</label>
          <select
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            value={selectedClass.id}
            onChange={e => setSelectedClass(CLASSES_DATA.find(c => c.id === parseInt(e.target.value)))}
          >
            {CLASSES_DATA.map(c => <option key={c.id} value={c.id}>{c.name} ({c.students} students)</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Score Type</label>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => setScoreType('ca')} className={`px-4 py-2 text-sm font-medium transition ${scoreType === 'ca' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              CA (30%)
            </button>
            <button onClick={() => setScoreType('exam')} className={`px-4 py-2 text-sm font-medium transition ${scoreType === 'exam' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              Exam (70%)
            </button>
            <button onClick={() => setScoreType('both')} className={`px-4 py-2 text-sm font-medium transition ${scoreType === 'both' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              Both
            </button>
          </div>
        </div>
      </div>

      {/* Score Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">{selectedClass.name} — {selectedClass.subject}</p>
          <span className="text-xs text-gray-500">{SCORE_ENTRY_STUDENTS.length} students</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student ID</th>
                {(scoreType === 'ca'   || scoreType === 'both') && <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">CA <span className="text-gray-400 font-normal">/30</span></th>}
                {(scoreType === 'exam' || scoreType === 'both') && <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Exam <span className="text-gray-400 font-normal">/70</span></th>}
                {scoreType === 'both' && <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Total</th>}
                {scoreType === 'both' && <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Grade</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SCORE_ENTRY_STUDENTS.map((student, idx) => {
                const total = getTotal(student.id);
                const grade = getGrade(total);
                return (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono">{student.studentId}</td>
                    {(scoreType === 'ca' || scoreType === 'both') && (
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number" min="0" max="30"
                          value={scores[student.id]?.ca ?? ''}
                          onChange={e => updateScore(student.id, 'ca', e.target.value)}
                          className="w-16 px-2 py-1.5 text-center text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </td>
                    )}
                    {(scoreType === 'exam' || scoreType === 'both') && (
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number" min="0" max="70"
                          value={scores[student.id]?.exam ?? ''}
                          onChange={e => updateScore(student.id, 'exam', e.target.value)}
                          className="w-16 px-2 py-1.5 text-center text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </td>
                    )}
                    {scoreType === 'both' && (
                      <td className="px-4 py-3 text-center font-bold text-gray-800">{total}</td>
                    )}
                    {scoreType === 'both' && (
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${getGradeColor(grade)}`}>{grade}</span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-600">
            <RotateCcw size={13} /> Reset
          </button>
          <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium">
            <Save size={13} /> Save Scores
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Section: Attendance ──────────────────────────────────────────────────────
const AttendanceSection = () => {
  const [selectedClass, setSelectedClass] = useState(CLASSES_DATA[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(
    ATTENDANCE_STUDENTS.reduce((acc, s) => ({ ...acc, [s.id]: s.status }), {})
  );

  const setAll = (status) => setAttendance(ATTENDANCE_STUDENTS.reduce((acc, s) => ({ ...acc, [s.id]: status }), {}));
  const toggle = (id) => setAttendance(prev => ({ ...prev, [id]: prev[id] === 'present' ? 'absent' : 'present' }));

  const counts = {
    present: Object.values(attendance).filter(v => v === 'present').length,
    absent:  Object.values(attendance).filter(v => v === 'absent').length,
    late:    Object.values(attendance).filter(v => v === 'late').length,
  };

  const statusStyles = {
    present: { btn: 'bg-green-100 text-green-700 border-green-300', dot: 'bg-green-500', label: 'Present' },
    absent:  { btn: 'bg-red-100 text-red-700 border-red-300',       dot: 'bg-red-500',   label: 'Absent' },
    late:    { btn: 'bg-yellow-100 text-yellow-700 border-yellow-300', dot: 'bg-yellow-500', label: 'Late' },
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-800">Mark Attendance</h2>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Class</label>
          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            value={selectedClass.id} onChange={e => setSelectedClass(CLASSES_DATA.find(c => c.id === parseInt(e.target.value)))}>
            {CLASSES_DATA.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
        </div>
        <div className="flex items-end gap-2">
          <button onClick={() => setAll('present')} className="px-3 py-2 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition">All Present</button>
          <button onClick={() => setAll('absent')}  className="px-3 py-2 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition">All Absent</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {['present','absent','late'].map(s => (
          <div key={s} className={`rounded-xl p-3 text-center border ${statusStyles[s].btn}`}>
            <p className="text-2xl font-bold">{counts[s]}</p>
            <p className="text-xs font-medium capitalize">{s}</p>
          </div>
        ))}
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-700">{selectedClass.name} — {ATTENDANCE_STUDENTS.length} students</p>
        </div>
        <div className="divide-y divide-gray-100">
          {ATTENDANCE_STUDENTS.map((student, idx) => {
            const status = attendance[student.id];
            const style  = statusStyles[status];
            return (
              <div key={student.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition">
                <span className="text-xs text-gray-400 w-5">{idx + 1}</span>
                <Avatar name={student.name} size="sm" color="bg-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{student.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{student.studentId}</p>
                </div>
                <div className="flex gap-1.5">
                  {['present','absent','late'].map(s => (
                    <button key={s} onClick={() => setAttendance(prev => ({ ...prev, [student.id]: s }))}
                      className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition ${status === s ? statusStyles[s].btn : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-5 py-3 border-t border-gray-200 flex justify-end bg-gray-50">
          <button className="flex items-center gap-1.5 px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium">
            <Save size={13} /> Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Section: Comments ────────────────────────────────────────────────────────
const CommentsSection = () => {
  const [selected, setSelected] = useState(FORM_CLASS_STUDENTS[0]);
  const [comment, setComment] = useState('');
  const TEMPLATES = [
    'Excellent performance! Shows outstanding discipline and academic commitment.',
    'Good effort. Demonstrates steady improvement throughout the term.',
    'Satisfactory work. With more focus, significant improvement is achievable.',
    'Shows potential but needs to put in more effort in practical assessments.',
    'Below expected level. Requires extra tutorials and close supervision.',
  ];
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-800">Student Comments & Remarks</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-700">Form Class — {LOGGED_IN_TEACHER.formClass}</p>
          </div>
          <div className="divide-y divide-gray-100">
            {FORM_CLASS_STUDENTS.map(s => (
              <button key={s.id} onClick={() => setSelected(s)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition ${selected?.id === s.id ? 'bg-blue-50 border-l-2 border-blue-900' : ''}`}>
                <Avatar name={s.name} size="sm" color={selected?.id === s.id ? 'bg-blue-900' : 'bg-gray-400'} />
                <div>
                  <p className="text-sm font-medium text-gray-800">{s.name}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${getGradeColor(s.grade)}`}>{s.grade}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {selected && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <Avatar name={selected.name} size="md" color="bg-blue-900" />
                <div>
                  <p className="font-bold text-gray-800">{selected.name}</p>
                  <p className="text-xs text-gray-400">{selected.studentId} · Total: {selected.total}/100 · <span className={`font-semibold ${getGradeColor(selected.grade)}`}>{selected.grade}</span></p>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-500 mb-2">Quick Templates</label>
                <div className="space-y-1.5">
                  {TEMPLATES.map((t, i) => (
                    <button key={i} onClick={() => setComment(t)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-600 border border-gray-200 rounded-lg hover:border-blue-900 hover:bg-blue-50 transition">
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Teacher's Comment <span className="font-normal text-gray-400">({comment.length}/500)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value.slice(0, 500))}
                  rows={4}
                  placeholder="Write a personalised comment for this student..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                />
              </div>
              <div className="flex justify-end mt-3">
                <button className="flex items-center gap-1.5 px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium">
                  <Save size={13} /> Save Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Section: Analytics ───────────────────────────────────────────────────────
const AnalyticsSection = () => (
  <div className="space-y-5">
    <h2 className="text-lg font-bold text-gray-800">Class Performance Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {CLASSES_DATA.filter(c => c.caAvg).map(cls => (
        <div key={cls.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">{cls.name}</h3>
              <p className="text-xs text-gray-400">{cls.subject} · {cls.students} students</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${cls.track === 'A' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>Track {cls.track}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">CA Avg</p>
              <p className="text-lg font-bold text-blue-900">{cls.caAvg}/30</p>
              <LoadBar pct={Math.round((cls.caAvg / 30) * 100)} />
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Exam Avg</p>
              <p className="text-lg font-bold text-gray-700">{cls.examAvg ? `${cls.examAvg}/70` : '—'}</p>
            </div>
            <div className="text-center bg-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Attendance</p>
              <p className="text-lg font-bold text-green-700">{cls.attendanceRate}%</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'A1 (80–100)', pct: 35, color: 'bg-green-500' },
              { label: 'B2–B3 (65–79)', pct: 40, color: 'bg-blue-500' },
              { label: 'C4–C6 (50–64)', pct: 18, color: 'bg-yellow-500' },
              { label: 'D7–F9 (below 50)', pct: 7, color: 'bg-red-500' },
            ].map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 w-32 flex-shrink-0">{label}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-gray-600 w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Section: HOD Panel ───────────────────────────────────────────────────────
const HODPanel = () => (
  <div className="space-y-5">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"><Award size={16} className="text-purple-700" /></div>
      <div>
        <h2 className="text-lg font-bold text-gray-800">HOD Panel — Science Department</h2>
        <p className="text-xs text-gray-400">Head of Department view</p>
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        { label: 'Dept Teachers', value: DEPT_TEACHERS.length,   color: 'bg-purple-600' },
        { label: 'Dept Classes',  value: 14,                     color: 'bg-blue-600' },
        { label: 'Dept Students', value: 524,                    color: 'bg-green-600' },
        { label: 'Avg Load',      value: `${Math.round(DEPT_TEACHERS.reduce((s,t)=>s+t.load,0)/DEPT_TEACHERS.length)}%`, color: 'bg-orange-500' },
      ].map(({ label, value, color }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
            <Building2 size={18} className="text-white" />
          </div>
          <p className="text-xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Department Teachers</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Teacher</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Classes</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Teaching Load</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {DEPT_TEACHERS.map((t, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={t.name} size="sm" color={i === 0 ? 'bg-purple-700' : 'bg-blue-600'} />
                    <div>
                      <p className="font-medium text-gray-800">{t.name}</p>
                      {i === 0 && <span className="text-xs text-purple-600 font-medium">HOD</span>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{t.subject}</td>
                <td className="px-4 py-3 text-center font-medium text-gray-800">{t.classes}</td>
                <td className="px-4 py-3 min-w-[140px]"><LoadBar pct={t.load} /></td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center gap-1 text-xs text-green-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── Section: Form Class Panel ────────────────────────────────────────────────
const FormClassPanel = () => (
  <div className="space-y-5">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Users size={16} className="text-blue-700" /></div>
      <div>
        <h2 className="text-lg font-bold text-gray-800">Form Class — {LOGGED_IN_TEACHER.formClass}</h2>
        <p className="text-xs text-gray-400">Form Teacher view</p>
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        { label: 'Class Size',       value: FORM_CLASS_STUDENTS.length, color: 'bg-blue-600' },
        { label: 'Avg Score',        value: `${Math.round(FORM_CLASS_STUDENTS.reduce((s,st)=>s+st.total,0)/FORM_CLASS_STUDENTS.length)}%`, color: 'bg-green-600' },
        { label: 'A1 Grades',        value: FORM_CLASS_STUDENTS.filter(s=>s.grade==='A1').length, color: 'bg-yellow-500' },
        { label: 'Avg Attendance',   value: `${Math.round(FORM_CLASS_STUDENTS.reduce((s,st)=>s+st.attendance,0)/FORM_CLASS_STUDENTS.length)}%`, color: 'bg-purple-600' },
      ].map(({ label, value, color }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
            <Star size={16} className="text-white" />
          </div>
          <p className="text-xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Student Overview</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">CA</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Exam</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Total</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Grade</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {FORM_CLASS_STUDENTS.map((s, i) => (
              <tr key={s.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={s.name} size="sm" color="bg-blue-700" />
                    <div>
                      <p className="font-medium text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{s.studentId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-gray-700">{s.ca}</td>
                <td className="px-4 py-3 text-center text-gray-700">{s.exam}</td>
                <td className="px-4 py-3 text-center font-bold text-gray-800">{s.total}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getGradeColor(s.grade)}`}>{s.grade}</span>
                </td>
                <td className="px-4 py-3 min-w-[120px]">
                  <div className="flex items-center gap-1">
                    <LoadBar pct={s.attendance} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── Main Teacher Dashboard ───────────────────────────────────────────────────
const TeacherDashboard = () => {
  const teacher = LOGGED_IN_TEACHER;
  const [activeTab, setActiveTab]     = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isHOD        = teacher.additionalRoles.includes('HOD');
  const isFormTeacher = teacher.additionalRoles.includes('Form Teacher');

  const NAV_ITEMS = [
    { id: 'home',       label: 'Dashboard',       icon: LayoutDashboard },
    { id: 'classes',    label: 'My Classes',       icon: BookOpen },
    { id: 'scores',     label: 'Score Entry',      icon: ClipboardList },
    { id: 'attendance', label: 'Attendance',       icon: CheckCircle2 },
    { id: 'comments',   label: 'Comments',         icon: MessageSquare },
    { id: 'reports',    label: 'Report Cards',     icon: FileText },
    { id: 'analytics',  label: 'Analytics',        icon: BarChart3 },
    ...(isHOD         ? [{ id: 'hod',       label: 'HOD Panel',      icon: Award,  badge: 'HOD' }] : []),
    ...(isFormTeacher  ? [{ id: 'formclass', label: 'Form Class',     icon: Users,  badge: 'FT'  }] : []),
  ];

  const navigate = (tab) => { setActiveTab(tab); setSidebarOpen(false); };

  const renderSection = () => {
    switch (activeTab) {
      case 'home':       return <HomeSection teacher={teacher} onNavigate={navigate} />;
      case 'classes':    return <ClassesSection onNavigate={navigate} />;
      case 'scores':     return <ScoreSection />;
      case 'attendance': return <AttendanceSection />;
      case 'comments':   return <CommentsSection />;
      case 'analytics':  return <AnalyticsSection />;
      case 'hod':        return <HODPanel />;
      case 'formclass':  return <FormClassPanel />;
      case 'reports':    return (
        <div className="text-center py-20 text-gray-400">
          <FileText size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Report Cards</p>
          <p className="text-sm mt-1">Preview and print student report cards once all scores are submitted.</p>
        </div>
      );
      default: return null;
    }
  };

  const activeLabel = NAV_ITEMS.find(n => n.id === activeTab)?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-blue-900 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* School branding */}
        <div className="px-5 py-5 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">ARMED FORCES SHTS</p>
              <p className="text-blue-300 text-xs">Service With Humanity</p>
            </div>
          </div>
        </div>

        {/* Teacher Profile */}
        <div className="px-5 py-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {teacher.firstName[0]}{teacher.lastName[0]}
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{teacher.title} {teacher.firstName} {teacher.lastName}</p>
              <p className="text-blue-300 text-xs truncate">{teacher.subject}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {['Subject Teacher', ...teacher.additionalRoles].map(r => (
              <span key={r} className="text-xs px-1.5 py-0.5 bg-blue-800 text-blue-200 rounded">{r}</span>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active ? 'bg-white text-blue-900' : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`}>
                <Icon size={16} className={active ? 'text-blue-900' : ''} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${active ? 'bg-blue-900 text-white' : 'bg-blue-800 text-blue-300'}`}>
                    {item.badge}
                  </span>
                )}
                {active && <div className="w-1 h-5 bg-red-500 rounded-full absolute right-3" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-blue-800">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-300 hover:bg-blue-800 hover:text-white text-sm transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="font-bold text-gray-800 text-lg leading-tight">{activeLabel}</h1>
              <p className="text-xs text-gray-400">
                Home / Teacher / <span className="text-blue-700 font-medium">{activeLabel}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-lg font-medium">
              <Calendar size={12} />
              {TERM_INFO.academicYear} · {TERM_INFO.term} · Track {TERM_INFO.track}
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;