import React, { useState, useCallback, useMemo } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_COURSES = [
  {
    id: "gen-sci",
    code: "GEN-SCI",
    name: "General Science",
    department: "Science",
    active: true,
    subjects: [
      { id: "bio",          name: "Biology",               type: "elective", active: true  },
      { id: "chem",         name: "Chemistry",             type: "elective", active: true  },
      { id: "phy",          name: "Physics",               type: "elective", active: true  },
      { id: "e-maths",      name: "Elective Mathematics",  type: "elective", active: true  },
      { id: "further-maths",name: "Further Mathematics",   type: "elective", active: false },
      { id: "geo",          name: "Geography",             type: "elective", active: false },
    ],
  },
  {
    id: "gen-arts",
    code: "GEN-ARTS",
    name: "General Arts",
    department: "General Arts",
    active: true,
    subjects: [
      { id: "lit",   name: "Literature in English", type: "elective", active: true  },
      { id: "hist",  name: "History",               type: "elective", active: true  },
      { id: "econ",  name: "Economics",             type: "elective", active: true  },
      { id: "govt",  name: "Government",            type: "elective", active: true  },
      { id: "geo2",  name: "Geography",             type: "elective", active: false },
      { id: "french",name: "French",                type: "elective", active: false },
    ],
  },
  {
    id: "business",
    code: "BUS",
    name: "Business",
    department: "Business",
    active: true,
    subjects: [
      { id: "acct",    name: "Financial Accounting", type: "elective", active: true  },
      { id: "bus-mgt", name: "Business Management",  type: "elective", active: true  },
      { id: "econ2",   name: "Economics",            type: "elective", active: true  },
      { id: "costing", name: "Costing & Pricing",    type: "elective", active: true  },
      { id: "typing",  name: "Typewriting",          type: "elective", active: false },
    ],
  },
  {
    id: "vis-arts",
    code: "VIS-ARTS",
    name: "Visual Arts",
    department: "Visual Arts",
    active: true,
    subjects: [
      { id: "graphic",  name: "Graphic Design",  type: "elective", active: true },
      { id: "ceramics", name: "Ceramics",         type: "elective", active: true },
      { id: "leather",  name: "Leatherwork",      type: "elective", active: true },
      { id: "picture",  name: "Picture Making",   type: "elective", active: true },
    ],
  },
  {
    id: "home-econ",
    code: "HOME-EC",
    name: "Home Economics",
    department: "Home Economics",
    active: true,
    subjects: [
      { id: "food",       name: "Food & Nutrition",      type: "elective", active: true },
      { id: "clothing",   name: "Clothing & Textiles",   type: "elective", active: true },
      { id: "mgt-living", name: "Management in Living",  type: "elective", active: true },
    ],
  },
  {
    id: "agric",
    code: "AGRIC",
    name: "Agriculture",
    department: "Agriculture",
    active: true,
    subjects: [
      { id: "crop",    name: "Crop Science",     type: "elective", active: true },
      { id: "animal",  name: "Animal Husbandry", type: "elective", active: true },
      { id: "agribiz", name: "Agribusiness",     type: "elective", active: true },
    ],
  },
  {
    id: "tech-voc",
    code: "TECH-VOC",
    name: "Technical / Vocational",
    department: "Technical / Vocational",
    active: false,
    subjects: [
      { id: "auto",        name: "Auto Mechanics",       type: "elective", active: true  },
      { id: "electronics", name: "Electronics",          type: "elective", active: true  },
      { id: "building",    name: "Building Construction",type: "elective", active: true  },
      { id: "metalwork",   name: "Metal Work",           type: "elective", active: false },
    ],
  },
  {
    id: "health-sci",
    code: "HEALTH-SCI",
    name: "Health Science",
    department: "Science",
    active: false,
    subjects: [
      { id: "bio2",     name: "Biology",          type: "elective", active: true },
      { id: "chem2",    name: "Chemistry",        type: "elective", active: true },
      { id: "health-ed",name: "Health Education", type: "elective", active: true },
    ],
  },
];

const CORE_SUBJECTS = [
  "English Language",
  "Core Mathematics",
  "Integrated Science",
  "Social Studies",
];

const DEPARTMENTS = [
  "Science", "General Arts", "Business",
  "Visual Arts", "Home Economics",
  "Agriculture", "Technical / Vocational",
];

const TRACK_MODE_OPTIONS = [
  { value: "both",  label: "All courses run on both Track A and Track B" },
  { value: "split", label: "Assign courses to specific tracks manually"  },
  { value: "none",  label: "School does not use the double-track system"  },
];

// ─── Utility Functions ───────────────────────────────────────────────────────

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ─── Shared input class ───────────────────────────────────────────────────────
const inputCls = (error = false) =>
  `w-full h-9 px-3 text-sm rounded-lg border outline-none transition-all duration-150 ${
    error
      ? "border-[var(--accent-red)] bg-red-50 focus:ring-2 focus:ring-[var(--accent-red-light)]"
      : "border-[var(--medium-gray)] bg-[var(--light-gray)] text-[var(--dark-gray)] focus:border-[var(--royal-blue)] focus:ring-2 focus:ring-[var(--royal-blue-light)]/30"
  }`;

// ─── Small reusable pieces ────────────────────────────────────────────────────

const SectionCard = ({ icon, title, badge, children }) => (
  <div className="bg-white rounded-2xl overflow-hidden mb-5"
       style={{ border: "1px solid var(--medium-gray)", boxShadow: "0 1px 4px rgba(14,7,221,0.04)" }}>
    <div className="flex items-center gap-3 px-5 py-3.5"
         style={{ borderBottom: "1px solid var(--medium-gray)", background: "var(--light-gray)" }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
           style={{ background: "var(--medium-gray)" }}>
        {icon}
      </div>
      <span className="text-[11px] font-bold tracking-widest uppercase"
            style={{ color: "var(--royal-blue-dark)" }}>
        {title}
      </span>
      {badge && (
        <span className="ml-auto text-[11px] font-semibold rounded-full px-3 py-0.5"
              style={{ background: "var(--royal-blue)", color: "var(--white)" }}>
          {badge}
        </span>
      )}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Field = ({ label, required, optional, children, error, hint }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-semibold" style={{ color: "var(--dark-gray)" }}>
      {label}
      {required && <span style={{ color: "var(--accent-red)" }} className="ml-0.5">*</span>}
      {optional && <span className="text-[11px] font-normal ml-1" style={{ color: "#888" }}>(optional)</span>}
    </label>
    {children}
    {error && <span className="text-[11px]" style={{ color: "var(--accent-red)" }}>{error}</span>}
    {hint && !error && <span className="text-[11px]" style={{ color: "#888" }}>{hint}</span>}
  </div>
);

const Toggle = ({ checked, onChange, color = "var(--royal-blue)", disabled = false }) => (
  <button
    type="button"
    onClick={() => !disabled && onChange(!checked)}
    className={`relative flex-shrink-0 rounded-full transition-colors duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    style={{ width: 36, height: 20, background: checked ? color : "var(--medium-gray)" }}
    disabled={disabled}
  >
    <span
      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
      style={{ transform: checked ? "translateX(17px)" : "translateX(2px)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
    />
  </button>
);

const CheckIcon = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Alert = ({ type, children }) => {
  const styles = {
    info: { background: "#e8f0fe", border: "1px solid var(--royal-blue-light)", color: "var(--royal-blue-dark)" },
    success: { background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534" },
    warning: { background: "#fefce8", border: "1px solid #fde047", color: "#854d0e" },
  };
  
  return (
    <div className="flex items-start gap-2.5 rounded-xl px-4 py-3 mb-6 text-[12px]" style={styles[type]}>
      <svg className="flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {type === 'success' && <polyline points="9 11 12 14 22 4" />}
        {type === 'info' && <><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></>}
        {type === 'warning' && <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>}
      </svg>
      <span>{children}</span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const ProgramTrackManagement = ({ 
  formData, 
  updateFormData, 
  isPreviewMode = false,
  onValidate,
  onError 
}) => {
  // State Management
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [activeCourseId, setActiveCourseId] = useState("gen-sci");
  const [trackMode, setTrackMode] = useState("both");
  const [trackA, setTrackA] = useState({ "gen-sci": true, "gen-arts": true, "vis-arts": true });
  const [trackB, setTrackB] = useState({ "gen-sci": true, "business": true, "home-econ": true });
  const [subjFilter, setSubjFilter] = useState("all");
  const [newSubjName, setNewSubjName] = useState("");
  const [newSubjType, setNewSubjType] = useState("elective");
  const [customCourseName, setCustomCourseName] = useState("");
  const [courseDetails, setCourseDetails] = useState({
    code: "", name: "", description: "", department: "", status: "Active", minElectives: 3,
  });
  const [admissionFields, setAdmissionFields] = useState({
    maxStudents: "", beceAggregate: "", minPasses: "", notes: "",
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Memoized Values
  const activeCourse = useMemo(() => courses.find(c => c.id === activeCourseId), [courses, activeCourseId]);
  const activeCourseCount = useMemo(() => courses.filter(c => c.active).length, [courses]);
  const activeElectives = useMemo(() => 
    activeCourse?.subjects.filter(s => s.type === "elective" && s.active).length ?? 0, 
    [activeCourse]
  );
  const totalElectives = useMemo(() => 
    activeCourse?.subjects.filter(s => s.type === "elective").length ?? 0, 
    [activeCourse]
  );
  const visibleSubjects = useMemo(() => 
    activeCourse?.subjects.filter(s => subjFilter === "all" ? true : s.type === subjFilter) ?? [],
    [activeCourse, subjFilter]
  );

  // ── Handlers ────────────────────────────────────────────────────────────────

  const toggleCourseActive = useCallback((id) => {
    if (isPreviewMode) return;
    setCourses(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    setIsDirty(true);
  }, [isPreviewMode]);

  const toggleSubject = useCallback((subjId) => {
    if (isPreviewMode) return;
    setCourses(prev => prev.map(c =>
      c.id === activeCourseId
        ? { ...c, subjects: c.subjects.map(s => s.id === subjId ? { ...s, active: !s.active } : s) }
        : c
    ));
    setIsDirty(true);
  }, [activeCourseId, isPreviewMode]);

  const addSubject = useCallback(() => {
    if (!newSubjName.trim() || isPreviewMode) return;
    
    const newSubject = {
      id: `s-${generateId()}`,
      name: newSubjName.trim(),
      type: newSubjType,
      active: true,
    };
    
    setCourses(prev => prev.map(c =>
      c.id === activeCourseId
        ? { ...c, subjects: [...c.subjects, newSubject] }
        : c
    ));
    setNewSubjName("");
    setIsDirty(true);
  }, [newSubjName, newSubjType, activeCourseId, isPreviewMode]);

  const addCustomCourse = useCallback(() => {
    if (!customCourseName.trim() || isPreviewMode) return;
    
    const newCourse = {
      id: `custom-${generateId()}`,
      code: `CUSTOM-${Date.now()}`,
      name: customCourseName.trim(),
      department: "",
      active: true,
      subjects: [],
    };
    
    setCourses(prev => [...prev, newCourse]);
    setCustomCourseName("");
    setIsDirty(true);
  }, [customCourseName, isPreviewMode]);

  const validate = useCallback(() => {
    const newErrors = {};
    
    if (!courseDetails.code.trim()) newErrors.code = "Course code is required";
    if (!courseDetails.name.trim()) newErrors.name = "Course name is required";
    if (!courseDetails.department) newErrors.department = "Department is required";
    
    if (courseDetails.minElectives < 1) newErrors.minElectives = "Minimum 1 elective subject required";
    if (courseDetails.minElectives > totalElectives) newErrors.minElectives = "Cannot exceed total electives available";
    
    setErrors(newErrors);
    
    if (onValidate) onValidate(Object.keys(newErrors).length === 0);
    if (onError && Object.keys(newErrors).length > 0) onError(newErrors);
    
    return Object.keys(newErrors).length === 0;
  }, [courseDetails, totalElectives, onValidate, onError]);

  const handleSave = useCallback(() => {
    if (!validate()) return;
    
    const savedData = { 
      courses, 
      trackMode, 
      trackA, 
      trackB, 
      courseDetails, 
      admissionFields,
      lastUpdated: new Date().toISOString(),
    };
    
    updateFormData?.(savedData);
    setSaved(true);
    setIsDirty(false);
    
    setTimeout(() => setSaved(false), 3000);
  }, [validate, courses, trackMode, trackA, trackB, courseDetails, admissionFields, updateFormData]);

  const handleReset = useCallback(() => {
    if (!window.confirm("Reset all fields? This cannot be undone.")) return;
    
    setCourses(DEFAULT_COURSES);
    setActiveCourseId("gen-sci");
    setTrackMode("both");
    setTrackA({ "gen-sci": true, "gen-arts": true, "vis-arts": true });
    setTrackB({ "gen-sci": true, "business": true, "home-econ": true });
    setCourseDetails({ code: "", name: "", description: "", department: "", status: "Active", minElectives: 3 });
    setAdmissionFields({ maxStudents: "", beceAggregate: "", minPasses: "", notes: "" });
    setErrors({});
    setSaved(false);
    setIsDirty(false);
  }, []);

  const exportData = useCallback(() => {
    const exportData = {
      courses,
      trackMode,
      trackA,
      trackB,
      courseDetails,
      admissionFields,
      exportDate: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `course-management-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [courses, trackMode, trackA, trackB, courseDetails, admissionFields]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen px-4 py-8 md:px-6" style={{ background: "var(--light-gray)" }}>
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: "var(--royal-blue-dark)" }}>
            Course And Track Management
          </h1>
          
        </div>

        {/* ── Info banner ── */}
        <Alert type="info">
          <strong>Core subjects</strong> (English Language, Core Mathematics, Integrated Science, Social Studies)
          are automatically included on every student's report for all courses. Elective subjects are course-specific.
        </Alert>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* SECTION 1 — Course Details                                         */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        <SectionCard
          title="Course Details"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2" strokeLinecap="round">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Field label="Course code" required error={errors.code} hint="Unique identifier for this course">
              <input
                className={inputCls(!!errors.code)}
                value={courseDetails.code}
                onChange={e => { 
                  setCourseDetails(p => ({ ...p, code: e.target.value.toUpperCase() })); 
                  setErrors(p => ({ ...p, code: "" }));
                  setIsDirty(true);
                }}
                placeholder="e.g. GEN-SCI, GEN-ARTS, BUS"
                maxLength={12}
                disabled={isPreviewMode}
              />
            </Field>
            <Field label="Course name" required error={errors.name}>
              <input
                className={inputCls(!!errors.name)}
                value={courseDetails.name}
                onChange={e => { 
                  setCourseDetails(p => ({ ...p, name: e.target.value })); 
                  setErrors(p => ({ ...p, name: "" }));
                  setIsDirty(true);
                }}
                placeholder="e.g. General Science"
                disabled={isPreviewMode}
              />
            </Field>
          </div>

          <div className="mb-4">
            <Field label="Course description" optional>
              <textarea
                className={`${inputCls()} h-auto min-h-[64px] py-2 resize-y`}
                value={courseDetails.description}
                onChange={e => {
                  setCourseDetails(p => ({ ...p, description: e.target.value }));
                  setIsDirty(true);
                }}
                placeholder="Brief overview of this course and what subjects students will study…"
                disabled={isPreviewMode}
                rows={3}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Department" required error={errors.department}>
              <select
                className={inputCls(!!errors.department)}
                value={courseDetails.department}
                onChange={e => { 
                  setCourseDetails(p => ({ ...p, department: e.target.value })); 
                  setErrors(p => ({ ...p, department: "" }));
                  setIsDirty(true);
                }}
                disabled={isPreviewMode}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Status" required>
              <select
                className={inputCls()}
                value={courseDetails.status}
                onChange={e => {
                  setCourseDetails(p => ({ ...p, status: e.target.value }));
                  setIsDirty(true);
                }}
                disabled={isPreviewMode}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending review</option>
              </select>
            </Field>
            <Field 
              label="No. of elective subjects" 
              required 
              error={errors.minElectives}
              hint={`Maximum available: ${totalElectives}`}
            >
              <input
                type="number" 
                min={1} 
                max={totalElectives}
                className={inputCls(!!errors.minElectives)}
                value={courseDetails.minElectives}
                onChange={e => {
                  setCourseDetails(p => ({ ...p, minElectives: parseInt(e.target.value) || 1 }));
                  setIsDirty(true);
                }}
                disabled={isPreviewMode}
              />
            </Field>
          </div>
        </SectionCard>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* SECTION 2 — Courses Offered                                        */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        <SectionCard
          title="Courses Offered by This School"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success-dark)" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          }
          badge={`${activeCourseCount} active`}
        >
          <p className="text-[12px] mb-4" style={{ color: "#9ca3af" }}>
            Select all courses your school offers. Each active course will appear as a student classification at enrolment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 mb-4">
            {courses.map(course => (
              <button
                key={course.id}
                type="button"
                onClick={() => toggleCourseActive(course.id)}
                className="relative text-left p-3 rounded-xl transition-all duration-150 hover:shadow-md"
                style={{
                  border: course.active ? "2px solid var(--royal-blue)" : "1.5px solid var(--medium-gray)",
                  background: course.active ? "#e8f0fe" : "var(--white)",
                  cursor: isPreviewMode ? "default" : "pointer",
                  opacity: isPreviewMode ? 0.7 : 1,
                }}
                disabled={isPreviewMode}
              >
                <span
                  className="absolute top-2.5 right-2.5 text-[9px] font-bold rounded-full px-1.5 py-0.5"
                  style={{
                    background: course.active ? "var(--royal-blue)" : "var(--medium-gray)",
                    color: course.active ? "var(--white)" : "#6b7280",
                  }}
                >
                  {course.subjects.length} subj
                </span>

                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center mb-2 transition-colors"
                  style={{
                    background: course.active ? "var(--royal-blue)" : "transparent",
                    borderColor: course.active ? "var(--royal-blue)" : "var(--medium-gray)",
                    color: "var(--white)",
                  }}
                >
                  {course.active && <CheckIcon />}
                </div>

                <p
                  className="text-[13px] font-semibold leading-tight mb-1"
                  style={{ color: course.active ? "var(--royal-blue-dark)" : "var(--dark-gray)" }}
                >
                  {course.name}
                </p>
                <p className="text-[11px] leading-snug line-clamp-2" style={{ color: "#9ca3af" }}>
                  {course.subjects.filter(s => s.active).slice(0, 3).map(s => s.name).join(" · ") || "No subjects yet"}
                  {course.subjects.filter(s => s.active).length > 3 && " …"}
                </p>
              </button>
            ))}
          </div>

          {!isPreviewMode && (
            <div className="flex gap-2 items-center">
              <input
                className={`${inputCls()} flex-1`}
                placeholder="Add a custom course name…"
                value={customCourseName}
                onChange={e => setCustomCourseName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addCustomCourse()}
              />
              <button
                type="button"
                onClick={addCustomCourse}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm font-medium transition-all active:scale-95 whitespace-nowrap hover:bg-gray-50"
                style={{ border: "1px solid var(--royal-blue)", color: "var(--royal-blue)", background: "var(--white)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add course
              </button>
            </div>
          )}
        </SectionCard>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* SECTION 3 — Subjects per Course                                    */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        <SectionCard
          title="Subjects per Course"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          }
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <label className="text-[12px] font-semibold whitespace-nowrap" style={{ color: "var(--dark-gray)" }}>
              Editing subjects for:
            </label>
            <select
              className="h-9 px-3 text-sm rounded-lg outline-none"
              style={{ border: "1px solid var(--medium-gray)", background: "var(--light-gray)", color: "var(--dark-gray)" }}
              value={activeCourseId}
              onChange={e => { 
                setActiveCourseId(e.target.value); 
                setSubjFilter("all");
              }}
              disabled={isPreviewMode}
            >
              {courses.filter(c => c.active).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="flex gap-1 ml-auto">
              {["all", "elective"].map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSubjFilter(f)}
                  className="text-[11px] font-semibold px-3 py-1 rounded-full border transition-colors capitalize"
                  style={
                    subjFilter === f
                      ? { background: "var(--royal-blue)", color: "var(--white)", border: "1px solid var(--royal-blue)" }
                      : { background: "var(--white)", color: "var(--dark-gray)", border: "1px solid var(--medium-gray)" }
                  }
                >
                  {f === "all" ? "All Subjects" : "Elective Only"}
                </button>
              ))}
            </div>
          </div>

          <Alert type="success">
            Core subjects are fixed for all courses:{" "}
            <strong>{CORE_SUBJECTS.join(", ")}.</strong>
          </Alert>

          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--medium-gray)" }}>
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ background: "var(--light-gray)", borderBottom: "1px solid var(--medium-gray)" }}
            >
              <span className="text-[12px] font-semibold" style={{ color: "var(--dark-gray)" }}>
                {activeCourse?.name} — subject list
              </span>
              <span className="text-[11px] font-semibold" style={{ color: "#9ca3af" }}>
                4 core · {activeElectives} / {totalElectives} elective active
              </span>
            </div>

            {subjFilter === "all" && (
              <div
                className="px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-2"
                style={{ borderBottom: "1px solid var(--medium-gray)" }}
              >
                {CORE_SUBJECTS.map(name => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-default"
                    style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--success)" }} />
                    <span className="text-[11px] font-medium truncate" style={{ color: "#166534" }}>{name}</span>
                    <span
                      className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ background: "#dcfce7", color: "#166534" }}
                    >CORE</span>
                  </div>
                ))}
              </div>
            )}

            <div className="px-4 py-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {visibleSubjects.filter(s => s.type === "elective").map(subj => (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => toggleSubject(subj.id)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all duration-120 hover:shadow-sm"
                  style={{
                    background: subj.active ? "#e8f0fe" : "var(--light-gray)",
                    border: subj.active ? "1px solid var(--royal-blue-light)" : "1px solid var(--medium-gray)",
                    cursor: isPreviewMode ? "default" : "pointer",
                    opacity: isPreviewMode ? 0.7 : 1,
                  }}
                  disabled={isPreviewMode}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: subj.active ? "var(--royal-blue)" : "var(--medium-gray)" }}
                  />
                  <span
                    className="text-[12px] font-medium truncate"
                    style={{ color: subj.active ? "var(--royal-blue-dark)" : "#6b7280" }}
                  >
                    {subj.name}
                  </span>
                  <span
                    className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ background: "#fef3c7", color: "#92400e" }}
                  >ELECT</span>
                </button>
              ))}
            </div>

            {!isPreviewMode && (
              <div
                className="flex gap-2 px-4 py-3"
                style={{ borderTop: "1px solid var(--medium-gray)", background: "var(--light-gray)" }}
              >
                <input
                  className="flex-1 h-9 px-3 text-sm rounded-lg outline-none"
                  style={{ border: "1px solid var(--medium-gray)", background: "var(--white)", color: "var(--dark-gray)" }}
                  placeholder="Add a subject to this course…"
                  value={newSubjName}
                  onChange={e => setNewSubjName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addSubject()}
                />
                <select
                  className="h-9 px-3 text-sm rounded-lg outline-none"
                  style={{ border: "1px solid var(--medium-gray)", background: "var(--white)", color: "var(--dark-gray)" }}
                  value={newSubjType}
                  onChange={e => setNewSubjType(e.target.value)}
                >
                  <option value="elective">Elective</option>
                  <option value="core">Core</option>
                </select>
                <button
                  type="button"
                  onClick={addSubject}
                  className="h-9 px-4 rounded-lg text-sm font-medium transition-all active:scale-95 hover:bg-gray-50"
                  style={{ border: "1px solid var(--royal-blue)", color: "var(--royal-blue)", background: "var(--white)" }}
                >
                  Add Subject
                </button>
              </div>
            )}
          </div>
        </SectionCard>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* SECTION 4 — Track Assignment                                       */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        <SectionCard
          title="Track Assignment (Double-Track System)"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="2" strokeLinecap="round">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          }
        >
          <div className="mb-5">
            <Field label="Track assignment mode" required>
              <select
                className={inputCls()}
                value={trackMode}
                onChange={e => {
                  setTrackMode(e.target.value);
                  setIsDirty(true);
                }}
                disabled={isPreviewMode}
              >
                {TRACK_MODE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
          </div>

          {trackMode === "both" && (
            <Alert type="info">
              All active courses will be available to both Track A and Track B students.
              Switch to manual assignment if your school splits courses by track.
            </Alert>
          )}

          {trackMode === "none" && (
            <Alert type="warning">
              Double-track system is disabled. All students share the same term calendar.
            </Alert>
          )}

          {trackMode === "split" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={{ border: "2px solid var(--royal-blue-light)", background: "#f0f4ff" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: "var(--royal-blue)" }} />
                  <span className="text-[13px] font-bold" style={{ color: "var(--royal-blue-dark)" }}>Track A — courses</span>
                </div>
                {courses.filter(c => c.active).map(c => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: "1px solid var(--medium-gray)" }}
                  >
                    <span className="text-[12px]" style={{ color: "var(--dark-gray)" }}>{c.name}</span>
                    <Toggle 
                      checked={!!trackA[c.id]} 
                      onChange={v => {
                        setTrackA(p => ({ ...p, [c.id]: v }));
                        setIsDirty(true);
                      }} 
                      color="var(--royal-blue)"
                      disabled={isPreviewMode}
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4" style={{ border: "2px solid var(--accent-red-light)", background: "#fff0f0" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: "var(--accent-red)" }} />
                  <span className="text-[13px] font-bold" style={{ color: "var(--accent-red-dark)" }}>Track B — courses</span>
                </div>
                {courses.filter(c => c.active).map(c => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: "1px solid var(--medium-gray)" }}
                  >
                    <span className="text-[12px]" style={{ color: "var(--dark-gray)" }}>{c.name}</span>
                    <Toggle 
                      checked={!!trackB[c.id]} 
                      onChange={v => {
                        setTrackB(p => ({ ...p, [c.id]: v }));
                        setIsDirty(true);
                      }} 
                      color="var(--accent-red)"
                      disabled={isPreviewMode}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* SECTION 5 — Admission & Capacity                                   */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        <SectionCard
          title="Course Admission & Capacity"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="11" width="13" height="10" rx="2" />
              <path d="M5 21V7a2 2 0 012-2h1" /><path d="M9 3H7a2 2 0 00-2 2v4" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Field label="Max students per course" optional hint="Leave empty for no limit">
              <input 
                type="number" 
                min={1} 
                className={inputCls()}
                placeholder="e.g. 120"
                value={admissionFields.maxStudents}
                onChange={e => {
                  setAdmissionFields(p => ({ ...p, maxStudents: e.target.value }));
                  setIsDirty(true);
                }}
                disabled={isPreviewMode}
              />
            </Field>
            <Field label="BECE aggregate cutoff" optional hint="Minimum aggregate required (6-54)">
              <input 
                type="number" 
                min={6} 
                max={54} 
                className={inputCls()}
                placeholder="e.g. 24"
                value={admissionFields.beceAggregate}
                onChange={e => {
                  setAdmissionFields(p => ({ ...p, beceAggregate: e.target.value }));
                  setIsDirty(true);
                }}
                disabled={isPreviewMode}
              />
            </Field>
            <Field label="Min. BECE passes required" optional hint="Number of subjects (1-9)">
              <input 
                type="number" 
                min={1} 
                max={9} 
                className={inputCls()}
                placeholder="e.g. 6"
                value={admissionFields.minPasses}
                onChange={e => {
                  setAdmissionFields(p => ({ ...p, minPasses: e.target.value }));
                  setIsDirty(true);
                }}
                disabled={isPreviewMode}
              />
            </Field>
          </div>
          <div style={{ borderTop: "1px solid var(--medium-gray)", paddingTop: 16 }}>
            <Field label="Admission notes" optional>
              <textarea
                className={`${inputCls()} h-auto min-h-[64px] py-2 resize-y`}
                placeholder="e.g. General Science requires at least B3 in BECE Maths and Science…"
                value={admissionFields.notes}
                onChange={e => {
                  setAdmissionFields(p => ({ ...p, notes: e.target.value }));
                  setIsDirty(true);
                }}
                disabled={isPreviewMode}
                rows={3}
              />
            </Field>
          </div>
        </SectionCard>

        {/* ── Action bar ── */}
        {!isPreviewMode && (
          <div className="flex items-center justify-end gap-3 pt-1">
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: "var(--success-dark)" }}>
                <CheckIcon size={12} /> Saved successfully
              </span>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="text-[13px] px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ color: "#9ca3af" }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={exportData}
              className="text-[13px] px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ color: "var(--royal-blue)" }}
            >
              Export Data
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95 hover:shadow-md"
              style={{ background: "var(--royal-blue)", color: "var(--white)", border: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Changes
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProgramTrackManagement;