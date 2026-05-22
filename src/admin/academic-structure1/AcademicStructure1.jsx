// src/admin/academic-structure1/AcademicStructure1.jsx
import React, { useState } from 'react';
import {
  CheckCircle2, Plus, Save, Trash2, Calendar, Edit3,
  X, ChevronDown, Clock, ArrowRightLeft, Users
} from 'lucide-react';
import SchoolProfileSetup      from './SchoolProfileSetup';
import GradingConfiguration    from './GradingConfiguration';
import AssessmentConfiguration from './AssessmentConfiguration';
import { STUDENTS } from '../data/adminData';

// ─── Academic Year + Double Track (merged) ────────────────────────────────────

const fmt = (d) => {
  if (!d || d === '—') return '—';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
};

const EMPTY_TERM  = { aStart:'', aEnd:'', bStart:'', bEnd:'' };
const EMPTY_YEAR  = { year:'', status:'upcoming', notes:'',
  term1:{...EMPTY_TERM}, term2:{...EMPTY_TERM} };

const INITIAL_YEARS = [
  {
    id:1, year:'2024/2025', status:'active',
    notes:'Current academic year — WASSCE for Form 3 in May/June 2025',
    term1:{ aStart:'2024-09-02', aEnd:'2024-12-13', bStart:'2024-12-16', bEnd:'2025-01-05' },
    term2:{ aStart:'2025-01-06', aEnd:'2025-04-11', bStart:'2025-04-14', bEnd:'2025-07-25' },
  },
  {
    id:2, year:'2023/2024', status:'upcoming', notes:'',
    term1:{ aStart:'2023-09-04', aEnd:'2023-12-15', bStart:'2023-12-18', bEnd:'2024-01-07' },
    term2:{ aStart:'2024-01-08', aEnd:'2024-04-12', bStart:'2024-04-15', bEnd:'2024-07-26' },
  },
];

const STATUS_CFG = {
  active:   { bg:'#f0fdf4', color:'var(--success-dark)', label:'Active'   },
  upcoming: { bg:'#eef2ff', color:'var(--royal-blue)',   label:'Upcoming' },
};

const TERM_DEFS = [
  { key:'term1', label:'Term 1', color:'var(--royal-blue)' },
  { key:'term2', label:'Term 2', color:'#7c3aed'           },
];

const DateField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-semibold mb-1" style={{ color:'#6b7280' }}>{label}</label>
    <input type="date" value={value||''} onChange={e=>onChange(e.target.value)}
      className="w-full px-3 py-2 text-xs border-2 rounded-xl outline-none transition"
      style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
      onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
      onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}/>
  </div>
);

// ─── Year Modal ───────────────────────────────────────────────────────────────
const YearModal = ({ yearData, onSave, onClose }) => {
  const isEdit = !!yearData?.id;
  const [form, setForm]     = useState(yearData ? {...yearData} : {...EMPTY_YEAR,
    term1:{...EMPTY_TERM}, term2:{...EMPTY_TERM}});
  const [activeTerm, setAT] = useState('term1');
  const [errors, setErrors] = useState({});

  const setTerm = (key, val) => setForm(f=>({...f,[key]:val}));

  const validate = () => {
    const e = {};
    if (!form.year.trim()) e.year = 'Required';
    TERM_DEFS.forEach(({key})=>{
      const t = form[key];
      if (!t.aStart||!t.aEnd||!t.bStart||!t.bEnd) e[key]='All 4 dates required';
    });
    setErrors(e);
    return Object.keys(e).length===0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor:'rgba(0,0,0,.45)' }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col"
        style={{ maxHeight:'90vh' }}>

        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ background:'linear-gradient(135deg,var(--royal-blue-dark),var(--royal-blue))' }}>
          <div>
            <p className="text-white font-black text-sm">{isEdit?'Edit':'Add'} Academic Year</p>
            <p className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,.6)' }}>Track A & Track B dates per term</p>
          </div>
          <button type="button" onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/20">
            <X size={14}/>
          </button>
        </div>
        <div className="h-1" style={{ backgroundColor:'var(--accent-red)' }}/>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {/* Year + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'var(--dark-gray)' }}>
                Academic Year <span style={{ color:'var(--accent-red)' }}>*</span>
              </label>
              <input type="text" placeholder="e.g. 2025/2026"
                value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))}
                className="w-full px-3 py-2.5 text-sm border-2 rounded-xl outline-none"
                style={{ borderColor:errors.year?'var(--accent-red)':'var(--medium-gray)' }}
                onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                onBlur={e=>e.target.style.borderColor=errors.year?'var(--accent-red)':'var(--medium-gray)'}/>
              {errors.year && <p className="text-xs mt-1" style={{ color:'var(--accent-red)' }}>{errors.year}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'var(--dark-gray)' }}>Status</label>
              <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}
                className="w-full px-3 py-2.5 text-sm border-2 rounded-xl outline-none bg-white"
                style={{ borderColor:'var(--medium-gray)' }}>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>

          {/* Term tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color:'var(--dark-gray)' }}>
              Select Term
            </label>
            <div className="flex gap-2">
              {TERM_DEFS.map(t=>(
                <button key={t.key} type="button" onClick={()=>setAT(t.key)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold border-2 transition relative"
                  style={{
                    borderColor: activeTerm===t.key?t.color:'var(--medium-gray)',
                    backgroundColor: activeTerm===t.key?t.color:'white',
                    color: activeTerm===t.key?'white':'var(--dark-gray)',
                  }}>
                  {t.label}
                  {errors[t.key] && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor:'var(--accent-red)' }}/>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active term */}
          {TERM_DEFS.map(t=> activeTerm===t.key && (
            <div key={t.key} className="rounded-xl border-2 overflow-hidden"
              style={{ borderColor:t.color+'35' }}>
              <div className="px-4 py-2 text-xs font-black uppercase tracking-wider"
                style={{ backgroundColor:t.color+'15', color:t.color }}>
                {t.label}
              </div>
              {errors[t.key] && (
                <p className="text-xs px-4 pt-2" style={{ color:'var(--accent-red)' }}>⚠ {errors[t.key]}</p>
              )}
              <div className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold mb-2 flex items-center gap-1.5" style={{ color:'#854d0e' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor:'#f59e0b', display:'inline-block' }}/>
                    Track A
                  </p>
                  <div className="space-y-2">
                    <DateField label="Start Date" value={form[t.key].aStart} onChange={v=>setTerm(t.key,{...form[t.key],aStart:v})}/>
                    <DateField label="End Date"   value={form[t.key].aEnd}   onChange={v=>setTerm(t.key,{...form[t.key],aEnd:v})}/>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold mb-2 flex items-center gap-1.5" style={{ color:'#166534' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor:'#22c55e', display:'inline-block' }}/>
                    Track B
                  </p>
                  <div className="space-y-2">
                    <DateField label="Start Date" value={form[t.key].bStart} onChange={v=>setTerm(t.key,{...form[t.key],bStart:v})}/>
                    <DateField label="End Date"   value={form[t.key].bEnd}   onChange={v=>setTerm(t.key,{...form[t.key],bEnd:v})}/>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'var(--dark-gray)' }}>
              Notes <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea rows={2} placeholder="e.g. WASSCE for Form 3 in May/June…"
              value={form.notes||''} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}
              className="w-full px-3 py-2 text-sm border-2 rounded-xl outline-none resize-none"
              style={{ borderColor:'var(--medium-gray)' }}/>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t flex-shrink-0" style={{ borderColor:'var(--medium-gray)' }}>
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border"
            style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>
            Cancel
          </button>
          <button type="button" onClick={()=>{ if(validate()) onSave(form); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2"
            style={{ backgroundColor:'var(--royal-blue)' }}>
            <Save size={14}/> {isEdit?'Save Changes':'Add Year'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Academic Year + Double Track main component ──────────────────────────────
const AcademicYearAndTrack = () => {
  const [years,    setYears]    = useState(INITIAL_YEARS);
  const [showModal,setModal]    = useState(false);
  const [editYear, setEditYear] = useState(null);
  const [expanded, setExpanded] = useState(1);
  const [confirm,  setConfirm]  = useState(false);
  const [filter,   setFilter]   = useState('all');
  const [search,   setSearch]   = useState('');
  const [toast,    setToast]    = useState(null);

  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const handleSave = (form) => {
    if (editYear?.id) {
      let updated = years.map(y=>y.id===form.id?form:y);
      if (form.status==='active') updated=updated.map(y=>y.id!==form.id?{...y,status:'upcoming'}:y);
      setYears(updated);
      showToast(`${form.year} updated`);
    } else {
      const ny = {...form, id:Date.now()};
      let updated = form.status==='active'
        ? [ny,...years.map(y=>({...y,status:'upcoming'}))]
        : [...years,ny];
      setYears(updated);
      showToast(`${form.year} added`);
    }
    setModal(false); setEditYear(null);
  };

  const handleActivate = (id) => {
    setYears(ys=>ys.map(y=>({...y, status:y.id===id?'active':y.status==='active'?'upcoming':y.status})));
    showToast(`${years.find(y=>y.id===id)?.year} set as active`);
  };

  const handleDelete = (id) => {
    const yr = years.find(y=>y.id===id);
    if (yr?.status==='active') { showToast('Cannot delete the active year','warning'); return; }
    setYears(ys=>ys.filter(y=>y.id!==id));
    showToast(`${yr?.year} removed`,'warning');
  };

  // Track switch — uses first active year's term dates
  const [trackStatus, setTrackStatus] = useState({ A:'active', B:'vacation' });
  const handleSwitch = () => {
    setTrackStatus(t=>({ A:t.A==='active'?'vacation':'active', B:t.B==='active'?'vacation':'active' }));
    setConfirm(false);
    showToast('Track status switched');
  };

  const students = STUDENTS.filter(s=>{
    const q = search.toLowerCase();
    const ok = filter==='all'||s.track===filter;
    const sq = !q||`${s.firstName} ${s.lastName}`.toLowerCase().includes(q)||s.studentId.toLowerCase().includes(q);
    return ok&&sq;
  });

  const activeYear = years.find(y=>y.status==='active');

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor:toast.type==='warning'?'var(--warning)':'var(--success-dark)' }}>
          <CheckCircle2 size={14}/> {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-black text-base" style={{ color:'var(--dark-gray)' }}>Academic Year & Double Track</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage academic years with Track A and Track B term dates</p>
        </div>
        <button type="button" onClick={()=>{ setEditYear(null); setModal(true); }}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl text-white flex-shrink-0"
          style={{ backgroundColor:'var(--royal-blue)' }}>
          <Plus size={15}/> Add Academic Year
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Active Years',     value:years.filter(y=>y.status==='active').length,   color:'var(--success-dark)', bg:'#f0fdf4', icon:CheckCircle2 },
          { label:'Upcoming Years',   value:years.filter(y=>y.status==='upcoming').length, color:'var(--royal-blue)',   bg:'#eef2ff', icon:Clock        },
          { label:'Track A Students', value:STUDENTS.filter(s=>s.track==='A').length,      color:'#854d0e',             bg:'#fefce8', icon:Users        },
          { label:'Track B Students', value:STUDENTS.filter(s=>s.track==='B').length,      color:'#166534',             bg:'#f0fdf4', icon:Users        },
        ].map(({ label, value, color, bg, icon:Icon }) => (
          <div key={label} className="bg-white rounded-xl border p-3 flex items-center gap-3 shadow-sm"
            style={{ borderColor:'var(--medium-gray)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor:bg }}>
              <Icon size={16} style={{ color }}/>
            </div>
            <div>
              <p className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>{value}</p>
              <p className="text-xs text-gray-400 leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Year cards ── */}
      <div className="space-y-3">
        {years.length===0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center" style={{ borderColor:'var(--medium-gray)' }}>
            <Calendar size={32} className="mx-auto mb-3 text-gray-300"/>
            <p className="font-bold text-sm text-gray-400">No academic years yet</p>
            <button type="button" onClick={()=>{ setEditYear(null); setModal(true); }}
              className="mt-4 flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white mx-auto"
              style={{ backgroundColor:'var(--royal-blue)' }}>
              <Plus size={14}/> Add First Year
            </button>
          </div>
        ) : years.map(yr=>{
          const sc = STATUS_CFG[yr.status]||STATUS_CFG.upcoming;
          const isOpen = expanded===yr.id;
          return (
            <div key={yr.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden"
              style={{ borderColor:'var(--medium-gray)' }}>
              {/* Card header */}
              <div className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={()=>setExpanded(e=>e===yr.id?null:yr.id)}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor:sc.bg }}>
                  <Calendar size={16} style={{ color:sc.color }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-sm" style={{ color:'var(--dark-gray)' }}>{yr.year}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor:sc.bg, color:sc.color }}>{sc.label}</span>
                  </div>
                  {yr.notes && <p className="text-xs truncate mt-0.5" style={{ color:'#9ca3af' }}>{yr.notes}</p>}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {yr.status!=='active' && (
                    <button type="button" onClick={e=>{ e.stopPropagation(); handleActivate(yr.id); }}
                      className="text-xs px-2.5 py-1.5 rounded-lg font-bold border transition"
                      style={{ borderColor:'var(--success-dark)', color:'var(--success-dark)', backgroundColor:'#f0fdf4' }}>
                      Set Active
                    </button>
                  )}
                  <button type="button" onClick={e=>{ e.stopPropagation(); setEditYear(yr); setModal(true); }}
                    className="p-1.5 rounded-lg hover:bg-blue-50" style={{ color:'var(--royal-blue)' }}>
                    <Edit3 size={14}/>
                  </button>
                  <button type="button" onClick={e=>{ e.stopPropagation(); handleDelete(yr.id); }}
                    className="p-1.5 rounded-lg hover:bg-red-50" style={{ color:'var(--accent-red)' }}>
                    <Trash2 size={14}/>
                  </button>
                  <ChevronDown size={16} className="text-gray-400 ml-1 transition-transform"
                    style={{ transform:isOpen?'rotate(180deg)':'none' }}/>
                </div>
              </div>

              {/* Expanded term grid */}
              {isOpen && (
                <div className="border-t px-5 pb-5 pt-4"
                  style={{ borderColor:'var(--medium-gray)', backgroundColor:'var(--light-gray)' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TERM_DEFS.map(({ key, label, color }) => {
                      const t = yr[key];
                      return (
                        <div key={key} className="bg-white rounded-xl border overflow-hidden"
                          style={{ borderColor:'var(--medium-gray)' }}>
                          <div className="px-3 py-2 text-xs font-black uppercase tracking-wider"
                            style={{ backgroundColor:color+'15', color }}>
                            {label}
                          </div>
                          <div className="p-3 space-y-2.5">
                            <div>
                              <p className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color:'#854d0e' }}>
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor:'#f59e0b', display:'inline-block' }}/> Track A
                              </p>
                              <p className="text-xs" style={{ color:'var(--dark-gray)' }}>{fmt(t?.aStart)} – {fmt(t?.aEnd)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color:'#166534' }}>
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor:'#22c55e', display:'inline-block' }}/> Track B
                              </p>
                              <p className="text-xs" style={{ color:'var(--dark-gray)' }}>{fmt(t?.bStart)} – {fmt(t?.bEnd)}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Save button */}
                  <div className="flex justify-end mt-4">
                    <button type="button"
                      onClick={()=>{ showToast(`${yr.year} saved successfully`); }}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-black text-white rounded-xl"
                      style={{ backgroundColor:'var(--success-dark)' }}>
                      <Save size={14}/> Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Track Switch ── */}
      <div className="bg-white rounded-2xl border shadow-sm p-4" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-black text-sm" style={{ color:'var(--dark-gray)' }}>Switch Active Track</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Track A is <strong>{trackStatus.A==='active'?'In Session':'On Vacation'}</strong> · 
              Track B is <strong>{trackStatus.B==='active'?'In Session':'On Vacation'}</strong>
            </p>
          </div>
          {!confirm
            ? <button type="button" onClick={()=>setConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-xl"
                style={{ backgroundColor:'#7c3aed' }}>
                <ArrowRightLeft size={14}/> Switch Tracks
              </button>
            : <div className="flex items-center gap-2">
                <p className="text-xs font-semibold" style={{ color:'var(--warning)' }}>⚠ Confirm switch?</p>
                <button type="button" onClick={handleSwitch}
                  className="px-3 py-1.5 text-xs font-bold text-white rounded-lg"
                  style={{ backgroundColor:'var(--success-dark)' }}>Yes</button>
                <button type="button" onClick={()=>setConfirm(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border"
                  style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>Cancel</button>
              </div>
          }
        </div>
      </div>

      {/* ── Student Track Table ── */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor:'var(--medium-gray)', backgroundColor:'var(--light-gray)' }}>
          <p className="text-sm font-black flex-1" style={{ color:'var(--dark-gray)' }}>Student Track Assignments</p>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student…"
            className="px-3 py-1.5 text-xs rounded-lg border outline-none"
            style={{ borderColor:'var(--medium-gray)' }}/>
          {['all','A','B'].map(f=>(
            <button key={f} type="button" onClick={()=>setFilter(f)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ backgroundColor:filter===f?'var(--royal-blue)':'white', color:filter===f?'white':'var(--dark-gray)', border:'1px solid var(--medium-gray)' }}>
              {f==='all'?'All':`Track ${f}`}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto max-h-72">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="sticky top-0 border-b" style={{ backgroundColor:'var(--light-gray)', borderColor:'var(--medium-gray)' }}>
              <tr>{['Student','ID','Form Class','Track','Status'].map(h=>(
                <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-gray-500">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor:'var(--medium-gray)' }}>
              {students.map(s=>(
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-semibold text-sm" style={{ color:'var(--dark-gray)' }}>{s.firstName} {s.lastName}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{s.studentId}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{s.formClass}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ backgroundColor:s.track==='A'?'#fefce8':'#f0fdf4', color:s.track==='A'?'#854d0e':'#166634' }}>
                      Track {s.track}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs font-semibold"
                    style={{ color:s.status==='Active'?'var(--success-dark)':s.status==='Inactive'?'var(--accent-red)':'var(--warning)' }}>
                    {s.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-xs text-gray-400 border-t" style={{ borderColor:'var(--medium-gray)' }}>
          Showing {students.length} of {STUDENTS.length} students
        </p>
      </div>

      {showModal && (
        <YearModal yearData={editYear} onSave={handleSave} onClose={()=>{ setModal(false); setEditYear(null); }}/>
      )}
    </div>
  );
};

// ─── Steps ────────────────────────────────────────────────────────────────────
const STEPS = [
  { id:1, title:'School Profile', desc:'Identity & contacts'     },
  { id:2, title:'Academic Year/Double Track',  desc:'Terms, tracks & dates'   },
  { id:3, title:'Grading Scale',  desc:'A1–F9 configuration'     },
  { id:4, title:'Assessment',     desc:'CA breakdown & weights'  },
];

const AcademicStructure1 = () => {
  const [step,    setStep]    = useState(1);
  const [visited, setVisited] = useState(new Set([1]));

  const goTo = (s) => { setStep(s); setVisited(v=>new Set([...v,s])); };
  const next  = () => goTo(Math.min(step+1, STEPS.length));
  const prev  = () => goTo(Math.max(step-1, 1));

  const renderStep = () => {
    switch(step) {
      case 1: return <SchoolProfileSetup/>;
      case 2: return <AcademicYearAndTrack/>;
      case 3: return <GradingConfiguration/>;
      case 4: return <AssessmentConfiguration/>;
      default: return null;
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>Academic Structure Setup</h1>
        <p className="text-xs text-gray-400 mt-0.5">Configure school profile, academic calendar, grading and assessment</p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor:'var(--medium-gray)' }}>
        {/* Step tabs */}
        <div className="flex overflow-x-auto border-b" style={{ borderColor:'var(--medium-gray)' }}>
          {STEPS.map(s=>{
            const done   = visited.has(s.id) && s.id < step;
            const active = step===s.id;
            return (
              <button key={s.id} type="button" onClick={()=>goTo(s.id)}
                className="flex items-center gap-2.5 px-4 py-3 border-b-2 transition-colors flex-shrink-0"
                style={{ borderColor:active?'var(--royal-blue)':'transparent', backgroundColor:active?'#eef2ff':'white' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ backgroundColor:done?'var(--success-dark)':active?'var(--royal-blue)':'var(--medium-gray)', color:'white' }}>
                  {done?'✓':s.id}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold" style={{ color:active?'var(--royal-blue)':'var(--dark-gray)' }}>{s.title}</p>
                  <p className="text-xs text-gray-400">{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="p-5">{renderStep()}</div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button type="button" onClick={prev} disabled={step===1}
          className="px-4 py-2 text-sm font-semibold rounded-xl border transition"
          style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)', opacity:step===1?0.4:1 }}>
          ← Previous
        </button>
        <span className="text-xs text-gray-400">Step {step} of {STEPS.length}</span>
        {step < STEPS.length
          ? <button type="button" onClick={next}
              className="px-5 py-2 text-sm font-bold text-white rounded-xl"
              style={{ backgroundColor:'var(--royal-blue)' }}>
              Next →
            </button>
          : <button type="button"
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white rounded-xl"
              style={{ backgroundColor:'var(--success-dark)' }}>
              <CheckCircle2 size={14}/> Save All
            </button>
        }
      </div>
    </div>
  );
};

export default AcademicStructure1;