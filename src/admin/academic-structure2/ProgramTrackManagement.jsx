// src/admin/academic-structure2/ProgramTrackManagement.jsx
import React, { useState } from 'react';
import { Save, Edit3, CheckCircle2, BookOpen, Users } from 'lucide-react';
import { STUDENTS } from '../data/adminData';

const INITIAL_PROGRAMS = [
  { id:1, name:'General Science', code:'SCI', track:'Both', color:'var(--royal-blue)', bg:'#eef2ff', years:['Form 1','Form 2','Form 3'], maxPerClass:40, active:true },
  { id:2, name:'General Arts',    code:'ARTS',track:'Both', color:'#7c3aed',           bg:'#f5f3ff', years:['Form 1','Form 2','Form 3'], maxPerClass:40, active:true },
  { id:3, name:'Business',        code:'BUS', track:'Both', color:'#ca8a04',           bg:'#fefce8', years:['Form 1','Form 2','Form 3'], maxPerClass:40, active:true },
  { id:4, name:'Technical',       code:'TECH',track:'Both', color:'var(--success-dark)',bg:'#f0fdf4',years:['Form 1','Form 2','Form 3'], maxPerClass:40, active:true },
];

const ToggleSwitch = ({ checked, onChange, color='var(--royal-blue)' }) => (
  <button type="button" onClick={()=>onChange(!checked)}
    className="relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors"
    style={{ backgroundColor:checked?color:'#d1d5db' }}>
    <span className="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
      style={{ transform:checked?'translateX(20px)':'translateX(0)' }}/>
  </button>
);

const ProgramTrackManagement = () => {
  const [programs, setPrograms] = useState(INITIAL_PROGRAMS);
  const [editId,   setEditId]   = useState(null);
  const [toast,    setToast]    = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  const update = (id, field, val) => setPrograms(ps=>ps.map(p=>p.id===id?{...p,[field]:val}:p));

  const getStudentCount = (name) => STUDENTS.filter(s=>s.program===name).length;
  const getTrackSplit = (name) => ({
    A: STUDENTS.filter(s=>s.program===name&&s.track==='A').length,
    B: STUDENTS.filter(s=>s.program===name&&s.track==='B').length,
  });

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor:'var(--success-dark)' }}>
          <CheckCircle2 size={14}/> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>Programme & Track Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage programmes, track assignments and class capacity</p>
        </div>
        <button type="button" onClick={()=>showToast('Programme settings saved')}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
          style={{ backgroundColor:'var(--royal-blue)' }}>
          <Save size={14}/> Save All
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {programs.map(p => {
          const count = getStudentCount(p.name);
          return (
            <div key={p.id} className="bg-white rounded-xl border p-4 shadow-sm" style={{ borderColor:'var(--medium-gray)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black px-2 py-0.5 rounded text-white" style={{ backgroundColor:p.color }}>{p.code}</span>
                <span className={`text-xs font-semibold ${p.active?'text-green-700':'text-gray-400'}`}>{p.active?'Active':'Inactive'}</span>
              </div>
              <p className="text-xl font-black" style={{ color:p.color }}>{count}</p>
              <p className="text-xs text-gray-500">{p.name.replace('General ','')} students</p>
            </div>
          );
        })}
      </div>

      {/* Programme cards */}
      <div className="space-y-4">
        {programs.map(prog => {
          const count = getStudentCount(prog.name);
          const split = getTrackSplit(prog.name);
          const isEdit = editId===prog.id;

          return (
            <div key={prog.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden"
              style={{ borderColor:prog.color+'60', borderWidth:2 }}>
              <div className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor:'var(--medium-gray)', backgroundColor:prog.bg }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black"
                    style={{ backgroundColor:prog.color }}>{prog.code}</div>
                  <div>
                    <p className="font-black text-base" style={{ color:'var(--dark-gray)' }}>{prog.name}</p>
                    <p className="text-xs text-gray-500">{count} students enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ToggleSwitch checked={prog.active} onChange={v=>update(prog.id,'active',v)} color={prog.color}/>
                  <button type="button" onClick={()=>setEditId(isEdit?null:prog.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor:isEdit?prog.color:'white', color:isEdit?'white':prog.color, border:`1px solid ${prog.color}` }}>
                    <Edit3 size={12}/> {isEdit?'Done':'Edit'}
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Track assignment */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'var(--dark-gray)',opacity:0.5 }}>Track Assignment</p>
                    {isEdit ? (
                      <select value={prog.track} onChange={e=>update(prog.id,'track',e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none bg-white"
                        style={{ borderColor:prog.color }}>
                        <option value="Both">Both Tracks (A & B)</option>
                        <option value="A">Track A Only</option>
                        <option value="B">Track B Only</option>
                      </select>
                    ) : (
                      <div className="flex gap-2">
                        {(prog.track==='Both'?['A','B']:[prog.track]).map(t=>(
                          <span key={t} className="flex-1 text-center py-2 rounded-xl text-sm font-black"
                            style={{ backgroundColor:t==='A'?'#fefce8':'#f0fdf4', color:t==='A'?'#854d0e':'#166534' }}>
                            Track {t}: {split[t]} students
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Max per class */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'var(--dark-gray)',opacity:0.5 }}>Max per Class</p>
                    {isEdit ? (
                      <input type="number" min={10} max={60} value={prog.maxPerClass}
                        onChange={e=>update(prog.id,'maxPerClass',parseInt(e.target.value)||40)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none text-center font-black"
                        style={{ borderColor:prog.color, color:prog.color }}/>
                    ) : (
                      <div className="text-center p-3 rounded-xl" style={{ backgroundColor:prog.bg }}>
                        <p className="text-2xl font-black" style={{ color:prog.color }}>{prog.maxPerClass}</p>
                        <p className="text-xs text-gray-500">students per class</p>
                      </div>
                    )}
                  </div>

                  {/* Year groups */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'var(--dark-gray)',opacity:0.5 }}>Year Groups</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Form 1','Form 2','Form 3'].map(yr=>{
                        const active = prog.years.includes(yr);
                        return isEdit ? (
                          <button key={yr} type="button"
                            onClick={()=>update(prog.id,'years', active?prog.years.filter(y=>y!==yr):[...prog.years,yr])}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                            style={{ backgroundColor:active?prog.color:'white', color:active?'white':prog.color, border:`1px solid ${prog.color}` }}>
                            {yr}
                          </button>
                        ) : (
                          <span key={yr} className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                            style={{ backgroundColor:active?prog.bg:'var(--light-gray)', color:active?prog.color:'#9ca3af', border:`1px solid ${active?prog.color:'var(--medium-gray)'}` }}>
                            {yr}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramTrackManagement;