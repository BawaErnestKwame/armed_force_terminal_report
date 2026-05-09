// src/teacher/scores/TeacherScores.jsx
import React, { useState } from 'react';
import { Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import { CLASSES_DATA, SCORE_ENTRY_STUDENTS, getGradeColor, getGradeFromTotal } from '../data/teacherData';
import { PageHeader } from '../components/TeacherUI';

const TeacherScores = () => {
  const [selectedClass, setSelectedClass] = useState(CLASSES_DATA[0]);
  const [scoreType,     setScoreType]     = useState('ca');
  const [saved,         setSaved]         = useState(false);
  const [scores, setScores] = useState(
    SCORE_ENTRY_STUDENTS.reduce((acc, s) => ({ ...acc, [s.id]: { ca: s.ca ?? '', exam: s.exam ?? '' } }), {})
  );

  const updateScore = (studentId, type, value) => {
    const max = type === 'ca' ? 30 : 70;
    const num = value === '' ? '' : Math.min(Math.max(0, parseInt(value) || 0), max);
    setScores(prev => ({ ...prev, [studentId]: { ...prev[studentId], [type]: num } }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setScores(SCORE_ENTRY_STUDENTS.reduce((acc, s) => ({ ...acc, [s.id]: { ca: '', exam: '' } }), {}));
  };

  const getTotal = (id) => (parseInt(scores[id]?.ca) || 0) + (parseInt(scores[id]?.exam) || 0);

  const showCA   = scoreType === 'ca'   || scoreType === 'both';
  const showExam = scoreType === 'exam' || scoreType === 'both';
  const showBoth = scoreType === 'both';

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <PageHeader title="Score Entry" />
        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
            <CheckCircle2 size={14} /> Scores saved successfully
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Select Class</label>
          <select
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            value={selectedClass.id}
            onChange={e => setSelectedClass(CLASSES_DATA.find(c => c.id === parseInt(e.target.value)))}
          >
            {CLASSES_DATA.map(c => <option key={c.id} value={c.id}>{c.name} ({c.students} students)</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Score Type</label>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {[['ca', 'CA (30%)'], ['exam', 'Exam (70%)'], ['both', 'Both']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setScoreType(val)}
                className={`px-3 sm:px-4 py-2 text-sm font-medium transition flex-1 sm:flex-none ${scoreType === val ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Score Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">{selectedClass.name} — {selectedClass.subject}</p>
          <span className="text-xs text-gray-500">{SCORE_ENTRY_STUDENTS.length} students</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Student ID</th>
                {showCA   && <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">CA <span className="text-gray-400 font-normal">/30</span></th>}
                {showExam && <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Exam <span className="text-gray-400 font-normal">/70</span></th>}
                {showBoth && <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Total</th>}
                {showBoth && <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Grade</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SCORE_ENTRY_STUDENTS.map((student, idx) => {
                const total = getTotal(student.id);
                const grade = getGradeFromTotal(total);
                return (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono hidden sm:table-cell">{student.studentId}</td>
                    {showCA && (
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number" min="0" max="30"
                          value={scores[student.id]?.ca ?? ''}
                          onChange={e => updateScore(student.id, 'ca', e.target.value)}
                          className="w-16 px-2 py-1.5 text-center text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </td>
                    )}
                    {showExam && (
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number" min="0" max="70"
                          value={scores[student.id]?.exam ?? ''}
                          onChange={e => updateScore(student.id, 'exam', e.target.value)}
                          className="w-16 px-2 py-1.5 text-center text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </td>
                    )}
                    {showBoth && <td className="px-4 py-3 text-center font-bold text-gray-800">{total}</td>}
                    {showBoth && (
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${getGradeColor(grade)}`}>{grade}</span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
          <button onClick={handleReset} className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-600">
            <RotateCcw size={13} /> Reset
          </button>
          <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium">
            <Save size={13} /> Save Scores
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherScores;