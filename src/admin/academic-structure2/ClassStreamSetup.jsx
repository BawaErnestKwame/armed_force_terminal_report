import React, { useState, useCallback, useMemo } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

const FORM_LEVELS = ["Form 1", "Form 2", "Form 3"];

const STREAM_TYPES = [
  "Science", "Arts", "Business", 
  "Visual Arts", "Home Economics", 
  "Agriculture", "General", "Technical"
];

const TRACK_OPTIONS = ["Track A", "Track B", "Both", "None"];

const RESIDENTIAL_STATUS = [
  { value: "day", label: "Day Student" },
  { value: "boarding", label: "Boarding" },
  { value: "mixed", label: "Mixed (Day & Boarding)" }
];

const CLASS_STATUS = ["Active", "Inactive", "Archived", "Pending"];

const PROMOTION_RULES = [
  "Automatic", "Exam-based", "Continuous Assessment", "Cumulative GPA"
];

const GENDER_OPTIONS = ["Mixed", "Boys Only", "Girls Only"];

const PERIOD_DURATIONS = ["45 min", "50 min", "60 min", "90 min"];

const LANGUAGE_MEDIUM = ["English", "French", "Bilingual"];

const CORE_SUBJECTS = [
  "English Language", "Core Mathematics", "Integrated Science", "Social Studies"
];

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls = (error = false) =>
  `w-full px-3 py-2 text-sm rounded-lg border outline-none transition-all duration-150 ${
    error
      ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
      : "border-gray-300 bg-gray-50 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  }`;

// ─── Reusable Components ──────────────────────────────────────────────────────

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-white rounded-xl overflow-hidden mb-6 border border-gray-200 shadow-sm">
    <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200 bg-gray-50">
      <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-gray-200">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Field = ({ label, required, optional, children, error, hint }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
      {optional && <span className="text-xs font-normal ml-1 text-gray-400">(optional)</span>}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
    {hint && !error && <span className="text-xs text-gray-400">{hint}</span>}
  </div>
);

const Toggle = ({ checked, onChange, label }) => (
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
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const ClassStreamSetup = () => {
  // Section 1: Class Identification
  const [classIdentity, setClassIdentity] = useState({
    className: "",
    classCode: "",
    academicYear: "2024/2025",
    formLevel: "Form 1",
    streamName: "",
    classShortName: "",
  });

  // Section 2: Programme & Track Linkage
  const [programmeLink, setProgrammeLink] = useState({
    linkedProgramme: "",
    trackAssignment: "Both",
    trackAStatus: true,
    trackBStatus: true,
    alternativeTrack: "None",
  });

  // Section 3: Capacity & Enrollment
  const [capacity, setCapacity] = useState({
    maxCapacity: 40,
    minCapacity: 15,
    currentEnrollment: 28,
    waitlistCapacity: 5,
    genderRestriction: "Mixed",
  });

  // Section 4: Residential Status
  const [residential, setResidential] = useState({
    type: "mixed",
    boardingHouse: "",
    dayLimit: 40,
    boardingLimit: 40,
  });

  // Section 5: Teacher Assignment
  const [teacherAssignment, setTeacherAssignment] = useState({
    classTeacher: "",
    assistantTeachers: [],
    hod: "",
    formSupervisor: "",
    assignmentDate: "",
  });

  // Section 6: Schedule & Timetable
  const [schedule, setSchedule] = useState({
    morningStart: "07:30",
    morningEnd: "12:30",
    afternoonStart: "13:30",
    afternoonEnd: "16:30",
    periodsPerDay: 7,
    periodDuration: "45 min",
  });

  // Section 7: Subject Offerings
  const [subjects, setSubjects] = useState({
    coreSubjects: CORE_SUBJECTS,
    electiveSubjects: [],
    minElectives: 3,
    maxElectives: 5,
    compulsorySubjects: [],
  });

  // Section 8: Academic Rules
  const [academicRules, setAcademicRules] = useState({
    promotionRule: "Exam-based",
    passingAggregate: 30,
    maxAbsences: 20,
    retentionPolicy: "Repeat",
    repeatLimit: 1,
  });

  // Section 9: Facilities & Resources
  const [facilities, setFacilities] = useState({
    classroom: "",
    building: "",
    floor: "",
    hasLaboratory: false,
    hasWorkshop: false,
    hasICT: false,
    isSmartClassroom: false,
  });

  // Section 10: Additional Info
  const [additionalInfo, setAdditionalInfo] = useState({
    classStatus: "Active",
    academicTerm: ["Term 1", "Term 2", "Term 3"],
    languageMedium: "English",
    specialNeedsSupport: false,
    extracurricularDays: [],
    notes: "",
  });

  // UI State
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);

  // Computed Values
  const availableSlots = capacity.maxCapacity - capacity.currentEnrollment;
  const enrollmentPercentage = (capacity.currentEnrollment / capacity.maxCapacity) * 100;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleInputChange = (section, field, value) => {
    const setters = {
      identity: setClassIdentity,
      programme: setProgrammeLink,
      capacity: setCapacity,
      residential: setResidential,
      teacher: setTeacherAssignment,
      schedule: setSchedule,
      subjects: setSubjects,
      academic: setAcademicRules,
      facilities: setFacilities,
      additional: setAdditionalInfo,
    };
    
    const setter = setters[section];
    if (setter) {
      setter(prev => ({ ...prev, [field]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!classIdentity.className) newErrors.className = "Class name is required";
    if (!classIdentity.classCode) newErrors.classCode = "Class code is required";
    if (!classIdentity.formLevel) newErrors.formLevel = "Form level is required";
    if (!teacherAssignment.classTeacher) newErrors.classTeacher = "Class teacher is required";
    if (capacity.maxCapacity < capacity.currentEnrollment) {
      newErrors.capacity = "Current enrollment cannot exceed maximum capacity";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const classData = {
      ...classIdentity,
      ...programmeLink,
      ...capacity,
      ...residential,
      ...teacherAssignment,
      ...schedule,
      ...subjects,
      ...academicRules,
      ...facilities,
      ...additionalInfo,
      createdAt: new Date().toISOString(),
    };
    console.log("Saving class data:", classData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleBulkCreate = () => {
    setShowBulkModal(true);
  };

  const handleAutoPromote = () => {
    if (window.confirm("This will promote all students to the next form. Continue?")) {
      console.log("Auto-promoting students...");
      // Logic to promote students
    }
  };

  const handleCopyFromPrevious = () => {
    console.log("Copying from previous year...");
  };

  const handleGenerateTimetable = () => {
    console.log("Generating timetable...");
  };

  const handleExportClasses = () => {
    const exportData = {
      classes: [classIdentity],
      timestamp: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `classes-${classIdentity.academicYear}.json`);
    link.click();
  };

  const handleReset = () => {
    if (window.confirm("Reset all fields? This cannot be undone.")) {
      window.location.reload();
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 mb-3 bg-blue-600 text-white">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Form 12 — Academic Structure
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Class & Stream Setup</h1>
              <p className="text-gray-600">Define classes, assign teachers, set capacity, and configure academic rules</p>
            </div>
            
            {/* Status Badges */}
            <div className="flex gap-2">
              <Badge variant="info">{classIdentity.classStatus}</Badge>
              <Badge variant="success">{availableSlots} slots available</Badge>
            </div>
          </div>
        </div>

        {/* Enrollment Progress Bar */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Enrollment Status</span>
            <span className="text-gray-600">{capacity.currentEnrollment} / {capacity.maxCapacity} students</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${enrollmentPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2 text-gray-500">
            <span>Min: {capacity.minCapacity}</span>
            <span>Waitlist: {capacity.waitlistCapacity}</span>
            <span>Available: {availableSlots}</span>
          </div>
        </div>

        {/* Section 1: Class Identification */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          } 
          title="Class Identification"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Class Name" required error={errors.className}>
              <input
                className={inputCls(!!errors.className)}
                value={classIdentity.className}
                onChange={e => handleInputChange('identity', 'className', e.target.value)}
                placeholder="e.g., Form 2 Science A"
              />
            </Field>
            <Field label="Class Code" required error={errors.classCode}>
              <input
                className={inputCls(!!errors.classCode)}
                value={classIdentity.classCode}
                onChange={e => handleInputChange('identity', 'classCode', e.target.value.toUpperCase())}
                placeholder="e.g., F2-SCI-A"
              />
            </Field>
            <Field label="Academic Year" required>
              <select
                className={inputCls()}
                value={classIdentity.academicYear}
                onChange={e => handleInputChange('identity', 'academicYear', e.target.value)}
              >
                <option>2023/2024</option>
                <option>2024/2025</option>
                <option>2025/2026</option>
              </select>
            </Field>
            <Field label="Form Level" required>
              <select
                className={inputCls()}
                value={classIdentity.formLevel}
                onChange={e => handleInputChange('identity', 'formLevel', e.target.value)}
              >
                {FORM_LEVELS.map(level => <option key={level}>{level}</option>)}
              </select>
            </Field>
            <Field label="Stream Name" required>
              <select
                className={inputCls()}
                value={classIdentity.streamName}
                onChange={e => handleInputChange('identity', 'streamName', e.target.value)}
              >
                <option value="">Select stream</option>
                {STREAM_TYPES.map(stream => <option key={stream}>{stream}</option>)}
              </select>
            </Field>
            <Field label="Class Short Name" optional hint="For reports and dropdowns">
              <input
                className={inputCls()}
                value={classIdentity.classShortName}
                onChange={e => handleInputChange('identity', 'classShortName', e.target.value)}
                placeholder="e.g., 2SciA"
              />
            </Field>
          </div>
        </SectionCard>

        {/* Section 2: Programme & Track Linkage */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          } 
          title="Programme & Track Linkage"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Linked Programme" required>
              <select
                className={inputCls()}
                value={programmeLink.linkedProgramme}
                onChange={e => handleInputChange('programme', 'linkedProgramme', e.target.value)}
              >
                <option value="">Select programme</option>
                <option>General Science</option>
                <option>General Arts</option>
                <option>Business</option>
                <option>Visual Arts</option>
                <option>Home Economics</option>
                <option>Agriculture</option>
              </select>
            </Field>
            <Field label="Track Assignment" required>
              <select
                className={inputCls()}
                value={programmeLink.trackAssignment}
                onChange={e => handleInputChange('programme', 'trackAssignment', e.target.value)}
              >
                {TRACK_OPTIONS.map(track => <option key={track}>{track}</option>)}
              </select>
            </Field>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Toggle 
                  checked={programmeLink.trackAStatus}
                  onChange={val => handleInputChange('programme', 'trackAStatus', val)}
                />
                <span className="text-sm">Track A Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Toggle 
                  checked={programmeLink.trackBStatus}
                  onChange={val => handleInputChange('programme', 'trackBStatus', val)}
                />
                <span className="text-sm">Track B Available</span>
              </div>
            </div>
            <Field label="Alternative Track" optional>
              <select
                className={inputCls()}
                value={programmeLink.alternativeTrack}
                onChange={e => handleInputChange('programme', 'alternativeTrack', e.target.value)}
              >
                <option>None</option>
                <option>Can switch to Track A</option>
                <option>Can switch to Track B</option>
                <option>Flexible switching</option>
              </select>
            </Field>
          </div>
        </SectionCard>

        {/* Section 3: Capacity & Enrollment */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          } 
          title="Capacity & Enrollment"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Maximum Capacity" required>
              <input
                type="number"
                className={inputCls()}
                value={capacity.maxCapacity}
                onChange={e => handleInputChange('capacity', 'maxCapacity', parseInt(e.target.value))}
                min={1}
              />
            </Field>
            <Field label="Minimum Capacity" optional>
              <input
                type="number"
                className={inputCls()}
                value={capacity.minCapacity}
                onChange={e => handleInputChange('capacity', 'minCapacity', parseInt(e.target.value))}
                min={1}
              />
            </Field>
            <Field label="Waitlist Capacity" optional>
              <input
                type="number"
                className={inputCls()}
                value={capacity.waitlistCapacity}
                onChange={e => handleInputChange('capacity', 'waitlistCapacity', parseInt(e.target.value))}
              />
            </Field>
            <Field label="Gender Restriction">
              <select
                className={inputCls()}
                value={capacity.genderRestriction}
                onChange={e => handleInputChange('capacity', 'genderRestriction', e.target.value)}
              >
                {GENDER_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </Field>
          </div>
        </SectionCard>

        {/* Section 4: Residential Status */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          } 
          title="Residential Status"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Residential Type" required>
              <select
                className={inputCls()}
                value={residential.type}
                onChange={e => handleInputChange('residential', 'type', e.target.value)}
              >
                {RESIDENTIAL_STATUS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </Field>
            <Field label="Boarding House" optional>
              <select className={inputCls()} value={residential.boardingHouse} onChange={e => handleInputChange('residential', 'boardingHouse', e.target.value)}>
                <option value="">Select boarding house</option>
                <option>House 1 (North Wing)</option>
                <option>House 2 (South Wing)</option>
                <option>House 3 (East Wing)</option>
              </select>
            </Field>
            <Field label="Day Student Limit">
              <input type="number" className={inputCls()} value={residential.dayLimit} onChange={e => handleInputChange('residential', 'dayLimit', parseInt(e.target.value))} />
            </Field>
            <Field label="Boarding Student Limit">
              <input type="number" className={inputCls()} value={residential.boardingLimit} onChange={e => handleInputChange('residential', 'boardingLimit', parseInt(e.target.value))} />
            </Field>
          </div>
        </SectionCard>

        {/* Section 5: Teacher Assignment */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          } 
          title="Teacher Assignment"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Class Teacher" required error={errors.classTeacher}>
              <select className={inputCls(!!errors.classTeacher)} value={teacherAssignment.classTeacher} onChange={e => handleInputChange('teacher', 'classTeacher', e.target.value)}>
                <option value="">Select teacher</option>
                <option>Mr. John Doe</option>
                <option>Mrs. Jane Smith</option>
                <option>Dr. James Wilson</option>
              </select>
            </Field>
            <Field label="Assistant Teacher(s)" optional>
              <select multiple className={`${inputCls()} h-20`} value={teacherAssignment.assistantTeachers} onChange={e => handleInputChange('teacher', 'assistantTeachers', Array.from(e.target.selectedOptions, opt => opt.value))}>
                <option>Ms. Sarah Johnson</option>
                <option>Mr. Michael Brown</option>
                <option>Mrs. Patricia Lee</option>
              </select>
            </Field>
            <Field label="Head of Department">
              <select className={inputCls()} value={teacherAssignment.hod} onChange={e => handleInputChange('teacher', 'hod', e.target.value)}>
                <option value="">Select HOD</option>
                <option>Dr. Robert Taylor</option>
                <option>Prof. Mary Anderson</option>
              </select>
            </Field>
            <Field label="Form Supervisor">
              <select className={inputCls()} value={teacherAssignment.formSupervisor} onChange={e => handleInputChange('teacher', 'formSupervisor', e.target.value)}>
                <option value="">Select supervisor</option>
                <option>Mr. David Clark</option>
                <option>Mrs. Lisa White</option>
              </select>
            </Field>
          </div>
        </SectionCard>

        {/* Section 6: Schedule & Timetable */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          } 
          title="Schedule & Timetable"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Morning Session Start">
              <input type="time" className={inputCls()} value={schedule.morningStart} onChange={e => handleInputChange('schedule', 'morningStart', e.target.value)} />
            </Field>
            <Field label="Morning Session End">
              <input type="time" className={inputCls()} value={schedule.morningEnd} onChange={e => handleInputChange('schedule', 'morningEnd', e.target.value)} />
            </Field>
            <Field label="Periods per Day">
              <input type="number" className={inputCls()} value={schedule.periodsPerDay} onChange={e => handleInputChange('schedule', 'periodsPerDay', parseInt(e.target.value))} min={4} max={9} />
            </Field>
            <Field label="Period Duration">
              <select className={inputCls()} value={schedule.periodDuration} onChange={e => handleInputChange('schedule', 'periodDuration', e.target.value)}>
                {PERIOD_DURATIONS.map(dur => <option key={dur}>{dur}</option>)}
              </select>
            </Field>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleGenerateTimetable} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Generate Timetable
            </button>
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              View Weekly Schedule
            </button>
          </div>
        </SectionCard>

        {/* Section 7: Subject Offerings */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
          } 
          title="Subject Offerings"
        >
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Core Subjects</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {CORE_SUBJECTS.map(subj => (
                <div key={subj} className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-sm">{subj}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Minimum Electives" required>
              <input type="number" className={inputCls()} value={subjects.minElectives} onChange={e => handleInputChange('subjects', 'minElectives', parseInt(e.target.value))} min={1} max={8} />
            </Field>
            <Field label="Maximum Electives" required>
              <input type="number" className={inputCls()} value={subjects.maxElectives} onChange={e => handleInputChange('subjects', 'maxElectives', parseInt(e.target.value))} min={1} max={8} />
            </Field>
          </div>
        </SectionCard>

        {/* Section 8: Academic Rules */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          } 
          title="Academic Rules"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Promotion Rule" required>
              <select className={inputCls()} value={academicRules.promotionRule} onChange={e => handleInputChange('academic', 'promotionRule', e.target.value)}>
                {PROMOTION_RULES.map(rule => <option key={rule}>{rule}</option>)}
              </select>
            </Field>
            <Field label="Passing Aggregate" required>
              <input type="number" className={inputCls()} value={academicRules.passingAggregate} onChange={e => handleInputChange('academic', 'passingAggregate', parseInt(e.target.value))} min={6} max={54} />
            </Field>
            <Field label="Maximum Absences (days)">
              <input type="number" className={inputCls()} value={academicRules.maxAbsences} onChange={e => handleInputChange('academic', 'maxAbsences', parseInt(e.target.value))} />
            </Field>
            <Field label="Retention Policy">
              <select className={inputCls()} value={academicRules.retentionPolicy} onChange={e => handleInputChange('academic', 'retentionPolicy', e.target.value)}>
                <option>Repeat</option>
                <option>Summer school</option>
                <option>Conditional promotion</option>
                <option>Probation</option>
              </select>
            </Field>
          </div>
        </SectionCard>

        {/* Section 9: Facilities & Resources */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          } 
          title="Facilities & Resources"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Assigned Classroom" required>
              <select className={inputCls()} value={facilities.classroom} onChange={e => handleInputChange('facilities', 'classroom', e.target.value)}>
                <option value="">Select classroom</option>
                <option>Room A101</option>
                <option>Room B202</option>
                <option>Science Lab 1</option>
              </select>
            </Field>
            <Field label="Building/Block">
              <input className={inputCls()} value={facilities.building} onChange={e => handleInputChange('facilities', 'building', e.target.value)} placeholder="e.g., Science Block" />
            </Field>
            <div className="col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={facilities.hasLaboratory} onChange={e => handleInputChange('facilities', 'hasLaboratory', e.target.checked)} />
                  <span className="text-sm">Has Laboratory</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={facilities.hasWorkshop} onChange={e => handleInputChange('facilities', 'hasWorkshop', e.target.checked)} />
                  <span className="text-sm">Has Workshop</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={facilities.hasICT} onChange={e => handleInputChange('facilities', 'hasICT', e.target.checked)} />
                  <span className="text-sm">ICT Lab</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={facilities.isSmartClassroom} onChange={e => handleInputChange('facilities', 'isSmartClassroom', e.target.checked)} />
                  <span className="text-sm">Smart Classroom</span>
                </label>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 10: Additional Info */}
        <SectionCard 
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          } 
          title="Additional Information"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Class Status" required>
              <select className={inputCls()} value={additionalInfo.classStatus} onChange={e => handleInputChange('additional', 'classStatus', e.target.value)}>
                {CLASS_STATUS.map(status => <option key={status}>{status}</option>)}
              </select>
            </Field>
            <Field label="Language Medium">
              <select className={inputCls()} value={additionalInfo.languageMedium} onChange={e => handleInputChange('additional', 'languageMedium', e.target.value)}>
                {LANGUAGE_MEDIUM.map(lang => <option key={lang}>{lang}</option>)}
              </select>
            </Field>
            <label className="flex items-center gap-2 col-span-2">
              <input type="checkbox" checked={additionalInfo.specialNeedsSupport} onChange={e => handleInputChange('additional', 'specialNeedsSupport', e.target.checked)} />
              <span className="text-sm">Special Needs Support Available</span>
            </label>
            <Field label="Notes" optional className="col-span-2">
              <textarea rows={3} className={inputCls()} value={additionalInfo.notes} onChange={e => handleInputChange('additional', 'notes', e.target.value)} placeholder="Any additional information about this class..." />
            </Field>
          </div>
        </SectionCard>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-gray-200">
          <div className="flex gap-2">
            <button onClick={handleBulkCreate} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              Bulk Create
            </button>
            <button onClick={handleAutoPromote} className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 21 6 15" />
                <polyline points="18 9 12 3 6 9" />
              </svg>
              Auto-Promote
            </button>
            <button onClick={handleCopyFromPrevious} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy from Previous
            </button>
            <button onClick={handleExportClasses} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>
          </div>
          
          <div className="flex gap-2">
            {saved && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Saved successfully
              </span>
            )}
            <button onClick={handleReset} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
              Reset
            </button>
            <button onClick={handleSave} className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Class
            </button>
          </div>
        </div>

        {/* Bulk Create Modal (Simplified) */}
        {showBulkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Bulk Create Classes</h3>
              <div className="space-y-4">
                <Field label="Form Levels">
                  <select multiple className={`${inputCls()} h-24`}>
                    <option>Form 1</option>
                    <option>Form 2</option>
                    <option>Form 3</option>
                  </select>
                </Field>
                <Field label="Streams">
                  <select multiple className={`${inputCls()} h-24`}>
                    {STREAM_TYPES.map(stream => <option key={stream}>{stream}</option>)}
                  </select>
                </Field>
                <Field label="Tracks">
                  <select multiple className={`${inputCls()} h-20`}>
                    <option>Track A</option>
                    <option>Track B</option>
                  </select>
                </Field>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setShowBulkModal(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Generate Classes</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ClassStreamSetup