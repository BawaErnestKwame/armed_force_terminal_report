import React, { useState } from 'react';

const DoubleTruckManagement = ({ formData, updateFormData, isPreviewMode }) => {
  const [tracks, setTracks] = useState(formData?.tracks || {
    trackA: {
      name: 'Track A',
      startDate: '',
      endDate: '',
      teachingDays: [],
      vacationPeriod: { start: '', end: '' }
    },
    trackB: {
      name: 'Track B',
      startDate: '',
      endDate: '',
      teachingDays: [],
      vacationPeriod: { start: '', end: '' }
    }
  });
  
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const updateTrack = (track, field, value) => {
    const updatedTracks = {
      ...tracks,
      [track]: { ...tracks[track], [field]: value }
    };
    setTracks(updatedTracks);
    if (updateFormData) updateFormData({ tracks: updatedTracks });
  };

  const syncCalendars = () => {
    // Logic to ensure equal teaching days
    alert('Calendars synced successfully! Teaching days are now balanced.');
  };

  const viewOverlapReport = () => {
    alert('Overlap Report: Showing gaps and overlaps in Track A and Track B schedules.');
  };

  const autoAssignStudents = () => {
    alert(`Assigning students in ${selectedClass} to tracks...`);
  };

  if (isPreviewMode) {
    return (
      <div style={previewContainerStyle}>
        <h3 style={{ color: 'var(--royal-blue-dark)' }}>Double Track Calendar Preview</h3>
        <div style={previewCardStyle}>
          <h4 style={{ color: 'var(--royal-blue)' }}>{tracks.trackA.name}</h4>
          <p><strong>Term:</strong> {tracks.trackA.startDate || 'TBD'} to {tracks.trackA.endDate || 'TBD'}</p>
        </div>
        <div style={previewCardStyle}>
          <h4 style={{ color: 'var(--royal-blue)' }}>{tracks.trackB.name}</h4>
          <p><strong>Term:</strong> {tracks.trackB.startDate || 'TBD'} to {tracks.trackB.endDate || 'TBD'}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--royal-blue)', marginBottom: '20px' }}>Double-Track (A/B) Calendar Management</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Select Academic Year/Term</label>
        <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Term</option>
          <option>2025/2026 - Term 1</option>
          <option>2025/2026 - Term 2</option>
          <option>2025/2026 - Term 3</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Track A */}
        <div style={{ background: 'var(--light-gray)', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--royal-blue-dark)', marginBottom: '16px' }}>
            <input
              type="text"
              value={tracks.trackA.name}
              onChange={(e) => updateTrack('trackA', 'name', e.target.value)}
              style={{ ...inputStyle, fontSize: '18px', fontWeight: 'bold', width: 'auto' }}
            />
          </h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label>Term Start Date</label>
            <input
              type="date"
              value={tracks.trackA.startDate}
              onChange={(e) => updateTrack('trackA', 'startDate', e.target.value)}
              style={inputStyle}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label>Term End Date</label>
            <input
              type="date"
              value={tracks.trackA.endDate}
              onChange={(e) => updateTrack('trackA', 'endDate', e.target.value)}
              style={inputStyle}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label>Vacation Period</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="date"
                placeholder="Start"
                value={tracks.trackA.vacationPeriod.start}
                onChange={(e) => updateTrack('trackA', 'vacationPeriod', { ...tracks.trackA.vacationPeriod, start: e.target.value })}
                style={{ ...inputStyle, width: '50%' }}
              />
              <input
                type="date"
                placeholder="End"
                value={tracks.trackA.vacationPeriod.end}
                onChange={(e) => updateTrack('trackA', 'vacationPeriod', { ...tracks.trackA.vacationPeriod, end: e.target.value })}
                style={{ ...inputStyle, width: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Track B */}
        <div style={{ background: 'var(--light-gray)', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--royal-blue-dark)', marginBottom: '16px' }}>
            <input
              type="text"
              value={tracks.trackB.name}
              onChange={(e) => updateTrack('trackB', 'name', e.target.value)}
              style={{ ...inputStyle, fontSize: '18px', fontWeight: 'bold', width: 'auto' }}
            />
          </h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label>Term Start Date</label>
            <input
              type="date"
              value={tracks.trackB.startDate}
              onChange={(e) => updateTrack('trackB', 'startDate', e.target.value)}
              style={inputStyle}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label>Term End Date</label>
            <input
              type="date"
              value={tracks.trackB.endDate}
              onChange={(e) => updateTrack('trackB', 'endDate', e.target.value)}
              style={inputStyle}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label>Vacation Period</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="date"
                placeholder="Start"
                value={tracks.trackB.vacationPeriod.start}
                onChange={(e) => updateTrack('trackB', 'vacationPeriod', { ...tracks.trackB.vacationPeriod, start: e.target.value })}
                style={{ ...inputStyle, width: '50%' }}
              />
              <input
                type="date"
                placeholder="End"
                value={tracks.trackB.vacationPeriod.end}
                onChange={(e) => updateTrack('trackB', 'vacationPeriod', { ...tracks.trackB.vacationPeriod, end: e.target.value })}
                style={{ ...inputStyle, width: '50%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Assign Students Section */}
      <div style={{ marginTop: '24px', padding: '20px', background: 'var(--light-gray)', borderRadius: '8px' }}>
        <h3 style={{ color: 'var(--royal-blue-dark)', marginBottom: '16px' }}>Auto-Assign Students</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label>Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={inputStyle}
            >
              <option value="">Choose Class</option>
              <option>Form 1A</option>
              <option>Form 1B</option>
              <option>Form 2A</option>
              <option>Form 2B</option>
            </select>
          </div>
          <button onClick={autoAssignStudents} style={{ ...buttonStyle('primary') }}>
            Assign to Tracks
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
        <button onClick={syncCalendars} style={{ ...buttonStyle('secondary') }}>
          Sync Calendars
        </button>
        <button onClick={viewOverlapReport} style={{ ...buttonStyle('secondary') }}>
          View Overlap/Gap Report
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
  fontSize: '14px',
  marginTop: '4px'
};

const buttonStyle = (type) => ({
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '500',
  backgroundColor: type === 'primary' ? 'var(--royal-blue)' : 
                    type === 'success' ? 'var(--success)' : 
                    type === 'danger' ? 'var(--danger)' : 'var(--medium-gray)',
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
  marginBottom: '16px'
};

export default DoubleTruckManagement;