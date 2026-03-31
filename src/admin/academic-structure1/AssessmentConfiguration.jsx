import React, { useState } from 'react';

const AssessmentConfiguration = ({ formData, updateFormData, isPreviewMode }) => {
  const [components, setComponents] = useState(formData?.components || [
    { id: 1, name: 'Class Score', weight: 30, subComponents: [] },
    { id: 2, name: 'Exam', weight: 70, subComponents: [] }
  ]);

  const [autoCalcRules, setAutoCalcRules] = useState({
    calculateTotal: true,
    calculateGrade: true,
    calculatePosition: true
  });

  const addComponent = () => {
    const newId = Math.max(...components.map(c => c.id), 0) + 1;
    setComponents([...components, { id: newId, name: '', weight: 0, subComponents: [] }]);
  };

  const updateComponent = (id, field, value) => {
    const updated = components.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    );
    setComponents(updated);
    updateFormData && updateFormData({ components: updated });
  };

  const removeComponent = (id) => {
    if (window.confirm('Remove this component?')) {
      const updated = components.filter(c => c.id !== id);
      setComponents(updated);
      updateFormData && updateFormData({ components: updated });
    }
  };

  const addSubComponent = (componentId) => {
    const updated = components.map(comp => {
      if (comp.id === componentId) {
        return {
          ...comp,
          subComponents: [
            ...comp.subComponents,
            { id: comp.subComponents.length + 1, name: '', weight: 0 }
          ]
        };
      }
      return comp;
    });
    setComponents(updated);
  };

  const updateSubComponent = (componentId, subId, field, value) => {
    const updated = components.map(comp => {
      if (comp.id === componentId) {
        return {
          ...comp,
          subComponents: comp.subComponents.map(sub =>
            sub.id === subId ? { ...sub, [field]: value } : sub
          )
        };
      }
      return comp;
    });
    setComponents(updated);
  };

  const totalWeight = components.reduce((sum, c) => sum + c.weight, 0);
  const isValid = totalWeight === 100;

  const inputClass =
    "w-full px-3 py-2 border border-[var(--medium-gray)] rounded-md text-sm focus:outline-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red)]";

  if (isPreviewMode) {
    return (
      <div className="p-5 bg-[var(--light-gray)] rounded-lg">
        <h3 className="text-[var(--royal-blue-dark)] font-semibold mb-4">
          Assessment Preview
        </h3>

        <div className="bg-white p-4 rounded-md shadow-sm">
          {components.map(comp => (
            <div key={comp.id} className="mb-3">
              <strong>{comp.name || 'Unnamed'}:</strong> {comp.weight}%
              {comp.subComponents.length > 0 && (
                <div className="ml-4 mt-1 text-sm">
                  {comp.subComponents.map(sub => (
                    <div key={sub.id}>- {sub.name}: {sub.weight}%</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto">

      <h2 className="text-[var(--royal-blue)] text-xl font-bold mb-5">
        Assessment Configuration
      </h2>

      {/* Components */}
      <div className="bg-[var(--light-gray)] p-5 rounded-lg">

        {components.map(component => (
          <div key={component.id} className="bg-white p-4 rounded-md mb-4 shadow-sm">

            <div className="flex flex-col md:flex-row gap-3 items-center mb-3">
              
              <input
                type="text"
                placeholder="Component Name"
                value={component.name}
                onChange={(e) => updateComponent(component.id, 'name', e.target.value)}
                className={`${inputClass} flex-1`}
              />

              <input
                type="number"
                placeholder="Weight %"
                value={component.weight}
                onChange={(e) =>
                  updateComponent(component.id, 'weight', parseInt(e.target.value) || 0)
                }
                className="w-32 px-3 py-2 border border-[var(--medium-gray)] rounded-md text-sm focus:outline-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red)]"
              />

              <button
                onClick={() => removeComponent(component.id)}
                className="px-3 py-2 bg-[var(--danger)] text-white rounded-md hover:opacity-90 transition"
              >
                Remove
              </button>
            </div>

            {/* Sub Components */}
            {component.subComponents.length > 0 && (
              <div className="ml-4 mt-3">
                <p className="text-sm text-[var(--dark-gray)] mb-2">
                  Sub-Components
                </p>

                {component.subComponents.map(sub => (
                  <div key={sub.id} className="flex gap-3 mb-2">
                    <input
                      type="text"
                      placeholder="Sub name"
                      value={sub.name}
                      onChange={(e) =>
                        updateSubComponent(component.id, sub.id, 'name', e.target.value)
                      }
                      className={`${inputClass} flex-1`}
                    />
                    <input
                      type="number"
                      placeholder="%"
                      value={sub.weight}
                      onChange={(e) =>
                        updateSubComponent(component.id, sub.id, 'weight', parseInt(e.target.value) || 0)
                      }
                      className="w-24 px-3 py-2 border border-[var(--medium-gray)] rounded-md text-sm focus:outline-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red)]"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => addSubComponent(component.id)}
              className="mt-2 text-sm text-[var(--royal-blue)] hover:underline"
            >
              + Add Sub-component
            </button>
          </div>
        ))}

        {/* Add Component */}
        <button
          onClick={addComponent}
          className="w-full py-2 bg-[var(--royal-blue)] text-white rounded-md font-medium hover:opacity-90 transition"
        >
          + Add Component
        </button>

        {/* Total Weight */}
        <div
          className={`
            mt-4 py-2 rounded-md text-center text-white font-medium
            ${isValid ? "bg-[var(--success)]" : "bg-[var(--danger)]"}
          `}
        >
          Total Weight: {totalWeight}% {isValid ? "✓ Valid" : "✗ Must be 100%"}
        </div>
      </div>

      {/* Auto Rules */}
      <div className="mt-5 p-4 bg-[var(--light-gray)] rounded-lg">
        <h3 className="text-[var(--royal-blue-dark)] font-semibold mb-3">
          Auto Calculation
        </h3>

        <div className="flex flex-wrap gap-4">
          {Object.entries(autoCalcRules).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setAutoCalcRules({ ...autoCalcRules, [key]: e.target.checked })
                }
                className="accent-[var(--accent-red)]"
              />
              {key}
            </label>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end mt-6">
        <button
          className="px-5 py-2 bg-[var(--royal-blue)] text-white rounded-md hover:opacity-90 transition"
        >
          Apply to All Subjects
        </button>
      </div>
    </div>
  );
};

export default AssessmentConfiguration;