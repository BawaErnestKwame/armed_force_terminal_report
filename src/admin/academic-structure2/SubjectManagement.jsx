import React, { useState, useCallback, useMemo } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const CORE_SUBJECTS_FIXED = [
  { id: "eng", code: "ENG", name: "English Language", mandatory: true, minCredit: 4, maxCredit: 6, department: "English" },
  { id: "math-core", code: "MATH-CORE", name: "Core Mathematics", mandatory: true, minCredit: 4, maxCredit: 6, department: "Mathematics" },
  { id: "sci-int", code: "SCI-INT", name: "Integrated Science", mandatory: true, minCredit: 4, maxCredit: 6, department: "Science" },
  { id: "soc-st", code: "SOC-ST", name: "Social Studies", mandatory: true, minCredit: 3, maxCredit: 5, department: "Social Studies" },
];

const ADDITIONAL_CORE_SUBJECTS = [
  { id: "pe", code: "PE", name: "Physical Education", mandatory: false, minCredit: 1, maxCredit: 2, department: "Physical Education" },
  { id: "ict-core", code: "ICT-CORE", name: "Core ICT", mandatory: false, minCredit: 2, maxCredit: 3, department: "ICT" },
  { id: "french", code: "FRENCH", name: "French", mandatory: false, minCredit: 2, maxCredit: 4, department: "Languages" },
  { id: "gh-hist", code: "GH-HIST", name: "Ghanaian History", mandatory: false, minCredit: 2, maxCredit: 3, department: "Social Studies" },
  { id: "cit-ed", code: "CIT-ED", name: "Citizenship Education", mandatory: false, minCredit: 2, maxCredit: 3, department: "Social Studies" },
];

const PROGRAMMES = [
  "General Science", "General Arts", "Business", 
  "Visual Arts", "Home Economics", "Agriculture", 
  "Technical/Vocational", "Health Science"
];

const DEPARTMENTS = [
  "English", "Mathematics", "Science", "Social Studies",
  "Languages", "Business Studies", "Visual Arts", 
  "Home Economics", "Agriculture", "Technical/Vocational",
  "Physical Education", "ICT", "General Studies"
];

const SUBJECT_TYPES = [
  { value: "core", label: "Core Subject", color: "green" },
  { value: "elective", label: "Elective Subject", color: "blue" },
  { value: "vocational", label: "Vocational/Technical", color: "purple" },
  { value: "remedial", label: "Remedial/Support", color: "orange" }
];

const ASSESSMENT_TYPES = [
  { value: "exam", label: "Exam Only" },
  { value: "continuous", label: "Continuous Assessment" },
  { value: "both", label: "Both (Exam + CA)" },
  { value: "project", label: "Project Based" },
  { value: "practical", label: "Practical Only" }
];

const GRADE_SCALES = ["WASSCE", "IGCSE", "Internal", "Cambridge", "IB"];

const EXAMINATION_BODIES = ["WASSCE", "NOV/DEC", "Internal", "IGCSE", "Other"];

const TERMS = ["Term 1", "Term 2", "Term 3"];
const FORM_LEVELS = ["Form 1", "Form 2", "Form 3", "All"];
const TRACK_OPTIONS = ["Both", "Track A Only", "Track B Only"];
const ROOM_TYPES = ["Classroom", "Laboratory", "Workshop", "ICT Lab", "Studio", "Field"];

// Sample Subjects Data
const SAMPLE_SUBJECTS = [
  { id: "bio-001", code: "BIO-001", name: "Biology", type: "elective", department: "Science", creditHours: 3, contactHours: 4, status: "active", programmes: ["General Science", "Health Science"] },
  { id: "chem-001", code: "CHEM-001", name: "Chemistry", type: "elective", department: "Science", creditHours: 3, contactHours: 4, status: "active", programmes: ["General Science", "Health Science"] },
  { id: "phy-001", code: "PHY-001", name: "Physics", type: "elective", department: "Science", creditHours: 3, contactHours: 4, status: "active", programmes: ["General Science"] },
  { id: "econ-001", code: "ECON-001", name: "Economics", type: "elective", department: "Business Studies", creditHours: 3, contactHours: 3, status: "active", programmes: ["General Arts", "Business"] },
  { id: "hist-001", code: "HIST-001", name: "History", type: "elective", department: "Social Studies", creditHours: 3, contactHours: 3, status: "active", programmes: ["General Arts"] },
  { id: "acct-001", code: "ACCT-001", name: "Financial Accounting", type: "elective", department: "Business Studies", creditHours: 3, contactHours: 4, status: "active", programmes: ["Business"] },
];

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls = (error = false) =>
  `w-full px-3 py-2 text-sm rounded-lg border outline-none transition-all duration-150 ${
    error
      ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
      : "border-gray-300 bg-gray-50 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  }`;

// ─── Reusable Components ──────────────────────────────────────────────────────

const SectionCard = ({ icon, title, badge, children }) => (
  <div className="bg-white rounded-xl overflow-hidden mb-6 border border-gray-200 shadow-sm">
    <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200 bg-gray-50">
      <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-gray-200">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      {badge && (
        <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
          {badge}
        </span>
      )}
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
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      type="text"
      className="pl-9 pr-3 py-2 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const SubjectManagement = () => {
  // State for Subject List
  const [subjects, setSubjects] = useState(SAMPLE_SUBJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  // Form State for New/Edit Subject
  const [formData, setFormData] = useState({
    // Identification
    code: "",
    name: "",
    shortName: "",
    alternativeName: "",
    type: "elective",
    level: "All",
    
    // Academic Details
    creditHours: 3,
    contactHours: 4,
    practicalHours: 1,
    theoryHours: 3,
    assessmentType: "both",
    caWeight: 30,
    examWeight: 70,
    minPassMark: 40,
    
    // Department & Programme
    department: "",
    programmes: [],
    coreForProgrammes: [],
    electiveForProgrammes: [],
    trackAssignment: "Both",
    
    // Teacher Assignment
    coordinator: "",
    leadTeacher: "",
    assignedTeachers: [],
    
    // Assessment
    numExams: 2,
    numCA: 4,
    hasProject: false,
    hasPractical: false,
    examDuration: 2,
    
    // Grading
    gradingScale: "WASSCE",
    showOnReport: true,
    reportSection: "elective",
    
    // Prerequisites
    prerequisites: [],
    minGradeRequired: "",
    maxStudents: "",
    
    // Timetable
    preferredPeriods: [],
    roomType: "Classroom",
    specialEquipment: [],
    
    // Status
    isActive: true,
    isCompulsory: false,
    academicYear: "2024/2025",
    termsOffered: ["Term 1", "Term 2", "Term 3"],
    languageMedium: "English",
    notes: "",
  });
  
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("list"); // list, core, subjects

  // Computed Values
  const filteredSubjects = useMemo(() => {
    return subjects.filter(subj => {
      const matchesSearch = subj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            subj.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || subj.type === filterType;
      const matchesDept = filterDepartment === "all" || subj.department === filterDepartment;
      return matchesSearch && matchesType && matchesDept;
    });
  }, [subjects, searchTerm, filterType, filterDepartment]);

  // Core Subjects
  const coreSubjects = [...CORE_SUBJECTS_FIXED, ...ADDITIONAL_CORE_SUBJECTS];

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'contactHours' && formData.practicalHours) {
      setFormData(prev => ({ ...prev, theoryHours: value - prev.practicalHours }));
    }
    if (field === 'practicalHours') {
      setFormData(prev => ({ ...prev, theoryHours: prev.contactHours - value }));
    }
  };

  const handleProgrammeChange = (programme) => {
    setFormData(prev => ({
      ...prev,
      programmes: prev.programmes.includes(programme)
        ? prev.programmes.filter(p => p !== programme)
        : [...prev.programmes, programme]
    }));
  };

  const handleTermChange = (term) => {
    setFormData(prev => ({
      ...prev,
      termsOffered: prev.termsOffered.includes(term)
        ? prev.termsOffered.filter(t => t !== term)
        : [...prev.termsOffered, term]
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Subject code is required";
    if (!formData.name) newErrors.name = "Subject name is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (formData.programmes.length === 0) newErrors.programmes = "Select at least one programme";
    if (formData.creditHours < 1) newErrors.creditHours = "Credit hours must be at least 1";
    if (formData.contactHours < 1) newErrors.contactHours = "Contact hours must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSubject = () => {
    if (!validate()) return;
    
    const newSubject = {
      id: `${formData.code.toLowerCase()}-${Date.now()}`,
      ...formData,
      status: formData.isActive ? "active" : "inactive",
      createdAt: new Date().toISOString(),
    };
    
    setSubjects(prev => [...prev, newSubject]);
    setShowAddModal(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Reset form
    setFormData({
      code: "", name: "", shortName: "", alternativeName: "", type: "elective", level: "All",
      creditHours: 3, contactHours: 4, practicalHours: 1, theoryHours: 3,
      assessmentType: "both", caWeight: 30, examWeight: 70, minPassMark: 40,
      department: "", programmes: [], coreForProgrammes: [], electiveForProgrammes: [],
      trackAssignment: "Both", coordinator: "", leadTeacher: "", assignedTeachers: [],
      numExams: 2, numCA: 4, hasProject: false, hasPractical: false, examDuration: 2,
      gradingScale: "WASSCE", showOnReport: true, reportSection: "elective",
      prerequisites: [], minGradeRequired: "", maxStudents: "",
      preferredPeriods: [], roomType: "Classroom", specialEquipment: [],
      isActive: true, isCompulsory: false, academicYear: "2024/2025",
      termsOffered: ["Term 1", "Term 2", "Term 3"], languageMedium: "English", notes: "",
    });
  };

  const handleBulkAssign = () => {
    console.log("Bulk assigning subjects...");
    setShowBulkModal(false);
  };

  const handleExportSubjects = () => {
    const exportData = {
      subjects: filteredSubjects,
      exportDate: new Date().toISOString(),
      totalSubjects: filteredSubjects.length,
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `subjects-${new Date().toISOString().split('T')[0]}.json`);
    link.click();
  };

  const handleToggleSubjectStatus = (subjectId) => {
    setSubjects(prev => prev.map(subj =>
      subj.id === subjectId
        ? { ...subj, status: subj.status === "active" ? "inactive" : "active" }
        : subj
    ));
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 mb-3 bg-blue-600 text-white">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Form 13 — Academic Structure
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Subject Management</h1>
              <p className="text-gray-600">Manage core and elective subjects, assign to programmes, and configure academic settings</p>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="info">{subjects.length} Active Subjects</Badge>
              <Badge variant="success">{coreSubjects.length} Core Subjects</Badge>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "list"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Subject List
            </button>
            <button
              onClick={() => setActiveTab("core")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "core"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Core Subjects
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "add"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Add New Subject
            </button>
          </nav>
        </div>

        {/* Tab: Subject List */}
        {activeTab === "list" && (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search by subject name or code..."
                />
                <select
                  className={inputCls()}
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {SUBJECT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <select
                  className={inputCls()}
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBulkModal(true)}
                    className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Bulk Assign
                  </button>
                  <button
                    onClick={handleExportSubjects}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Subjects Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Hrs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programmes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubjects.map((subject) => (
                      <tr key={subject.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-mono text-gray-900">{subject.code}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{subject.name}</td>
                        <td className="px-6 py-4">
                          <Badge variant={subject.type === 'core' ? 'success' : subject.type === 'elective' ? 'info' : 'purple'}>
                            {subject.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{subject.department}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{subject.creditHours}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex flex-wrap gap-1">
                            {subject.programmes?.slice(0, 2).map(p => (
                              <Badge key={p} variant="default">{p}</Badge>
                            ))}
                            {subject.programmes?.length > 2 && <span className="text-xs">+{subject.programmes.length - 2}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleSubjectStatus(subject.id)}
                            className={`px-2 py-1 text-xs rounded-full ${
                              subject.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {subject.status === 'active' ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h5.34" />
                                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Tab: Core Subjects */}
        {activeTab === "core" && (
          <div className="space-y-6">
            {/* Fixed Core Subjects */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              }
              title="Fixed Core Subjects (Mandatory)"
              badge="Always on report"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CORE_SUBJECTS_FIXED.map(subject => (
                  <div key={subject.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-500">{subject.code}</span>
                        <h4 className="font-medium text-gray-900">{subject.name}</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Department: {subject.department} | Credit: {subject.minCredit}-{subject.maxCredit} hrs</p>
                    </div>
                    <Badge variant="success">Core</Badge>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Additional Core Subjects */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Additional Core Subjects (Optional)"
              badge="School can choose"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ADDITIONAL_CORE_SUBJECTS.map(subject => (
                  <div key={subject.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-500">{subject.code}</span>
                        <h4 className="font-medium text-gray-900">{subject.name}</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Department: {subject.department} | Credit: {subject.minCredit}-{subject.maxCredit} hrs</p>
                    </div>
                    <button className="px-3 py-1 text-xs bg-white rounded-lg border border-gray-300 hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* Tab: Add New Subject */}
        {activeTab === "add" && (
          <>
            {saved && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Subject added successfully!
              </div>
            )}

            {/* Section 1: Subject Identification */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4v16h16V4H4z" />
                  <path d="M8 9h8M8 13h6M8 17h4" />
                </svg>
              }
              title="Subject Identification"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field label="Subject Code" required error={errors.code}>
                  <input className={inputCls(!!errors.code)} value={formData.code} onChange={e => handleInputChange('code', e.target.value.toUpperCase())} placeholder="e.g., BIO-001" />
                </Field>
                <Field label="Subject Name" required error={errors.name}>
                  <input className={inputCls(!!errors.name)} value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="e.g., Biology" />
                </Field>
                <Field label="Short Name" optional>
                  <input className={inputCls()} value={formData.shortName} onChange={e => handleInputChange('shortName', e.target.value)} placeholder="e.g., Bio" />
                </Field>
                <Field label="Subject Type" required>
                  <select className={inputCls()} value={formData.type} onChange={e => handleInputChange('type', e.target.value)}>
                    {SUBJECT_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                  </select>
                </Field>
                <Field label="Form Level">
                  <select className={inputCls()} value={formData.level} onChange={e => handleInputChange('level', e.target.value)}>
                    {FORM_LEVELS.map(level => <option key={level}>{level}</option>)}
                  </select>
                </Field>
                <Field label="Alternative Name" optional>
                  <input className={inputCls()} value={formData.alternativeName} onChange={e => handleInputChange('alternativeName', e.target.value)} placeholder="For transcripts" />
                </Field>
              </div>
            </SectionCard>

            {/* Section 2: Academic Details */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              }
              title="Academic Details"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Credit Hours" required error={errors.creditHours}>
                  <input type="number" className={inputCls(!!errors.creditHours)} value={formData.creditHours} onChange={e => handleInputChange('creditHours', parseInt(e.target.value))} min={1} max={8} />
                </Field>
                <Field label="Contact Hours/Week" required error={errors.contactHours}>
                  <input type="number" className={inputCls(!!errors.contactHours)} value={formData.contactHours} onChange={e => handleInputChange('contactHours', parseInt(e.target.value))} min={1} max={10} />
                </Field>
                <Field label="Practical Hours/Week">
                  <input type="number" className={inputCls()} value={formData.practicalHours} onChange={e => handleInputChange('practicalHours', parseInt(e.target.value))} min={0} max={formData.contactHours} />
                </Field>
                <Field label="Assessment Type">
                  <select className={inputCls()} value={formData.assessmentType} onChange={e => handleInputChange('assessmentType', e.target.value)}>
                    {ASSESSMENT_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                  </select>
                </Field>
                <Field label="CA Weight (%)">
                  <input type="number" className={inputCls()} value={formData.caWeight} onChange={e => handleInputChange('caWeight', parseInt(e.target.value))} min={0} max={100} />
                </Field>
                <Field label="Exam Weight (%)">
                  <input type="number" className={inputCls()} value={formData.examWeight} onChange={e => handleInputChange('examWeight', parseInt(e.target.value))} min={0} max={100} />
                </Field>
                <Field label="Minimum Pass Mark">
                  <input type="number" className={inputCls()} value={formData.minPassMark} onChange={e => handleInputChange('minPassMark', parseInt(e.target.value))} min={0} max={100} />
                </Field>
              </div>
            </SectionCard>

            {/* Section 3: Department & Programme */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              }
              title="Department & Programme Linkage"
            >
              <div className="space-y-4">
                <Field label="Home Department" required error={errors.department}>
                  <select className={inputCls(!!errors.department)} value={formData.department} onChange={e => handleInputChange('department', e.target.value)}>
                    <option value="">Select department</option>
                    {DEPARTMENTS.map(dept => <option key={dept}>{dept}</option>)}
                  </select>
                </Field>
                
                <Field label="Linked Programmes" required error={errors.programmes}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 border rounded-lg bg-gray-50">
                    {PROGRAMMES.map(prog => (
                      <label key={prog} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={formData.programmes.includes(prog)} onChange={() => handleProgrammeChange(prog)} />
                        {prog}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="Track Assignment">
                  <select className={inputCls()} value={formData.trackAssignment} onChange={e => handleInputChange('trackAssignment', e.target.value)}>
                    {TRACK_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </Field>
              </div>
            </SectionCard>

            {/* Section 4: Teacher Assignment */}
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
                <Field label="Subject Coordinator">
                  <select className={inputCls()} value={formData.coordinator} onChange={e => handleInputChange('coordinator', e.target.value)}>
                    <option value="">Select coordinator</option>
                    <option>Dr. John Smith</option>
                    <option>Prof. Mary Johnson</option>
                    <option>Mr. James Wilson</option>
                  </select>
                </Field>
                <Field label="Lead Teacher">
                  <select className={inputCls()} value={formData.leadTeacher} onChange={e => handleInputChange('leadTeacher', e.target.value)}>
                    <option value="">Select lead teacher</option>
                    <option>Mrs. Sarah Adams</option>
                    <option>Mr. Michael Brown</option>
                  </select>
                </Field>
              </div>
            </SectionCard>

            {/* Section 5: Assessment Structure */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              }
              title="Assessment Structure"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Number of Exams per Term">
                  <input type="number" className={inputCls()} value={formData.numExams} onChange={e => handleInputChange('numExams', parseInt(e.target.value))} min={1} max={4} />
                </Field>
                <Field label="Number of CA Tasks">
                  <input type="number" className={inputCls()} value={formData.numCA} onChange={e => handleInputChange('numCA', parseInt(e.target.value))} min={1} max={6} />
                </Field>
                <Field label="Exam Duration (hours)">
                  <input type="number" step="0.5" className={inputCls()} value={formData.examDuration} onChange={e => handleInputChange('examDuration', parseFloat(e.target.value))} min={1} max={4} />
                </Field>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.hasProject} onChange={e => handleInputChange('hasProject', e.target.checked)} />
                  <span className="text-sm">Has Project Work</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.hasPractical} onChange={e => handleInputChange('hasPractical', e.target.checked)} />
                  <span className="text-sm">Has Practical Assessment</span>
                </label>
              </div>
            </SectionCard>

            {/* Section 6: Grading & Reporting */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              }
              title="Grading & Reporting"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Grading Scale">
                  <select className={inputCls()} value={formData.gradingScale} onChange={e => handleInputChange('gradingScale', e.target.value)}>
                    {GRADE_SCALES.map(scale => <option key={scale}>{scale}</option>)}
                  </select>
                </Field>
                <Field label="Report Section">
                  <select className={inputCls()} value={formData.reportSection} onChange={e => handleInputChange('reportSection', e.target.value)}>
                    <option value="core">Core Subjects Section</option>
                    <option value="elective">Elective Subjects Section</option>
                    <option value="vocational">Vocational Section</option>
                  </select>
                </Field>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.showOnReport} onChange={e => handleInputChange('showOnReport', e.target.checked)} />
                  <span className="text-sm">Show on Student Report</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isCompulsory} onChange={e => handleInputChange('isCompulsory', e.target.checked)} />
                  <span className="text-sm">Compulsory for All Students</span>
                </label>
              </div>
            </SectionCard>

            {/* Section 7: Prerequisites */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
              title="Prerequisites & Restrictions"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Prerequisite Subjects">
                  <select multiple className={`${inputCls()} h-24`}>
                    <option>Biology</option>
                    <option>Chemistry</option>
                    <option>Mathematics</option>
                  </select>
                </Field>
                <Field label="Minimum Grade Required">
                  <select className={inputCls()} value={formData.minGradeRequired} onChange={e => handleInputChange('minGradeRequired', e.target.value)}>
                    <option value="">None</option>
                    <option>C6</option>
                    <option>C5</option>
                    <option>C4</option>
                    <option>B3</option>
                  </select>
                </Field>
                <Field label="Maximum Students per Class">
                  <input type="number" className={inputCls()} value={formData.maxStudents} onChange={e => handleInputChange('maxStudents', e.target.value)} placeholder="e.g., 40" />
                </Field>
              </div>
            </SectionCard>

            {/* Section 8: Timetable & Scheduling */}
            <SectionCard 
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              title="Timetable & Scheduling"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Room Type Required">
                  <select className={inputCls()} value={formData.roomType} onChange={e => handleInputChange('roomType', e.target.value)}>
                    {ROOM_TYPES.map(type => <option key={type}>{type}</option>)}
                  </select>
                </Field>
                <Field label="Preferred Periods">
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="checkbox" value="morning" /> Morning</label>
                    <label className="flex items-center gap-1"><input type="checkbox" value="afternoon" /> Afternoon</label>
                  </div>
                </Field>
              </div>
            </SectionCard>

            {/* Section 9: Additional Info */}
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
                <Field label="Academic Year">
                  <select className={inputCls()} value={formData.academicYear} onChange={e => handleInputChange('academicYear', e.target.value)}>
                    <option>2023/2024</option>
                    <option>2024/2025</option>
                    <option>2025/2026</option>
                  </select>
                </Field>
                <Field label="Language Medium">
                  <select className={inputCls()} value={formData.languageMedium} onChange={e => handleInputChange('languageMedium', e.target.value)}>
                    <option>English</option>
                    <option>French</option>
                    <option>Bilingual</option>
                  </select>
                </Field>
                <Field label="Terms Offered">
                  <div className="flex gap-3">
                    {TERMS.map(term => (
                      <label key={term} className="flex items-center gap-1">
                        <input type="checkbox" checked={formData.termsOffered.includes(term)} onChange={() => handleTermChange(term)} />
                        {term}
                      </label>
                    ))}
                  </div>
                </Field>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 mb-2">
                    <input type="checkbox" checked={formData.isActive} onChange={e => handleInputChange('isActive', e.target.checked)} />
                    <span className="text-sm font-medium">Subject is Active</span>
                  </label>
                </div>
                <Field label="Notes" optional className="col-span-2">
                  <textarea rows={3} className={inputCls()} value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} placeholder="Any additional information about this subject..." />
                </Field>
              </div>
            </SectionCard>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setActiveTab("list")}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Subject
              </button>
            </div>
          </>
        )}

        {/* Bulk Assign Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Bulk Assign Subjects</h3>
              <div className="space-y-4">
                <Field label="Select Subjects">
                  <select multiple className={`${inputCls()} h-32`}>
                    {subjects.map(s => <option key={s.id}>{s.name} ({s.code})</option>)}
                  </select>
                </Field>
                <Field label="Assign to Programmes">
                  <select multiple className={`${inputCls()} h-24`}>
                    {PROGRAMMES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Assignment Type">
                  <select className={inputCls()}>
                    <option>As Elective</option>
                    <option>As Core</option>
                  </select>
                </Field>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setShowBulkModal(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleBulkAssign} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Assign</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SubjectManagement;