// src/teacher/data/teacherData.js

// ─── All possible additional roles ───────────────────────────────────────────
export const ALL_ROLES = [
  'HOD', 'Assistant HOD', 'Form Teacher', 'Year Group Coordinator',
  'House Master', 'House Mistress', 'Exam Coordinator', 'Time Tabler',
  'Sports Master', 'Sports Mistress', 'Guidance Counsellor',
  'ICT Lab Supervisor', 'Workshop Supervisor', 'Club Patron', 'WAEC Supervisor',
];

// ─── Mock teachers — one per key role combination ────────────────────────────
export const MOCK_TEACHERS = [
  // 1. Subject Teacher ONLY
  {
    id: 1, staffId: 'AFTS/TCH/001', title: 'Mr', firstName: 'Samuel', lastName: 'Boateng',
    email: 'boateng@afts.edu.gh', password: 'teacher123',
    subject: 'Core Mathematics', department: 'Mathematics',
    qualification: 'B.Ed', employmentType: 'Permanent', track: 'Both',
    additionalRoles: [],
    formClass: null, maxPeriods: 30, currentPeriods: 22,
    classes: ['Form 1A', 'Form 1B', 'Form 2A'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher Only',
  },

  // 2. Subject Teacher + Form Teacher
  {
    id: 2, staffId: 'AFTS/TCH/002', title: 'Mrs', firstName: 'Abena', lastName: 'Eshun',
    email: 'eshun@afts.edu.gh', password: 'teacher123',
    subject: 'English Language', department: 'English',
    qualification: 'B.Ed', employmentType: 'Permanent', track: 'A',
    additionalRoles: ['Form Teacher'],
    formClass: 'Form 2 Science A', maxPeriods: 30, currentPeriods: 20,
    classes: ['Form 1A', 'Form 2A', 'Form 3A'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + Form Teacher',
  },

  // 3. Subject Teacher + HOD
  {
    id: 3, staffId: 'AFTS/TCH/003', title: 'Capt', firstName: 'Emmanuel', lastName: 'Adjei',
    email: 'adjei@afts.edu.gh', password: 'teacher123',
    subject: 'Core Mathematics', department: 'Mathematics',
    qualification: 'M.Sc', employmentType: 'Permanent', track: 'Both',
    additionalRoles: ['HOD'],
    formClass: null, maxPeriods: 30, currentPeriods: 24,
    classes: ['Form 1A', 'Form 1B', 'Form 2A', 'Form 2B'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + HOD',
  },

  // 4. Subject Teacher + HOD + Form Teacher
  {
    id: 4, staffId: 'AFTS/TCH/004', title: 'Dr', firstName: 'Kwame', lastName: 'Osei',
    email: 'osei@afts.edu.gh', password: 'teacher123',
    subject: 'Integrated Science', department: 'Science',
    qualification: 'PhD', employmentType: 'Permanent', track: 'Both',
    additionalRoles: ['HOD', 'Form Teacher', 'WAEC Supervisor'],
    formClass: 'Form 3 Science B', maxPeriods: 30, currentPeriods: 28,
    classes: ['Form 1A', 'Form 1B', 'Form 2B', 'Form 3B'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + HOD + Form Teacher + WAEC Supervisor',
  },

  // 5. Subject Teacher + Assistant HOD
  {
    id: 5, staffId: 'AFTS/TCH/005', title: 'Mrs', firstName: 'Efua', lastName: 'Darko',
    email: 'darko@afts.edu.gh', password: 'teacher123',
    subject: 'Business Management', department: 'Business',
    qualification: 'M.Ed', employmentType: 'Permanent', track: 'Both',
    additionalRoles: ['Assistant HOD', 'Form Teacher'],
    formClass: 'Form 2 Business B', maxPeriods: 30, currentPeriods: 25,
    classes: ['Form 1 Bus A', 'Form 1 Bus B', 'Form 2 Bus B'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + Assistant HOD + Form Teacher',
  },

  // 6. Subject Teacher + Year Group Coordinator
  {
    id: 6, staffId: 'AFTS/TCH/006', title: 'Lt', firstName: 'Kofi', lastName: 'Asare',
    email: 'asare@afts.edu.gh', password: 'teacher123',
    subject: 'Social Studies', department: 'Social Studies',
    qualification: 'B.Ed', employmentType: 'Permanent', track: 'Both',
    additionalRoles: ['Year Group Coordinator', 'Form Teacher'],
    formClass: 'Form 1 Arts A', maxPeriods: 30, currentPeriods: 18,
    yearGroup: 'Form 1',
    classes: ['Form 1A', 'Form 1B', 'Form 1C'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + Year Group Coordinator + Form Teacher',
  },

  // 7. Subject Teacher + Exam Coordinator
  {
    id: 7, staffId: 'AFTS/TCH/007', title: 'WOI', firstName: 'Ama', lastName: 'Mensah',
    email: 'mensah@afts.edu.gh', password: 'teacher123',
    subject: 'Elective Mathematics', department: 'Mathematics',
    qualification: 'B.Sc', employmentType: 'Permanent', track: 'Both',
    additionalRoles: ['Exam Coordinator', 'WAEC Supervisor'],
    formClass: null, maxPeriods: 30, currentPeriods: 20,
    classes: ['Form 2 Sci A', 'Form 2 Sci B', 'Form 3 Sci A'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + Exam Coordinator + WAEC Supervisor',
  },

  // 8. Subject Teacher + House Master
  {
    id: 8, staffId: 'AFTS/TCH/008', title: 'Sgt', firstName: 'Yaw', lastName: 'Frimpong',
    email: 'frimpong@afts.edu.gh', password: 'teacher123',
    subject: 'Physical Education', department: 'Physical Education',
    qualification: 'B.Ed', employmentType: 'Permanent', track: 'Both',
    additionalRoles: ['House Master', 'Sports Master'],
    formClass: null,
    houseName: 'Warrior House', houseStudents: 120,
    maxPeriods: 24, currentPeriods: 16,
    classes: ['Form 1A', 'Form 2A'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + House Master + Sports Master',
  },

  // 9. Subject Teacher + Guidance Counsellor
  {
    id: 9, staffId: 'AFTS/TCH/009', title: 'Mrs', firstName: 'Grace', lastName: 'Ampofo',
    email: 'ampofo@afts.edu.gh', password: 'teacher123',
    subject: 'Chemistry', department: 'Science',
    qualification: 'M.Ed', employmentType: 'Permanent', track: 'Both',
    additionalRoles: ['Guidance Counsellor', 'Form Teacher'],
    formClass: 'Form 2 Science A', maxPeriods: 30, currentPeriods: 18,
    classes: ['Form 1 Sci A', 'Form 2 Sci A'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + Guidance Counsellor + Form Teacher',
  },

  // 10. Subject Teacher + Workshop Supervisor
  {
    id: 10, staffId: 'AFTS/TCH/010', title: 'Cpt', firstName: 'Nana', lastName: 'Owusu',
    email: 'owusu@afts.edu.gh', password: 'teacher123',
    subject: 'Technical Drawing', department: 'Technical',
    qualification: 'HND', employmentType: 'Permanent', track: 'A',
    additionalRoles: ['HOD', 'Workshop Supervisor'],
    formClass: null,
    workshopName: 'Technical Workshop A', workshopCapacity: 30,
    maxPeriods: 30, currentPeriods: 26,
    classes: ['Form 1 Tech A', 'Form 2 Tech A', 'Form 3 Tech A'],
    redirectTo: '/teacher',
    roleDescription: 'Subject Teacher + HOD + Workshop Supervisor',
  },
];

// ─── Term & Track Info ────────────────────────────────────────────────────────
export const TERM_INFO = {
  academicYear: '2024/2025',
  term: 'Term 2',
  track: 'A',
  startDate: '2025-01-06',
  endDate: '2025-04-11',
  weeksTotal: 14,
  weeksGone: 9,
  trackBSchedule: 'Track B resumes: April 14, 2025',
};

// ─── Classes ──────────────────────────────────────────────────────────────────
export const CLASSES_DATA = [
  { id: 1, name: 'Form 1A', program: 'General Science', track: 'A', students: 42, subject: 'Integrated Science', caSubmitted: true,  examSubmitted: false, caAvg: 24.8, examAvg: null, attendanceRate: 94 },
  { id: 2, name: 'Form 1B', program: 'General Science', track: 'A', students: 40, subject: 'Integrated Science', caSubmitted: true,  examSubmitted: false, caAvg: 22.1, examAvg: null, attendanceRate: 91 },
  { id: 3, name: 'Form 2B', program: 'General Science', track: 'B', students: 38, subject: 'Integrated Science', caSubmitted: false, examSubmitted: false, caAvg: null,  examAvg: null, attendanceRate: 88 },
  { id: 4, name: 'Form 3B', program: 'General Science', track: 'B', students: 36, subject: 'Integrated Science', caSubmitted: true,  examSubmitted: true,  caAvg: 26.4, examAvg: 58.2, attendanceRate: 96, isFormClass: true },
];

// ─── Form class students ──────────────────────────────────────────────────────
export const FORM_CLASS_STUDENTS = [
  { id: 1, name: 'Kofi Asante',    studentId: 'AFTS/2024/031', gender: 'Male',   ca: 28, exam: 62, total: 90, grade: 'A1', attendance: 96  },
  { id: 2, name: 'Ama Darko',      studentId: 'AFTS/2024/032', gender: 'Female', ca: 26, exam: 58, total: 84, grade: 'A1', attendance: 100 },
  { id: 3, name: 'Yaw Mensah',     studentId: 'AFTS/2024/033', gender: 'Male',   ca: 24, exam: 50, total: 74, grade: 'B3', attendance: 88  },
  { id: 4, name: 'Efua Boateng',   studentId: 'AFTS/2024/034', gender: 'Female', ca: 22, exam: 45, total: 67, grade: 'B3', attendance: 92  },
  { id: 5, name: 'Nana Owusu',     studentId: 'AFTS/2024/035', gender: 'Male',   ca: 20, exam: 42, total: 62, grade: 'C4', attendance: 84  },
  { id: 6, name: 'Abena Frimpong', studentId: 'AFTS/2024/036', gender: 'Female', ca: 27, exam: 60, total: 87, grade: 'A1', attendance: 98  },
];

// ─── Department teachers (HOD view) ──────────────────────────────────────────
export const DEPT_TEACHERS = [
  { name: 'Dr Kwame Osei',    subject: 'Integrated Science', classes: 4, load: 93, status: 'active' },
  { name: 'Cpt Samuel Adjei', subject: 'Physics',            classes: 3, load: 80, status: 'active' },
  { name: 'Mrs Grace Ampofo', subject: 'Chemistry',          classes: 3, load: 75, status: 'active' },
  { name: 'Mr Ebo Mensah',    subject: 'Biology',            classes: 4, load: 87, status: 'active' },
  { name: 'Lt Esi Tawiah',    subject: 'Elective Maths',     classes: 2, load: 60, status: 'active' },
];

// ─── Year group data (Year Group Coordinator view) ────────────────────────────
export const YEAR_GROUP_DATA = {
  yearGroup: 'Form 1',
  totalStudents: 320,
  totalClasses: 8,
  formTeachers: [
    { name: 'Mrs Abena Eshun',  class: 'Form 1A', students: 42, attendance: 94, caSubmitted: true  },
    { name: 'Lt Kofi Asare',    class: 'Form 1B', students: 40, attendance: 91, caSubmitted: true  },
    { name: 'Mr Ebo Mensah',    class: 'Form 1C', students: 38, attendance: 88, caSubmitted: false },
    { name: 'Sgt Yaw Frimpong', class: 'Form 1D', students: 40, attendance: 90, caSubmitted: true  },
    { name: 'Mrs Efua Darko',   class: 'Form 1E', students: 42, attendance: 93, caSubmitted: false },
    { name: 'WOI Ama Mensah',   class: 'Form 1F', students: 38, attendance: 87, caSubmitted: true  },
    { name: 'Mr Samuel Boateng',class: 'Form 1G', students: 40, attendance: 92, caSubmitted: true  },
    { name: 'Mrs Grace Ampofo', class: 'Form 1H', students: 40, attendance: 89, caSubmitted: false },
  ],
};

// ─── Exam coordinator data ────────────────────────────────────────────────────
export const EXAM_DATA = {
  currentExam: 'Term 2 End of Term Examination',
  startDate: '2025-03-24',
  endDate: '2025-04-04',
  totalSubjects: 24,
  totalClasses: 42,
  subjects: [
    { name: 'Core Mathematics',   code: 'MTH101', date: '2025-03-24', time: '08:00', duration: '2h 30m', status: 'scheduled',  submittedScores: 0,  totalClasses: 6 },
    { name: 'English Language',   code: 'ENG101', date: '2025-03-25', time: '08:00', duration: '2h',     status: 'scheduled',  submittedScores: 0,  totalClasses: 6 },
    { name: 'Integrated Science', code: 'SCI101', date: '2025-03-26', time: '08:00', duration: '2h',     status: 'scheduled',  submittedScores: 0,  totalClasses: 6 },
    { name: 'Social Studies',     code: 'SST101', date: '2025-03-27', time: '08:00', duration: '1h 30m', status: 'scheduled',  submittedScores: 0,  totalClasses: 6 },
    { name: 'ICT',                code: 'ICT101', date: '2025-03-28', time: '10:00', duration: '2h',     status: 'scheduled',  submittedScores: 0,  totalClasses: 6 },
    { name: 'Physics',            code: 'PHY101', date: '2025-03-31', time: '08:00', duration: '2h',     status: 'scheduled',  submittedScores: 0,  totalClasses: 3 },
    { name: 'Chemistry',          code: 'CHM101', date: '2025-04-01', time: '08:00', duration: '2h',     status: 'scheduled',  submittedScores: 0,  totalClasses: 3 },
    { name: 'Biology',            code: 'BIO101', date: '2025-04-02', time: '08:00', duration: '2h',     status: 'scheduled',  submittedScores: 0,  totalClasses: 3 },
  ],
  pendingScores: [
    { teacher: 'Mr Samuel Boateng', subject: 'Core Mathematics', class: 'Form 1A', deadline: '2025-04-07' },
    { teacher: 'Mrs Abena Eshun',   subject: 'English Language', class: 'Form 2A', deadline: '2025-04-07' },
    { teacher: 'Mr Ebo Mensah',     subject: 'Biology',          class: 'Form 1C', deadline: '2025-04-07' },
  ],
};

// ─── House data (House Master view) ──────────────────────────────────────────
export const HOUSE_DATA = {
  houseName: 'Warrior House',
  houseColor: '#E63946',
  totalStudents: 120,
  boys: 72, girls: 48,
  floors: 3, rooms: 24,
  students: [
    { id: 1, name: 'Kofi Asante',    class: 'Form 1A', room: 'A1', status: 'present', fees: 'paid'    },
    { id: 2, name: 'Yaw Mensah',     class: 'Form 2B', room: 'A2', status: 'present', fees: 'paid'    },
    { id: 3, name: 'Nana Owusu',     class: 'Form 3A', room: 'B1', status: 'absent',  fees: 'pending' },
    { id: 4, name: 'Kwame Frimpong', class: 'Form 1B', room: 'B2', status: 'present', fees: 'paid'    },
    { id: 5, name: 'Ebo Darko',      class: 'Form 2A', room: 'C1', status: 'present', fees: 'overdue' },
    { id: 6, name: 'Ato Boateng',    class: 'Form 3B', room: 'C2', status: 'sick',    fees: 'paid'    },
  ],
  incidents: [
    { date: '2025-03-10', student: 'Nana Owusu',  type: 'Absence',     action: 'Parents notified' },
    { date: '2025-03-08', student: 'Ebo Darko',   type: 'Fees Overdue', action: 'Reminder sent'   },
    { date: '2025-03-05', student: 'Ato Boateng', type: 'Medical',     action: 'Taken to sick bay' },
  ],
};

// ─── Counsellor data ──────────────────────────────────────────────────────────
export const COUNSELLOR_DATA = {
  totalSessions: 24,
  pendingFollowUps: 5,
  cases: [
    { id: 1, studentName: 'Nana Owusu',     class: 'Form 1A', issue: 'Academic anxiety',      status: 'ongoing',  sessions: 3, nextSession: '2025-03-20', priority: 'medium' },
    { id: 2, studentName: 'Ebo Darko',      class: 'Form 2B', issue: 'Peer conflict',          status: 'resolved', sessions: 2, nextSession: null,          priority: 'low'    },
    { id: 3, studentName: 'Efua Mensah',    class: 'Form 3A', issue: 'Family issues',          status: 'ongoing',  sessions: 5, nextSession: '2025-03-22', priority: 'high'   },
    { id: 4, studentName: 'Ato Frimpong',   class: 'Form 1B', issue: 'Career guidance',        status: 'ongoing',  sessions: 1, nextSession: '2025-03-21', priority: 'low'    },
    { id: 5, studentName: 'Yaa Boateng',    class: 'Form 2A', issue: 'Attention difficulties', status: 'referred', sessions: 4, nextSession: null,          priority: 'high'   },
  ],
  appointments: [
    { time: '09:00', student: 'Nana Owusu',  type: 'Follow-up session',   date: '2025-03-20' },
    { time: '11:00', student: 'Efua Mensah', type: 'Family support',      date: '2025-03-22' },
    { time: '14:00', student: 'Ato Frimpong',type: 'Career guidance',     date: '2025-03-21' },
  ],
};

// ─── WAEC data ────────────────────────────────────────────────────────────────
export const WAEC_DATA = {
  examYear: '2025',
  examTitle: 'West African Senior School Certificate Examination (WASSCE)',
  candidates: 186,
  examCentre: 'AFTS — Centre No. GH0042',
  subjects: [
    { code: 'MTH2', name: 'Core Mathematics',   paper: 'Paper 1 & 2', date: '2025-05-12', time: '08:30', invigilators: ['Capt Adjei', 'Mrs Eshun'],    venue: 'Hall A', status: 'scheduled' },
    { code: 'ENG2', name: 'English Language',   paper: 'Paper 1 & 2', date: '2025-05-13', time: '08:30', invigilators: ['Lt Asare', 'Mrs Darko'],      venue: 'Hall B', status: 'scheduled' },
    { code: 'SCI2', name: 'Integrated Science', paper: 'Paper 1 & 2', date: '2025-05-14', time: '08:30', invigilators: ['Dr Osei', 'Mrs Ampofo'],      venue: 'Hall A', status: 'scheduled' },
    { code: 'SST2', name: 'Social Studies',     paper: 'Paper 1',     date: '2025-05-15', time: '08:30', invigilators: ['WOI Mensah', 'Sgt Frimpong'], venue: 'Hall C', status: 'scheduled' },
    { code: 'PHY2', name: 'Physics',            paper: 'Paper 1 & 2', date: '2025-05-16', time: '08:30', invigilators: ['Cpt Owusu', 'Capt Adjei'],    venue: 'Lab 1',  status: 'scheduled' },
  ],
  invigilationDuties: [
    { date: '2025-05-12', subject: 'Core Mathematics',   venue: 'Hall A', role: 'Chief Invigilator', time: '07:30' },
    { date: '2025-05-14', subject: 'Integrated Science', venue: 'Hall A', role: 'Assistant',         time: '07:30' },
    { date: '2025-05-16', subject: 'Physics',            venue: 'Lab 1',  role: 'Chief Invigilator', time: '07:30' },
  ],
};

// ─── Workshop data ────────────────────────────────────────────────────────────
export const WORKSHOP_DATA = {
  workshopName: 'Technical Workshop A',
  capacity: 30,
  equipment: [
    { name: 'Workbenches',      total: 15, functional: 15, faulty: 0  },
    { name: 'Drill Machines',   total: 8,  functional: 6,  faulty: 2  },
    { name: 'Lathe Machines',   total: 4,  functional: 3,  faulty: 1  },
    { name: 'Welding Sets',     total: 6,  functional: 6,  faulty: 0  },
    { name: 'Safety Goggles',   total: 30, functional: 28, faulty: 2  },
    { name: 'Fire Extinguisher',total: 4,  functional: 4,  faulty: 0  },
  ],
  schedule: [
    { class: 'Form 1 Tech A', day: 'Monday',    time: '08:00–10:00', activity: 'Technical Drawing Practicals'  },
    { class: 'Form 2 Tech A', day: 'Tuesday',   time: '10:00–12:00', activity: 'Metalwork Practicals'          },
    { class: 'Form 3 Tech A', day: 'Wednesday', time: '08:00–10:00', activity: 'Applied Electricity Practicals'},
    { class: 'Form 1 Tech A', day: 'Thursday',  time: '10:00–12:00', activity: 'Woodwork Practicals'           },
    { class: 'Form 2 Tech A', day: 'Friday',    time: '08:00–10:00', activity: 'Building Construction'        },
  ],
  incidents: [
    { date: '2025-03-08', type: 'Equipment Fault', description: 'Drill machine #2 overheated', action: 'Sent for repair' },
    { date: '2025-02-20', type: 'Minor Injury',     description: 'Student cut finger on metal edge', action: 'First aid applied, parents informed' },
  ],
};

// ─── Sports data ──────────────────────────────────────────────────────────────
export const SPORTS_DATA = {
  teams: [
    { name: 'Football (Boys)',  sport: 'Football',   members: 18, coach: 'Sgt Frimpong', nextMatch: '2025-03-22', record: 'W3 D1 L1' },
    { name: 'Volleyball (Girls)', sport: 'Volleyball', members: 12, coach: 'Mrs Asare',   nextMatch: '2025-03-25', record: 'W4 D0 L0' },
    { name: 'Athletics',        sport: 'Athletics',  members: 24, coach: 'Sgt Frimpong', nextMatch: '2025-04-01', record: 'N/A'       },
    { name: 'Basketball',       sport: 'Basketball', members: 10, coach: 'Lt Owusu',     nextMatch: '2025-03-28', record: 'W2 D0 L2' },
  ],
  upcomingEvents: [
    { event: 'Inter-House Sports', date: '2025-04-05', venue: 'School Field',     type: 'Internal' },
    { event: 'Zone 3 Athletics',   date: '2025-04-12', venue: 'Accra Stadium',    type: 'External' },
    { event: 'Regional Football',  date: '2025-04-20', venue: 'Burma Camp Field', type: 'External' },
  ],
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const NOTIFICATIONS = [
  { id: 1, type: 'warning', message: 'CA scores for Form 2B not yet submitted. Deadline: Friday.', time: '2 hours ago' },
  { id: 2, type: 'info',    message: 'Term 2 exam timetable has been published by the Exam Coordinator.', time: '1 day ago' },
  { id: 3, type: 'success', message: 'Form 3B report cards approved by Headmaster.', time: '2 days ago' },
  { id: 4, type: 'info',    message: 'HOD meeting scheduled for Friday 10:00 AM — Science Block.', time: '3 days ago' },
];

// ─── Score entry students ─────────────────────────────────────────────────────
export const SCORE_ENTRY_STUDENTS = [
  { id: 1, studentId: 'AFTS/2024/001', name: 'Kofi Asante',  ca: 27, exam: '' },
  { id: 2, studentId: 'AFTS/2024/002', name: 'Ama Owusu',    ca: 25, exam: '' },
  { id: 3, studentId: 'AFTS/2024/003', name: 'Yaw Boateng',  ca: 28, exam: '' },
  { id: 4, studentId: 'AFTS/2024/004', name: 'Efua Mensah',  ca: 22, exam: '' },
  { id: 5, studentId: 'AFTS/2024/005', name: 'Nana Adjei',   ca: 26, exam: '' },
  { id: 6, studentId: 'AFTS/2024/006', name: 'Abena Tetteh', ca: 24, exam: '' },
];

// ─── Attendance students ──────────────────────────────────────────────────────
export const ATTENDANCE_STUDENTS = [
  { id: 1, name: 'Kofi Asante',  studentId: 'AFTS/2024/001', status: 'present' },
  { id: 2, name: 'Ama Owusu',    studentId: 'AFTS/2024/002', status: 'present' },
  { id: 3, name: 'Yaw Boateng',  studentId: 'AFTS/2024/003', status: 'absent'  },
  { id: 4, name: 'Efua Mensah',  studentId: 'AFTS/2024/004', status: 'present' },
  { id: 5, name: 'Nana Adjei',   studentId: 'AFTS/2024/005', status: 'late'    },
  { id: 6, name: 'Abena Tetteh', studentId: 'AFTS/2024/006', status: 'present' },
];

// ─── Comment templates ────────────────────────────────────────────────────────
export const COMMENT_TEMPLATES = [
  'Excellent performance! Shows outstanding discipline and academic commitment.',
  'Good effort. Demonstrates steady improvement throughout the term.',
  'Satisfactory work. With more focus, significant improvement is achievable.',
  'Shows potential but needs to put in more effort in practical assessments.',
  'Below expected level. Requires extra tutorials and close supervision.',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getGradeColor = (grade) => {
  const map = {
    A1: 'text-green-600 bg-green-50', B2: 'text-blue-600 bg-blue-50',
    B3: 'text-blue-500 bg-blue-50',   C4: 'text-yellow-600 bg-yellow-50',
    C5: 'text-orange-500 bg-orange-50', C6: 'text-orange-600 bg-orange-50',
    D7: 'text-red-500 bg-red-50',     E8: 'text-red-600 bg-red-50',
    F9: 'text-red-700 bg-red-50',
  };
  return map[grade] || 'text-gray-600 bg-gray-50';
};

export const getGradeFromTotal = (total) => {
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