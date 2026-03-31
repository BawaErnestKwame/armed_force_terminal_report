import React, { useState } from 'react';

const AcademicYear = ({ formData, updateFormData, isPreviewMode }) => {
  const [academicYears, setAcademicYears] = useState(formData?.academicYears || []);
  const [selectedYear, setSelectedYear] = useState(null);
  const [activeTerm, setActiveTerm] = useState(null);

  const addAcademicYear = () => {
    const newYear = {
      id: Date.now(),
      title: '',
      terms: [
        { id: 1, name: 'Term 1', startDate: '', endDate: '', vacationDate: '', reopeningDate: '', cumulative: false },
        { id: 2, name: 'Term 2', startDate: '', endDate: '', vacationDate: '', reopeningDate: '', cumulative: true },
        { id: 3, name: 'Term 3', startDate: '', endDate: '', vacationDate: '', reopeningDate: '', cumulative: true }
      ]
    };
    setAcademicYears([...academicYears, newYear]);
    setSelectedYear(newYear.id);
  };

  const updateYear = (yearId, field, value) => {
    const updatedYears = academicYears.map(year =>
      year.id === yearId ? { ...year, [field]: value } : year
    );
    setAcademicYears(updatedYears);
    updateFormData && updateFormData({ academicYears: updatedYears });
  };

  const updateTerm = (yearId, termId, field, value) => {
    const updatedYears = academicYears.map(year => {
      if (year.id === yearId) {
        const updatedTerms = year.terms.map(term =>
          term.id === termId ? { ...term, [field]: value } : term
        );
        return { ...year, terms: updatedTerms };
      }
      return year;
    });
    setAcademicYears(updatedYears);
    updateFormData && updateFormData({ academicYears: updatedYears });
  };

  const activateTerm = (yearId, termId) => {
    setActiveTerm({ yearId, termId });
    alert(`Activated: ${academicYears.find(y => y.id === yearId)?.title} - Term ${termId}`);
  };

  const archiveYear = (yearId) => {
    if (window.confirm('Archive this academic year?')) {
      setAcademicYears(academicYears.filter(year => year.id !== yearId));
    }
  };

  if (isPreviewMode) {
    return (
      <div className="p-5 bg-[var(--light-gray)] rounded-lg">
        <h3 className="text-[var(--royal-blue-dark)] font-semibold mb-4">
          Academic Years Preview
        </h3>

        {academicYears.map(year => (
          <div key={year.id} className="bg-white p-4 rounded-md mb-4 shadow-sm">
            <h4 className="text-[var(--royal-blue)] font-semibold">
              {year.title || 'Untitled Year'}
            </h4>

            {year.terms.map(term => (
              <div key={term.id} className="mt-2 text-sm">
                <strong>{term.name}:</strong> {term.startDate || 'TBD'} to {term.endDate || 'TBD'}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2 border border-[var(--medium-gray)] rounded-md text-sm focus:outline-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red)]";

  return (
    <div className="max-w-[1000px] mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[var(--royal-blue)] text-xl font-bold">
          Academic Year & Term Management
        </h2>

        <button
          onClick={addAcademicYear}
          className="px-4 py-2 rounded-md bg-[var(--royal-blue)] text-white font-medium hover:opacity-90 transition"
        >
          + Create Academic Year
        </button>
      </div>

      {/* Years */}
      {academicYears.map(year => (
        <div
          key={year.id}
          className="bg-[var(--light-gray)] p-5 rounded-lg mb-5"
        >

          {/* Year Header */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={year.title}
              onChange={(e) => updateYear(year.id, 'title', e.target.value)}
              placeholder="e.g., 2025/2026"
              className={`${inputClass} text-lg font-bold max-w-[250px]`}
            />

            <button
              onClick={() => archiveYear(year.id)}
              className="px-4 py-2 rounded-md bg-[var(--danger)] text-white hover:opacity-90 transition"
            >
              Archive
            </button>
          </div>

          {/* Terms */}
          <div className="space-y-5">
            {year.terms.map(term => (
              <div key={term.id} className="border-t border-[var(--medium-gray)] pt-4">

                <h3 className="text-[var(--royal-blue-dark)] font-semibold mb-3">
                  {term.name}
                </h3>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <div>
                    <label className="text-sm">Start Date</label>
                    <input
                      type="date"
                      value={term.startDate}
                      onChange={(e) => updateTerm(year.id, term.id, 'startDate', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-sm">End Date</label>
                    <input
                      type="date"
                      value={term.endDate}
                      onChange={(e) => updateTerm(year.id, term.id, 'endDate', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-sm">Vacation Date</label>
                    <input
                      type="date"
                      value={term.vacationDate}
                      onChange={(e) => updateTerm(year.id, term.id, 'vacationDate', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-sm">Next Term Reopening</label>
                    <input
                      type="date"
                      value={term.reopeningDate}
                      onChange={(e) => updateTerm(year.id, term.id, 'reopeningDate', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                </div>

                {/* Checkbox */}
                <div className="mt-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={term.cumulative}
                    onChange={(e) => updateTerm(year.id, term.id, 'cumulative', e.target.checked)}
                    className="mr-2 accent-[var(--accent-red)]"
                  />
                  <span className="text-sm">
                    Cumulative Reporting (include previous terms)
                  </span>
                </div>

                {/* Activate Button */}
                <button
                  onClick={() => activateTerm(year.id, term.id)}
                  className="mt-3 px-4 py-2 rounded-md bg-[var(--success)] text-white hover:opacity-90 transition"
                >
                  Activate {term.name}
                </button>

              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {academicYears.length === 0 && (
        <div className="text-center py-10 text-[var(--dark-gray)]">
          No academic years created. Click "Create Academic Year" to start.
        </div>
      )}
    </div>
  );
};

export default AcademicYear;