import React, { useState } from 'react';

const SchoolProfileSetup = ({ formData, updateFormData, isPreviewMode }) => {
  const [localData, setLocalData] = useState(formData || {
    schoolName: '',
    motto: '',
    address: '',
    location: '',
    region: '',
    district: '',
    gesCode: '',
    phone: '',
    email: '',
    nextTermReopening: '',
    vacationDate: ''
  });

  const regions = [
    'Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central', 
    'Volta', 'Northern', 'Upper East', 'Upper West', 'Bono', 
    'Ahafo', 'Bono East', 'Oti', 'North East', 'Savannah', 'Western North'
  ];

  const handleChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    if (updateFormData) updateFormData(updatedData);
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange(field, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const previewReportHeader = () => {
    alert('Preview Report Header - Shows how logo and header will appear on reports');
  };

  if (isPreviewMode) {
    return (
      <div className="p-6 bg-light-gray rounded-lg">
        <h3 className="text-royal-blue-dark text-4xl font-semibold mb-4">School Profile Preview</h3>
        <div className="text-center mb-5">
          {localData.logo && (
            <img src={localData.logo} alt="Logo" className="max-w-[100px] mx-auto mb-2" />
          )}
          {localData.headerImage && (
            <img src={localData.headerImage} alt="Header" className="w-full max-h-[100px] object-cover" />
          )}
          <h2 className="text-royal-blue mt-2 text-xl font-bold">
            {localData.schoolName || 'School Name Not Set'}
          </h2>
          <p className="text-dark-gray italic">{localData.motto || 'Motto Not Set'}</p>
        </div>
        <div className="space-y-2">
          <p><strong>GES Code:</strong> {localData.gesCode || 'N/A'}</p>
          <p><strong>Address:</strong> {localData.address || 'N/A'}</p>
          <p><strong>Location:</strong> {localData.location || 'N/A'}</p>
          <p><strong>Region/District:</strong> {localData.region} / {localData.district}</p>
          <p><strong>Contact:</strong> {localData.phone} | {localData.email}</p>
          <p><strong>Next Term:</strong> {localData.nextTermReopening || 'Not set'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-royal-blue text-2xl font-bold mb-5 ">School Profile Setup</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* School Name */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-dark-gray">School Name <span className='text-[var(--accent-red)]'>*</span>
          </label>

          <input
            type="text"
            value={localData.schoolName}
            onChange={(e) => handleChange('schoolName', e.target.value)}
            placeholder="Enter school name"
            className="w-full px-3 py-2 border border-medium-gray rounded-md focus:ring-2 focus:ring-royal-blue focus:border-transparent"
          />
        </div>

       

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-dark-gray">Address <span className='text-[var(--accent-red)]'>*</span></label>
          <textarea
            value={localData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter school address"
            rows="3"
            className="w-full px-3 py-2 border border-medium-gray rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue resize-vertical"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium text-dark-gray">Location <span className='text-[var(--accent-red)]'>*</span></label>
          <input
            type="text"
            value={localData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Town/City"
            className="w-full px-3 py-2 border border-medium-gray rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block mb-2 font-medium text-dark-gray">Region <span className='text-[var(--accent-red)]'>*</span></label>
          <select
            value={localData.region}
            onChange={(e) => handleChange('region', e.target.value)}
            className="w-full px-3 py-2 border border-medium-gray rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
          >
            <option value="">Select Region</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block mb-2 font-medium text-dark-gray">District <span className='text-[var(--accent-red)]'>*</span> </label>
          <input
            type="text"
            value={localData.district}
            onChange={(e) => handleChange('district', e.target.value)}
            placeholder="Enter district"
            className="w-full px-3 py-2 border border-medium-gray rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
          />
        </div>

        {/* GES Code */}
        <div>
          <label className="block mb-2 font-medium text-dark-gray">GES Code <span className='text-[var(--accent-red)]'>*</span></label>
          <input
            type="text"
            value={localData.gesCode}
            onChange={(e) => handleChange('gesCode', e.target.value)}
            placeholder="e.g., GES-12345"
            className="w-full px-3 py-2 border border-medium-gray rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6 justify-end">
        <button 
          onClick={previewReportHeader} 
          className="px-5 py-2 border border-medium-gray rounded-md bg-light-gray text-dark-gray hover:bg-medium-gray transition-colors"
        >
          Preview Report Header
        </button>
      </div>
    </div>
  );
};

export default SchoolProfileSetup;