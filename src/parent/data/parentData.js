// src/parent/data/parentData.js

// ─── Mock parents ─────────────────────────────────────────────────────────────
export const MOCK_PARENTS = [
  {
    id: 301,
    role: 'parent',
    title: 'Mr',
    firstName: 'Emmanuel',
    lastName: 'Asante',
    email: 'parent@afts.edu.gh',
    password: 'parent123',
    phone: '0244123456',
    occupation: 'Civil Engineer',
    address: 'Burma Camp, Accra',
    redirectTo: '/parent',
    children: ['AFTS/2024/031', 'AFTS/2024/087'],
  },
  {
    id: 302,
    role: 'parent',
    title: 'Mrs',
    firstName: 'Grace',
    lastName: 'Mensah',
    email: 'grace@afts.edu.gh',
    password: 'parent123',
    phone: '0277654321',
    occupation: 'Nurse',
    address: 'East Legon, Accra',
    redirectTo: '/parent',
    children: ['AFTS/2024/045'],
  },
];

// ─── Children data (linked to parent by studentId) ────────────────────────────
export const CHILDREN_DATA = {
  'AFTS/2024/031': {
    studentId:  'AFTS/2024/031',
    firstName:  'Kofi',
    lastName:   'Asante',
    gender:     'Male',
    dateOfBirth:'2007-03-15',
    formClass:  'Form 2 Science A',
    program:    'General Science',
    track:      'A',
    year:       'Form 2',
    houseName:  'Warrior House',
    photo:      null,
    results: {
      current: {
        academicYear: '2024/2025',
        term: 'Term 2',
        position: 4,
        totalStudents: 42,
        subjects: [
          { name: 'Core Mathematics',   type: 'Core',     ca: 28, exam: 62, total: 90, grade: 'A1', points: 1 },
          { name: 'English Language',   type: 'Core',     ca: 26, exam: 58, total: 84, grade: 'A1', points: 1 },
          { name: 'Integrated Science', type: 'Core',     ca: 24, exam: 54, total: 78, grade: 'B2', points: 2 },
          { name: 'Social Studies',     type: 'Core',     ca: 22, exam: 50, total: 72, grade: 'B3', points: 3 },
          { name: 'ICT',                type: 'Core',     ca: 25, exam: 55, total: 80, grade: 'A1', points: 1 },
          { name: 'Physics',            type: 'Elective', ca: 27, exam: 60, total: 87, grade: 'A1', points: 1 },
          { name: 'Chemistry',          type: 'Elective', ca: 23, exam: 52, total: 75, grade: 'B2', points: 2 },
          { name: 'Biology',            type: 'Elective', ca: 21, exam: 48, total: 69, grade: 'B3', points: 3 },
        ],
      },
      previous: [
        {
          academicYear: '2024/2025',
          term: 'Term 1',
          position: 6,
          totalStudents: 42,
          subjects: [
            { name: 'Core Mathematics',   type: 'Core',     ca: 25, exam: 58, total: 83, grade: 'A1', points: 1 },
            { name: 'English Language',   type: 'Core',     ca: 24, exam: 54, total: 78, grade: 'B2', points: 2 },
            { name: 'Integrated Science', type: 'Core',     ca: 22, exam: 50, total: 72, grade: 'B3', points: 3 },
            { name: 'Social Studies',     type: 'Core',     ca: 20, exam: 46, total: 66, grade: 'B3', points: 3 },
            { name: 'ICT',                type: 'Core',     ca: 23, exam: 52, total: 75, grade: 'B2', points: 2 },
            { name: 'Physics',            type: 'Elective', ca: 24, exam: 56, total: 80, grade: 'A1', points: 1 },
            { name: 'Chemistry',          type: 'Elective', ca: 21, exam: 48, total: 69, grade: 'B3', points: 3 },
            { name: 'Biology',            type: 'Elective', ca: 19, exam: 44, total: 63, grade: 'C4', points: 4 },
          ],
        },
      ],
    },
    attendance: {
      summary: { totalDays: 45, present: 42, absent: 2, late: 1 },
      records: [
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
      ],
    },
    reportComments: {
      formTeacher: 'Kofi is a focused and disciplined student who consistently demonstrates academic commitment. He is encouraged to pay more attention to his elective subjects.',
      headmaster: 'A hardworking student with great potential. Keep up the good work.',
      conduct: 'Excellent',
      punctuality: 'Good',
      nextTermBegins: '2025-04-14',
    },
  },

  'AFTS/2024/087': {
    studentId:  'AFTS/2024/087',
    firstName:  'Abena',
    lastName:   'Asante',
    gender:     'Female',
    dateOfBirth:'2009-07-10',
    formClass:  'Form 1 Arts A',
    program:    'General Arts',
    track:      'A',
    year:       'Form 1',
    houseName:  'Eagle House',
    photo:      null,
    results: {
      current: {
        academicYear: '2024/2025',
        term: 'Term 2',
        position: 2,
        totalStudents: 40,
        subjects: [
          { name: 'Core Mathematics',   type: 'Core',     ca: 26, exam: 60, total: 86, grade: 'A1', points: 1 },
          { name: 'English Language',   type: 'Core',     ca: 28, exam: 64, total: 92, grade: 'A1', points: 1 },
          { name: 'Integrated Science', type: 'Core',     ca: 25, exam: 58, total: 83, grade: 'A1', points: 1 },
          { name: 'Social Studies',     type: 'Core',     ca: 27, exam: 61, total: 88, grade: 'A1', points: 1 },
          { name: 'ICT',                type: 'Core',     ca: 24, exam: 55, total: 79, grade: 'B2', points: 2 },
          { name: 'Literature',         type: 'Elective', ca: 27, exam: 62, total: 89, grade: 'A1', points: 1 },
          { name: 'Economics',          type: 'Elective', ca: 23, exam: 54, total: 77, grade: 'B2', points: 2 },
          { name: 'Government',         type: 'Elective', ca: 25, exam: 58, total: 83, grade: 'A1', points: 1 },
        ],
      },
      previous: [],
    },
    attendance: {
      summary: { totalDays: 45, present: 44, absent: 0, late: 1 },
      records: [
        { date: '2025-03-17', day: 'Monday',    status: 'present', remark: '' },
        { date: '2025-03-14', day: 'Friday',    status: 'present', remark: '' },
        { date: '2025-03-13', day: 'Thursday',  status: 'present', remark: '' },
        { date: '2025-03-12', day: 'Wednesday', status: 'late',    remark: 'Traffic delay — parent informed' },
        { date: '2025-03-11', day: 'Tuesday',   status: 'present', remark: '' },
        { date: '2025-03-10', day: 'Monday',    status: 'present', remark: '' },
      ],
    },
    reportComments: {
      formTeacher: 'Abena is an exceptional student who excels in all areas. Her dedication and enthusiasm are commendable. She is a role model for her peers.',
      headmaster: 'Outstanding performance. We are proud of Abena\'s achievements this term.',
      conduct: 'Excellent',
      punctuality: 'Very Good',
      nextTermBegins: '2025-04-14',
    },
  },

  'AFTS/2024/045': {
    studentId:  'AFTS/2024/045',
    firstName:  'Ama',
    lastName:   'Owusu',
    gender:     'Female',
    dateOfBirth:'2007-08-22',
    formClass:  'Form 2 Arts B',
    program:    'General Arts',
    track:      'B',
    year:       'Form 2',
    houseName:  'Eagle House',
    photo:      null,
    results: {
      current: {
        academicYear: '2024/2025',
        term: 'Term 2',
        position: 7,
        totalStudents: 38,
        subjects: [
          { name: 'Core Mathematics',   type: 'Core',     ca: 20, exam: 46, total: 66, grade: 'B3', points: 3 },
          { name: 'English Language',   type: 'Core',     ca: 24, exam: 56, total: 80, grade: 'A1', points: 1 },
          { name: 'Integrated Science', type: 'Core',     ca: 18, exam: 44, total: 62, grade: 'C4', points: 4 },
          { name: 'Social Studies',     type: 'Core',     ca: 22, exam: 52, total: 74, grade: 'B2', points: 2 },
          { name: 'ICT',                type: 'Core',     ca: 19, exam: 48, total: 67, grade: 'B3', points: 3 },
          { name: 'Literature',         type: 'Elective', ca: 25, exam: 58, total: 83, grade: 'A1', points: 1 },
          { name: 'Economics',          type: 'Elective', ca: 21, exam: 50, total: 71, grade: 'B3', points: 3 },
          { name: 'Government',         type: 'Elective', ca: 20, exam: 48, total: 68, grade: 'B3', points: 3 },
        ],
      },
      previous: [],
    },
    attendance: {
      summary: { totalDays: 45, present: 40, absent: 4, late: 1 },
      records: [
        { date: '2025-03-17', day: 'Monday',    status: 'present', remark: ''                    },
        { date: '2025-03-14', day: 'Friday',    status: 'absent',  remark: 'No reason given'     },
        { date: '2025-03-13', day: 'Thursday',  status: 'absent',  remark: 'No reason given'     },
        { date: '2025-03-12', day: 'Wednesday', status: 'present', remark: ''                    },
        { date: '2025-03-11', day: 'Tuesday',   status: 'late',    remark: 'Arrived 20 mins late'},
        { date: '2025-03-10', day: 'Monday',    status: 'present', remark: ''                    },
      ],
    },
    reportComments: {
      formTeacher: 'Ama shows potential especially in the arts subjects. She needs to pay more attention to the sciences and improve her attendance record.',
      headmaster: 'A good student who can do better with more focus and regular attendance.',
      conduct: 'Good',
      punctuality: 'Satisfactory',
      nextTermBegins: '2025-04-14',
    },
  },
};

// ─── Term info ────────────────────────────────────────────────────────────────
export const TERM_INFO = {
  academicYear: '2024/2025',
  term: 'Term 2',
  track: 'A',
  startDate: '2025-01-06',
  endDate: '2025-04-11',
  weeksTotal: 14,
  weeksGone: 9,
};

// ─── School notices ───────────────────────────────────────────────────────────
export const SCHOOL_NOTICES = [
  { id: 1, type: 'info',    title: 'End of Term Exams',         message: 'Term 2 End of Term Examinations begin March 24, 2025. Ensure your ward is prepared.', date: '2025-03-10' },
  { id: 2, type: 'warning', title: 'Fees Reminder',             message: 'Term 3 fees are due by April 14, 2025. Please clear all outstanding balances.', date: '2025-03-08' },
  { id: 3, type: 'success', title: 'Term 1 Reports Available',  message: 'Term 1 report cards are now available on the portal. Log in to view your ward\'s performance.', date: '2025-02-28' },
  { id: 4, type: 'info',    title: 'Track B Resumes',           message: 'Track B students resume on April 14, 2025. Report to school by 7:00 AM.', date: '2025-02-25' },
];

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
  const map = { A1:'Excellent', B2:'Very Good', B3:'Good', C4:'Credit', C5:'Credit', C6:'Credit', D7:'Pass', E8:'Weak Pass', F9:'Fail' };
  return map[grade] || '';
};

export const getPerformanceBand = (pct) => {
  if (pct >= 80) return { label: 'Distinction', color: 'var(--success-dark)' };
  if (pct >= 70) return { label: 'Merit',       color: 'var(--info)'         };
  if (pct >= 60) return { label: 'Credit',      color: 'var(--royal-blue)'   };
  if (pct >= 50) return { label: 'Pass',        color: 'var(--warning)'      };
  return              { label: 'Below Average', color: 'var(--accent-red)'  };
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