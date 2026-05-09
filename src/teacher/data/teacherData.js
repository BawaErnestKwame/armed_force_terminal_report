// src/teacher/data/teacherData.js

export const LOGGED_IN_TEACHER = {
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

export const CLASSES_DATA = [
  { id: 1, name: 'Form 1A', program: 'General Science', track: 'A', students: 42, subject: 'Integrated Science', caSubmitted: true,  examSubmitted: false, caAvg: 24.8, examAvg: null, attendanceRate: 94 },
  { id: 2, name: 'Form 1B', program: 'General Science', track: 'A', students: 40, subject: 'Integrated Science', caSubmitted: true,  examSubmitted: false, caAvg: 22.1, examAvg: null, attendanceRate: 91 },
  { id: 3, name: 'Form 2B', program: 'General Science', track: 'B', students: 38, subject: 'Integrated Science', caSubmitted: false, examSubmitted: false, caAvg: null,  examAvg: null, attendanceRate: 88 },
  { id: 4, name: 'Form 3B', program: 'General Science', track: 'B', students: 36, subject: 'Integrated Science', caSubmitted: true,  examSubmitted: true,  caAvg: 26.4, examAvg: 58.2, attendanceRate: 96, isFormClass: true },
];

export const FORM_CLASS_STUDENTS = [
  { id: 1, name: 'Kofi Asante',    studentId: 'AFTS/2024/031', gender: 'Male',   ca: 28, exam: 62, total: 90, grade: 'A1', attendance: 96  },
  { id: 2, name: 'Ama Darko',      studentId: 'AFTS/2024/032', gender: 'Female', ca: 26, exam: 58, total: 84, grade: 'A1', attendance: 100 },
  { id: 3, name: 'Yaw Mensah',     studentId: 'AFTS/2024/033', gender: 'Male',   ca: 24, exam: 50, total: 74, grade: 'B3', attendance: 88  },
  { id: 4, name: 'Efua Boateng',   studentId: 'AFTS/2024/034', gender: 'Female', ca: 22, exam: 45, total: 67, grade: 'B3', attendance: 92  },
  { id: 5, name: 'Nana Owusu',     studentId: 'AFTS/2024/035', gender: 'Male',   ca: 20, exam: 42, total: 62, grade: 'C4', attendance: 84  },
  { id: 6, name: 'Abena Frimpong', studentId: 'AFTS/2024/036', gender: 'Female', ca: 27, exam: 60, total: 87, grade: 'A1', attendance: 98  },
];

export const DEPT_TEACHERS = [
  { name: 'Dr Kwame Osei',    subject: 'Integrated Science', classes: 4, load: 93, status: 'active' },
  { name: 'Cpt Samuel Adjei', subject: 'Physics',            classes: 3, load: 80, status: 'active' },
  { name: 'Mrs Grace Ampofo', subject: 'Chemistry',          classes: 3, load: 75, status: 'active' },
  { name: 'Mr Ebo Mensah',    subject: 'Biology',            classes: 4, load: 87, status: 'active' },
  { name: 'Lt Esi Tawiah',    subject: 'Elective Maths',     classes: 2, load: 60, status: 'active' },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'warning', message: 'CA scores for Form 2B not yet submitted. Deadline: Friday.', time: '2 hours ago' },
  { id: 2, type: 'info',    message: 'Term 2 exam timetable has been published by the Exam Coordinator.', time: '1 day ago' },
  { id: 3, type: 'success', message: 'Form 3B report cards approved by Headmaster.', time: '2 days ago' },
  { id: 4, type: 'info',    message: 'HOD meeting scheduled for Friday 10:00 AM — Science Block.', time: '3 days ago' },
];

export const SCORE_ENTRY_STUDENTS = [
  { id: 1, studentId: 'AFTS/2024/001', name: 'Kofi Asante',  ca: 27, exam: '' },
  { id: 2, studentId: 'AFTS/2024/002', name: 'Ama Owusu',    ca: 25, exam: '' },
  { id: 3, studentId: 'AFTS/2024/003', name: 'Yaw Boateng',  ca: 28, exam: '' },
  { id: 4, studentId: 'AFTS/2024/004', name: 'Efua Mensah',  ca: 22, exam: '' },
  { id: 5, studentId: 'AFTS/2024/005', name: 'Nana Adjei',   ca: 26, exam: '' },
  { id: 6, studentId: 'AFTS/2024/006', name: 'Abena Tetteh', ca: 24, exam: '' },
];

export const ATTENDANCE_STUDENTS = [
  { id: 1, name: 'Kofi Asante',  studentId: 'AFTS/2024/001', status: 'present' },
  { id: 2, name: 'Ama Owusu',    studentId: 'AFTS/2024/002', status: 'present' },
  { id: 3, name: 'Yaw Boateng',  studentId: 'AFTS/2024/003', status: 'absent'  },
  { id: 4, name: 'Efua Mensah',  studentId: 'AFTS/2024/004', status: 'present' },
  { id: 5, name: 'Nana Adjei',   studentId: 'AFTS/2024/005', status: 'late'    },
  { id: 6, name: 'Abena Tetteh', studentId: 'AFTS/2024/006', status: 'present' },
];

export const COMMENT_TEMPLATES = [
  'Excellent performance! Shows outstanding discipline and academic commitment.',
  'Good effort. Demonstrates steady improvement throughout the term.',
  'Satisfactory work. With more focus, significant improvement is achievable.',
  'Shows potential but needs to put in more effort in practical assessments.',
  'Below expected level. Requires extra tutorials and close supervision.',
];

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