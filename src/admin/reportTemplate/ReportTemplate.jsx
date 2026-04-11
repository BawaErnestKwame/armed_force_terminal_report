import React, { useState, useCallback, useMemo } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

const ACADEMIC_YEARS = ["2023/2024", "2024/2025", "2025/2026"];
const TERMS = ["Term 1", "Term 2", "Term 3"];
const LANGUAGES = ["English", "French", "Bilingual"];

const PAGE_SIZES = ["A4", "Letter", "Legal"];
const ORIENTATIONS = ["Portrait", "Landscape"];
const MARGINS = ["Normal", "Narrow", "Wide"];
const FONTS = ["Arial", "Times New Roman", "Calibri", "Helvetica", "Roboto"];
const FONT_SIZES = ["Small (10px)", "Normal (12px)", "Large (14px)", "Extra Large (16px)"];

const GRADING_SYSTEMS = ["WASSCE", "IGCSE", "American", "Custom"];
const GPA_TYPES = ["Simple", "Weighted", "Cumulative"];
const TABLE_LAYOUTS = ["Vertical", "Horizontal", "Grid"];
const SUBJECT_GROUPINGS = ["By Department", "By Type", "Alphabetical", "By Performance"];
const COMMENT_TYPES = ["Text Only", "Predefined Only", "Both"];

const STUDENT_FIELDS = [
  { id: "name", label: "Student Name", default: true },
  { id: "id", label: "Student ID", default: true },
  { id: "dob", label: "Date of Birth", default: false },
  { id: "gender", label: "Gender", default: false },
  { id: "parent", label: "Parent/Guardian Name", default: false },
  { id: "contact", label: "Contact Number", default: false },
  { id: "address", label: "Address", default: false },
  { id: "email", label: "Email", default: false },
];

const SUBJECT_COLUMNS = [
  { id: "subject", label: "Subject Name", default: true, fixed: true },
  { id: "code", label: "Subject Code", default: false },
  { id: "teacher", label: "Teacher Name", default: false },
  { id: "ca_score", label: "CA Score", default: true },
  { id: "exam_score", label: "Exam Score", default: true },
  { id: "total", label: "Total Score", default: true },
  { id: "percentage", label: "Percentage", default: false },
  { id: "grade", label: "Grade", default: true },
  { id: "grade_point", label: "Grade Point", default: false },
  { id: "position", label: "Position", default: false },
  { id: "remark", label: "Remark", default: true },
];

const PERFORMANCE_BANDS = [
  { band: "Excellent", min: 80, max: 100, color: "#10b981" },
  { band: "Good", min: 70, max: 79, color: "#3b82f6" },
  { band: "Average", min: 55, max: 69, color: "#f59e0b" },
  { band: "Poor", min: 0, max: 54, color: "#ef4444" },
];

const GRADE_BOUNDARIES = [
  { grade: "A1", min: 80, max: 100, points: 1, remark: "Excellent" },
  { grade: "B2", min: 70, max: 79, points: 2, remark: "Very Good" },
  { grade: "B3", min: 60, max: 69, points: 3, remark: "Good" },
  { grade: "C4", min: 55, max: 59, points: 4, remark: "Credit" },
  { grade: "C5", min: 50, max: 54, points: 5, remark: "Credit" },
  { grade: "C6", min: 45, max: 49, points: 6, remark: "Credit" },
  { grade: "D7", min: 40, max: 44, points: 7, remark: "Pass" },
  { grade: "E8", min: 35, max: 39, points: 8, remark: "Marginal Pass" },
  { grade: "F9", min: 0, max: 34, points: 9, remark: "Fail" },
];

const COMMENT_TEMPLATES = [
  "Excellent performance! Keep up the great work.",
  "Good effort. Continue to work hard.",
  "Satisfactory performance. Needs improvement in some areas.",
  "Average performance. Can do better with more effort.",
  "Below average. Needs significant improvement.",
  "Shows improvement. Keep working hard.",
  "Excellent in practical work. Theory needs attention.",
  "Good participation in class activities.",
  "Needs to improve attendance and punctuality.",
  "Outstanding performance! A pleasure to teach.",
];

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls = (error = false) =>
  `w-full px-3 py-2 text-sm rounded-lg border outline-none transition-all duration-150 ${
    error
      ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
      : "border-gray-300 bg-gray-50 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  }`;

// ─── Reusable Components ──────────────────────────────────────────────────────

const SectionCard = ({ icon, title, description, badge, children }) => (
  <div className="bg-white rounded-xl overflow-hidden mb-6 border border-gray-200 shadow-sm">
    <div className="flex items-start justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-gray-200">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
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

const Toggle = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between">
    <div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {description && <p className="text-xs text-gray-400">{description}</p>}
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

// ─── Main Component ───────────────────────────────────────────────────────────

const ReportTemplate = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState("general");
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Template identification
  const [template, setTemplate] = useState({
    name: "Standard WASSCE Report",
    code: "RPT-WASSCE-2024",
    academicYear: "2024/2025",
    term: "Term 1",
    version: "2.1",
    language: "English",
    isDefault: true,
    isActive: true,
  });
  
  // School information
  const [schoolInfo, setSchoolInfo] = useState({
    showLogo: true,
    logoPosition: "top-left",
    showSchoolName: "full",
    showAddress: true,
    showContact: true,
    showMotto: false,
    showWebsite: false,
  });
  
  // Student information
  const [studentInfo, setStudentInfo] = useState({
    showPhoto: false,
    fieldsToDisplay: ["name", "id"],
    showParentInfo: true,
    showContact: false,
    studentIdFormat: "text",
  });
  
  // Academic information
  const [academicInfo, setAcademicInfo] = useState({
    showClass: "full",
    showProgramme: true,
    showTrack: true,
    showResidentialStatus: false,
    showAttendance: true,
    showClassPosition: true,
    showClassAverage: true,
    showSchoolAverage: false,
  });
  
  // Subject table configuration
  const [subjectTable, setSubjectTable] = useState({
    layout: "vertical",
    grouping: "by-type",
    showSubjectCode: false,
    showTeacherName: false,
    showCABreakdown: false,
    separateCoreElective: true,
    coreSectionTitle: "Core Subjects",
    electiveSectionTitle: "Elective Subjects",
    columns: ["subject", "ca_score", "exam_score", "total", "grade", "remark"],
  });
  
  // Grading configuration
  const [grading, setGrading] = useState({
    system: "WASSCE",
    showGradePoints: true,
    gpaCalculation: "weighted",
    showSubjectPosition: true,
    gradeBoundaries: GRADE_BOUNDARIES,
  });
  
  // Performance metrics
  const [performance, setPerformance] = useState({
    showTotalMarks: true,
    showTotalPercentage: true,
    showOverallGPA: true,
    showClassRank: true,
    showStreamRank: false,
    showSubjectsCount: true,
    showPassedCount: false,
    showPerformanceBand: true,
    performanceBands: PERFORMANCE_BANDS,
  });
  
  // Attendance section
  const [attendance, setAttendance] = useState({
    showAttendance: true,
    format: "summary",
    showPresent: true,
    showAbsent: true,
    showLate: true,
    showPercentage: true,
    showTermBreakdown: false,
  });
  
  // Comments section
  const [comments, setComments] = useState({
    showComments: true,
    commentType: "both",
    characterLimit: 500,
    allowMultipleTeachers: true,
    showClassTeacherComment: true,
    showHeadComment: false,
    showSignature: true,
    predefinedTemplates: COMMENT_TEMPLATES,
  });
  
  // Header/Footer
  const [headerFooter, setHeaderFooter] = useState({
    headerText: "OFFICIAL ACADEMIC REPORT",
    footerText: "This is a computer-generated document. No signature required.",
    showDatePrinted: true,
    showPageNumbers: true,
    watermark: "",
    borderStyle: "thin",
  });
  
  // Styling
  const [styling, setStyling] = useState({
    primaryColor: "#1e3a8a",
    secondaryColor: "#3b82f6",
    fontFamily: "Arial",
    fontSize: "normal",
    tableBorders: "all",
    alternatingRowColors: true,
  });
  
  // Print settings
  const [printSettings, setPrintSettings] = useState({
    pageSize: "A4",
    orientation: "portrait",
    margins: "normal",
    printQuality: "normal",
  });
  
  // Section order
  const [sections, setSections] = useState([
    { id: "school-header", name: "School Header", visible: true, order: 1 },
    { id: "student-info", name: "Student Information", visible: true, order: 2 },
    { id: "academic-info", name: "Academic Information", visible: true, order: 3 },
    { id: "core-subjects", name: "Core Subjects", visible: true, order: 4 },
    { id: "elective-subjects", name: "Elective Subjects", visible: true, order: 5 },
    { id: "performance-summary", name: "Performance Summary", visible: true, order: 6 },
    { id: "attendance", name: "Attendance", visible: true, order: 7 },
    { id: "teacher-comments", name: "Teacher Comments", visible: true, order: 8 },
    { id: "signatures", name: "Signatures", visible: true, order: 9 },
    { id: "footer", name: "Footer", visible: true, order: 10 },
  ]);
  
  // Additional features
  const [additionalFeatures, setAdditionalFeatures] = useState({
    showProgressGraph: false,
    showSubjectAnalysis: false,
    showNextTermGoals: false,
    showParentSignature: false,
    showQRCode: true,
    showBarcode: false,
  });
  
  // ── Handlers ────────────────────────────────────────────────────────────────
  
  const handleTemplateChange = (field, value) => {
    setTemplate(prev => ({ ...prev, [field]: value }));
  };
  
  const handleStudentFieldsToggle = (fieldId) => {
    setStudentInfo(prev => ({
      ...prev,
      fieldsToDisplay: prev.fieldsToDisplay.includes(fieldId)
        ? prev.fieldsToDisplay.filter(f => f !== fieldId)
        : [...prev.fieldsToDisplay, fieldId]
    }));
  };
  
  const handleColumnsToggle = (columnId) => {
    setSubjectTable(prev => ({
      ...prev,
      columns: prev.columns.includes(columnId)
        ? prev.columns.filter(c => c !== columnId)
        : [...prev.columns, columnId]
    }));
  };
  
  const handleSectionToggle = (sectionId) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    ));
  };
  
  const handleSectionOrder = (sectionId, direction) => {
    setSections(prev => {
      const index = prev.findIndex(s => s.id === sectionId);
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newSections = [...prev];
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
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
  };
  
  const handlePerformanceBandChange = (index, field, value) => {
    setPerformance(prev => ({
      ...prev,
      performanceBands: prev.performanceBands.map((band, i) =>
        i === index ? { ...band, [field]: parseInt(value) || 0 } : band
      )
    }));
  };
  
  const handleAddCommentTemplate = () => {
    setComments(prev => ({
      ...prev,
      predefinedTemplates: [...prev.predefinedTemplates, "New comment template"]
    }));
  };
  
  const handleUpdateCommentTemplate = (index, value) => {
    setComments(prev => ({
      ...prev,
      predefinedTemplates: prev.predefinedTemplates.map((template, i) =>
        i === index ? value : template
      )
    }));
  };
  
  const handleDeleteCommentTemplate = (index) => {
    setComments(prev => ({
      ...prev,
      predefinedTemplates: prev.predefinedTemplates.filter((_, i) => i !== index)
    }));
  };
  
  const handleSave = () => {
    const templateData = {
      template,
      schoolInfo,
      studentInfo,
      academicInfo,
      subjectTable,
      grading,
      performance,
      attendance,
      comments,
      headerFooter,
      styling,
      printSettings,
      sections,
      additionalFeatures,
      savedAt: new Date().toISOString(),
    };
    console.log("Saving template:", templateData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  const handleExport = () => {
    const exportData = {
      template,
      schoolInfo,
      studentInfo,
      academicInfo,
      subjectTable,
      grading,
      performance,
      attendance,
      comments,
      headerFooter,
      styling,
      printSettings,
      sections,
      additionalFeatures,
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
  
  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);
  
  // ─── Render ────────────────────────────────────────────────────────────────
  
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
            
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Template Builder</h1>
              <p className="text-gray-600">Design and customize student report card templates</p>
            </div>
            
            <div className="flex gap-2">
              <Badge variant={template.isActive ? "success" : "warning"}>
                {template.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge variant="info">{template.version}</Badge>
            </div>
          </div>
        </div>
        
        {/* Save Notification */}
        {saved && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Template saved successfully!
          </div>
        )}
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 overflow-x-auto">
          <nav className="flex gap-1 min-w-max">
            {[
              { id: "general", label: "General Settings", icon: "⚙️" },
              { id: "school", label: "School Info", icon: "🏫" },
              { id: "subjects", label: "Subjects & Table", icon: "📚" },
              { id: "grading", label: "Grading", icon: "📊" },
              { id: "comments", label: "Comments", icon: "💬" },
              { id: "design", label: "Design & Layout", icon: "🎨" },
              { id: "sections", label: "Section Order", icon: "📑" },
              { id: "print", label: "Print Settings", icon: "🖨️" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="space-y-6">
          
          {/* ==================== TAB 1: GENERAL SETTINGS ==================== */}
          {activeTab === "general" && (
            <>
              <SectionCard 
                icon="📝" 
                title="Template Identification" 
                description="Basic information about this report template"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Field label="Template Name" required>
                    <input className={inputCls()} value={template.name} onChange={e => handleTemplateChange('name', e.target.value)} placeholder="e.g., Standard WASSCE Report" />
                  </Field>
                  <Field label="Template Code" required>
                    <input className={inputCls()} value={template.code} onChange={e => handleTemplateChange('code', e.target.value.toUpperCase())} placeholder="e.g., RPT-WASSCE-2024" />
                  </Field>
                  <Field label="Template Version">
                    <input className={inputCls()} value={template.version} onChange={e => handleTemplateChange('version', e.target.value)} placeholder="e.g., v2.1" />
                  </Field>
                  <Field label="Academic Year">
                    <select className={inputCls()} value={template.academicYear} onChange={e => handleTemplateChange('academicYear', e.target.value)}>
                      {ACADEMIC_YEARS.map(year => <option key={year}>{year}</option>)}
                    </select>
                  </Field>
                  <Field label="Term">
                    <select className={inputCls()} value={template.term} onChange={e => handleTemplateChange('term', e.target.value)}>
                      {TERMS.map(term => <option key={term}>{term}</option>)}
                    </select>
                  </Field>
                  <Field label="Language">
                    <select className={inputCls()} value={template.language} onChange={e => handleTemplateChange('language', e.target.value)}>
                      {LANGUAGES.map(lang => <option key={lang}>{lang}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="mt-4 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={template.isDefault} onChange={e => handleTemplateChange('isDefault', e.target.checked)} />
                    <span className="text-sm">Set as default template</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={template.isActive} onChange={e => handleTemplateChange('isActive', e.target.checked)} />
                    <span className="text-sm">Template is active</span>
                  </label>
                </div>
              </SectionCard>
            </>
          )}
          
          {/* ==================== TAB 2: SCHOOL INFO ==================== */}
          {activeTab === "school" && (
            <>
              <SectionCard icon="🏫" title="School Information" description="Configure how school details appear on reports">
                <div className="space-y-4">
                  <Toggle checked={schoolInfo.showLogo} onChange={val => setSchoolInfo(prev => ({ ...prev, showLogo: val }))} label="Show School Logo" />
                  
                  {schoolInfo.showLogo && (
                    <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Logo Position">
                        <select className={inputCls()} value={schoolInfo.logoPosition} onChange={e => setSchoolInfo(prev => ({ ...prev, logoPosition: e.target.value }))}>
                          <option>top-left</option>
                          <option>top-center</option>
                          <option>top-right</option>
                        </select>
                      </Field>
                      <Field label="Upload Logo" optional>
                        <input type="file" accept="image/*" className={inputCls()} />
                      </Field>
                    </div>
                  )}
                  
                  <Field label="School Name Display">
                    <select className={inputCls()} value={schoolInfo.showSchoolName} onChange={e => setSchoolInfo(prev => ({ ...prev, showSchoolName: e.target.value }))}>
                      <option value="full">Full Name</option>
                      <option value="short">Short Name</option>
                      <option value="none">None</option>
                    </select>
                  </Field>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Toggle checked={schoolInfo.showAddress} onChange={val => setSchoolInfo(prev => ({ ...prev, showAddress: val }))} label="Show School Address" />
                    <Toggle checked={schoolInfo.showContact} onChange={val => setSchoolInfo(prev => ({ ...prev, showContact: val }))} label="Show Contact Information" />
                    <Toggle checked={schoolInfo.showMotto} onChange={val => setSchoolInfo(prev => ({ ...prev, showMotto: val }))} label="Show School Motto" />
                    <Toggle checked={schoolInfo.showWebsite} onChange={val => setSchoolInfo(prev => ({ ...prev, showWebsite: val }))} label="Show Website/Social Media" />
                  </div>
                </div>
              </SectionCard>
              
              <SectionCard icon="👨‍🎓" title="Student Information" description="Select which student details to display">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Toggle checked={studentInfo.showPhoto} onChange={val => setStudentInfo(prev => ({ ...prev, showPhoto: val }))} label="Show Student Photo" />
                  <Toggle checked={studentInfo.showParentInfo} onChange={val => setStudentInfo(prev => ({ ...prev, showParentInfo: val }))} label="Show Parent/Guardian Info" />
                  <Toggle checked={studentInfo.showContact} onChange={val => setStudentInfo(prev => ({ ...prev, showContact: val }))} label="Show Contact Information" />
                  
                  <Field label="Student ID Format">
                    <select className={inputCls()} value={studentInfo.studentIdFormat} onChange={e => setStudentInfo(prev => ({ ...prev, studentIdFormat: e.target.value }))}>
                      <option value="text">Text Only</option>
                      <option value="barcode">Barcode</option>
                      <option value="qrcode">QR Code</option>
                    </select>
                  </Field>
                </div>
                
                <div className="mt-4">
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">Fields to Display:</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {STUDENT_FIELDS.map(field => (
                      <label key={field.id} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={studentInfo.fieldsToDisplay.includes(field.id)} onChange={() => handleStudentFieldsToggle(field.id)} />
                        {field.label}
                      </label>
                    ))}
                  </div>
                </div>
              </SectionCard>
            </>
          )}
          
          {/* ==================== TAB 3: SUBJECTS & TABLE ==================== */}
          {activeTab === "subjects" && (
            <>
              <SectionCard icon="📚" title="Subject Table Configuration" description="Customize how subjects are displayed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Table Layout">
                    <select className={inputCls()} value={subjectTable.layout} onChange={e => setSubjectTable(prev => ({ ...prev, layout: e.target.value }))}>
                      {TABLE_LAYOUTS.map(layout => <option key={layout}>{layout}</option>)}
                    </select>
                  </Field>
                  <Field label="Subject Grouping">
                    <select className={inputCls()} value={subjectTable.grouping} onChange={e => setSubjectTable(prev => ({ ...prev, grouping: e.target.value }))}>
                      {SUBJECT_GROUPINGS.map(group => <option key={group}>{group}</option>)}
                    </select>
                  </Field>
                  <Toggle checked={subjectTable.showSubjectCode} onChange={val => setSubjectTable(prev => ({ ...prev, showSubjectCode: val }))} label="Show Subject Code" />
                  <Toggle checked={subjectTable.showTeacherName} onChange={val => setSubjectTable(prev => ({ ...prev, showTeacherName: val }))} label="Show Teacher Name" />
                  <Toggle checked={subjectTable.showCABreakdown} onChange={val => setSubjectTable(prev => ({ ...prev, showCABreakdown: val }))} label="Show CA Breakdown (Quiz/Test/Assignment)" />
                  <Toggle checked={subjectTable.separateCoreElective} onChange={val => setSubjectTable(prev => ({ ...prev, separateCoreElective: val }))} label="Separate Core and Elective Subjects" />
                </div>
                
                {subjectTable.separateCoreElective && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Core Subjects Section Title">
                      <input className={inputCls()} value={subjectTable.coreSectionTitle} onChange={e => setSubjectTable(prev => ({ ...prev, coreSectionTitle: e.target.value }))} />
                    </Field>
                    <Field label="Elective Subjects Section Title">
                      <input className={inputCls()} value={subjectTable.electiveSectionTitle} onChange={e => setSubjectTable(prev => ({ ...prev, electiveSectionTitle: e.target.value }))} />
                    </Field>
                  </div>
                )}
              </SectionCard>
              
              <SectionCard icon="📋" title="Columns to Display" description="Select which columns appear in the subject table">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {SUBJECT_COLUMNS.map(column => (
                    <label key={column.id} className="flex items-center gap-2 text-sm">
                      <input 
                        type="checkbox" 
                        checked={subjectTable.columns.includes(column.id)} 
                        onChange={() => handleColumnsToggle(column.id)}
                        disabled={column.fixed}
                      />
                      <span className={column.fixed ? "font-semibold" : ""}>{column.label}</span>
                      {column.fixed && <Badge variant="info">Fixed</Badge>}
                    </label>
                  ))}
                </div>
              </SectionCard>
              
              <SectionCard icon="📊" title="Academic Information" description="Configure academic details display">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Class Display Format">
                    <select className={inputCls()} value={academicInfo.showClass} onChange={e => setAcademicInfo(prev => ({ ...prev, showClass: e.target.value }))}>
                      <option value="full">Full (e.g., Form 2 Science A)</option>
                      <option value="code">Code Only (e.g., F2-SCI-A)</option>
                      <option value="none">None</option>
                    </select>
                  </Field>
                  <Toggle checked={academicInfo.showProgramme} onChange={val => setAcademicInfo(prev => ({ ...prev, showProgramme: val }))} label="Show Programme/Course" />
                  <Toggle checked={academicInfo.showTrack} onChange={val => setAcademicInfo(prev => ({ ...prev, showTrack: val }))} label="Show Track (A/B)" />
                  <Toggle checked={academicInfo.showResidentialStatus} onChange={val => setAcademicInfo(prev => ({ ...prev, showResidentialStatus: val }))} label="Show Residential Status" />
                  <Toggle checked={academicInfo.showAttendance} onChange={val => setAcademicInfo(prev => ({ ...prev, showAttendance: val }))} label="Show Attendance Summary" />
                  <Toggle checked={academicInfo.showClassPosition} onChange={val => setAcademicInfo(prev => ({ ...prev, showClassPosition: val }))} label="Show Class Position" />
                  <Toggle checked={academicInfo.showClassAverage} onChange={val => setAcademicInfo(prev => ({ ...prev, showClassAverage: val }))} label="Show Class Average" />
                  <Toggle checked={academicInfo.showSchoolAverage} onChange={val => setAcademicInfo(prev => ({ ...prev, showSchoolAverage: val }))} label="Show School Average" />
                </div>
              </SectionCard>
            </>
          )}
          
          {/* ==================== TAB 4: GRADING ==================== */}
          {activeTab === "grading" && (
            <>
              <SectionCard icon="🎯" title="Grading System" description="Configure grading scale and boundaries">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Grading System">
                    <select className={inputCls()} value={grading.system} onChange={e => setGrading(prev => ({ ...prev, system: e.target.value }))}>
                      {GRADING_SYSTEMS.map(sys => <option key={sys}>{sys}</option>)}
                    </select>
                  </Field>
                  <Field label="GPA Calculation Method">
                    <select className={inputCls()} value={grading.gpaCalculation} onChange={e => setGrading(prev => ({ ...prev, gpaCalculation: e.target.value }))}>
                      {GPA_TYPES.map(type => <option key={type}>{type}</option>)}
                    </select>
                  </Field>
                  <Toggle checked={grading.showGradePoints} onChange={val => setGrading(prev => ({ ...prev, showGradePoints: val }))} label="Show Grade Points" />
                  <Toggle checked={grading.showSubjectPosition} onChange={val => setGrading(prev => ({ ...prev, showSubjectPosition: val }))} label="Show Subject Position/Rank" />
                </div>
              </SectionCard>
              
              <SectionCard icon="📈" title="Grade Boundaries" description="Define grade ranges and point values">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Grade</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Min %</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Max %</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Points</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {grading.gradeBoundaries.map((boundary, idx) => (
                        <tr key={boundary.grade}>
                          <td className="px-4 py-2 text-sm font-medium">{boundary.grade}</td>
                          <td className="px-4 py-2">
                            <input type="number" className="w-20 px-2 py-1 text-sm border rounded" value={boundary.min} onChange={e => handleGradeBoundaryChange(idx, 'min', e.target.value)} />
                          </td>
                          <td className="px-4 py-2">
                            <input type="number" className="w-20 px-2 py-1 text-sm border rounded" value={boundary.max} onChange={e => handleGradeBoundaryChange(idx, 'max', e.target.value)} />
                          </td>
                          <td className="px-4 py-2">
                            <input type="number" className="w-16 px-2 py-1 text-sm border rounded" value={boundary.points} onChange={e => handleGradeBoundaryChange(idx, 'points', e.target.value)} />
                          </td>
                          <td className="px-4 py-2 text-sm">{boundary.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
              
              <SectionCard icon="🏆" title="Performance Bands" description="Define overall performance categories">
                <div className="space-y-3">
                  {performance.performanceBands.map((band, idx) => (
                    <div key={band.band} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-24 font-medium">{band.band}</div>
                      <input type="number" className="w-20 px-2 py-1 text-sm border rounded" value={band.min} onChange={e => handlePerformanceBandChange(idx, 'min', e.target.value)} />
                      <span>to</span>
                      <input type="number" className="w-20 px-2 py-1 text-sm border rounded" value={band.max} onChange={e => handlePerformanceBandChange(idx, 'max', e.target.value)} />
                      <div className="flex-1" />
                      <ColorPicker value={band.color} onChange={val => handlePerformanceBandChange(idx, 'color', val)} label="" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Toggle checked={performance.showPerformanceBand} onChange={val => setPerformance(prev => ({ ...prev, showPerformanceBand: val }))} label="Show Performance Band" />
                  <Toggle checked={performance.showTotalMarks} onChange={val => setPerformance(prev => ({ ...prev, showTotalMarks: val }))} label="Show Total Marks" />
                  <Toggle checked={performance.showTotalPercentage} onChange={val => setPerformance(prev => ({ ...prev, showTotalPercentage: val }))} label="Show Total Percentage" />
                  <Toggle checked={performance.showOverallGPA} onChange={val => setPerformance(prev => ({ ...prev, showOverallGPA: val }))} label="Show Overall GPA" />
                  <Toggle checked={performance.showClassRank} onChange={val => setPerformance(prev => ({ ...prev, showClassRank: val }))} label="Show Class Rank" />
                  <Toggle checked={performance.showStreamRank} onChange={val => setPerformance(prev => ({ ...prev, showStreamRank: val }))} label="Show Stream Rank" />
                  <Toggle checked={performance.showSubjectsCount} onChange={val => setPerformance(prev => ({ ...prev, showSubjectsCount: val }))} label="Show Number of Subjects" />
                  <Toggle checked={performance.showPassedCount} onChange={val => setPerformance(prev => ({ ...prev, showPassedCount: val }))} label="Show Passed/Failed Count" />
                </div>
              </SectionCard>
            </>
          )}
          
          {/* ==================== TAB 5: COMMENTS ==================== */}
          {activeTab === "comments" && (
            <>
              <SectionCard icon="💬" title="Comments Configuration" description="Configure teacher comments section">
                <div className="space-y-4">
                  <Toggle checked={comments.showComments} onChange={val => setComments(prev => ({ ...prev, showComments: val }))} label="Show Comments Section" />
                  
                  {comments.showComments && (
                    <>
                      <Field label="Comment Type">
                        <select className={inputCls()} value={comments.commentType} onChange={e => setComments(prev => ({ ...prev, commentType: e.target.value }))}>
                          {COMMENT_TYPES.map(type => <option key={type}>{type}</option>)}
                        </select>
                      </Field>
                      
                      <Field label="Character Limit">
                        <input type="number" className={inputCls()} value={comments.characterLimit} onChange={e => setComments(prev => ({ ...prev, characterLimit: parseInt(e.target.value) }))} />
                      </Field>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Toggle checked={comments.allowMultipleTeachers} onChange={val => setComments(prev => ({ ...prev, allowMultipleTeachers: val }))} label="Allow Subject-Specific Comments" />
                        <Toggle checked={comments.showClassTeacherComment} onChange={val => setComments(prev => ({ ...prev, showClassTeacherComment: val }))} label="Show Class Teacher Comment" />
                        <Toggle checked={comments.showHeadComment} onChange={val => setComments(prev => ({ ...prev, showHeadComment: val }))} label="Show Head of School Comment" />
                        <Toggle checked={comments.showSignature} onChange={val => setComments(prev => ({ ...prev, showSignature: val }))} label="Show Signature Line" />
                      </div>
                    </>
                  )}
                </div>
              </SectionCard>
              
              <SectionCard icon="📝" title="Predefined Comment Templates" description="Manage quick comment options">
                <div className="space-y-2">
                  {comments.predefinedTemplates.map((template, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input className="flex-1 px-3 py-2 text-sm border rounded-lg" value={template} onChange={e => handleUpdateCommentTemplate(idx, e.target.value)} />
                      <button onClick={() => handleDeleteCommentTemplate(idx)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button onClick={handleAddCommentTemplate} className="mt-2 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                    + Add New Template
                  </button>
                </div>
              </SectionCard>
            </>
          )}
          
          {/* ==================== TAB 6: DESIGN & LAYOUT ==================== */}
          {activeTab === "design" && (
            <>
              <SectionCard icon="🎨" title="Styling & Colors" description="Customize the visual appearance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ColorPicker value={styling.primaryColor} onChange={val => setStyling(prev => ({ ...prev, primaryColor: val }))} label="Primary Color" />
                  <ColorPicker value={styling.secondaryColor} onChange={val => setStyling(prev => ({ ...prev, secondaryColor: val }))} label="Secondary Color" />
                  <Field label="Font Family">
                    <select className={inputCls()} value={styling.fontFamily} onChange={e => setStyling(prev => ({ ...prev, fontFamily: e.target.value }))}>
                      {FONTS.map(font => <option key={font}>{font}</option>)}
                    </select>
                  </Field>
                  <Field label="Font Size">
                    <select className={inputCls()} value={styling.fontSize} onChange={e => setStyling(prev => ({ ...prev, fontSize: e.target.value }))}>
                      {FONT_SIZES.map(size => <option key={size}>{size}</option>)}
                    </select>
                  </Field>
                  <Field label="Table Border Style">
                    <select className={inputCls()} value={styling.tableBorders} onChange={e => setStyling(prev => ({ ...prev, tableBorders: e.target.value }))}>
                      <option value="all">All Borders</option>
                      <option value="horizontal">Horizontal Only</option>
                      <option value="none">No Borders</option>
                    </select>
                  </Field>
                  <Toggle checked={styling.alternatingRowColors} onChange={val => setStyling(prev => ({ ...prev, alternatingRowColors: val }))} label="Alternating Row Colors" />
                </div>
              </SectionCard>
              
              <SectionCard icon="📄" title="Header & Footer" description="Configure report header and footer">
                <Field label="Header Text">
                  <textarea rows={2} className={inputCls()} value={headerFooter.headerText} onChange={e => setHeaderFooter(prev => ({ ...prev, headerText: e.target.value }))} placeholder="Report header text..." />
                </Field>
                <Field label="Footer Text" optional className="mt-4">
                  <textarea rows={2} className={inputCls()} value={headerFooter.footerText} onChange={e => setHeaderFooter(prev => ({ ...prev, footerText: e.target.value }))} placeholder="Report footer text..." />
                </Field>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Toggle checked={headerFooter.showDatePrinted} onChange={val => setHeaderFooter(prev => ({ ...prev, showDatePrinted: val }))} label="Show Date Printed" />
                  <Toggle checked={headerFooter.showPageNumbers} onChange={val => setHeaderFooter(prev => ({ ...prev, showPageNumbers: val }))} label="Show Page Numbers" />
                  <Field label="Border Style">
                    <select className={inputCls()} value={headerFooter.borderStyle} onChange={e => setHeaderFooter(prev => ({ ...prev, borderStyle: e.target.value }))}>
                      <option value="none">None</option>
                      <option value="thin">Thin</option>
                      <option value="thick">Thick</option>
                      <option value="double">Double</option>
                    </select>
                  </Field>
                  <Field label="Watermark (Optional)">
                    <input className={inputCls()} value={headerFooter.watermark} onChange={e => setHeaderFooter(prev => ({ ...prev, watermark: e.target.value }))} placeholder="e.g., DRAFT, SAMPLE" />
                  </Field>
                </div>
              </SectionCard>
            </>
          )}
          
          {/* ==================== TAB 7: SECTION ORDER ==================== */}
          {activeTab === "sections" && (
            <SectionCard icon="📑" title="Report Sections Order" description="Drag or reorder sections to customize layout">
              <div className="space-y-2">
                {sortedSections.map((section) => (
                  <div key={section.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="cursor-move text-gray-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="12" r="1" />
                        <circle cx="9" cy="5" r="1" />
                        <circle cx="9" cy="19" r="1" />
                        <circle cx="15" cy="12" r="1" />
                        <circle cx="15" cy="5" r="1" />
                        <circle cx="15" cy="19" r="1" />
                      </svg>
                    </div>
                    <input type="checkbox" checked={section.visible} onChange={() => handleSectionToggle(section.id)} className="w-4 h-4" />
                    <span className="flex-1 text-sm font-medium text-gray-700">{section.name}</span>
                    <div className="flex gap-1">
                      <button onClick={() => handleSectionOrder(section.id, "up")} className="p-1 text-gray-400 hover:text-gray-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      </button>
                      <button onClick={() => handleSectionOrder(section.id, "down")} className="p-1 text-gray-400 hover:text-gray-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">Tip: Sections marked as visible will appear on the report in the order shown above.</p>
            </SectionCard>
          )}
          
          {/* ==================== TAB 8: PRINT SETTINGS ==================== */}
          {activeTab === "print" && (
            <>
              <SectionCard icon="🖨️" title="Print & Export Settings" description="Configure print layout and export options">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Page Size">
                    <select className={inputCls()} value={printSettings.pageSize} onChange={e => setPrintSettings(prev => ({ ...prev, pageSize: e.target.value }))}>
                      {PAGE_SIZES.map(size => <option key={size}>{size}</option>)}
                    </select>
                  </Field>
                  <Field label="Orientation">
                    <select className={inputCls()} value={printSettings.orientation} onChange={e => setPrintSettings(prev => ({ ...prev, orientation: e.target.value }))}>
                      {ORIENTATIONS.map(orient => <option key={orient}>{orient}</option>)}
                    </select>
                  </Field>
                  <Field label="Margins">
                    <select className={inputCls()} value={printSettings.margins} onChange={e => setPrintSettings(prev => ({ ...prev, margins: e.target.value }))}>
                      {MARGINS.map(margin => <option key={margin}>{margin}</option>)}
                    </select>
                  </Field>
                  <Field label="Print Quality">
                    <select className={inputCls()} value={printSettings.printQuality} onChange={e => setPrintSettings(prev => ({ ...prev, printQuality: e.target.value }))}>
                      <option value="draft">Draft</option>
                      <option value="normal">Normal</option>
                      <option value="high">High Quality</option>
                    </select>
                  </Field>
                </div>
              </SectionCard>
              
              <SectionCard icon="✨" title="Additional Features" description="Enable extra report features">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Toggle checked={additionalFeatures.showProgressGraph} onChange={val => setAdditionalFeatures(prev => ({ ...prev, showProgressGraph: val }))} label="Show Progress Graph" />
                  <Toggle checked={additionalFeatures.showSubjectAnalysis} onChange={val => setAdditionalFeatures(prev => ({ ...prev, showSubjectAnalysis: val }))} label="Show Subject Analysis (Strengths/Weaknesses)" />
                  <Toggle checked={additionalFeatures.showNextTermGoals} onChange={val => setAdditionalFeatures(prev => ({ ...prev, showNextTermGoals: val }))} label="Show Next Term Goals" />
                  <Toggle checked={additionalFeatures.showParentSignature} onChange={val => setAdditionalFeatures(prev => ({ ...prev, showParentSignature: val }))} label="Show Parent Signature Line" />
                  <Toggle checked={additionalFeatures.showQRCode} onChange={val => setAdditionalFeatures(prev => ({ ...prev, showQRCode: val }))} label="Show QR Code (Verification)" />
                  <Toggle checked={additionalFeatures.showBarcode} onChange={val => setAdditionalFeatures(prev => ({ ...prev, showBarcode: val }))} label="Show Student Barcode" />
                </div>
              </SectionCard>
            </>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-gray-200 mt-6">
          <div className="flex gap-2">
            <button onClick={() => setShowPreview(true)} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview Report
            </button>
            <button onClick={handleExport} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Template
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
              Save Template
            </button>
          </div>
        </div>
        
        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Report Preview</h3>
                <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                {/* Preview content - simulated report layout */}
                <div className="border-2 border-gray-200 p-8" style={{ fontFamily: styling.fontFamily }}>
                  {sections.filter(s => s.visible).sort((a,b) => a.order - b.order).map(section => (
                    <div key={section.id} className="mb-6">
                      <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
                        {section.name} Preview
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-2">
                <button onClick={() => setShowPreview(false)} className="px-4 py-2 border rounded-lg">Close</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Generate Sample</button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default ReportTemplate