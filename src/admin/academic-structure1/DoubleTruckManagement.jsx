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
    updateFormData && updateFormData({ tracks: updatedTracks });
  };

  if (isPreviewMode) {
    return (
      <div className="p-5 bg-[var(--light-gray)] rounded-lg">
        <h3 className="text-[var(--royal-blue-dark)] font-semibold mb-4">
          Double Track Calendar Preview
        </h3>

        {[tracks.trackA, tracks.trackB].map((track, i) => (
          <div key={i} className="bg-white p-4 rounded-md mb-4 shadow-sm">
            <h4 className="text-[var(--royal-blue)] font-semibold">
              {track.name}
            </h4>
            <p className="text-sm">
              <strong>Term:</strong> {track.startDate || 'TBD'} → {track.endDate || 'TBD'}
            </p>
          </div>
        ))}
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2 border border-[var(--medium-gray)] rounded-md text-sm mt-1 focus:outline-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red)]";

  return (
    <div className="max-w-[900px] mx-auto">

      <h2 className="text-[var(--royal-blue)] text-xl font-bold mb-5">
        Double-Track (A/B) Calendar Management
      </h2>

      {/* Term Selector */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-[var(--dark-gray)]">
          Select Academic Year/Term
        </label>
        <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          className={inputClass}
        >
          <option value="">Select Term</option>
          <option>2025/2026 - Term 1</option>
          <option>2025/2026 - Term 2</option>
          <option>2025/2026 - Term 3</option>
        </select>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Track A */}
        <div className="bg-[var(--light-gray)] p-5 rounded-lg">
          <input
            type="text"
            value={tracks.trackA.name}
            onChange={(e) => updateTrack('trackA', 'name', e.target.value)}
            className="text-lg font-bold mb-4 w-full px-3 py-2 border border-[var(--medium-gray)] rounded-md focus:outline-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red)]"
          />

          <div className="mb-3">
            <label className="text-sm">Term Start Date</label>
            <input
              type="date"
              value={tracks.trackA.startDate}
              onChange={(e) => updateTrack('trackA', 'startDate', e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-3">
            <label className="text-sm">Term End Date</label>
            <input
              type="date"
              value={tracks.trackA.endDate}
              onChange={(e) => updateTrack('trackA', 'endDate', e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-3">
            <label className="text-sm">Vacation Period</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={tracks.trackA.vacationPeriod.start}
                onChange={(e) =>
                  updateTrack('trackA', 'vacationPeriod', {
                    ...tracks.trackA.vacationPeriod,
                    start: e.target.value
                  })
                }
                className={`${inputClass} w-1/2`}
              />
              <input
                type="date"
                value={tracks.trackA.vacationPeriod.end}
                onChange={(e) =>
                  updateTrack('trackA', 'vacationPeriod', {
                    ...tracks.trackA.vacationPeriod,
                    end: e.target.value
                  })
                }
                className={`${inputClass} w-1/2`}
              />
            </div>
          </div>
        </div>

        {/* Track B */}
        <div className="bg-[var(--light-gray)] p-5 rounded-lg">
          <input
            type="text"
            value={tracks.trackB.name}
            onChange={(e) => updateTrack('trackB', 'name', e.target.value)}
            className="text-lg font-bold mb-4 w-full px-3 py-2 border border-[var(--medium-gray)] rounded-md focus:outline-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red)]"
          />

          <div className="mb-3">
            <label className="text-sm">Term Start Date</label>
            <input
              type="date"
              value={tracks.trackB.startDate}
              onChange={(e) => updateTrack('trackB', 'startDate', e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-3">
            <label className="text-sm">Term End Date</label>
            <input
              type="date"
              value={tracks.trackB.endDate}
              onChange={(e) => updateTrack('trackB', 'endDate', e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-3">
            <label className="text-sm">Vacation Period</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={tracks.trackB.vacationPeriod.start}
                onChange={(e) =>
                  updateTrack('trackB', 'vacationPeriod', {
                    ...tracks.trackB.vacationPeriod,
                    start: e.target.value
                  })
                }
                className={`${inputClass} w-1/2`}
              />
              <input
                type="date"
                value={tracks.trackB.vacationPeriod.end}
                onChange={(e) =>
                  updateTrack('trackB', 'vacationPeriod', {
                    ...tracks.trackB.vacationPeriod,
                    end: e.target.value
                  })
                }
                className={`${inputClass} w-1/2`}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoubleTruckManagement;