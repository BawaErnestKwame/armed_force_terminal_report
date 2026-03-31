import React, { useState } from 'react';

const GradingConfiguration = ({ formData, updateFormData, isPreviewMode }) => {
  const [grades, setGrades] = useState(formData?.grades || [
    { grade: 'A1', min: 80, max: 100, description: 'Excellent' },
    { grade: 'B2', min: 75, max: 79, description: 'Very Good' },
    { grade: 'B3', min: 70, max: 74, description: 'Good' },
    { grade: 'C4', min: 65, max: 69, description: 'Credit' },
    { grade: 'C5', min: 60, max: 64, description: 'Credit' },
    { grade: 'C6', min: 55, max: 59, description: 'Credit' },
    { grade: 'D7', min: 50, max: 54, description: 'Pass' },
    { grade: 'E8', min: 40, max: 49, description: 'Pass' },
    { grade: 'F9', min: 0, max: 39, description: 'Fail' }
  ]);

  const [promotionThreshold, setPromotionThreshold] = useState('D7');

  const addGrade = () => {
    setGrades([...grades, { grade: '', min: 0, max: 0, description: '' }]);
  };

  const updateGrade = (index, field, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index][field] = value;
    setGrades(updatedGrades);
    if (updateFormData) updateFormData({ grades: updatedGrades });
  };

  const removeGrade = (index) => {
    if (window.confirm('Remove this grade?')) {
      const updatedGrades = grades.filter((_, i) => i !== index);
      setGrades(updatedGrades);
    }
  };

  const previewLookupTable = () => {
    alert(
      grades
        .map(g => `${g.grade}: ${g.min}-${g.max} (${g.description})`)
        .join('\n')
    );
  };

  /* ================= PREVIEW ================= */
  if (isPreviewMode) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Grading Scale Preview
        </h3>

        <table className="w-full border bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Range</th>
              <th className="p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3 font-semibold">{g.grade}</td>
                <td className="p-3">{g.min} - {g.max}</td>
                <td className="p-3">{g.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4">
          <strong>Promotion Threshold:</strong> Minimum {promotionThreshold}
        </p>
      </div>
    );
  }

  /* ================= MAIN ================= */
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Grading Configuration
      </h2>

      {/* Promotion Threshold */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Promotion Threshold</label>
        <select
          value={promotionThreshold}
          onChange={(e) => setPromotionThreshold(e.target.value)}
          className="w-full md:w-60 px-3 py-2 border rounded-md focus:outline-none"
        >
          {grades.map(g => (
            <option key={g.grade} value={g.grade}>
              {g.grade}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border bg-white rounded-lg shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Min</th>
              <th className="p-3 text-left">Max</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {grades.map((grade, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">
                  <input
                    type="text"
                    value={grade.grade}
                    onChange={(e) => updateGrade(idx, 'grade', e.target.value)}
                    className="w-full px-2 py-1 border rounded "
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    value={grade.min}
                    onChange={(e) =>
                      updateGrade(idx, 'min', parseInt(e.target.value))
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    value={grade.max}
                    onChange={(e) =>
                      updateGrade(idx, 'max', parseInt(e.target.value))
                    }
                    className="w-full px-2 py-1 border rounded "
                  />
                </td>

                <td className="p-2">
                  <input
                    type="text"
                    value={grade.description}
                    onChange={(e) =>
                      updateGrade(idx, 'description', e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded "
                  />
                </td>

                <td className="p-2">
                  <button
                    onClick={() => removeGrade(idx)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={addGrade}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Grade Row
        </button>

        <button
          onClick={previewLookupTable}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Preview Table
        </button>
      </div>
    </div>
  );
};

export default GradingConfiguration;