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
  
  const [scope, setScope] = useState('whole-school');
  const [promotionThreshold, setPromotionThreshold] = useState('D7');
  const [averageRule, setAverageRule] = useState('simple');

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
      if (updateFormData) updateFormData({ grades: updatedGrades });
    }
  };

  const setDefault = () => {
    setGrades([
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
    setPromotionThreshold('D7');
  };

  const previewLookupTable = () => {
    alert('Preview Grade Lookup Table:\n\n' + grades.map(g => 
      `${g.grade}: ${g.min}-${g.max} (${g.description})`
    ).join('\n'));
  };

  if (isPreviewMode) {
    return (
      <div style={previewContainerStyle}>
        <h3 style={{ color: 'var(--royal-blue-dark)' }}>Grading Scale Preview</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)' }}>
          <thead>
            <tr style={{ background: 'var(--royal-blue)', color: 'var(--white)' }}>
              <th style={tableHeaderStyle}>Grade</th>
              <th style={tableHeaderStyle}>Range</th>
              <th style={tableHeaderStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--medium-gray)' }}>
                <td style={tableCellStyle}><strong>{grade.grade}</strong></td>
                <td style={tableCellStyle}>{grade.min} - {grade.max}</td>
                <td style={tableCellStyle}>{grade.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: '16px' }}><strong>Promotion Threshold:</strong> Minimum {promotionThreshold}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--royal-blue)', marginBottom: '20px' }}>Grading Configuration</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <label>Apply To</label>
          <select value={scope} onChange={(e) => setScope(e.target.value)} style={inputStyle}>
            <option value="whole-school">Whole School</option>
            <option value="programme">Specific Programme</option>
            <option value="level">Specific Level</option>
          </select>
        </div>
        
        <div style={{ flex: 1 }}>
          <label>Promotion Threshold</label>
          <select value={promotionThreshold} onChange={(e) => setPromotionThreshold(e.target.value)} style={inputStyle}>
            {grades.map(grade => (
              <option key={grade.grade} value={grade.grade}>{grade.grade}</option>
            ))}
          </select>
        </div>
        
        <div style={{ flex: 1 }}>
          <label>Average Calculation</label>
          <select value={averageRule} onChange={(e) => setAverageRule(e.target.value)} style={inputStyle}>
            <option value="simple">Simple Average</option>
            <option value="weighted">Weighted Average (Core subjects weight 2)</option>
          </select>
        </div>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ background: 'var(--royal-blue)', color: 'var(--white)' }}>
              <th style={tableHeaderStyle}>Grade</th>
              <th style={tableHeaderStyle}>Min Score</th>
              <th style={tableHeaderStyle}>Max Score</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--medium-gray)' }}>
                <td style={tableCellStyle}>
                  <input
                    type="text"
                    value={grade.grade}
                    onChange={(e) => updateGrade(idx, 'grade', e.target.value)}
                    style={inputStyle}
                  />
                </td>
                <td style={tableCellStyle}>
                  <input
                    type="number"
                    value={grade.min}
                    onChange={(e) => updateGrade(idx, 'min', parseInt(e.target.value))}
                    style={inputStyle}
                  />
                </td>
                <td style={tableCellStyle}>
                  <input
                    type="number"
                    value={grade.max}
                    onChange={(e) => updateGrade(idx, 'max', parseInt(e.target.value))}
                    style={inputStyle}
                  />
                </td>
                <td style={tableCellStyle}>
                  <input
                    type="text"
                    value={grade.description}
                    onChange={(e) => updateGrade(idx, 'description', e.target.value)}
                    style={inputStyle}
                  />
                </td>
                <td style={tableCellStyle}>
                  <button onClick={() => removeGrade(idx)} style={{ ...buttonStyle('danger'), padding: '4px 8px' }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'space-between' }}>
        <button onClick={addGrade} style={{ ...buttonStyle('primary') }}>
          + Add Grade Row
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={setDefault} style={{ ...buttonStyle('secondary') }}>
            Set Default
          </button>
          <button onClick={previewLookupTable} style={{ ...buttonStyle('secondary') }}>
            Preview Grade Lookup Table
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '6px 10px',
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
                    type === 'danger' ? 'var(--danger)' : 'var(--light-gray)',
  color: type === 'primary' || type === 'danger' ? 'var(--white)' : 'var(--dark-gray)'
});

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold'
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left'
};

const previewContainerStyle = {
  padding: '20px',
  background: 'var(--light-gray)',
  borderRadius: '8px'
};

export default GradingConfiguration;