// src/teacher/comments/TeacherComments.jsx
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { FORM_CLASS_STUDENTS, COMMENT_TEMPLATES, getGradeColor } from '../data/teacherData';
import { Avatar, PageHeader } from '../components/TeacherUI';

const TeacherComments = () => {
  const [selected, setSelected] = useState(FORM_CLASS_STUDENTS[0]);
  const [comment,  setComment]  = useState('');

  return (
    <div className="space-y-5">
      <PageHeader title="Student Comments & Remarks" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Student List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-700">Form 3 Science B</p>
            <p className="text-xs text-gray-400">{FORM_CLASS_STUDENTS.length} students</p>
          </div>
          <div className="divide-y divide-gray-100">
            {FORM_CLASS_STUDENTS.map(s => (
              <button
                key={s.id}
                onClick={() => { setSelected(s); setComment(''); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition ${selected?.id === s.id ? 'bg-blue-50 border-l-4 border-blue-900' : ''}`}
              >
                <Avatar name={s.name} size="sm" color={selected?.id === s.id ? 'bg-blue-900' : 'bg-gray-400'} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{s.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${getGradeColor(s.grade)}`}>{s.grade}</span>
                    <span className="text-xs text-gray-400">{s.total}/100</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comment Editor */}
        <div className="lg:col-span-2">
          {selected && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">

              {/* Student Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Avatar name={selected.name} size="md" color="bg-blue-900" />
                <div>
                  <p className="font-bold text-gray-800">{selected.name}</p>
                  <p className="text-xs text-gray-400">
                    {selected.studentId} · Total: <strong>{selected.total}/100</strong> ·{' '}
                    <span className={`font-bold ${getGradeColor(selected.grade)}`}>{selected.grade}</span>
                  </p>
                </div>
              </div>

              {/* Quick Templates */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Quick Templates</label>
                <div className="space-y-1.5">
                  {COMMENT_TEMPLATES.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setComment(t)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-600 border border-gray-200 rounded-lg hover:border-blue-900 hover:bg-blue-50 transition"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Text */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Teacher's Comment{' '}
                  <span className="font-normal text-gray-400">({comment.length}/500 characters)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value.slice(0, 500))}
                  rows={4}
                  placeholder="Write a personalised comment for this student..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                />
                <div className="flex justify-end mt-3">
                  <button className="flex items-center gap-1.5 px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium">
                    <Save size={13} /> Save Comment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherComments;