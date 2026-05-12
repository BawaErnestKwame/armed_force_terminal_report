// src/parent/reportcard/ParentReportCard.jsx
import React, { useState } from 'react';
import { Printer, ChevronDown } from 'lucide-react';
import { getGradeColor, getGradeLabel, getPerformanceBand } from '../data/parentData';
import { useActiveChild } from '../ParentDashboardLayout';

const ParentReportCard = () => {
  const { activeChild } = useActiveChild();
  const [selectedTerm, setSelectedTerm] = useState('current');

  if (!activeChild) return <div className="text-center py-12 text-gray-400">No child selected.</div>;

  const allTerms = [
    { key: 'current', label: `${activeChild.results.current.term} · ${activeChild.results.current.academicYear}` },
    ...activeChild.results.previous.map((r, i) => ({ key: `prev_${i}`, label: `${r.term} · ${r.academicYear}` })),
  ];

  const active      = selectedTerm === 'current' ? activeChild.results.current : activeChild.results.previous[parseInt(selectedTerm.split('_')[1])];
  const comments    = activeChild.reportComments;
  const att         = activeChild.attendance.summary;
  const totalScore  = active.subjects.reduce((s, sub) => s + sub.total, 0);
  const maxScore    = active.subjects.length * 100;
  const percentage  = ((totalScore / maxScore) * 100).toFixed(1);
  const totalPoints = active.subjects.reduce((s, sub) => s + sub.points, 0);
  const attPct      = Math.round((att.present / att.totalDays) * 100);
  const band        = getPerformanceBand(parseFloat(percentage));

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 no-print">
        <div>
          <h1 className="text-xl font-black" style={{ color: 'var(--dark-gray)' }}>{activeChild.firstName}'s Report Card</h1>
          <p className="text-xs text-gray-400 mt-0.5">View and print the terminal report</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm font-semibold rounded-xl border-2 outline-none cursor-pointer"
              style={{ borderColor: 'var(--royal-blue)', color: 'var(--royal-blue)', backgroundColor: '#eef2ff' }}>
              {allTerms.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--royal-blue)' }} />
          </div>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-xl transition"
            style={{ backgroundColor: 'var(--royal-blue)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--royal-blue-dark)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--royal-blue)'}>
            <Printer size={15} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Report Card */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)' }}>

        {/* School header */}
        <div className="p-6 text-center border-b"
          style={{ background: 'linear-gradient(135deg, var(--royal-blue), var(--royal-blue-dark))', borderColor: 'var(--medium-gray)' }}>
          <p className="text-white font-black text-xl tracking-wide">ARMED FORCES SENIOR HIGH TECHNICAL SCHOOL</p>
          <p className="text-blue-200 text-sm">Burma Camp, Accra, Ghana</p>
          <p className="text-blue-200 text-xs mt-0.5">Tel: +233 30 277 0000 · Email: info@afts.edu.gh</p>
          <div className="mt-3 inline-block px-4 py-1 rounded-full text-white font-black text-sm"
            style={{ backgroundColor: 'var(--accent-red)' }}>
            TERMINAL REPORT — {active.term.toUpperCase()} · {active.academicYear}
          </div>
        </div>

        {/* Student info */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
          {[
            { label: 'Student Name',  value: `${activeChild.firstName} ${activeChild.lastName}` },
            { label: 'Student ID',    value: activeChild.studentId },
            { label: 'Class / Form',  value: activeChild.formClass },
            { label: 'Programme',     value: activeChild.program },
            { label: 'Track',         value: `Track ${activeChild.track}` },
            { label: 'Academic Year', value: active.academicYear },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 border-b border-r" style={{ borderColor: 'var(--medium-gray)' }}>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--dark-gray)' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Subjects table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[540px]">
            <thead>
              <tr style={{ backgroundColor: 'var(--light-gray)' }}>
                {['Subject','CA (30)','Exam (70)','Total (100)','Grade','Remark'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase text-gray-600 border-b" style={{ borderColor: 'var(--medium-gray)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['Core','Elective'].map(type => (
                <React.Fragment key={type}>
                  <tr>
                    <td colSpan={6} className="px-4 py-1.5 text-xs font-black uppercase"
                      style={{ backgroundColor: type === 'Core' ? '#eef2ff' : '#f0fdf4', color: type === 'Core' ? 'var(--royal-blue)' : 'var(--success-dark)' }}>
                      {type} Subjects
                    </td>
                  </tr>
                  {active.subjects.filter(s => s.type === type).map((sub, i) => (
                    <tr key={i} className="border-b" style={{ borderColor: 'var(--medium-gray)' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: 'var(--dark-gray)' }}>{sub.name}</td>
                      <td className="px-4 py-3 text-center">{sub.ca}</td>
                      <td className="px-4 py-3 text-center">{sub.exam}</td>
                      <td className="px-4 py-3 text-center font-black" style={{ color: 'var(--royal-blue)' }}>{sub.total}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-black ${getGradeColor(sub.grade)}`}>{sub.grade}</span></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{getGradeLabel(sub.grade)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: 'var(--light-gray)' }}>
                <td className="px-4 py-3 font-black" style={{ color: 'var(--dark-gray)' }}>TOTAL</td>
                <td colSpan={2} />
                <td className="px-4 py-3 text-center font-black text-lg" style={{ color: 'var(--royal-blue)' }}>{totalScore}</td>
                <td colSpan={2} className="px-4 py-3">
                  <span className="text-xs font-bold">Aggregate: {totalPoints} · {percentage}%</span>
                </td>
              </tr>
              <tr style={{ backgroundColor: 'var(--light-gray)' }}>
                <td className="px-4 py-3 font-black" style={{ color: 'var(--dark-gray)' }}>CLASS POSITION</td>
                <td colSpan={5} className="px-4 py-3 font-black" style={{ color: 'var(--accent-red)' }}>
                  {active.position} out of {active.totalStudents} students
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Attendance */}
        <div className="grid grid-cols-4 gap-0 border-t border-b" style={{ borderColor: 'var(--medium-gray)' }}>
          {[
            { label: 'Days Present', value: att.present  },
            { label: 'Days Absent',  value: att.absent   },
            { label: 'Days Late',    value: att.late      },
            { label: 'Attendance %', value: `${attPct}%` },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 text-center border-r" style={{ borderColor: 'var(--medium-gray)' }}>
              <p className="text-lg font-black" style={{ color: 'var(--royal-blue)' }}>{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Conduct */}
        <div className="grid grid-cols-2 gap-0 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
          <div className="p-3 border-r" style={{ borderColor: 'var(--medium-gray)' }}>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Conduct</p>
            <p className="text-sm font-black mt-0.5" style={{ color: 'var(--success-dark)' }}>{comments.conduct}</p>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Punctuality</p>
            <p className="text-sm font-black mt-0.5" style={{ color: 'var(--success-dark)' }}>{comments.punctuality}</p>
          </div>
        </div>

        {/* Comments */}
        <div className="p-5 space-y-4 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
          <div>
            <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: 'var(--dark-gray)' }}>Form Teacher's Comment</p>
            <p className="text-sm text-gray-600 leading-relaxed p-3 rounded-lg" style={{ backgroundColor: 'var(--light-gray)' }}>
              {comments.formTeacher}
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: 'var(--dark-gray)' }}>Headmaster's Comment</p>
            <p className="text-sm text-gray-600 leading-relaxed p-3 rounded-lg" style={{ backgroundColor: 'var(--light-gray)' }}>
              {comments.headmaster}
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-0">
          {['Form Teacher', 'Headmaster', 'Parent / Guardian'].map(label => (
            <div key={label} className="p-5 border-r" style={{ borderColor: 'var(--medium-gray)' }}>
              <div className="h-10 border-b mb-2" style={{ borderColor: 'var(--medium-gray)' }} />
              <p className="text-xs text-gray-500">{label}'s Signature & Date</p>
            </div>
          ))}
        </div>

        {/* Next term */}
        <div className="p-4 text-center border-t" style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'var(--light-gray)' }}>
          <p className="text-sm font-bold" style={{ color: 'var(--royal-blue)' }}>
            Next Term Begins:{' '}
            {new Date(comments.nextTermBegins).toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Students are expected to report by 7:00 AM</p>
        </div>
      </div>
    </div>
  );
};

export default ParentReportCard;