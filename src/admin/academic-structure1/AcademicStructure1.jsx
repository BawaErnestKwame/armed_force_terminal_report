import React, { useState } from 'react';
import SchoolProfileSetup from './SchoolProfileSetup';
import AcademicYear from './AcademicYear';
import DoubleTruckManagement from './DoubleTruckManagement';
import GradingConfiguration from './GradingConfiguration';
import AssessmentConfiguration from './AssessmentConfiguration';


const AcademicStructure1 = () => {
  const [step, setStep] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [allFormData, setAllFormData] = useState({
    form1: {},
    form2: {},
    form3: {},
    form4: {},
    form5: {}
  });

  const updateFormData = (formId, data) => {
    setAllFormData(prev => ({
      ...prev,
      [formId]: { ...prev[formId], ...data }
    }));
  };

  const goToNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const goToPrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const enterPreviewMode = () => {
    setIsPreviewMode(true);
  };

  const exitPreviewMode = () => {
    setIsPreviewMode(false);
  };

  const saveAllChanges = () => {
    console.log('Saving all data:', allFormData);
    alert('All changes saved successfully!');
  };

  const renderCurrentStep = () => {
    const commonProps = {
      formData: allFormData[`form${step}`],
      updateFormData: (data) => updateFormData(`form${step}`, data),
      isPreviewMode: isPreviewMode
    };

    switch(step) {
      case 1:
        return <SchoolProfileSetup {...commonProps} />;
      case 2:
        return <AcademicYear {...commonProps} />;
      case 3:
        return <DoubleTruckManagement {...commonProps} />;
      case 4:
        return <GradingConfiguration {...commonProps} />;
      case 5:
        return <AssessmentConfiguration {...commonProps} />;
      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'School Profile' },
    { number: 2, title: 'Academic Year' },
    { number: 3, title: 'Double Track' },
    { number: 4, title: 'Grading Scale' },
    { number: 5, title: 'Assessment' }
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-md overflow-hidden" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className='text-[var(--accent-red)] lg:text-4xl font-bold mb-6'>Academic Structure Setup</h1>
      
      {/* Step Indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: `2px solid var(--medium-gray)`, paddingBottom: '16px' }}>
        {steps.map(stepItem => (
          <div
            key={stepItem.number}
            onClick={() => goToStep(stepItem.number)}
            style={{
              padding: '10px 20px',

              cursor: 'pointer',
              backgroundColor: step === stepItem.number ? 'var(--royal-blue)' : 'var(--light-gray)',
              color: step === stepItem.number ? 'var(--white)' : 'var(--dark-gray)',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            {stepItem.number}. {stepItem.title}
          </div>
        ))}
      </div>
      
      {/* Form Content */}
      <div style={{ minHeight: '500px', marginBottom: '32px' }}>
        {renderCurrentStep()}
      </div>
      
      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid var(--medium-gray)`, paddingTop: '20px' }}>
        <button
          onClick={goToPrev}
          disabled={step === 1}
          style={{
            ...buttonStyle('secondary'),
            opacity: step === 1 ? 0.5 : 1,
            cursor: step === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          ← Prev
        </button>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {!isPreviewMode && step !== 5 && (
            <button onClick={enterPreviewMode} style={buttonStyle('secondary')}>
              Preview
            </button>
          )}
          
          {isPreviewMode && (
            <button onClick={exitPreviewMode} style={buttonStyle('secondary')}>
              Edit
            </button>
          )}
          
          {step === 5 ? (
            <button onClick={saveAllChanges} style={buttonStyle('success')}>
              Save Changes
            </button>
          ) : (
            <button onClick={goToNext} style={buttonStyle('primary')}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const buttonStyle = (type) => ({
  padding: '10px 24px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '14px',
  backgroundColor: type === 'primary' ? 'var(--royal-blue)' : 
                    type === 'success' ? 'var(--success)' : 
                    'var(--light-gray)',
  color: type === 'primary' || type === 'success' ? 'var(--white)' : 'var(--dark-gray)',
  transition: 'all 0.3s ease'
});

export default AcademicStructure1;