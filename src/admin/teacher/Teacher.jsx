import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Edit2, Trash2, Eye, Filter, Download,
  LayoutGrid, List, X, ChevronDown, ChevronUp, User,
  BookOpen, Award, Users, Building2, Calendar, Phone,
  Mail, Shield, CheckCircle, AlertCircle, Clock,
  GraduationCap, Briefcase, Hash, MapPin, Star,
  MoreVertical, RefreshCw, Upload, FileText
} from 'lucide-react';

// ─── Sample Data ──────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  'Mathematics', 'English', 'Science', 'Social Studies',
  'ICT', 'Technical', 'Visual Arts', 'Business', 'Home Economics',
  'Physical Education', 'Agriculture'
];

const SUBJECTS = [
  'Core Mathematics', 'English Language', 'Integrated Science', 'Social Studies', 'ICT',
  'Elective Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Technical Drawing', 'Building Construction', 'Woodwork', 'Metalwork', 'Applied Electricity',
  'Economics', 'Business Management', 'Financial Accounting',
  'Geography', 'History', 'Government', 'Literature in English',
  'Physical Education', 'General Agriculture',
];

const ADDITIONAL_ROLES = [
  'HOD', 'Assistant HOD', 'Form Teacher', 'Year Group Coordinator',
  'House Master', 'House Mistress', 'Exam Coordinator', 'Time Tabler',
  'Sports Master', 'Guidance Counsellor', 'ICT Lab Supervisor',
  'Workshop Supervisor', 'Club Patron', 'WAEC Supervisor'
];

const EMPLOYMENT_TYPES = ['Permanent', 'Contract', 'National Service', 'Relieving'];
const TRACKS = ['A', 'B', 'Both'];
const QUALIFICATIONS = ['B.Ed', 'B.Sc', 'B.A', 'M.Ed', 'M.Sc', 'M.A', 'PGDE', 'HND', 'PhD'];

const SAMPLE_TEACHERS = [
  {
    id: 1, staffId: 'AFTS/TCH/001', title: 'Capt', firstName: 'Emmanuel', lastName: 'Adjei',
    email: 'adjei@afts.edu.gh', phone: '+233 24 111 2222', gender: 'Male',
    department: 'Mathematics', subject: 'Core Mathematics', qualification: 'M.Sc',
    employmentType: 'Permanent', track: 'Both', dateJoined: '2018-09-01',
    additionalRoles: ['HOD', 'Exam Coordinator'],
    formClass: null, maxPeriods: 30, currentPeriods: 24,
    classes: ['Form 1A', 'Form 1B', 'Form 2A', 'Form 2B'],
    status: 'active', photo: null,
  },
  {
    id: 2, staffId: 'AFTS/TCH/002', title: 'Lt', firstName: 'Abena', lastName: 'Eshun',
    email: 'eshun@afts.edu.gh', phone: '+233 24 333 4444', gender: 'Female',
    department: 'English', subject: 'English Language', qualification: 'B.Ed',
    employmentType: 'Permanent', track: 'A', dateJoined: '2019-01-15',
    additionalRoles: ['Form Teacher'],
    formClass: 'Form 2 Science A', maxPeriods: 30, currentPeriods: 20,
    classes: ['Form 1A', 'Form 2A', 'Form 3A'],
    status: 'active', photo: null,
  },
  {
    id: 3, staffId: 'AFTS/TCH/003', title: 'Dr', firstName: 'Kwame', lastName: 'Osei',
    email: 'osei@afts.edu.gh', phone: '+233 24 555 6666', gender: 'Male',
    department: 'Science', subject: 'Integrated Science', qualification: 'PhD',
    employmentType: 'Permanent', track: 'Both', dateJoined: '2015-03-10',
    additionalRoles: ['HOD', 'Form Teacher', 'WAEC Supervisor'],
    formClass: 'Form 3 Science B', maxPeriods: 30, currentPeriods: 28,
    classes: ['Form 1A', 'Form 1B', 'Form 2B', 'Form 3B'],
    status: 'active', photo: null,
  },
  {
    id: 4, staffId: 'AFTS/TCH/004', title: 'WOI', firstName: 'Kofi', lastName: 'Asare',
    email: 'asare@afts.edu.gh', phone: '+233 24 777 8888', gender: 'Male',
    department: 'Social Studies', subject: 'Social Studies', qualification: 'B.Ed',
    employmentType: 'Permanent', track: 'B', dateJoined: '2020-09-01',
    additionalRoles: ['Form Teacher'],
    formClass: 'Form 1 Arts A', maxPeriods: 30, currentPeriods: 18,
    classes: ['Form 1A', 'Form 1B', 'Form 2A'],
    status: 'active', photo: null,
  },
  {
    id: 5, staffId: 'AFTS/TCH/005', title: 'Sgt', firstName: 'Ama', lastName: 'Boateng',
    email: 'boateng@afts.edu.gh', phone: '+233 24 999 0000', gender: 'Female',
    department: 'ICT', subject: 'ICT', qualification: 'B.Sc',
    employmentType: 'Contract', track: 'Both', dateJoined: '2021-01-10',
    additionalRoles: ['ICT Lab Supervisor'],
    formClass: null, maxPeriods: 30, currentPeriods: 22,
    classes: ['Form 1A', 'Form 1B', 'Form 2A', 'Form 2B', 'Form 3A'],
    status: 'active', photo: null,
  },
  {
    id: 6, staffId: 'AFTS/TCH/006', title: 'Cpt', firstName: 'Yaw', lastName: 'Mensah',
    email: 'mensah@afts.edu.gh', phone: '+233 20 123 4567', gender: 'Male',
    department: 'Technical', subject: 'Technical Drawing', qualification: 'HND',
    employmentType: 'Permanent', track: 'A', dateJoined: '2017-09-01',
    additionalRoles: ['HOD', 'Workshop Supervisor'],
    formClass: null, maxPeriods: 30, currentPeriods: 26,
    classes: ['Form 1 Tech A', 'Form 2 Tech A', 'Form 3 Tech A'],
    status: 'active', photo: null,
  },
  {
    id: 7, staffId: 'AFTS/TCH/007', title: 'Mrs', firstName: 'Efua', lastName: 'Darko',
    email: 'darko@afts.edu.gh', phone: '+233 20 987 6543', gender: 'Female',
    department: 'Business', subject: 'Business Management', qualification: 'M.Ed',
    employmentType: 'Permanent', track: 'Both', dateJoined: '2016-03-01',
    additionalRoles: ['Assistant HOD', 'Form Teacher', 'Guidance Counsellor'],
    formClass: 'Form 2 Business B', maxPeriods: 30, currentPeriods: 25,
    classes: ['Form 1 Bus A', 'Form 1 Bus B', 'Form 2 Bus B'],
    status: 'active', photo: null,
  },
  {
    id: 8, staffId: 'AFTS/TCH/008', title: 'Mr', firstName: 'Nana', lastName: 'Owusu',
    email: 'owusu@afts.edu.gh', phone: '+233 20 456 7890', gender: 'Male',
    department: 'Technical', subject: 'Applied Electricity', qualification: 'B.Sc',
    employmentType: 'National Service', track: 'B', dateJoined: '2023-09-01',
    additionalRoles: [],
    formClass: null, maxPeriods: 24, currentPeriods: 16,
    classes: ['Form 1 Tech B', 'Form 2 Tech B'],
    status: 'active', photo: null,
  },
];

// ─── Helper Components ────────────────────────────────────────────────────────

const RoleBadge = ({ role }) => {
  const colors = {
    'HOD': 'bg-purple-100 text-purple-700 border-purple-200',
    'Assistant HOD': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Form Teacher': 'bg-blue-100 text-blue-700 border-blue-200',
    'Year Group Coordinator': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'House Master': 'bg-orange-100 text-orange-700 border-orange-200',
    'House Mistress': 'bg-pink-100 text-pink-700 border-pink-200',
    'Exam Coordinator': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'WAEC Supervisor': 'bg-red-100 text-red-700 border-red-200',
    'ICT Lab Supervisor': 'bg-teal-100 text-teal-700 border-teal-200',
    'Workshop Supervisor': 'bg-amber-100 text-amber-700 border-amber-200',
    'Guidance Counsellor': 'bg-green-100 text-green-700 border-green-200',
    'Sports Master': 'bg-lime-100 text-lime-700 border-lime-200',
    'Time Tabler': 'bg-slate-100 text-slate-700 border-slate-200',
    'Club Patron': 'bg-rose-100 text-rose-700 border-rose-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors[role] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {role}
    </span>
  );
};

const TrackBadge = ({ track }) => {
  const styles = {
    A: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    B: 'bg-green-100 text-green-800 border-green-300',
    Both: 'bg-blue-100 text-blue-800 border-blue-300',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${styles[track]}`}>
      {track === 'Both' ? '🔁 Both Tracks' : `Track ${track}`}
    </span>
  );
};

const StatusDot = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
    <span className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-400'}`} />
    {status === 'active' ? 'Active' : 'Inactive'}
  </span>
);

const LoadBar = ({ current, max }) => {
  const pct = Math.min((current / max) * 100, 100);
  const color = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-green-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{current}/{max}</span>
    </div>
  );
};

const Avatar = ({ teacher, size = 'md' }) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-16 h-16 text-xl' };
  const initials = `${teacher.firstName[0]}${teacher.lastName[0]}`;
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-red-500', 'bg-green-500', 'bg-orange-500', 'bg-teal-500'];
  const color = colors[teacher.id % colors.length];
  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
};

// ─── Stat Cards ───────────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
      {sub && <p className="text-xs font-medium text-blue-600 mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────

const TeacherModal = ({ teacher, onClose, onSave }) => {
  const isEdit = !!teacher?.id;
  const [form, setForm] = useState(teacher || {
    staffId: '', title: '', firstName: '', lastName: '',
    email: '', phone: '', gender: 'Male',
    department: '', subject: '', qualification: '',
    employmentType: 'Permanent', track: 'Both',
    dateJoined: '', additionalRoles: [],
    formClass: '', maxPeriods: 30, status: 'active',
  });
  const [tab, setTab] = useState('basic');

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleRole = (role) => {
    setForm(prev => ({
      ...prev,
      additionalRoles: prev.additionalRoles.includes(role)
        ? prev.additionalRoles.filter(r => r !== role)
        : [...prev.additionalRoles, role]
    }));
  };

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'academic', label: 'Academic' },
    { id: 'roles', label: 'Roles' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <h2 className="font-bold text-lg">{isEdit ? 'Edit Teacher' : 'Add New Teacher'}</h2>
              <p className="text-blue-200 text-xs">AFTS Staff Management</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 bg-gray-50">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                tab === t.id
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── Basic Info ── */}
          {tab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Staff ID *</label>
                  <input className={inputCls} value={form.staffId} onChange={e => set('staffId', e.target.value)} placeholder="e.g. AFTS/TCH/009" />
                </div>
                <div>
                  <label className={labelCls}>Title</label>
                  <select className={inputCls} value={form.title} onChange={e => set('title', e.target.value)}>
                    <option value="">Select</option>
                    {['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Capt', 'Lt', 'Sgt', 'WOI', 'WOII', 'Cpt'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>First Name *</label>
                  <input className={inputCls} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First name" />
                </div>
                <div>
                  <label className={labelCls}>Last Name *</label>
                  <input className={inputCls} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last name" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Email *</label>
                  <input type="email" className={inputCls} value={form.email} onChange={e => set('email', e.target.value)} placeholder="teacher@afts.edu.gh" />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input className={inputCls} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+233 24 000 0000" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Gender</label>
                  <select className={inputCls} value={form.gender} onChange={e => set('gender', e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Date Joined</label>
                  <input type="date" className={inputCls} value={form.dateJoined} onChange={e => set('dateJoined', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={form.status} onChange={e => set('status', e.target.value)}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Employment Type *</label>
                  <select className={inputCls} value={form.employmentType} onChange={e => set('employmentType', e.target.value)}>
                    {EMPLOYMENT_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Track Assignment</label>
                  <select className={inputCls} value={form.track} onChange={e => set('track', e.target.value)}>
                    {TRACKS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── Academic ── */}
          {tab === 'academic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Home Department *</label>
                  <select className={inputCls} value={form.department} onChange={e => set('department', e.target.value)}>
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Primary Subject *</label>
                  <select className={inputCls} value={form.subject} onChange={e => set('subject', e.target.value)}>
                    <option value="">Select Subject</option>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Qualification</label>
                  <select className={inputCls} value={form.qualification} onChange={e => set('qualification', e.target.value)}>
                    <option value="">Select</option>
                    {QUALIFICATIONS.map(q => <option key={q}>{q}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Max Periods / Week</label>
                  <input type="number" className={inputCls} value={form.maxPeriods} min={1} max={40} onChange={e => set('maxPeriods', parseInt(e.target.value))} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Form Class (if Form Teacher)</label>
                <input className={inputCls} value={form.formClass || ''} onChange={e => set('formClass', e.target.value)} placeholder="e.g. Form 2 Science A" />
                <p className="text-xs text-gray-400 mt-1">Leave blank if the teacher is not a Form Teacher</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-800 mb-1 flex items-center gap-1">
                  <Shield size={12} /> Double Track Note
                </p>
                <p className="text-xs text-blue-600">
                  Selecting <strong>Track A</strong> or <strong>Track B</strong> restricts the teacher to that track's schedule only.
                  Selecting <strong>Both</strong> means the teacher is available and assigned across both tracks.
                </p>
              </div>
            </div>
          )}

          {/* ── Roles ── */}
          {tab === 'roles' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-700">
                  <strong>Subject Teacher</strong> is the default role and is automatically assigned to every teacher. It cannot be removed.
                </p>
              </div>

              <div>
                <label className={labelCls}>Additional Roles (select all that apply)</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {ADDITIONAL_ROLES.map(role => (
                    <label key={role} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
                      form.additionalRoles.includes(role)
                        ? 'border-blue-900 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}>
                      <input
                        type="checkbox"
                        className="accent-blue-900"
                        checked={form.additionalRoles.includes(role)}
                        onChange={() => toggleRole(role)}
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>

              {form.additionalRoles.length > 0 && (
                <div>
                  <label className={labelCls}>Selected Roles</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <RoleBadge role="Subject Teacher" />
                    {form.additionalRoles.map(r => <RoleBadge key={r} role={r} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50 rounded-b-2xl">
          <div className="flex gap-2">
            {tab !== 'basic' && (
              <button onClick={() => setTab(tab === 'roles' ? 'academic' : 'basic')} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                ← Back
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-600">
              Cancel
            </button>
            {tab !== 'roles' ? (
              <button
                onClick={() => setTab(tab === 'basic' ? 'academic' : 'roles')}
                className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => { onSave(form); onClose(); }}
                className="px-5 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                {isEdit ? 'Save Changes' : 'Add Teacher'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── View Detail Drawer ───────────────────────────────────────────────────────

const TeacherDrawer = ({ teacher, onClose, onEdit }) => {
  if (!teacher) return null;
  const fullName = `${teacher.title} ${teacher.firstName} ${teacher.lastName}`;
  const loadPct = Math.round((teacher.currentPeriods / teacher.maxPeriods) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">

        {/* Drawer Header */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6">
          <div className="flex justify-between items-start mb-4">
            <button onClick={onClose} className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition">
              <X size={16} />
            </button>
            <button onClick={() => { onClose(); onEdit(teacher); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition">
              <Edit2 size={13} /> Edit
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Avatar teacher={teacher} size="lg" />
            <div>
              <h2 className="text-xl font-bold">{fullName}</h2>
              <p className="text-blue-200 text-sm">{teacher.staffId}</p>
              <StatusDot status={teacher.status} />
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 space-y-5">

          {/* Roles */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Roles</h3>
            <div className="flex flex-wrap gap-1.5">
              <RoleBadge role="Subject Teacher" />
              {teacher.additionalRoles.map(r => <RoleBadge key={r} role={r} />)}
            </div>
          </div>

          {/* Academic */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Academic Info</h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1.5"><BookOpen size={13} />Subject</span>
                <span className="font-semibold text-gray-800">{teacher.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1.5"><Building2 size={13} />Department</span>
                <span className="font-semibold text-gray-800">{teacher.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1.5"><GraduationCap size={13} />Qualification</span>
                <span className="font-semibold text-gray-800">{teacher.qualification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Track</span>
                <TrackBadge track={teacher.track} />
              </div>
              {teacher.formClass && (
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5"><Users size={13} />Form Class</span>
                  <span className="font-semibold text-blue-700">{teacher.formClass}</span>
                </div>
              )}
            </div>
          </div>

          {/* Teaching Load */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Teaching Load</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Periods per Week</span>
                <span className="font-bold text-gray-800">{teacher.currentPeriods} / {teacher.maxPeriods}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full ${loadPct >= 90 ? 'bg-red-500' : loadPct >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${loadPct}%` }}
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Classes Assigned ({teacher.classes.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {teacher.classes.map(cls => (
                    <span key={cls} className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact & Employment</h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={13} className="text-gray-400" />
                {teacher.email}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={13} className="text-gray-400" />
                {teacher.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase size={13} className="text-gray-400" />
                {teacher.employmentType}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={13} className="text-gray-400" />
                Joined: {new Date(teacher.dateJoined).toLocaleDateString('en-GB')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Card View ────────────────────────────────────────────────────────────────

const TeacherCard = ({ teacher, onView, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 h-1.5" />
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar teacher={teacher} />
          <div>
            <p className="font-semibold text-gray-800 text-sm leading-tight">
              {teacher.title} {teacher.firstName} {teacher.lastName}
            </p>
            <p className="text-xs text-gray-400">{teacher.staffId}</p>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button onClick={() => onView(teacher)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={14} /></button>
          <button onClick={() => onEdit(teacher)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"><Edit2 size={14} /></button>
          <button onClick={() => onDelete(teacher.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
        </div>
      </div>

      <div className="space-y-1.5 text-xs text-gray-600 mb-3">
        <div className="flex items-center gap-1.5"><BookOpen size={11} className="text-gray-400" />{teacher.subject}</div>
        <div className="flex items-center gap-1.5"><Building2 size={11} className="text-gray-400" />{teacher.department}</div>
        <div className="flex items-center gap-1.5"><Users size={11} className="text-gray-400" />{teacher.classes.length} classes</div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">Subject Teacher</span>
        {teacher.additionalRoles.slice(0, 2).map(r => <RoleBadge key={r} role={r} />)}
        {teacher.additionalRoles.length > 2 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">+{teacher.additionalRoles.length - 2}</span>
        )}
      </div>

      <div className="border-t border-gray-100 pt-2.5 space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Teaching Load</span>
          <TrackBadge track={teacher.track} />
        </div>
        <LoadBar current={teacher.currentPeriods} max={teacher.maxPeriods} />
      </div>
    </div>
  </div>
);

// ─── Main Teacher Component ───────────────────────────────────────────────────

const Teacher = () => {
  const [teachers, setTeachers]     = useState(SAMPLE_TEACHERS);
  const [viewMode, setViewMode]     = useState('table');
  const [search, setSearch]         = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [trackFilter, setTrackFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [modalOpen, setModalOpen]     = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [viewTeacher, setViewTeacher] = useState(null);

  // Filter logic
  const filtered = useMemo(() => {
    return teachers.filter(t => {
      const fullName = `${t.firstName} ${t.lastName} ${t.staffId} ${t.subject}`.toLowerCase();
      const matchSearch = !search || fullName.includes(search.toLowerCase());
      const matchDept   = !deptFilter || t.department === deptFilter;
      const matchRole   = !roleFilter || t.additionalRoles.includes(roleFilter) || roleFilter === 'Subject Teacher';
      const matchTrack  = !trackFilter || t.track === trackFilter;
      const matchStatus = !statusFilter || t.status === statusFilter;
      return matchSearch && matchDept && matchRole && matchTrack && matchStatus;
    });
  }, [teachers, search, deptFilter, roleFilter, trackFilter, statusFilter]);

  // Stats
  const stats = useMemo(() => ({
    total:      teachers.length,
    hods:       teachers.filter(t => t.additionalRoles.includes('HOD')).length,
    formTeachers: teachers.filter(t => t.additionalRoles.includes('Form Teacher')).length,
    bothTrack:  teachers.filter(t => t.track === 'Both').length,
  }), [teachers]);

  const handleSave = (form) => {
    if (form.id) {
      setTeachers(prev => prev.map(t => t.id === form.id ? { ...t, ...form } : t));
    } else {
      setTeachers(prev => [...prev, { ...form, id: Date.now(), currentPeriods: 0, classes: [] }]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this teacher from the system?')) {
      setTeachers(prev => prev.filter(t => t.id !== id));
    }
  };

  const openEdit = (teacher) => {
    setEditTeacher(teacher);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditTeacher(null);
    setModalOpen(true);
  };

  const clearFilters = () => {
    setSearch(''); setDeptFilter(''); setRoleFilter('');
    setTrackFilter(''); setStatusFilter('');
  };

  const hasFilters = search || deptFilter || roleFilter || trackFilter || statusFilter;

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Teaching Staff</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Home / Admin / <span className="text-blue-700 font-medium">View Teacher</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition text-gray-600">
              <Download size={14} /> Export
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium shadow-sm"
            >
              <Plus size={14} /> Add Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users}       label="Total Teaching Staff"   value={stats.total}        sub="Active staff"           color="bg-blue-600" />
        <StatCard icon={Award}       label="Heads of Department"    value={stats.hods}          sub={`${DEPARTMENTS.length} depts`} color="bg-purple-600" />
        <StatCard icon={GraduationCap} label="Form Teachers"        value={stats.formTeachers}  sub="Class assignees"        color="bg-green-600" />
        <StatCard icon={RefreshCw}   label="Both Track Teachers"    value={stats.bothTrack}     sub="Track A & B active"     color="bg-orange-500" />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, staff ID or subject..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg transition ${showFilters ? 'border-blue-900 text-blue-900 bg-blue-50' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
              <Filter size={14} />
              Filters
              {hasFilters && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
            </button>

            {/* View toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('table')} className={`p-2 transition ${viewMode === 'table' ? 'bg-blue-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                <List size={15} />
              </button>
              <button onClick={() => setViewMode('card')} className={`p-2 transition ${viewMode === 'card' ? 'bg-blue-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                <LayoutGrid size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Row */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-3">
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-600">
              <option value="">All Departments</option>
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </select>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-600">
              <option value="">All Roles</option>
              <option>Subject Teacher</option>
              {ADDITIONAL_ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
            <select value={trackFilter} onChange={e => setTrackFilter(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-600">
              <option value="">All Tracks</option>
              <option>A</option><option>B</option><option>Both</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-600">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition">
                <X size={13} /> Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of <span className="font-semibold text-gray-700">{teachers.length}</span> teachers
        </p>
      </div>

      {/* ── TABLE VIEW ── */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Teacher</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject / Dept</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Roles</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Track</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Load</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                      <User size={32} className="mx-auto mb-2 opacity-30" />
                      No teachers found matching your search.
                    </td>
                  </tr>
                ) : filtered.map(teacher => (
                  <tr key={teacher.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar teacher={teacher} />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {teacher.title} {teacher.firstName} {teacher.lastName}
                          </p>
                          <p className="text-xs text-gray-400">{teacher.staffId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-700">{teacher.subject}</p>
                      <p className="text-xs text-gray-400">{teacher.department} Dept</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">Subject Teacher</span>
                        {teacher.additionalRoles.slice(0, 2).map(r => <RoleBadge key={r} role={r} />)}
                        {teacher.additionalRoles.length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                            +{teacher.additionalRoles.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <TrackBadge track={teacher.track} />
                    </td>
                    <td className="px-4 py-3 min-w-[120px]">
                      <LoadBar current={teacher.currentPeriods} max={teacher.maxPeriods} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusDot status={teacher.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setViewTeacher(teacher)} className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition" title="View">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => openEdit(teacher)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition" title="Edit">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(teacher.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CARD VIEW ── */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-4 text-center py-16 text-gray-400">
              <User size={40} className="mx-auto mb-3 opacity-30" />
              No teachers found.
            </div>
          ) : filtered.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onView={setViewTeacher}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modals & Drawer */}
      {modalOpen && (
        <TeacherModal
          teacher={editTeacher}
          onClose={() => { setModalOpen(false); setEditTeacher(null); }}
          onSave={handleSave}
        />
      )}

      {viewTeacher && (
        <TeacherDrawer
          teacher={viewTeacher}
          onClose={() => setViewTeacher(null)}
          onEdit={(t) => { setViewTeacher(null); openEdit(t); }}
        />
      )}
    </div>
  );
};

export default Teacher;