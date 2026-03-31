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
    if (updateFormData) updateFormData({ academicYears: updatedYears });
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
    if (updateFormData) updateFormData({ academicYears: updatedYears });
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
      <div style={previewContainerStyle}>
        <h3 style={{ color: 'var(--royal-blue-dark)' }}>Academic Years Preview</h3>
        {academicYears.map(year => (
          <div key={year.id} style={previewCardStyle}>
            <h4 style={{ color: 'var(--royal-blue)' }}>{year.title || 'Untitled Year'}</h4>
            {year.terms.map(term => (
              <div key={term.id} style={{ marginTop: '10px' }}>
                <strong>{term.name}:</strong> {term.startDate || 'TBD'} to {term.endDate || 'TBD'}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--royal-blue)' }}>Academic Year & Term Management</h2>
        <button onClick={addAcademicYear} style={{ ...buttonStyle('primary') }}>
          + Create Academic Year
        </button>
      </div>

      {academicYears.map(year => (
        <div key={year.id} style={{ background: 'var(--light-gray)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <input
              type="text"
              value={year.title}
              onChange={(e) => updateYear(year.id, 'title', e.target.value)}
              placeholder="e.g., 2025/2026"
              style={{ ...inputStyle, fontSize: '18px', fontWeight: 'bold', width: 'auto', minWidth: '200px' }}
            />
            <button onClick={() => archiveYear(year.id)} style={{ ...buttonStyle('danger') }}>
              Archive
            </button>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {year.terms.map(term => (
              <div key={term.id} style={{ borderTop: `1px solid var(--medium-gray)`, paddingTop: '16px' }}>
                <h3 style={{ color: 'var(--royal-blue-dark)', marginBottom: '12px' }}>{term.name}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={term.startDate}
                      onChange={(e) => updateTerm(year.id, term.id, 'startDate', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      type="date"
                      value={term.endDate}
                      onChange={(e) => updateTerm(year.id, term.id, 'endDate', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label>Vacation Date</label>
                    <input
                      type="date"
                      value={term.vacationDate}
                      onChange={(e) => updateTerm(year.id, term.id, 'vacationDate', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label>Next Term Reopening</label>
                    <input
                      type="date"
                      value={term.reopeningDate}
                      onChange={(e) => updateTerm(year.id, term.id, 'reopeningDate', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '12px' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={term.cumulative}
                      onChange={(e) => updateTerm(year.id, term.id, 'cumulative', e.target.checked)}
                      style={{ marginRight: '8px' }}
                    />
                    Cumulative Reporting (include previous terms)
                  </label>
                </div>
                <button
                  onClick={() => activateTerm(year.id, term.id)}
                  style={{ ...buttonStyle('success'), marginTop: '12px' }}
                >
                  Activate {term.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {academicYears.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--dark-gray)' }}>
          No academic years created. Click "Create Academic Year" to start.
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: `1px solid var(--medium-gray)`,
  borderRadius: '4px',
  fontSize: '14px'
};

const buttonStyle = (type) => ({
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '500',
  backgroundColor: type === 'primary' ? 'var(--royal-blue)' : 
                    type === 'success' ? 'var(--success)' : 
                    type === 'danger' ? 'var(--danger)' : 'var(--light-gray)',
  color: type === 'primary' || type === 'success' || type === 'danger' ? 'var(--white)' : 'var(--dark-gray)'
});

const previewContainerStyle = {
  padding: '20px',
  background: 'var(--light-gray)',
  borderRadius: '8px'
};

const previewCardStyle = {
  background: 'var(--white)',
  padding: '16px',
  borderRadius: '6px',
  marginBottom: '16px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

export default AcademicYear;