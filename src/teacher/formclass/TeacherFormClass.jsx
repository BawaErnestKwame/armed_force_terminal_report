// src/teacher/formclass/TeacherFormClass.jsx
import React from 'react';
import { Users, Star } from 'lucide-react';
import { FORM_CLASS_STUDENTS, LOGGED_IN_TEACHER, getGradeColor } from '../data/teacherData';
import { Avatar, LoadBar, PageHeader } from '../components/TeacherUI';

const TeacherFormClass = () => {
  const avgScore      = Math.round(FORM_CLASS_STUDENTS.reduce((s, st) => s + st.total, 0) / FORM_CLASS_STUDENTS.length);
  const avgAttendance = Math.round(FORM_CLASS_STUDENTS.reduce((s, st) => s + st.attendance, 0) / FORM_CLASS_STUDENTS.length);
  const a1Count       = FORM_CLASS_STUDENTS.filter(s => s.grade === 'A1').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Users size={16} className="text-blue-700" />
        </div>
        <PageHeader title={`Form Class — ${LOGGED_IN_TEACHER.formClass}`} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Class Size',     value: FORM_CLASS_STUDENTS.length, color: 'bg-blue-600'   },
          { label: 'Avg Score',      value: `${avgScore}%`,             color: 'bg-green-600'  },
          { label: 'A1 Grades',      value: a1Count,                    color: 'bg-yellow-500' },
          { label: 'Avg Attendance', value: `${avgAttendance}%`,        color: 'bg-purple-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
            <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <Star size={15} className="text-white" />
            </div>
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 text-sm">Student Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">CA</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Exam</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {FORM_CLASS_STUDENTS.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.name} size="sm" color="bg-blue-700" />
                      <div>
                        <p className="font-medium text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-400 font-mono hidden sm:block">{s.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">{s.ca}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{s.exam}</td>
                  <td className="px-4 py-3 text-center font-bold text-gray-800">{s.total}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${getGradeColor(s.grade)}`}>{s.grade}</span>
                  </td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <LoadBar pct={s.attendance} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherFormClass;