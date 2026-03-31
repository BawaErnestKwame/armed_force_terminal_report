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
    website: '',
    logo: null,
    headerImage: null,
    stamp: null,
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
    // Modal or preview logic
    alert('Preview Report Header - Shows how logo and header will appear on reports');
  };

  if (isPreviewMode) {
    return (
      <div className="preview-card" style={{ padding: '24px', background: 'var(--light-gray)', borderRadius: '8px' }}>
        <h3 style={{ color: 'var(--royal-blue-dark)', marginBottom: '16px' }}>School Profile Preview</h3>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          {localData.logo && <img src={localData.logo} alt="Logo" style={{ maxWidth: '100px', marginBottom: '10px' }} />}
          {localData.headerImage && <img src={localData.headerImage} alt="Header" style={{ width: '100%', maxHeight: '100px', objectFit: 'cover' }} />}
          <h2 style={{ color: 'var(--royal-blue)', marginTop: '10px' }}>{localData.schoolName || 'School Name Not Set'}</h2>
          <p style={{ color: 'var(--dark-gray)', fontStyle: 'italic' }}>{localData.motto || 'Motto Not Set'}</p>
        </div>
        <div style={{ display: 'grid', gap: '10px' }}>
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
    <div className="school-profile-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--royal-blue)', marginBottom: '20px' }}>School Profile Setup</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* School Name */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>School Name *</label>
          <input
            type="text"
            value={localData.schoolName}
            onChange={(e) => handleChange('schoolName', e.target.value)}
            placeholder="Enter school name"
            style={inputStyle}
          />
        </div>

        {/* Motto */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Motto</label>
          <input
            type="text"
            value={localData.motto}
            onChange={(e) => handleChange('motto', e.target.value)}
            placeholder="Enter school motto"
            style={inputStyle}
          />
        </div>

        {/* Address */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Address</label>
          <textarea
            value={localData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter school address"
            rows="3"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* Location */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Location</label>
          <input
            type="text"
            value={localData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Town/City"
            style={inputStyle}
          />
        </div>

        {/* Region */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Region</label>
          <select
            value={localData.region}
            onChange={(e) => handleChange('region', e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Region</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>District</label>
          <input
            type="text"
            value={localData.district}
            onChange={(e) => handleChange('district', e.target.value)}
            placeholder="Enter district"
            style={inputStyle}
          />
        </div>

        {/* GES Code */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>GES Code</label>
          <input
            type="text"
            value={localData.gesCode}
            onChange={(e) => handleChange('gesCode', e.target.value)}
            placeholder="e.g., GES-12345"
            style={inputStyle}
          />
        </div>

        {/* Phone */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone</label>
          <input
            type="tel"
            value={localData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Contact number"
            style={inputStyle}
          />
        </div>

        {/* Email */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            value={localData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="school@example.com"
            style={inputStyle}
          />
        </div>

        {/* Website */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Website</label>
          <input
            type="url"
            value={localData.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://..."
            style={inputStyle}
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>School Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload('logo', e.target.files[0])}
            style={inputStyle}
          />
        </div>

        {/* Header Image */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Header Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload('headerImage', e.target.files[0])}
            style={inputStyle}
          />
        </div>

        {/* Stamp */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>School Stamp</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload('stamp', e.target.files[0])}
            style={inputStyle}
          />
        </div>

        {/* Next Term Reopening */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Next Term Reopening Date</label>
          <input
            type="date"
            value={localData.nextTermReopening}
            onChange={(e) => handleChange('nextTermReopening', e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Vacation Date */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Vacation Date</label>
          <input
            type="date"
            value={localData.vacationDate}
            onChange={(e) => handleChange('vacationDate', e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
        <button onClick={previewReportHeader} style={{ ...buttonStyle('secondary') }}>
          Preview Report Header
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: `1px solid var(--medium-gray)`,
  borderRadius: '6px',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  outline: 'none'
};

const buttonStyle = (type) => ({
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '500',
  backgroundColor: type === 'primary' ? 'var(--royal-blue)' : 'var(--light-gray)',
  color: type === 'primary' ? 'var(--white)' : 'var(--dark-gray)',
  border: type === 'secondary' ? '1px solid var(--medium-gray)' : 'none'
});

export default SchoolProfileSetup;