import React, { useState } from 'react';

const DepartmentManagement = ({ formData, updateFormData, isPreviewMode }) => {
  const [departments, setDepartments] = useState(formData?.departments || [
    { 
      id: 1, 
      name: 'Mathematics', 
      hod: 'Mr. John Mensah', 
      subjects: ['Mathematics', 'Additional Mathematics'],
      teachers: ['Mr. John Mensah', 'Mrs. Sarah Addo'],
      analytics: { students: 450, avgScore: 72, passRate: 85 }
    }
  ]);

  const [availableTeachers] = useState([
    'Mr. John Mensah', 'Mrs. Ama Serwaa', 'Dr. Kofi Asare', 'Mrs. Sarah Addo',
    'Mr. Kwame Asare', 'Mrs. Abena Ofori', 'Mr. Michael Tetteh', 'Ms. Grace Amoah'
  ]);

  const [availableSubjects] = useState([
    'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 
    'Literature', 'Economics', 'History', 'Geography', 'Accounting'
  ]);

  const addDepartment = () => {
    setDepartments([...departments, {
      id: Date.now(),
      name: '',
      hod: '',
      subjects: [],
      teachers: [],
      analytics: { students: 0, avgScore: 0, passRate: 0 }
    }]);
  };

  const updateDepartment = (id, field, value) => {
    const updated = departments.map(d =>
      d.id === id ? { ...d, [field]: value } : d
    );
    setDepartments(updated);
    updateFormData && updateFormData({ departments: updated });
  };

  const removeDepartment = (id) => {
    if (window.confirm('Remove this department?')) {
      const updated = departments.filter(d => d.id !== id);
      setDepartments(updated);
      updateFormData && updateFormData({ departments: updated });
    }
  };

  const addToDepartment = (id, type, item) => {
    const updated = departments.map(d => {
      if (d.id === id && !d[type].includes(item)) {
        return { ...d, [type]: [...d[type], item] };
      }
      return d;
    });
    setDepartments(updated);
  };

  const removeFromDepartment = (id, type, item) => {
    const updated = departments.map(d => {
      if (d.id === id) {
        return { ...d, [type]: d[type].filter(i => i !== item) };
      }
      return d;
    });
    setDepartments(updated);
  };

  if (isPreviewMode) {
    return (
      <div className="p-6 bg-gray-100 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Departments Preview</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {departments.map(dept => (
            <div key={dept.id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-bold text-lg">{dept.name}</h4>
              <p className="text-sm text-gray-500">HOD: {dept.hod || 'N/A'}</p>

              <p className="text-sm mt-2">
                <strong>Subjects:</strong> {dept.subjects.join(', ') || 'None'}
              </p>

              <p className="text-sm">
                <strong>Teachers:</strong> {dept.teachers.join(', ') || 'None'}
              </p>

              <div className="mt-3 text-xs text-gray-500 border-t pt-2">
                Students: {dept.analytics.students} | Avg: {dept.analytics.avgScore}% | Pass: {dept.analytics.passRate}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Department Management</h2>
        <button
          onClick={addDepartment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Department
        </button>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white rounded-xl shadow p-5 border">

            {/* Title */}
            <div className="flex justify-between mb-4">
              <input
                type="text"
                value={dept.name}
                onChange={(e) => updateDepartment(dept.id, 'name', e.target.value)}
                placeholder="Department Name"
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
              />
              <button
                onClick={() => removeDepartment(dept.id)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>

            {/* HOD */}
            <div className="mb-4">
              <label className="text-sm font-medium">Head of Department</label>
              <select
                value={dept.hod}
                onChange={(e) => updateDepartment(dept.id, 'hod', e.target.value)}
                className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select HOD</option>
                {availableTeachers.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <label className="text-sm font-medium">Subjects</label>

              <div className="flex flex-wrap gap-2 mt-2">
                {dept.subjects.map(s => (
                  <span key={s} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1 text-sm">
                    {s}
                    <button onClick={() => removeFromDepartment(dept.id, 'subjects', s)}>×</button>
                  </span>
                ))}
              </div>

              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addToDepartment(dept.id, 'subjects', e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full mt-2 border px-3 py-2 rounded-lg"
              >
                <option value="">Add Subject</option>
                {availableSubjects.filter(s => !dept.subjects.includes(s)).map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Teachers */}
            <div className="mb-4">
              <label className="text-sm font-medium">Teachers</label>

              <div className="flex flex-wrap gap-2 mt-2">
                {dept.teachers.map(t => (
                  <span key={t} className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1 text-sm">
                    {t}
                    <button onClick={() => removeFromDepartment(dept.id, 'teachers', t)}>×</button>
                  </span>
                ))}
              </div>

              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addToDepartment(dept.id, 'teachers', e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full mt-2 border px-3 py-2 rounded-lg"
              >
                <option value="">Add Teacher</option>
                {availableTeachers.filter(t => !dept.teachers.includes(t)).map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-3 gap-3 text-center mt-4 border-t pt-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xl font-bold">{dept.analytics.students}</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xl font-bold">{dept.analytics.avgScore}%</p>
                <p className="text-xs text-gray-500">Avg Score</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xl font-bold">{dept.analytics.passRate}%</p>
                <p className="text-xs text-gray-500">Pass Rate</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {departments.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No departments yet. Click "Add Department"
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;