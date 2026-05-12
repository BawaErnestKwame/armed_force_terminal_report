// src/student/data/studentData.js

export const TERM_INFO = {
  academicYear: '2024/2025',
  term: 'Term 2',
  track: 'A',
  startDate: '2025-01-06',
  endDate: '2025-04-11',
  weeksTotal: 14,
  weeksGone: 9,
};

// Mock students (matched to AuthContext)
export const MOCK_STUDENTS = [
  {
    id: 201,
    studentId: 'AFTS/2024/031',
    role: 'student',
    firstName: 'Kofi',
    lastName: 'Asante',
    email: 'kofi@afts.edu.gh',
    password: 'student123',
    gender: 'Male',
    dateOfBirth: '2007-03-15',
    program: 'General Science',
    formClass: 'Form 2 Science A',
    track: 'A',
    houseName: 'Warrior House',
    year: 'Form 2',
    photo: null,
    parentName: 'Mr Emmanuel Asante',
    parentPhone: '0244123456',
    parentEmail: 'e.asante@gmail.com',
    address: 'Burma Camp, Accra',
    redirectTo: '/student',
  },
  
  {
    id: 202,
    studentId: 'AFTS/2024/045',
    role: 'student',
    firstName: 'Ama',
    lastName: 'Owusu',
    email: 'ama@afts.edu.gh',
    password: 'student123',
    gender: 'Female',
    dateOfBirth: '2007-08-22',
    program: 'General Arts',
    formClass: 'Form 2 Arts B',
    track: 'B',
    houseName: 'Eagle House',
    year: 'Form 2',
    photo: null,
    parentName: 'Mrs Grace Owusu',
    parentPhone: '0277654321',
    parentEmail: 'g.owusu@gmail.com',
    address: 'East Legon, Accra',
    redirectTo: '/student',
  },
];

// ─── Current term results ─────────────────────────────────────────────────────
export const CURRENT_RESULTS = {
  academicYear: '2024/2025',
  term: 'Term 2',
  track: 'A',
  position: 4,
  totalStudents: 42,
  subjects: [
    { name: 'Core Mathematics',   code: 'MTH101', type: 'Core',     ca: 28, exam: 62, total: 90, grade: 'A1', points: 1, teacher: 'Capt Adjei'   },
    { name: 'English Language',   code: 'ENG101', type: 'Core',     ca: 26, exam: 58, total: 84, grade: 'A1', points: 1, teacher: 'Mrs Eshun'    },
    { name: 'Integrated Science', code: 'SCI101', type: 'Core',     ca: 24, exam: 54, total: 78, grade: 'B2', points: 2, teacher: 'Dr Osei'      },
    { name: 'Social Studies',     code: 'SST101', type: 'Core',     ca: 22, exam: 50, total: 72, grade: 'B3', points: 3, teacher: 'Lt Asare'     },
    { name: 'ICT',                code: 'ICT101', type: 'Core',     ca: 25, exam: 55, total: 80, grade: 'A1', points: 1, teacher: 'Sgt Frimpong' },
    { name: 'Physics',            code: 'PHY101', type: 'Elective', ca: 27, exam: 60, total: 87, grade: 'A1', points: 1, teacher: 'Cpt Adjei'    },
    { name: 'Chemistry',          code: 'CHM101', type: 'Elective', ca: 23, exam: 52, total: 75, grade: 'B2', points: 2, teacher: 'Mrs Ampofo'   },
    { name: 'Biology',            code: 'BIO101', type: 'Elective', ca: 21, exam: 48, total: 69, grade: 'B3', points: 3, teacher: 'Mr Mensah'    },
  ],
};

// ─── Previous terms ───────────────────────────────────────────────────────────
export const PREVIOUS_RESULTS = [
  {
    academicYear: '2024/2025',
    term: 'Term 1',
    track: 'B',
    position: 6,
    totalStudents: 42,
    subjects: [
      { name: 'Core Mathematics',   code: 'MTH101', type: 'Core',     ca: 25, exam: 58, total: 83, grade: 'A1', points: 1 },
      { name: 'English Language',   code: 'ENG101', type: 'Core',     ca: 24, exam: 54, total: 78, grade: 'B2', points: 2 },
      { name: 'Integrated Science', code: 'SCI101', type: 'Core',     ca: 22, exam: 50, total: 72, grade: 'B3', points: 3 },
      { name: 'Social Studies',     code: 'SST101', type: 'Core',     ca: 20, exam: 46, total: 66, grade: 'B3', points: 3 },
      { name: 'ICT',                code: 'ICT101', type: 'Core',     ca: 23, exam: 52, total: 75, grade: 'B2', points: 2 },
      { name: 'Physics',            code: 'PHY101', type: 'Elective', ca: 24, exam: 56, total: 80, grade: 'A1', points: 1 },
      { name: 'Chemistry',          code: 'CHM101', type: 'Elective', ca: 21, exam: 48, total: 69, grade: 'B3', points: 3 },
      { name: 'Biology',            code: 'BIO101', type: 'Elective', ca: 19, exam: 44, total: 63, grade: 'C4', points: 4 },
    ],
  },
  {
    academicYear: '2023/2024',
    term: 'Term 3',
    track: 'A',
    position: 8,
    totalStudents: 40,
    subjects: [
      { name: 'Core Mathematics',   code: 'MTH101', type: 'Core',     ca: 22, exam: 54, total: 76, grade: 'B2', points: 2 },
      { name: 'English Language',   code: 'ENG101', type: 'Core',     ca: 21, exam: 50, total: 71, grade: 'B3', points: 3 },
      { name: 'Integrated Science', code: 'SCI101', type: 'Core',     ca: 19, exam: 46, total: 65, grade: 'B3', points: 3 },
      { name: 'Social Studies',     code: 'SST101', type: 'Core',     ca: 18, exam: 44, total: 62, grade: 'C4', points: 4 },
      { name: 'ICT',                code: 'ICT101', type: 'Core',     ca: 20, exam: 48, total: 68, grade: 'B3', points: 3 },
      { name: 'Physics',            code: 'PHY101', type: 'Elective', ca: 21, exam: 50, total: 71, grade: 'B3', points: 3 },
      { name: 'Chemistry',          code: 'CHM101', type: 'Elective', ca: 18, exam: 44, total: 62, grade: 'C4', points: 4 },
      { name: 'Biology',            code: 'BIO101', type: 'Elective', ca: 16, exam: 40, total: 56, grade: 'C5', points: 5 },
    ],
  },
];

// ─── Attendance records ───────────────────────────────────────────────────────
export const ATTENDANCE_SUMMARY = {
  totalDays: 45,
  present: 42,
  absent: 2,
  late: 1,
  excused: 0,
};

export const ATTENDANCE_RECORDS = [
  { date: '2025-03-17', day: 'Monday',    status: 'present', remark: ''                    },
  { date: '2025-03-14', day: 'Friday',    status: 'present', remark: ''                    },
  { date: '2025-03-13', day: 'Thursday',  status: 'absent',  remark: 'No reason given'     },
  { date: '2025-03-12', day: 'Wednesday', status: 'present', remark: ''                    },
  { date: '2025-03-11', day: 'Tuesday',   status: 'late',    remark: 'Arrived 15 mins late'},
  { date: '2025-03-10', day: 'Monday',    status: 'present', remark: ''                    },
  { date: '2025-03-07', day: 'Friday',    status: 'present', remark: ''                    },
  { date: '2025-03-06', day: 'Thursday',  status: 'present', remark: ''                    },
  { date: '2025-03-05', day: 'Wednesday', status: 'present', remark: ''                    },
  { date: '2025-03-04', day: 'Tuesday',   status: 'present', remark: ''                    },
  { date: '2025-03-03', day: 'Monday',    status: 'absent',  remark: 'Sick — medical note' },
  { date: '2025-02-28', day: 'Friday',    status: 'present', remark: ''                    },
  { date: '2025-02-27', day: 'Thursday',  status: 'present', remark: ''                    },
  { date: '2025-02-26', day: 'Wednesday', status: 'present', remark: ''                    },
  { date: '2025-02-25', day: 'Tuesday',   status: 'present', remark: ''                    },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const STUDENT_NOTIFICATIONS = [
  { id: 1, type: 'info',    message: 'Term 2 End of Term Exams begin on March 24. Prepare accordingly.', time: '2 days ago'  },
  { id: 2, type: 'success', message: 'Your Term 1 report card is now available. Visit the Report Card section.', time: '1 week ago' },
  { id: 3, type: 'warning', message: 'Your attendance is below 95%. Please ensure regular attendance.',   time: '1 week ago' },
  { id: 4, type: 'info',    message: 'Track B resumes April 14, 2025. Term 2 ends April 11.',             time: '2 weeks ago'},
];

// ─── Teacher comments for report card ────────────────────────────────────────
export const REPORT_COMMENTS = {
  formTeacher: 'Kofi is a focused and disciplined student who consistently demonstrates academic commitment. He is encouraged to pay more attention to his elective subjects to improve his overall performance. His conduct and punctuality are commendable.',
  headmaster: 'A hardworking student with great potential. Keep up the good work and maintain your dedication throughout the remaining terms.',
  conduct: 'Excellent',
  punctuality: 'Good',
  nextTermBegins: '2025-04-14',
};

// ─── Timetable ────────────────────────────────────────────────────────────────
export const TIMETABLE = {
  'Monday':    ['Core Maths', 'English', 'Physics', 'ICT',          'Social Studies', 'Chemistry'   ],
  'Tuesday':   ['Biology',    'English', 'Core Maths', 'Physics',   'ICT',            'Free Period' ],
  'Wednesday': ['Chemistry',  'Social Studies', 'English', 'Biology', 'Core Maths',   'Int. Science'],
  'Thursday':  ['Physics',    'ICT',     'Biology',   'Chemistry',  'English',        'Core Maths'  ],
  'Friday':    ['Int. Science','Core Maths','Social Studies','English','Physics',      'Assembly'    ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getGradeColor = (grade) => {
  const map = {
    A1: 'text-green-700 bg-green-50',  B2: 'text-blue-700 bg-blue-50',
    B3: 'text-blue-600 bg-blue-50',    C4: 'text-yellow-700 bg-yellow-50',
    C5: 'text-orange-600 bg-orange-50',C6: 'text-orange-700 bg-orange-50',
    D7: 'text-red-500 bg-red-50',      E8: 'text-red-600 bg-red-50',
    F9: 'text-red-700 bg-red-50',
  };
  return map[grade] || 'text-gray-600 bg-gray-50';
};

export const getGradeLabel = (grade) => {
  const map = {
    A1: 'Excellent', B2: 'Very Good', B3: 'Good',
    C4: 'Credit',    C5: 'Credit',    C6: 'Credit',
    D7: 'Pass',      E8: 'Weak Pass', F9: 'Fail',
  };
  return map[grade] || '';
};

export const getPerformanceBand = (pct) => {
  if (pct >= 80) return { label: 'Distinction',    color: 'var(--success-dark)' };
  if (pct >= 70) return { label: 'Merit',          color: 'var(--info)'         };
  if (pct >= 60) return { label: 'Credit',         color: 'var(--royal-blue)'   };
  if (pct >= 50) return { label: 'Pass',           color: 'var(--warning)'      };
  return              { label: 'Below Average',  color: 'var(--accent-red)'   };
};

export const getAttendanceColor = (pct) => {
  if (pct >= 95) return 'var(--success-dark)';
  if (pct >= 85) return 'var(--warning)';
  return 'var(--accent-red)';
};

export const STATUS_STYLE = {
  present: { bg: '#f0fdf4', color: 'var(--success-dark)', label: 'Present' },
  absent:  { bg: '#fff1f2', color: 'var(--accent-red)',   label: 'Absent'  },
  late:    { bg: '#fffbeb', color: 'var(--warning)',       label: 'Late'    },
  excused: { bg: '#eef2ff', color: 'var(--royal-blue)',    label: 'Excused' },
};