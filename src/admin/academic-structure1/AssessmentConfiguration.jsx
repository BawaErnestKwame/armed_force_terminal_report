import React, { useState } from 'react';

const AssessmentConfiguration = ({ formData, updateFormData, isPreviewMode }) => {
  const [components, setComponents] = useState(formData?.components || [
    { id: 1, name: 'Class Score', weight: 30, subComponents: [] },
    { id: 2, name: 'Exam', weight: 70, subComponents: [] }
  ]);
  
  const [scope, setScope] = useState('global');
  const [autoCalcRules, setAutoCalcRules] = useState({
    calculateTotal: true,
    calculateGrade: true,
    calculatePosition: true
  });
  const [subjectOverride, setSubjectOverride] = useState('');

  const addComponent = () => {
    const newId = Math.max(...components.map(c => c.id), 0) + 1;
    setComponents([...components, { id: newId, name: '', weight: 0, subComponents: [] }]);
  };

  const updateComponent = (id, field, value) => {
    const updatedComponents = components.map(comp =>
      comp.id === id ? { ...comp, [field]: value } : comp
    );
    setComponents(updatedComponents);
    if (updateFormData) updateFormData({ components: updatedComponents });
  };

  const removeComponent = (id) => {
    if (window.confirm('Remove this assessment component?')) {
      const updatedComponents = components.filter(comp => comp.id !== id);
      setComponents(updatedComponents);
      if (updateFormData) updateFormData({ components: updatedComponents });
    }
  };

  const addSubComponent = (componentId) => {
    const updatedComponents = components.map(comp => {
      if (comp.id === componentId) {
        const newSubId = (comp.subComponents.length + 1);
        return {
          ...comp,
          subComponents: [...comp.subComponents, { id: newSubId, name: '', weight: 0 }]
        };
      }
      return comp;
    });
    setComponents(updatedComponents);
  };

  const updateSubComponent = (componentId, subId, field, value) => {
    const updatedComponents = components.map(comp => {
      if (comp.id === componentId) {
        const updatedSubs = comp.subComponents.map(sub =>
          sub.id === subId ? { ...sub, [field]: value } : sub
        );
        return { ...comp, subComponents: updatedSubs };
      }
      return comp;
    });
    setComponents(updatedComponents);
  };

  const calculateTotalWeight = () => {
    return components.reduce((sum, comp) => sum + comp.weight, 0);
  };

  const applyToAllSubjects = () => {
    alert('Configuration applied to all subjects!');
  };

  const resetSubjectDefaults = () => {
    if (subjectOverride) {
      alert(`Reset ${subjectOverride} to global defaults`);
      setSubjectOverride('');
    }
  };

  const totalWeight = calculateTotalWeight();
  const isValidWeight = totalWeight === 100;

  if (isPreviewMode) {
    return (
      <div style={previewContainerStyle}>
        <h3 style={{ color: 'var(--royal-blue-dark)' }}>Assessment Configuration Preview</h3>
        <div style={{ background: 'var(--white)', padding: '16px', borderRadius: '6px' }}>
          <p><strong>Scope:</strong> {scope === 'global' ? 'Global' : 'Per Subject'}</p>
          <h4>Components:</h4>
          {components.map(comp => (
            <div key={comp.id} style={{ marginBottom: '12px', paddingLeft: '16px' }}>
              <strong>{comp.name || 'Unnamed'}:</strong> {comp.weight}%
              {comp.subComponents.length > 0 && (
                <div style={{ paddingLeft: '20px', marginTop: '5px' }}>
                  {comp.subComponents.map(sub => (
                    <div key={sub.id}>- {sub.name}: {sub.weight}%</div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <p><strong>Auto-Calculation:</strong> {Object.entries(autoCalcRules).filter(([_, v]) => v).map(([k]) => k).join(', ')}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--royal-blue)', marginBottom: '20px' }}>Assessment Configuration</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <label>Scope</label>
          <select value={scope} onChange={(e) => setScope(e.target.value)} style={inputStyle}>
            <option value="global">Apply Globally</option>
            <option value="subject">Override per Subject/Department</option>
          </select>
        </div>
        
        {scope === 'subject' && (
          <div style={{ flex: 2 }}>
            <label>Subject Override</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={subjectOverride} onChange={(e) => setSubjectOverride(e.target.value)} style={inputStyle}>
                <option value="">Select Subject</option>
                <option>Mathematics</option>
                <option>English</option>
                <option>Science</option>
                <option>Social Studies</option>
              </select>
              <button onClick={resetSubjectDefaults} style={{ ...buttonStyle('secondary') }}>
                Reset to Default
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div style={{ background: 'var(--light-gray)', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: 'var(--royal-blue-dark)', marginBottom: '16px' }}>Assessment Components</h3>
        
        {components.map(component => (
          <div key={component.id} style={{ marginBottom: '20px', padding: '16px', background: 'var(--white)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <input
                type="text"
                placeholder="Component Name"
                value={component.name}
                onChange={(e) => updateComponent(component.id, 'name', e.target.value)}
                style={{ ...inputStyle, flex: 2 }}
              />
              <input
                type="number"
                placeholder="Weight %"
                value={component.weight}
                onChange={(e) => updateComponent(component.id, 'weight', parseInt(e.target.value) || 0)}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button onClick={() => removeComponent(component.id)} style={{ ...buttonStyle('danger'), padding: '6px 12px' }}>
                Remove
              </button>
            </div>
            
            {/* Sub-components */}
            {component.subComponents.length > 0 && (
              <div style={{ marginLeft: '24px', marginTop: '12px' }}>
                <label style={{ fontSize: '13px', color: 'var(--dark-gray)' }}>Sub-Components</label>
                {component.subComponents.map(sub => (
                  <div key={sub.id} style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <input
                      type="text"
                      placeholder="Sub-component name"
                      value={sub.name}
                      onChange={(e) => updateSubComponent(component.id, sub.id, 'name', e.target.value)}
                      style={{ ...inputStyle, flex: 2 }}
                    />
                    <input
                      type="number"
                      placeholder="Weight %"
                      value={sub.weight}
                      onChange={(e) => updateSubComponent(component.id, sub.id, 'weight', parseInt(e.target.value) || 0)}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                  </div>
                ))}
              </div>
            )}
            
            <button onClick={() => addSubComponent(component.id)} style={{ ...buttonStyle('secondary'), marginTop: '8px', fontSize: '12px' }}>
              + Add Sub-component
            </button>
          </div>
        ))}
        
        <button onClick={addComponent} style={{ ...buttonStyle('primary'), width: '100%' }}>
          + Add Component
        </button>
        
        <div style={{ marginTop: '16px', padding: '10px', borderRadius: '4px', background: isValidWeight ? 'var(--success)' : 'var(--danger)', color: 'var(--white)', textAlign: 'center' }}>
          Total Weight: {totalWeight}% {isValidWeight ? '✓ Valid' : '✗ Must total 100%'}
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '16px', background: 'var(--light-gray)', borderRadius: '8px' }}>
        <h3 style={{ color: 'var(--royal-blue-dark)', marginBottom: '12px' }}>Auto-Calculation Rules</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={autoCalcRules.calculateTotal}
              onChange={(e) => setAutoCalcRules({ ...autoCalcRules, calculateTotal: e.target.checked })}
              style={{ marginRight: '6px' }}
            />
            Calculate Total
          </label>
          <label>
            <input
              type="checkbox"
              checked={autoCalcRules.calculateGrade}
              onChange={(e) => setAutoCalcRules({ ...autoCalcRules, calculateGrade: e.target.checked })}
              style={{ marginRight: '6px' }}
            />
            Calculate Grade
          </label>
          <label>
            <input
              type="checkbox"
              checked={autoCalcRules.calculatePosition}
              onChange={(e) => setAutoCalcRules({ ...autoCalcRules, calculatePosition: e.target.checked })}
              style={{ marginRight: '6px' }}
            />
            Calculate Position
          </label>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
        <button onClick={applyToAllSubjects} style={{ ...buttonStyle('primary') }}>
          Apply to All Subjects
        </button>
      </div>
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
                    type === 'danger' ? 'var(--danger)' : 'var(--light-gray)',
  color: type === 'primary' || type === 'danger' ? 'var(--white)' : 'var(--dark-gray)'
});

const previewContainerStyle = {
  padding: '20px',
  background: 'var(--light-gray)',
  borderRadius: '8px'
};

export default AssessmentConfiguration;