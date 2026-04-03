import React, { useState } from 'react';
import ClassStreamSetup from '../academic-structure2/ClassStreamSetup';
import ProgramTrackManagement from '../academic-structure2/ProgramTrackManagement';
import SubjectManagement from '../academic-structure2/SubjectManagement';
import DepartmentManagement from '../academic-structure2/DepartmentManagement';

const AcademicStructure2 = () => {
  const [step, setStep] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [allFormData, setAllFormData] = useState({
    form1: {},
    form2: {},
    form3: {},
    form4: {}
  });

  const updateFormData = (formId, data) => {
    setAllFormData(prev => ({
      ...prev,
      [formId]: { ...prev[formId], ...data }
    }));
  };

  const goToNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const goToPrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const goToStep = (num) => setStep(num);

  const enterPreviewMode = () => setIsPreviewMode(true);
  const exitPreviewMode = () => setIsPreviewMode(false);

  const saveAllChanges = () => {
    console.log(allFormData);
    alert('All changes saved successfully!');
  };

  const renderCurrentStep = () => {
    const commonProps = {
      formData: allFormData[`form${step}`],
      updateFormData: (data) => updateFormData(`form${step}`, data),
      isPreviewMode
    };

    switch (step) {
      case 1:
        return <ProgramTrackManagement {...commonProps} />;
      case 2:
        return <ClassStreamSetup {...commonProps} />;
      case 3:
        return <SubjectManagement {...commonProps} />;
      case 4:
        return <DepartmentManagement {...commonProps} />;
      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'Programme & Track' },
    { number: 2, title: 'Class & Stream' },
    { number: 3, title: 'Subjects' },
    { number: 4, title: 'Departments' }
  ];

  return (
    <div className="bg-white max-w-6xl mx-auto p-6 rounded-xl shadow-md">
      
      <h1 className="text-3xl font-bold mb-6 text-[var(--accent-red)]">
        Academic Structure Management
      </h1>

      {/* Step Indicator */}
      <div className="flex flex-wrap gap-2 border-b pb-4 mb-6">
        {steps.map((item, index) => {
          const isActive = step === item.number;
          const isCompleted = step > item.number;

          return (
            <div
              key={item.number}
              onClick={() => goToStep(item.number)}
              className={`px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 text-sm font-medium transition-all
                ${isActive ? 'bg-blue-600 text-white' : ''}
                ${isCompleted ? 'bg-green-500 text-white' : ''}
                ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-700' : ''}
              `}
            >
              {isCompleted ? '✓' : item.number}
              {item.title}
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="min-h-[450px] mb-6">
        {renderCurrentStep()}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center border-t pt-4">
        
        <button
          onClick={goToPrev}
          disabled={step === 1}
          className={`px-5 py-2 rounded-md border 
            ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
          `}
        >
          ← Prev
        </button>

        <div className="flex gap-3">
          
          {!isPreviewMode && step !== 4 && (
            <button
              onClick={enterPreviewMode}
              className="px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Preview
            </button>
          )}

          {isPreviewMode && (
            <button
              onClick={exitPreviewMode}
              className="px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Edit
            </button>
          )}

          {step === 4 ? (
            <button
              onClick={saveAllChanges}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={goToNext}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next →
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default AcademicStructure2;