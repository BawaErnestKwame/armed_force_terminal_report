// src/admin/academic-structure1/DoubleTruckManagement.jsx
import React, { useState } from 'react';
import { Save, RefreshCw, CheckCircle2, AlertCircle, Users, Calendar, ArrowRightLeft } from 'lucide-react';
import { STUDENTS } from '../data/adminData';

const TRACK_DATA = {
  A: {
    id:'A', name:'Track A', color:'#854d0e', bg:'#fefce8', border:'#fcd34d',
    status:'active',
    currentTerm:'Term 2',
    termDates:[
      { term:'Term 1', start:'2024-09-02', end:'2024-12-13' },
      { term:'Term 2', start:'2025-01-06', end:'2025-04-11' },
      { term:'Term 3', start:'2025-04-14', end:'2025-07-25' },
    ],
  },
  B: {
    id:'B', name:'Track B', color:'#166534', bg:'#f0fdf4', border:'#86efac',
    status:'vacation',
    currentTerm:'Term 1',
    termDates:[
      { term:'Term 1', start:'2024-12-16', end:'2025-04-11' },
      { term:'Term 2', start:'2025-04-14', end:'2025-07-25' },
      { term:'Term 3', start:'2025-07-28', end:'2025-11-07' },
    ],
  },
};

const DoubleTruckManagement = () => {
  const [tracks, setTracks] = useState(TRACK_DATA);
  const [activeSwitch, setActiveSwitch] = useState(false);
  const [toast, setToast] = useState(null);
  const [filterTrack, setFilterTrack] = useState('all');
  const [search, setSearch] = useState('');

  const showToast = (msg, type='success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSwitch = () => {
    setTracks(t => ({
      A: { ...t.A, status: t.A.status==='active'?'vacation':'active' },
      B: { ...t.B, status: t.B.status==='active'?'vacation':'active' },
    }));
    setActiveSwitch(false);
    showToast('Track status switched successfully');
  };

  const handleSave = () => showToast('Track configuration saved');

  const trackStudents = { A: STUDENTS.filter(s=>s.track==='A'), B: STUDENTS.filter(s=>s.track==='B') };

  const filteredStudents = STUDENTS.filter(s => {
    const matchTrack = filterTrack==='all' || s.track===filterTrack;
    const q = search.toLowerCase();
    const matchSearch = !q || `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q);
    return matchTrack && matchSearch;
  });

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor: toast.type==='error'?'var(--accent-red)':'var(--success-dark)' }}>
          <CheckCircle2 size={14}/> {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>Double Track Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage track assignments, term dates and active status</p>
        </div>
        <button type="button" onClick={handleSave}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
          style={{ backgroundColor:'var(--royal-blue)' }}>
          <Save size={14}/> Save Changes
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Track A Students', value:trackStudents.A.length, color:'#854d0e'            },
          { label:'Track B Students', value:trackStudents.B.length, color:'#166534'            },
          { label:'Track A Classes',  value:[...new Set(trackStudents.A.map(s=>s.formClass))].filter(Boolean).length, color:'var(--royal-blue)'   },
          { label:'Track B Classes',  value:[...new Set(trackStudents.B.map(s=>s.formClass))].filter(Boolean).length, color:'#7c3aed'             },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border p-4 text-center shadow-sm"
            style={{ borderColor:'var(--medium-gray)' }}>
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Track cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {Object.values(tracks).map(track => (
          <div key={track.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden"
            style={{ borderColor: track.border, borderWidth:2 }}>
            <div className="p-5" style={{ background:`linear-gradient(135deg,${track.color}18,${track.color}08)` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black" style={{ color:track.color }}>Track {track.id}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor:track.status==='active'?'#f0fdf4':'#fff1f2', color:track.status==='active'?'var(--success-dark)':'var(--accent-red)' }}>
                    ● {track.status==='active'?'In Session':'On Vacation'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black" style={{ color:track.color }}>
                    {trackStudents[track.id].length}
                  </p>
                  <p className="text-xs text-gray-400">students</p>
                </div>
              </div>

              {/* Term dates */}
              <div className="space-y-2">
                {track.termDates.map((td, i) => (
                  <div key={td.term} className="bg-white rounded-xl p-3 border" style={{ borderColor:track.border }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold" style={{ color:track.color }}>{td.term}</p>
                      {td.term === track.currentTerm && (
                        <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor:track.bg, color:track.color }}>Current</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-400">Start</p>
                        <input type="date" value={td.start}
                          onChange={e=>{
                            const newDates = [...track.termDates];
                            newDates[i] = { ...td, start:e.target.value };
                            setTracks(t=>({ ...t, [track.id]:{ ...t[track.id], termDates:newDates } }));
                          }}
                          className="w-full text-xs px-2 py-1.5 rounded-lg border-2 outline-none"
                          style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
                          onFocus={e=>e.target.style.borderColor=track.color}
                          onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">End</p>
                        <input type="date" value={td.end}
                          onChange={e=>{
                            const newDates = [...track.termDates];
                            newDates[i] = { ...td, end:e.target.value };
                            setTracks(t=>({ ...t, [track.id]:{ ...t[track.id], termDates:newDates } }));
                          }}
                          className="w-full text-xs px-2 py-1.5 rounded-lg border-2 outline-none"
                          style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
                          onFocus={e=>e.target.style.borderColor=track.color}
                          onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Switch Track button */}
      <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black" style={{ color:'var(--dark-gray)' }}>Switch Active Track</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Currently: Track A is <strong>In Session</strong> · Track B is <strong>On Vacation</strong>
            </p>
          </div>
          {!activeSwitch ? (
            <button type="button" onClick={()=>setActiveSwitch(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl text-white"
              style={{ backgroundColor:'#7c3aed' }}>
              <ArrowRightLeft size={15}/> Switch Tracks
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold" style={{ color:'var(--warning)' }}>⚠ Confirm switch?</p>
              <button type="button" onClick={handleSwitch}
                className="px-3 py-2 text-xs font-bold rounded-xl text-white"
                style={{ backgroundColor:'var(--success-dark)' }}>Yes, Switch</button>
              <button type="button" onClick={()=>setActiveSwitch(false)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border"
                style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* Students table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3.5 border-b"
          style={{ borderColor:'var(--medium-gray)', backgroundColor:'var(--light-gray)' }}>
          <h3 className="font-semibold text-sm" style={{ color:'var(--dark-gray)' }}>
            Student Track Assignments
          </h3>
          <div className="flex gap-2">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student..."
              className="px-3 py-1.5 text-xs rounded-lg border outline-none"
              style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}/>
            {['all','A','B'].map(f=>(
              <button key={f} type="button" onClick={()=>setFilterTrack(f)}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                style={{ backgroundColor:filterTrack===f?'var(--royal-blue)':'white', color:filterTrack===f?'white':'var(--dark-gray)', border:'1px solid var(--medium-gray)' }}>
                {f==='all'?'All':`Track ${f}`}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="sticky top-0 border-b" style={{ backgroundColor:'var(--light-gray)', borderColor:'var(--medium-gray)' }}>
              <tr>
                {['Student','ID','Form Class','Track','Status'].map(h=>(
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor:'var(--medium-gray)' }}>
              {filteredStudents.map(s=>(
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-sm font-semibold" style={{ color:'var(--dark-gray)' }}>
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{s.studentId}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{s.formClass}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ backgroundColor:s.track==='A'?'#fefce8':'#f0fdf4', color:s.track==='A'?'#854d0e':'#166534' }}>
                      Track {s.track}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs font-semibold" style={{ color:s.status==='Active'?'var(--success-dark)':'var(--accent-red)' }}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoubleTruckManagement;