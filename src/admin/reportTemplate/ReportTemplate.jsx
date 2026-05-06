// admin/reportTemplate/ReportTemplate.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Save, Undo2, Eye, Download, RotateCcw, X,
  Settings, School, BookOpen, BarChart3, MessageSquare,
  Layout, AlertCircle, Info, CheckCircle2, GripVertical,
  Upload, Image, FileText, Target, Award, Calendar,
  User, Hash, Mail, Phone, MapPin, Users, TrendingUp,
  GraduationCap, Clock, Edit3, Trash2, Plus, ChevronUp,
  ChevronDown, MoveUp, MoveDown, Printer, FileJson,
  Shield, Zap, Sun, Moon, Sparkles, Globe, Volume2,
  HelpCircle, Wrench, Calculator, Microscope, Book,
  Briefcase, Flag, Heart, PenTool, Music, Cog
} from 'lucide-react';

// ─── SHS Ghana Specific Constants ─────────────────────────────────────────────

const ACADEMIC_YEARS = ["2023/2024", "2024/2025", "2025/2026"];
const TERMS = ["Term 1", "Term 2", "Term 3"];
const LANGUAGES = ["English", "French", "Bilingual"];

const SHS_PROGRAMS = [
  "General Arts", "General Science", "Business", "Visual Arts",
  "Home Economics", "Technical", "Agriculture", "Technical/Vocational"
];

const SHS_TRACKS = ["A", "B", "C", "D", "E"];

const CORE_SUBJECTS = [
  "Core Mathematics", "English Language", "Integrated Science",
  "Social Studies", "ICT"
];

const ELECTIVE_SUBJECTS_BY_PROGRAM = {
  "General Arts": ["Literature in English", "Government", "Economics", "History", "Geography", "French", "Christian Religious Studies", "Islamic Religious Studies"],
  "General Science": ["Physics", "Chemistry", "Biology", "Elective Mathematics", "ICT"],
  "Business": ["Business Management", "Financial Accounting", "Cost Accounting", "Economics", "Entrepreneurship"],
  "Visual Arts": ["Graphic Design", "Picture Making", "Sculpture", "Leatherwork", "Textiles", "Ceramics"],
  "Home Economics": ["Management in Living", "Foods and Nutrition", "Clothing and Textiles", "Biology", "Economics"],
  "Technical": ["Technical Drawing", "Building Construction", "Woodwork", "Metalwork", "Applied Electricity", "Electronics"],
  "Agriculture": ["General Agriculture", "Crop Science", "Animal Science", "Agricultural Economics", "Chemistry"],
  "Technical/Vocational": ["Auto Mechanics", "Electrical Installation", "Welding & Fabrication", "Carpentry", "Plumbing", "Blocklaying"]
};

const WASSCE_GRADE_BOUNDARIES = [
  { grade: "A1", min: 80, max: 100, points: 1, remark: "Excellent",        description: "Highest Distinction" },
  { grade: "B2", min: 70, max: 79,  points: 2, remark: "Very Good",        description: "Upper Credit" },
  { grade: "B3", min: 65, max: 69,  points: 3, remark: "Good",             description: "Lower Credit" },
  { grade: "C4", min: 60, max: 64,  points: 4, remark: "Credit",           description: "Average Pass" },
  { grade: "C5", min: 55, max: 59,  points: 5, remark: "Credit",           description: "Below Average Pass" },
  { grade: "C6", min: 50, max: 54,  points: 6, remark: "Marginal Credit",  description: "Minimum Pass" },
  { grade: "D7", min: 45, max: 49,  points: 7, remark: "Pass",             description: "Referral Required" },
  { grade: "E8", min: 40, max: 44,  points: 8, remark: "Weak Pass",        description: "Needs Improvement" },
  { grade: "F9", min: 0,  max: 39,  points: 9, remark: "Fail",             description: "Repeat Required" },
];

const PERFORMANCE_BANDS = [
  { band: "Excellent",          min: 80, max: 100, color: "#10b981", requirement: "Distinction" },
  { band: "Very Good",          min: 70, max: 79,  color: "#3b82f6", requirement: "Credit with Merit" },
  { band: "Good",               min: 60, max: 69,  color: "#8b5cf6", requirement: "Credit" },
  { band: "Satisfactory",       min: 50, max: 59,  color: "#f59e0b", requirement: "Minimum Pass" },
  { band: "Needs Improvement",  min: 40, max: 49,  color: "#ef4444", requirement: "Referral" },
  { band: "Unsatisfactory",     min: 0,  max: 39,  color: "#7f1d1d", requirement: "Repeat" },
];

const GRADING_SYSTEMS  = ["WASSCE (Standard)", "IGCSE", "American", "Custom"];
const GPA_TYPES        = ["Simple", "Weighted (WASSCE)", "Cumulative"];
const TABLE_LAYOUTS    = ["Vertical", "Horizontal", "Grid"];
const SUBJECT_GROUPINGS = ["By Program", "Core vs Elective", "By Department", "By Performance"];
const COMMENT_TYPES    = ["Text Only", "Predefined Only", "Both"];

const STUDENT_FIELDS = [
  { id: "name",         label: "Student Name",           icon: User,      default: true },
  { id: "id",           label: "Student ID",             icon: Hash,      default: true },
  { id: "dob",          label: "Date of Birth",          icon: Calendar,  default: false },
  { id: "gender",       label: "Gender",                 icon: Users,     default: false },
  { id: "parent",       label: "Parent/Guardian Name",   icon: Users,     default: false },
  { id: "contact",      label: "Contact Number",         icon: Phone,     default: false },
  { id: "address",      label: "Address",                icon: MapPin,    default: false },
  { id: "email",        label: "Email",                  icon: Mail,      default: false },
  { id: "program",      label: "Program of Study",       icon: Briefcase, default: true },
  { id: "academicYear", label: "Academic Year",          icon: Calendar,  default: true },
];

const SUBJECT_COLUMNS = [
  { id: "subject",          label: "Subject Name",          default: true,  fixed: true },
  { id: "code",             label: "Subject Code",          default: false, fixed: false },
  { id: "teacher",          label: "Teacher Name",          default: true,  fixed: false },
  { id: "ca_score",         label: "CA Score (30%)",        default: true,  fixed: false },
  { id: "exam_score",       label: "Exam Score (70%)",      default: true,  fixed: false },
  { id: "total",            label: "Total Score (100%)",    default: true,  fixed: false },
  { id: "percentage",       label: "Percentage",            default: true,  fixed: false },
  { id: "grade",            label: "Grade (WASSCE)",        default: true,  fixed: false },
  { id: "grade_point",      label: "Grade Point",           default: true,  fixed: false },
  { id: "position",         label: "Class Position",        default: true,  fixed: false },
  { id: "remark",           label: "Remark",                default: true,  fixed: false },
  { id: "teacher_comment",  label: "Teacher's Comment",     default: false, fixed: false },
];

const SAMPLE_SHS_STUDENT = {
  name: "Cpl John Mensah (Jnr)",
  id: "AFTS/2024/001",
  dob: "15/03/2008",
  gender: "Male",
  parent: "WOII Mensah & Mrs. Mensah",
  contact: "+233 24 123 4567",
  address: "AFTS Barracks, Burma Camp, Accra",
  email: "john.mensah@afts.edu.gh",
  program: "Technical",
  academicYear: "Form 1 - Technical",
  class: "Form 1 - Technical A",
  track: "A",
  residentialStatus: "Day Student",
  attendance: { present: 45, absent: 2, late: 3, percentage: 90.0, excused: 1, medical: 1 },
  caWeight: 30,
  examWeight: 70,
  subjects: [
    { name: "Core Mathematics",      code: "MTH101", teacher: "Capt Adjei",    ca: 28, exam: 58, total: 86, percentage: 86, grade: "A1", points: 1, position: 1, remark: "Excellent",  teacherComment: "Exceptional analytical skills" },
    { name: "English Language",      code: "ENG101", teacher: "Lt Eshun",      ca: 27, exam: 55, total: 82, percentage: 82, grade: "A1", points: 1, position: 2, remark: "Excellent",  teacherComment: "Excellent comprehension" },
    { name: "Integrated Science",    code: "SCI101", teacher: "Dr Osei (Maj)", ca: 26, exam: 54, total: 80, percentage: 80, grade: "A1", points: 1, position: 3, remark: "Excellent",  teacherComment: "Great practical skills" },
    { name: "Social Studies",        code: "SST101", teacher: "WOI Asare",     ca: 25, exam: 50, total: 75, percentage: 75, grade: "B2", points: 2, position: 4, remark: "Very Good",  teacherComment: "Good understanding of concepts" },
    { name: "ICT",                   code: "ICT101", teacher: "Sgt Boateng",   ca: 29, exam: 56, total: 85, percentage: 85, grade: "A1", points: 1, position: 2, remark: "Excellent",  teacherComment: "Computer proficiency is impressive" },
    { name: "Technical Drawing",     code: "TD101",  teacher: "Cpt Kofi",      ca: 28, exam: 59, total: 87, percentage: 87, grade: "A1", points: 1, position: 1, remark: "Excellent",  teacherComment: "Excellent drafting skills" },
    { name: "Building Construction", code: "BC101",  teacher: "Lt Amoah",      ca: 26, exam: 52, total: 78, percentage: 78, grade: "B2", points: 2, position: 5, remark: "Very Good",  teacherComment: "Good practical knowledge" },
    { name: "Woodwork",              code: "WD101",  teacher: "Mwo Adu",       ca: 27, exam: 53, total: 80, percentage: 80, grade: "A1", points: 1, position: 3, remark: "Excellent",  teacherComment: "Natural craftsmanship" },
    { name: "Metalwork",             code: "MT101",  teacher: "Sgt Mensah",    ca: 25, exam: 50, total: 75, percentage: 75, grade: "B2", points: 2, position: 6, remark: "Very Good",  teacherComment: "Safety protocols observed well" },
    { name: "Applied Electricity",   code: "ELC101", teacher: "Lt Owusu",      ca: 28, exam: 56, total: 84, percentage: 84, grade: "A1", points: 1, position: 2, remark: "Excellent",  teacherComment: "Good understanding of circuits" },
  ]
};

const MILITARY_COMMENT_TEMPLATES = [
  "Excellent performance! Demonstrates leadership potential. Keep up the high standards expected of AFTS cadets.",
  "Good effort. Shows discipline and commitment to academic excellence. Maintain the momentum.",
  "Satisfactory performance. Needs to improve in practical applications. Report to technical bay for extra drill.",
  "Average performance. Can do better with more focus. Requires supervision in workshop sessions.",
  "Below average. Needs significant improvement. Academic probation recommended.",
  "Shows remarkable improvement. The discipline of military training is reflecting in academics.",
  "Excellent in practicals. Theory needs more attention. Study more and report for tutorials.",
  "Demonstrates good understanding of technical concepts. Keep up with the hands-on approach.",
  "Attendance needs improvement. Punctuality is key to success in military and academics.",
  "Outstanding performance! A role model for other cadets. Joint campus commendation recommended.",
];

const COMMENT_TEMPLATES = MILITARY_COMMENT_TEMPLATES;

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls = (error = false) =>
  `w-full px-3 py-2 text-sm rounded-lg border outline-none transition-all duration-150 ${
    error
      ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
      : "border-gray-300 bg-gray-50 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  }`;

// ─── Reusable Components ──────────────────────────────────────────────────────

const SectionCard = ({ icon: Icon, title, description, badge, children }) => (
  <div className="bg-white rounded-xl overflow-hidden mb-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-start justify-between px-5 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
        </div>
      </div>
      {badge && (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
          {badge}
        </span>
      )}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Field = ({ label, required, optional, children, error, hint, tooltip }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-1">
      <label className="text-xs font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && <span className="text-xs font-normal ml-1 text-gray-400">(optional)</span>}
      </label>
      {tooltip && (
        <div className="group relative">
          <HelpCircle size={12} className="text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            {tooltip}
          </div>
        </div>
      )}
    </div>
    {children}
    {error && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} />{error}</span>}
    {hint && !error && <span className="text-xs text-gray-400">{hint}</span>}
  </div>
);

const Toggle = ({ checked, onChange, label, description, tooltip }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {tooltip && (
        <div className="group relative">
          <HelpCircle size={12} className="text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            {tooltip}
          </div>
        </div>
      )}
    </div>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default:  "bg-gray-100 text-gray-700",
    success:  "bg-green-100 text-green-700",
    warning:  "bg-yellow-100 text-yellow-700",
    info:     "bg-blue-100 text-blue-700",
    purple:   "bg-purple-100 text-purple-700",
    military: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const ColorPicker = ({ value, onChange, label }) => (
  <div className="flex items-center gap-2">
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 rounded cursor-pointer border border-gray-300"
    />
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

// ─── Live Preview Component ───────────────────────────────────────────────────

const LiveReportPreview = ({ settings, sections, student }) => {
  if (!student || !student.subjects) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="text-center p-8 text-gray-500">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading student data...</p>
          <p className="text-xs mt-2">Please select a cadet</p>
        </div>
      </div>
    );
  }

  const visibleSections = sections.filter(s => s.visible).sort((a, b) => a.order - b.order);

  const getPerformanceBand = (percentage) => {
    const band = settings.performance.performanceBands.find(b => percentage >= b.min && percentage <= b.max);
    return band || settings.performance.performanceBands[0];
  };

  const totalScore       = student.subjects.reduce((sum, s) => sum + s.total, 0);
  const maxTotal         = student.subjects.length * 100;
  const overallPercentage = (totalScore / maxTotal) * 100;
  const overallBand      = getPerformanceBand(overallPercentage);
  const totalGradePoints = student.subjects.reduce((sum, s) => sum + s.points, 0);
  const gpa              = settings.performance.showOverallGPA
    ? (totalGradePoints / student.subjects.length).toFixed(2)
    : null;

  const coreSubjects     = student.subjects.slice(0, 5);
  const electiveSubjects = student.subjects.slice(5);

  // Normalise the student id field (context uses studentId, sample uses id)
  const displayId = student.studentId || student.id;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Military-style header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-4 px-6 border-b-4 border-yellow-600">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-wide">ARMED FORCES TECHNICAL SCHOOL</h1>
            <p className="text-xs text-red-200 mt-1">Excellence Through Discipline - Burma Camp, Accra</p>
          </div>
          <Shield size={40} className="text-yellow-500" />
        </div>
        <div className="mt-3 pt-2 border-t border-red-700 text-center">
          <p className="text-sm font-semibold">
            STUDENT ACADEMIC REPORT CARD - {settings.template?.academicYear || "2024/2025"} ACADEMIC YEAR
          </p>
          <p className="text-xs text-red-200">WASSCE Standard • Technical/Vocational Track</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Student Information */}
        {visibleSections.find(s => s.id === "student-info") && (
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-600">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <User size={14} /> CADET'S INFORMATION
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {settings.studentInfo.fieldsToDisplay.includes('name') && (
                <div><span className="text-gray-500">Cadet's Name:</span> <span className="font-semibold">{student.name}</span></div>
              )}
              {settings.studentInfo.fieldsToDisplay.includes('id') && (
                <div><span className="text-gray-500">Service No.:</span> <span className="font-semibold">{displayId}</span></div>
              )}
              {settings.studentInfo.fieldsToDisplay.includes('program') && (
                <div><span className="text-gray-500">Program:</span> <span className="font-semibold">{student.program}</span></div>
              )}
              {settings.studentInfo.fieldsToDisplay.includes('academicYear') && (
                <div><span className="text-gray-500">Form/Year:</span> <span className="font-semibold">{student.academicYear}</span></div>
              )}
              {settings.studentInfo.fieldsToDisplay.includes('dob') && (
                <div><span className="text-gray-500">Date of Birth:</span> {student.dob}</div>
              )}
              {settings.studentInfo.fieldsToDisplay.includes('gender') && (
                <div><span className="text-gray-500">Gender:</span> {student.gender}</div>
              )}
              {settings.studentInfo.showParentInfo && (
                <div className="col-span-2"><span className="text-gray-500">Parent/Guardian:</span> {student.parent}</div>
              )}
              {settings.studentInfo.showContact && (
                <>
                  <div><span className="text-gray-500">Contact:</span> {student.contact}</div>
                  <div><span className="text-gray-500">Email:</span> {student.email}</div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Academic Information */}
        {visibleSections.find(s => s.id === "academic-info") && (
          <div className="flex flex-wrap gap-4 text-sm border-b border-gray-200 pb-3">
            <div><span className="text-gray-500">Class/Platoon:</span> <span className="font-medium">{student.class}</span></div>
            {settings.academicInfo.showProgramme && (
              <div><span className="text-gray-500">Programme:</span> <span className="font-medium">{student.program}</span></div>
            )}
            {settings.academicInfo.showTrack && (
              <div><span className="text-gray-500">Company:</span> <span className="font-medium">{student.track} Company</span></div>
            )}
            {settings.academicInfo.showResidentialStatus && (
              <div><span className="text-gray-500">Status:</span> <span className="font-medium">{student.residentialStatus}</span></div>
            )}
            <div>
              <span className="text-gray-500">Assessment:</span>{' '}
              <span className="font-medium">CA ({student.caWeight}%) + Exam ({student.examWeight}%)</span>
            </div>
          </div>
        )}

        {/* Core Subjects Table */}
        {visibleSections.find(s => s.id === "core-subjects") && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 pl-2 border-l-4 border-red-500">
              <Flag size={14} className="text-red-600" /> CORE SUBJECTS (Compulsory)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    {settings.subjectTable.columns.includes('subject')     && <th className="p-2 text-left border">Subject</th>}
                    {settings.subjectTable.columns.includes('teacher')     && <th className="p-2 text-left border">Instructor</th>}
                    {settings.subjectTable.columns.includes('ca_score')    && <th className="p-2 text-center border">CA (30)</th>}
                    {settings.subjectTable.columns.includes('exam_score')  && <th className="p-2 text-center border">Exam (70)</th>}
                    {settings.subjectTable.columns.includes('total')       && <th className="p-2 text-center border">Total</th>}
                    {settings.subjectTable.columns.includes('grade')       && <th className="p-2 text-center border">Grade</th>}
                    {settings.subjectTable.columns.includes('grade_point') && <th className="p-2 text-center border">GP</th>}
                    {settings.subjectTable.columns.includes('position')    && <th className="p-2 text-center border">Pos</th>}
                    {settings.subjectTable.columns.includes('remark')      && <th className="p-2 text-left border">Remark</th>}
                  </tr>
                </thead>
                <tbody>
                  {coreSubjects.map((subject, idx) => (
                    // FIX 1: was </table> — corrected to </tr>
                    <tr key={idx} className="hover:bg-gray-50">
                      {settings.subjectTable.columns.includes('subject')     && <td className="p-2 border font-medium">{subject.name}</td>}
                      {/* FIX 2: was <tr> — corrected to </td> */}
                      {settings.subjectTable.columns.includes('teacher')     && <td className="p-2 border">{subject.teacher}</td>}
                      {settings.subjectTable.columns.includes('ca_score')    && <td className="p-2 text-center border">{subject.ca}</td>}
                      {settings.subjectTable.columns.includes('exam_score')  && <td className="p-2 text-center border">{subject.exam}</td>}
                      {settings.subjectTable.columns.includes('total')       && <td className="p-2 text-center border font-semibold">{subject.total}</td>}
                      {settings.subjectTable.columns.includes('grade')       && (
                        <td className="p-2 text-center border">
                          <Badge variant={subject.grade === 'A1' ? 'success' : subject.grade === 'B2' ? 'info' : 'default'}>
                            {subject.grade}
                          </Badge>
                        </td>
                      )}
                      {settings.subjectTable.columns.includes('grade_point') && <td className="p-2 text-center border">{subject.points}</td>}
                      {settings.subjectTable.columns.includes('position')    && <td className="p-2 text-center border">{subject.position}</td>}
                      {settings.subjectTable.columns.includes('remark')      && <td className="p-2 border">{subject.remark}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Elective Subjects Table */}
        {visibleSections.find(s => s.id === "elective-subjects") && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 pl-2 border-l-4 border-blue-500">
              <Wrench size={14} className="text-blue-600" /> ELECTIVE/TECHNICAL SUBJECTS
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {settings.subjectTable.columns.includes('subject')     && <th className="p-2 text-left border">Subject</th>}
                    {settings.subjectTable.columns.includes('teacher')     && <th className="p-2 text-left border">Instructor</th>}
                    {settings.subjectTable.columns.includes('ca_score')    && <th className="p-2 text-center border">CA (30)</th>}
                    {settings.subjectTable.columns.includes('exam_score')  && <th className="p-2 text-center border">Exam (70)</th>}
                    {settings.subjectTable.columns.includes('total')       && <th className="p-2 text-center border">Total</th>}
                    {settings.subjectTable.columns.includes('grade')       && <th className="p-2 text-center border">Grade</th>}
                    {settings.subjectTable.columns.includes('grade_point') && <th className="p-2 text-center border">GP</th>}
                    {settings.subjectTable.columns.includes('position')    && <th className="p-2 text-center border">Pos</th>}
                    {settings.subjectTable.columns.includes('remark')      && <th className="p-2 text-left border">Remark</th>}
                  </tr>
                </thead>
                <tbody>
                  {electiveSubjects.map((subject, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {settings.subjectTable.columns.includes('subject')     && <td className="p-2 border font-medium">{subject.name}</td>}
                      {settings.subjectTable.columns.includes('teacher')     && <td className="p-2 border">{subject.teacher}</td>}
                      {settings.subjectTable.columns.includes('ca_score')    && <td className="p-2 text-center border">{subject.ca}</td>}
                      {settings.subjectTable.columns.includes('exam_score')  && <td className="p-2 text-center border">{subject.exam}</td>}
                      {settings.subjectTable.columns.includes('total')       && <td className="p-2 text-center border font-semibold">{subject.total}</td>}
                      {settings.subjectTable.columns.includes('grade')       && (
                        <td className="p-2 text-center border">
                          <Badge variant={subject.grade === 'A1' ? 'success' : subject.grade === 'B2' ? 'info' : 'default'}>
                            {subject.grade}
                          </Badge>
                        </td>
                      )}
                      {settings.subjectTable.columns.includes('grade_point') && <td className="p-2 text-center border">{subject.points}</td>}
                      {settings.subjectTable.columns.includes('position')    && <td className="p-2 text-center border">{subject.position}</td>}
                      {settings.subjectTable.columns.includes('remark')      && <td className="p-2 border">{subject.remark}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Performance Summary */}
        {visibleSections.find(s => s.id === "performance-summary") && (
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Award size={14} className="text-red-600" /> PERFORMANCE SUMMARY
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {settings.performance.showTotalMarks && (
                <div><span className="text-gray-500">Total Marks:</span> <span className="font-bold text-lg">{totalScore}/{maxTotal}</span></div>
              )}
              {settings.performance.showTotalPercentage && (
                <div><span className="text-gray-500">Percentage:</span> <span className="font-bold text-lg">{overallPercentage.toFixed(1)}%</span></div>
              )}
              {settings.performance.showOverallGPA && gpa && (
                <div><span className="text-gray-500">GPA:</span> <span className="font-bold text-lg">{gpa}</span></div>
              )}
              {settings.performance.showPerformanceBand && (
                <div>
                  <span className="text-gray-500">Performance:</span>{' '}
                  <span className="font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: overallBand.color + '20', color: overallBand.color }}>
                    {overallBand.band}
                  </span>
                </div>
              )}
              {settings.performance.showClassRank && (
                <div><span className="text-gray-500">Class/Platoon Rank:</span> <span className="font-bold">3 / 48 Cadets</span></div>
              )}
              {settings.performance.showStreamRank && (
                <div><span className="text-gray-500">Company Rank:</span> <span className="font-bold">2 / 24</span></div>
              )}
              {settings.performance.showSubjectsCount && (
                <div><span className="text-gray-500">Subjects:</span> <span className="font-bold">{student.subjects.length}</span></div>
              )}
            </div>

            <div className="mt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: `${overallPercentage}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Unsatisfactory</span>
                <span>Needs Improvement</span>
                <span>Satisfactory</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        )}

        {/* Attendance */}
        {visibleSections.find(s => s.id === "attendance") && settings.attendance.showAttendance && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Clock size={14} /> ATTENDANCE & DRILL RECORD
            </h3>
            <div className="flex flex-wrap gap-5 text-sm">
              {settings.attendance.showPresent     && <div><span className="text-gray-500">Present:</span> <span className="font-medium">{student.attendance.present} days</span></div>}
              {settings.attendance.showAbsent      && <div><span className="text-gray-500">Absent:</span>  <span className="font-medium">{student.attendance.absent} days</span></div>}
              {settings.attendance.showLate        && <div><span className="text-gray-500">Late:</span>    <span className="font-medium">{student.attendance.late} days</span></div>}
              {settings.attendance.showPercentage  && <div><span className="text-gray-500">Attendance %:</span> <span className="font-medium text-green-600">{student.attendance.percentage}%</span></div>}
              <div><span className="text-gray-500">Medical:</span> <span className="font-medium">{student.attendance.medical} day</span></div>
              <div><span className="text-gray-500">Excused:</span> <span className="font-medium">{student.attendance.excused} day</span></div>
            </div>
          </div>
        )}

        {/* Comments */}
        {visibleSections.find(s => s.id === "teacher-comments") && settings.comments.showComments && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <MessageSquare size={14} /> INSTRUCTOR'S COMMENDATIONS/REMARKS
            </h3>
            <div className="space-y-3">
              {settings.comments.showClassTeacherComment && (
                <div className="border-l-4 border-red-500 pl-3">
                  <p className="text-sm italic text-gray-700">
                    "{student.subjects[0]?.teacherComment} Shows great respect for authority and peers. Maintains high standards of military discipline."
                  </p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <span>- {student.subjects[0]?.teacher}</span>
                    <span className="text-red-500">• Class Instructor</span>
                  </p>
                </div>
              )}
              {settings.comments.showHeadComment && (
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm italic text-gray-700">
                    "An excellent cadet with outstanding academic and leadership potential. Recommended for promotion to Cadet Lance Corporal."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">- Commandant, AFTS</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Signatures */}
        {visibleSections.find(s => s.id === "signatures") && settings.comments.showSignature && (
          <div className="flex justify-between pt-4 border-t border-gray-300">
            <div className="text-center">
              <div className="w-28 h-12 border-b border-gray-500 mb-1"></div>
              <p className="text-xs text-gray-600">Parent/Guardian's Signature</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-12 border-b border-gray-500 mb-1"></div>
              <p className="text-xs text-gray-600">Class Instructor's Signature</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-12 border-b border-gray-500 mb-1"></div>
              <p className="text-xs text-gray-600">Commandant's Signature</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {visibleSections.find(s => s.id === "footer") && (
        <div className="border-t border-gray-200 p-3 text-center text-xs text-gray-500 bg-gray-50">
          <div className="flex justify-center items-center gap-4">
            <span>📅 Issued: {new Date().toLocaleDateString()}</span>
            <span>⚔️ "DISCIPLINE • EXCELLENCE • SERVICE"</span>
            <span>🏫 AFTS - Burma Camp</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const ReportTemplate = ({ selectedStudent: propSelectedStudent }) => {
  const currentStudent = propSelectedStudent || SAMPLE_SHS_STUDENT;

  const [activeTab, setActiveTab]               = useState("general");
  const [showPreview, setShowPreview]           = useState(false);
  const [saved, setSaved]                       = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [template, setTemplate] = useState({
    name: "AFTS Standard Report Card",
    code: "AFTS-RPT-2024",
    academicYear: "2024/2025",
    term: "Term 1",
    version: "1.0",
    language: "English",
    isDefault: true,
    isActive: true,
  });

  const [studentInfo, setStudentInfo] = useState({
    showPhoto: false,
    fieldsToDisplay: ["name", "id", "program", "academicYear"],
    showParentInfo: true,
    showContact: false,
    studentIdFormat: "text",
  });

  const [academicInfo, setAcademicInfo] = useState({
    showClass: "full",
    showProgramme: true,
    showTrack: true,
    showResidentialStatus: true,
    showAttendance: true,
    showClassPosition: true,
    showClassAverage: true,
    showSchoolAverage: false,
    caWeight: 30,
    examWeight: 70,
  });

  const [subjectTable, setSubjectTable] = useState({
    layout: "vertical",
    grouping: "Core vs Elective",
    showSubjectCode: false,
    showTeacherName: true,
    showCABreakdown: false,
    separateCoreElective: true,
    coreSectionTitle: "Core Subjects (Compulsory)",
    electiveSectionTitle: "Elective/Technical Subjects",
    columns: ["subject", "teacher", "ca_score", "exam_score", "total", "grade", "grade_point", "position", "remark"],
  });

  const [grading, setGrading] = useState({
    system: "WASSCE (Standard)",
    showGradePoints: true,
    gpaCalculation: "Weighted (WASSCE)",
    showSubjectPosition: true,
    gradeBoundaries: WASSCE_GRADE_BOUNDARIES,
  });

  const [performance, setPerformance] = useState({
    showTotalMarks: true,
    showTotalPercentage: true,
    showOverallGPA: true,
    showClassRank: true,
    showStreamRank: true,
    showSubjectsCount: true,
    showPassedCount: true,
    showPerformanceBand: true,
    performanceBands: PERFORMANCE_BANDS,
  });

  const [attendance, setAttendance] = useState({
    showAttendance: true,
    format: "summary",
    showPresent: true,
    showAbsent: true,
    showLate: true,
    showPercentage: true,
    showTermBreakdown: false,
  });

  const [comments, setComments] = useState({
    showComments: true,
    commentType: "both",
    characterLimit: 500,
    allowMultipleTeachers: true,
    showClassTeacherComment: true,
    showHeadComment: true,
    showSignature: true,
    predefinedTemplates: COMMENT_TEMPLATES,
  });

  const [sections, setSections] = useState([
    { id: "student-info",        name: "Cadet Information",           visible: true, order: 1 },
    { id: "academic-info",       name: "Academic Details",            visible: true, order: 2 },
    { id: "core-subjects",       name: "Core Subjects",               visible: true, order: 3 },
    { id: "elective-subjects",   name: "Elective/Technical Subjects", visible: true, order: 4 },
    { id: "performance-summary", name: "Performance Summary",         visible: true, order: 5 },
    { id: "attendance",          name: "Attendance Record",           visible: true, order: 6 },
    { id: "teacher-comments",    name: "Instructor's Remarks",        visible: true, order: 7 },
    { id: "signatures",          name: "Signatures",                  visible: true, order: 8 },
    { id: "footer",              name: "Footer",                      visible: true, order: 9 },
  ]);

  // Mark unsaved
  const markUnsaved = useCallback(() => setHasUnsavedChanges(true), []);

  // Validation
  const validateSettings = useCallback(() => {
    const errors = {};

    const sortedBoundaries = [...grading.gradeBoundaries].sort((a, b) => b.min - a.min);
    for (let i = 0; i < sortedBoundaries.length - 1; i++) {
      const current = sortedBoundaries[i];
      const next    = sortedBoundaries[i + 1];
      if (current.min - 1 > next.max) {
        errors.gradeBoundaries = `Gap detected between ${current.grade} (min: ${current.min}) and ${next.grade} (max: ${next.max})`;
      }
      if (current.min <= next.max) {
        errors.gradeBoundaries = `Overlap detected between ${current.grade} and ${next.grade}`;
      }
    }

    if (!template.name.trim()) errors.templateName = "Template name is required";
    if (!template.code.trim()) errors.templateCode = "Template code is required";
    if (academicInfo.caWeight + academicInfo.examWeight !== 100) {
      errors.caExamWeight = "CA and Exam weights must add up to 100%";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [grading.gradeBoundaries, template.name, template.code, academicInfo.caWeight, academicInfo.examWeight]);

  // FIX: wrap handleSave in useCallback so the keyboard shortcut useEffect can list it as a dep
  const handleSave = useCallback(() => {
    if (!validateSettings()) return;

    const templateData = {
      template, studentInfo, academicInfo, subjectTable,
      grading, performance, attendance, comments, sections,
      savedAt: new Date().toISOString(),
    };
    console.log("Saving AFTS template:", templateData);
    setSaved(true);
    setHasUnsavedChanges(false);
    setTimeout(() => setSaved(false), 3000);
  }, [template, studentInfo, academicInfo, subjectTable, grading, performance, attendance, comments, sections, validateSettings]);

  // FIX: wrap handleUndo in useCallback for the same reason
  const handleUndo = useCallback(() => {
    if (window.confirm("Undo all unsaved changes? This cannot be undone.")) {
      window.location.reload();
    }
  }, []);

  // Unsaved changes warning
  useEffect(() => {
    const handler = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsavedChanges]);

  // FIX: keyboard shortcuts — handleSave and handleUndo are now stable refs listed in deps
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); handleUndo(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, handleUndo]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleTemplateChange = (field, value) => {
    setTemplate(prev => ({ ...prev, [field]: value }));
    markUnsaved();
  };

  const handleStudentFieldsToggle = (fieldId) => {
    setStudentInfo(prev => ({
      ...prev,
      fieldsToDisplay: prev.fieldsToDisplay.includes(fieldId)
        ? prev.fieldsToDisplay.filter(f => f !== fieldId)
        : [...prev.fieldsToDisplay, fieldId]
    }));
    markUnsaved();
  };

  const handleColumnsToggle = (columnId) => {
    setSubjectTable(prev => ({
      ...prev,
      columns: prev.columns.includes(columnId)
        ? prev.columns.filter(c => c !== columnId)
        : [...prev.columns, columnId]
    }));
    markUnsaved();
  };

  const handleSectionToggle = (sectionId) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId ? { ...section, visible: !section.visible } : section
    ));
    markUnsaved();
  };

  const handleSectionOrder = (sectionId, direction) => {
    setSections(prev => {
      const index    = prev.findIndex(s => s.id === sectionId);
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newSections = [...prev];
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      markUnsaved();
      return newSections.map((section, idx) => ({ ...section, order: idx + 1 }));
    });
  };

  const handleGradeBoundaryChange = (index, field, value) => {
    setGrading(prev => ({
      ...prev,
      gradeBoundaries: prev.gradeBoundaries.map((boundary, i) =>
        i === index ? { ...boundary, [field]: parseInt(value) || 0 } : boundary
      )
    }));
    markUnsaved();
  };

  // FIX: color field must NOT go through parseInt — it would produce NaN → 0
  const handlePerformanceBandChange = (index, field, value) => {
    setPerformance(prev => ({
      ...prev,
      performanceBands: prev.performanceBands.map((band, i) =>
        i === index
          ? { ...band, [field]: field === 'color' ? value : (parseInt(value) || 0) }
          : band
      )
    }));
    markUnsaved();
  };

  const handleAddCommentTemplate = () => {
    setComments(prev => ({
      ...prev,
      predefinedTemplates: [...prev.predefinedTemplates, "New cadet comment template"]
    }));
    markUnsaved();
  };

  const handleUpdateCommentTemplate = (index, value) => {
    setComments(prev => ({
      ...prev,
      predefinedTemplates: prev.predefinedTemplates.map((t, i) => i === index ? value : t)
    }));
    markUnsaved();
  };

  const handleDeleteCommentTemplate = (index) => {
    setComments(prev => ({
      ...prev,
      predefinedTemplates: prev.predefinedTemplates.filter((_, i) => i !== index)
    }));
    markUnsaved();
  };

  const handleExport = () => {
    const exportData = {
      template, studentInfo, academicInfo, subjectTable,
      grading, performance, attendance, comments, sections,
      exportDate: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `${template.code}-${template.academicYear}-${template.term}.json`);
    link.click();
  };

  const handleReset = () => {
    if (window.confirm("Reset all template settings? This cannot be undone.")) {
      window.location.reload();
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-red-800 to-red-900 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-yellow-400" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">AFTS Report Builder</h1>
                <p className="text-red-200 text-sm mt-1">Armed Forces Technical School - Excellence Through Discipline</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="military">{template.isActive ? "ACTIVE" : "INACTIVE"}</Badge>
              <Badge variant="military">v{template.version}</Badge>
              <Badge variant="military">WASSCE Standard</Badge>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {saved && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={16} /> Template saved successfully! 🇬🇭
          </div>
        )}
        {hasUnsavedChanges && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} /> You have unsaved changes. Press Ctrl+S to save.
          </div>
        )}
        {Object.keys(validationErrors).length > 0 && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} /> {Object.values(validationErrors)[0]}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 overflow-x-auto bg-white rounded-t-lg px-2">
          <nav className="flex gap-1 min-w-max">
            {[
              { id: "general",  label: "General Settings",  icon: Settings },
              { id: "subjects", label: "Subjects & Table",  icon: BookOpen },
              { id: "grading",  label: "Grading (WASSCE)", icon: Target },
              { id: "comments", label: "Comments",          icon: MessageSquare },
              { id: "sections", label: "Section Order",     icon: Layout },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Settings Panel */}
          <div className="flex-1 min-w-0">
            <div className="space-y-6">

              {/* ── TAB 1: GENERAL SETTINGS ── */}
              {activeTab === "general" && (
                <>
                  <SectionCard icon={Settings} title="Template Identification" description="Basic information for AFTS report template">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Field label="Template Name" required error={validationErrors.templateName}>
                        <input className={inputCls(!!validationErrors.templateName)} value={template.name} onChange={e => handleTemplateChange('name', e.target.value)} placeholder="e.g., AFTS Standard Report" />
                      </Field>
                      <Field label="Template Code" required error={validationErrors.templateCode}>
                        <input className={inputCls(!!validationErrors.templateCode)} value={template.code} onChange={e => handleTemplateChange('code', e.target.value.toUpperCase())} placeholder="e.g., AFTS-RPT-2024" />
                      </Field>
                      <Field label="Template Version">
                        <input className={inputCls()} value={template.version} onChange={e => handleTemplateChange('version', e.target.value)} placeholder="e.g., v1.0" />
                      </Field>
                      <Field label="Academic Year">
                        <select className={inputCls()} value={template.academicYear} onChange={e => handleTemplateChange('academicYear', e.target.value)}>
                          {ACADEMIC_YEARS.map(year => <option key={year}>{year}</option>)}
                        </select>
                      </Field>
                      <Field label="Term" tooltip="Academic term for the report">
                        <select className={inputCls()} value={template.term} onChange={e => handleTemplateChange('term', e.target.value)}>
                          {TERMS.map(term => <option key={term}>{term}</option>)}
                        </select>
                      </Field>
                      <Field label="Assessment Weights" tooltip="Continuous Assessment vs Exam Score distribution" error={validationErrors.caExamWeight}>
                        <div className="flex gap-2">
                          <input type="number" className={inputCls(!!validationErrors.caExamWeight)} value={academicInfo.caWeight}   onChange={e => { setAcademicInfo(prev => ({ ...prev, caWeight:   parseInt(e.target.value) })); markUnsaved(); }} placeholder="CA %" />
                          <span className="self-center">+</span>
                          <input type="number" className={inputCls(!!validationErrors.caExamWeight)} value={academicInfo.examWeight} onChange={e => { setAcademicInfo(prev => ({ ...prev, examWeight: parseInt(e.target.value) })); markUnsaved(); }} placeholder="Exam %" />
                          <span className="self-center">= 100%</span>
                        </div>
                      </Field>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={template.isDefault} onChange={e => handleTemplateChange('isDefault', e.target.checked)} />
                        Set as default template
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={template.isActive} onChange={e => handleTemplateChange('isActive', e.target.checked)} />
                        Template is active
                      </label>
                    </div>
                  </SectionCard>

                  <SectionCard icon={User} title="Cadet Information Display" description="Select which cadet details to display on the report">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Toggle checked={studentInfo.showPhoto}      onChange={val => { setStudentInfo(prev => ({ ...prev, showPhoto:      val })); markUnsaved(); }} label="Show Cadet Photo" />
                      <Toggle checked={studentInfo.showParentInfo} onChange={val => { setStudentInfo(prev => ({ ...prev, showParentInfo: val })); markUnsaved(); }} label="Show Parent/Guardian Info" />
                      <Toggle checked={studentInfo.showContact}    onChange={val => { setStudentInfo(prev => ({ ...prev, showContact:    val })); markUnsaved(); }} label="Show Contact Information" />
                      <Field label="Cadet ID Format">
                        <select className={inputCls()} value={studentInfo.studentIdFormat} onChange={e => { setStudentInfo(prev => ({ ...prev, studentIdFormat: e.target.value })); markUnsaved(); }}>
                          <option value="text">Text Only</option>
                          <option value="barcode">Barcode</option>
                          <option value="qrcode">QR Code</option>
                        </select>
                      </Field>
                    </div>
                    <div className="mt-4">
                      <label className="text-xs font-semibold text-gray-700 mb-2 block">Fields to Display:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {STUDENT_FIELDS.map(field => {
                          const FieldIcon = field.icon;
                          return (
                            <label key={field.id} className="flex items-center gap-2 text-sm">
                              <input type="checkbox" checked={studentInfo.fieldsToDisplay.includes(field.id)} onChange={() => handleStudentFieldsToggle(field.id)} />
                              <FieldIcon size={12} className="text-gray-400" />
                              {field.label}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </SectionCard>
                </>
              )}

              {/* ── TAB 2: SUBJECTS & TABLE ── */}
              {activeTab === "subjects" && (
                <>
                  <SectionCard icon={BookOpen} title="Subject Configuration" description="Configure SHS subject display for AFTS">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Table Layout">
                        <select className={inputCls()} value={subjectTable.layout} onChange={e => { setSubjectTable(prev => ({ ...prev, layout: e.target.value })); markUnsaved(); }}>
                          {TABLE_LAYOUTS.map(layout => <option key={layout}>{layout}</option>)}
                        </select>
                      </Field>
                      <Field label="Subject Grouping">
                        <select className={inputCls()} value={subjectTable.grouping} onChange={e => { setSubjectTable(prev => ({ ...prev, grouping: e.target.value })); markUnsaved(); }}>
                          {SUBJECT_GROUPINGS.map(group => <option key={group}>{group}</option>)}
                        </select>
                      </Field>
                      <Toggle checked={subjectTable.showSubjectCode}      onChange={val => { setSubjectTable(prev => ({ ...prev, showSubjectCode:      val })); markUnsaved(); }} label="Show Subject Code" tooltip="WASSCE subject codes" />
                      <Toggle checked={subjectTable.showTeacherName}      onChange={val => { setSubjectTable(prev => ({ ...prev, showTeacherName:      val })); markUnsaved(); }} label="Show Instructor Name" tooltip="Display subject teacher/instructor name" />
                      <Toggle checked={subjectTable.showCABreakdown}      onChange={val => { setSubjectTable(prev => ({ ...prev, showCABreakdown:      val })); markUnsaved(); }} label="Show CA Breakdown" tooltip="Show quiz, test, assignment breakdown" />
                      <Toggle checked={subjectTable.separateCoreElective} onChange={val => { setSubjectTable(prev => ({ ...prev, separateCoreElective: val })); markUnsaved(); }} label="Separate Core & Electives" />
                    </div>
                    {subjectTable.separateCoreElective && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Core Subjects Section Title">
                          <input className={inputCls()} value={subjectTable.coreSectionTitle} onChange={e => { setSubjectTable(prev => ({ ...prev, coreSectionTitle: e.target.value })); markUnsaved(); }} />
                        </Field>
                        <Field label="Elective/Technical Section Title">
                          <input className={inputCls()} value={subjectTable.electiveSectionTitle} onChange={e => { setSubjectTable(prev => ({ ...prev, electiveSectionTitle: e.target.value })); markUnsaved(); }} />
                        </Field>
                      </div>
                    )}
                  </SectionCard>

                  <SectionCard icon={Layout} title="Columns to Display in Subject Table">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {SUBJECT_COLUMNS.map(column => (
                        <label key={column.id} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={subjectTable.columns.includes(column.id)} onChange={() => handleColumnsToggle(column.id)} disabled={column.fixed} />
                          <span className={column.fixed ? "font-semibold" : ""}>{column.label}</span>
                          {column.fixed && <Badge variant="info">Fixed</Badge>}
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Tip: Core subjects are compulsory for all SHS students in Ghana</p>
                  </SectionCard>

                  <SectionCard icon={TrendingUp} title="Academic Information Display">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Class/Form Display Format">
                        <select className={inputCls()} value={academicInfo.showClass} onChange={e => { setAcademicInfo(prev => ({ ...prev, showClass: e.target.value })); markUnsaved(); }}>
                          <option value="full">Full (e.g., Form 2 Technical A)</option>
                          <option value="code">Code Only (e.g., F2-TEC-A)</option>
                          <option value="none">None</option>
                        </select>
                      </Field>
                      <Toggle checked={academicInfo.showProgramme}        onChange={val => { setAcademicInfo(prev => ({ ...prev, showProgramme:        val })); markUnsaved(); }} label="Show Programme/Course" />
                      <Toggle checked={academicInfo.showTrack}            onChange={val => { setAcademicInfo(prev => ({ ...prev, showTrack:            val })); markUnsaved(); }} label="Show Company/Track" tooltip="Display company or platoon assignment" />
                      <Toggle checked={academicInfo.showResidentialStatus} onChange={val => { setAcademicInfo(prev => ({ ...prev, showResidentialStatus: val })); markUnsaved(); }} label="Show Residential Status" />
                      <Toggle checked={academicInfo.showAttendance}       onChange={val => { setAcademicInfo(prev => ({ ...prev, showAttendance:       val })); markUnsaved(); }} label="Show Attendance Summary" />
                      <Toggle checked={academicInfo.showClassPosition}    onChange={val => { setAcademicInfo(prev => ({ ...prev, showClassPosition:    val })); markUnsaved(); }} label="Show Class/Platoon Position" />
                      <Toggle checked={academicInfo.showClassAverage}     onChange={val => { setAcademicInfo(prev => ({ ...prev, showClassAverage:     val })); markUnsaved(); }} label="Show Class Average" />
                      <Toggle checked={academicInfo.showSchoolAverage}    onChange={val => { setAcademicInfo(prev => ({ ...prev, showSchoolAverage:    val })); markUnsaved(); }} label="Show School Average" />
                    </div>
                  </SectionCard>
                </>
              )}

              {/* ── TAB 3: GRADING ── */}
              {activeTab === "grading" && (
                <>
                  <SectionCard icon={Target} title="WASSCE Grading System" description="Official Ghana WASSCE grading standards">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Grading System">
                        <select className={inputCls()} value={grading.system} onChange={e => { setGrading(prev => ({ ...prev, system: e.target.value })); markUnsaved(); }}>
                          {GRADING_SYSTEMS.map(sys => <option key={sys}>{sys}</option>)}
                        </select>
                      </Field>
                      <Field label="GPA Calculation Method" tooltip="WASSCE uses weighted GPA based on grade points">
                        <select className={inputCls()} value={grading.gpaCalculation} onChange={e => { setGrading(prev => ({ ...prev, gpaCalculation: e.target.value })); markUnsaved(); }}>
                          {GPA_TYPES.map(type => <option key={type}>{type}</option>)}
                        </select>
                      </Field>
                      <Toggle checked={grading.showGradePoints}     onChange={val => { setGrading(prev => ({ ...prev, showGradePoints:     val })); markUnsaved(); }} label="Show Grade Points" tooltip="A1=1, B2=2, B3=3 … F9=9" />
                      <Toggle checked={grading.showSubjectPosition} onChange={val => { setGrading(prev => ({ ...prev, showSubjectPosition: val })); markUnsaved(); }} label="Show Subject Position" />
                    </div>
                  </SectionCard>

                  <SectionCard icon={BarChart3} title="WASSCE Grade Boundaries" description="Official WAEC grade boundaries for SHS">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Grade</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Min %</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Max %</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Points</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Remark</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Interpretation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {grading.gradeBoundaries.map((boundary, idx) => (
                            <tr key={boundary.grade}>
                              <td className="px-3 py-2 font-medium">{boundary.grade}</td>
                              <td className="px-3 py-2"><input type="number" className="w-20 px-2 py-1 text-sm border rounded" value={boundary.min}    onChange={e => handleGradeBoundaryChange(idx, 'min',    e.target.value)} /></td>
                              <td className="px-3 py-2"><input type="number" className="w-20 px-2 py-1 text-sm border rounded" value={boundary.max}    onChange={e => handleGradeBoundaryChange(idx, 'max',    e.target.value)} /></td>
                              <td className="px-3 py-2"><input type="number" className="w-16 px-2 py-1 text-sm border rounded" value={boundary.points} onChange={e => handleGradeBoundaryChange(idx, 'points', e.target.value)} /></td>
                              <td className="px-3 py-2 text-sm">{boundary.remark}</td>
                              <td className="px-3 py-2 text-xs text-gray-500">{boundary.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {validationErrors.gradeBoundaries && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={12} />{validationErrors.gradeBoundaries}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">Tip: WASSCE grades A1–C6 are credit passes for tertiary admission</p>
                  </SectionCard>

                  <SectionCard icon={Award} title="Overall Performance Bands" description="Categorize overall student performance">
                    <div className="space-y-3">
                      {performance.performanceBands.map((band, idx) => (
                        <div key={band.band} className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <div className="w-36 text-sm font-medium">{band.band}</div>
                          <input type="number" className="w-20 px-2 py-1 text-sm border rounded" value={band.min} onChange={e => handlePerformanceBandChange(idx, 'min', e.target.value)} />
                          <span className="text-sm">to</span>
                          <input type="number" className="w-20 px-2 py-1 text-sm border rounded" value={band.max} onChange={e => handlePerformanceBandChange(idx, 'max', e.target.value)} />
                          <div className="flex-1" />
                          <span className="text-xs text-gray-500">{band.requirement}</span>
                          {/* ColorPicker passes the raw hex string — no parseInt */}
                          <ColorPicker value={band.color} onChange={val => handlePerformanceBandChange(idx, 'color', val)} label="" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Toggle checked={performance.showPerformanceBand}  onChange={val => { setPerformance(prev => ({ ...prev, showPerformanceBand:  val })); markUnsaved(); }} label="Show Performance Band" />
                      <Toggle checked={performance.showTotalMarks}       onChange={val => { setPerformance(prev => ({ ...prev, showTotalMarks:       val })); markUnsaved(); }} label="Show Total Marks" />
                      <Toggle checked={performance.showTotalPercentage}  onChange={val => { setPerformance(prev => ({ ...prev, showTotalPercentage:  val })); markUnsaved(); }} label="Show Total Percentage" />
                      <Toggle checked={performance.showOverallGPA}       onChange={val => { setPerformance(prev => ({ ...prev, showOverallGPA:       val })); markUnsaved(); }} label="Show Overall GPA" />
                      <Toggle checked={performance.showClassRank}        onChange={val => { setPerformance(prev => ({ ...prev, showClassRank:        val })); markUnsaved(); }} label="Show Class/Platoon Rank" />
                      <Toggle checked={performance.showStreamRank}       onChange={val => { setPerformance(prev => ({ ...prev, showStreamRank:       val })); markUnsaved(); }} label="Show Company Rank" tooltip="Rank within the same company/stream" />
                      <Toggle checked={performance.showSubjectsCount}    onChange={val => { setPerformance(prev => ({ ...prev, showSubjectsCount:    val })); markUnsaved(); }} label="Show Number of Subjects" />
                      <Toggle checked={performance.showPassedCount}      onChange={val => { setPerformance(prev => ({ ...prev, showPassedCount:      val })); markUnsaved(); }} label="Show Credit Pass Count" tooltip="Number of subjects with A1–C6 grades" />
                    </div>
                  </SectionCard>
                </>
              )}

              {/* ── TAB 4: COMMENTS ── */}
              {activeTab === "comments" && (
                <>
                  <SectionCard icon={MessageSquare} title="Comments Configuration" description="Configure instructor comments section">
                    <div className="space-y-4">
                      <Toggle checked={comments.showComments} onChange={val => { setComments(prev => ({ ...prev, showComments: val })); markUnsaved(); }} label="Show Comments Section" />
                      {comments.showComments && (
                        <>
                          <Field label="Comment Type">
                            <select className={inputCls()} value={comments.commentType} onChange={e => { setComments(prev => ({ ...prev, commentType: e.target.value })); markUnsaved(); }}>
                              {COMMENT_TYPES.map(type => <option key={type}>{type}</option>)}
                            </select>
                          </Field>
                          <Field label="Character Limit">
                            <input type="number" className={inputCls()} value={comments.characterLimit} onChange={e => { setComments(prev => ({ ...prev, characterLimit: parseInt(e.target.value) })); markUnsaved(); }} />
                          </Field>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Toggle checked={comments.allowMultipleTeachers}    onChange={val => { setComments(prev => ({ ...prev, allowMultipleTeachers:    val })); markUnsaved(); }} label="Allow Subject-Specific Comments" />
                            <Toggle checked={comments.showClassTeacherComment}  onChange={val => { setComments(prev => ({ ...prev, showClassTeacherComment:  val })); markUnsaved(); }} label="Show Class Instructor Comment" />
                            <Toggle checked={comments.showHeadComment}          onChange={val => { setComments(prev => ({ ...prev, showHeadComment:          val })); markUnsaved(); }} label="Show Commandant's Comment" />
                            <Toggle checked={comments.showSignature}            onChange={val => { setComments(prev => ({ ...prev, showSignature:            val })); markUnsaved(); }} label="Show Signature Lines" />
                          </div>
                        </>
                      )}
                    </div>
                  </SectionCard>

                  <SectionCard icon={Edit3} title="Predefined Comment Templates (Military Focus)">
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {comments.predefinedTemplates.map((t, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input className="flex-1 px-3 py-2 text-sm border rounded-lg" value={t} onChange={e => handleUpdateCommentTemplate(idx, e.target.value)} />
                          <button onClick={() => handleDeleteCommentTemplate(idx)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleAddCommentTemplate} className="mt-3 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center gap-2">
                      <Plus size={14} /> Add New Template
                    </button>
                  </SectionCard>
                </>
              )}

              {/* ── TAB 5: SECTION ORDER ── */}
              {activeTab === "sections" && (
                <SectionCard icon={Layout} title="Report Sections Order" description="Reorder sections for AFTS report layout">
                  <div className="space-y-2">
                    {sortedSections.map((section) => (
                      <div key={section.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="cursor-grab text-gray-400"><GripVertical size={16} /></div>
                        <input type="checkbox" checked={section.visible} onChange={() => handleSectionToggle(section.id)} className="w-4 h-4" />
                        <span className="flex-1 text-sm font-medium text-gray-700">{section.name}</span>
                        <div className="flex gap-1">
                          <button onClick={() => handleSectionOrder(section.id, "up")}   className="p-1 text-gray-400 hover:text-gray-600"><ChevronUp   size={16} /></button>
                          <button onClick={() => handleSectionOrder(section.id, "down")} className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Tip: Sections marked as visible will appear on the report in the order shown above.</p>
                </SectionCard>
              )}
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:w-96 xl:w-[480px] flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-4">
                <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={16} className="text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-700">Live Report Preview (SHS)</h3>
                  </div>
                  <Badge variant="military">AFTS Template</Badge>
                </div>
                <div className="p-3 max-h-[80vh] overflow-y-auto bg-gray-100">
                  <LiveReportPreview
                    settings={{ template, studentInfo, academicInfo, subjectTable, grading, performance, attendance, comments }}
                    sections={sections}
                    student={currentStudent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-200 mt-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShowPreview(true)} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 shadow-md">
              <Eye size={14} /> Full Preview
            </button>
            <button onClick={handleExport} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <Download size={14} /> Export Template
            </button>
            <button onClick={handleReset} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {hasUnsavedChanges && (
              <span className="flex items-center gap-1 text-xs text-yellow-600"><AlertCircle size={12} />Unsaved changes</span>
            )}
            {saved && (
              <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle2 size={12} />Saved ✓</span>
            )}
            <button onClick={handleSave} className="px-6 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md flex items-center gap-2">
              <Save size={14} /> Save AFTS Template
            </button>
          </div>
        </div>

        {/* Full Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-red-600" />
                  <h3 className="text-lg font-semibold">AFTS Report Card Preview</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-1"><Printer size={14} /> Print</button>
                  <button onClick={() => setShowPreview(false)} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
              </div>
              <div className="p-6 bg-gray-100">
                <LiveReportPreview
                  settings={{ template, studentInfo, academicInfo, subjectTable, grading, performance, attendance, comments }}
                  sections={sections}
                  student={currentStudent}
                />
              </div>
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-2">
                <button onClick={() => setShowPreview(false)} className="px-4 py-2 border rounded-lg">Close</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg">Generate PDF Report</button>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard shortcuts hint */}
        <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1"><span className="px-1 py-0.5 bg-gray-200 rounded text-gray-600">Ctrl+S</span> Save Template</span>
          <span className="flex items-center gap-1"><span className="px-1 py-0.5 bg-gray-200 rounded text-gray-600">Ctrl+Z</span> Undo Changes</span>
          <span className="flex items-center gap-1"><Shield size={10} /> AFTS • Excellence Through Discipline</span>
        </div>

      </div>
    </div>
  );
};

export default ReportTemplate;