// src/admin/academic-structure2/ClassStreamSetup.jsx
import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, CheckCircle2, Users } from 'lucide-react';
import { STUDENTS, TEACHERS } from '../data/adminData';

// Build initial classes from students
const buildClasses = () => {
  const classMap = {};
  STUDENTS.forEach(s => {
    if (!s.formClass) return;
    if (!classMap[s.formClass]) {
      classMap[s.formClass] = {
        id: s.formClass,
        name: s.formClass,
        year: s.year,
        program: s.program,
        track: s.track,
        capacity: 40,
        enrolled: 0,
        formTeacher: null,
      };
    }
    classMap[s.formClass].enrolled++;
  });
  TEACHERS.forEach(t => {
    if (t.formClass && classMap[t.formClass]) {
      classMap[t.formClass].formTeacher = `${t.title} ${t.firstName} ${t.lastName}`;
    }
  });
  return Object.values(classMap).sort((a,b) => a.name.localeCompare(b.name));
};

const EMPTY = { name:'', year:'Form 1', program:'General Science', track:'A', capacity:40, formTeacher:'' };
const YEARS = ['Form 1','Form 2','Form 3'];
const PROGRAMS = ['General Science','General Arts','Business','Technical'];
const TRACKS = ['A','B'];

const ClassStreamSetup = () => {
  const [classes, setClasses] = useState(buildClasses());
  const [showForm, setShowForm] = useState(false);
  const [editClass, setEditC]   = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [toast, setToast]       = useState(null);
  const [filterYear, setFY]     = useState('All');

  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editClass) {
      setClasses(cs => cs.map(c => c.id===editClass.id ? {...c,...form} : c));
      showToast(`${form.name} updated`);
    } else {
      setClasses(cs => [...cs, { ...form, id:Date.now()+'', enrolled:0 }]);
      showToast(`${form.name} created`);
    }
    setShowForm(false); setEditC(null); setForm(EMPTY);
  };

  const handleDelete = (cls) => {
    setClasses(cs => cs.filter(c => c.id !== cls.id));
    showToast(`${cls.name} removed`, 'error');
  };

  const filtered = filterYear==='All' ? classes : classes.filter(c=>c.year===filterYear);
  const totals = { total:classes.length, form1:classes.filter(c=>c.year==='Form 1').length, form2:classes.filter(c=>c.year==='Form 2').length, form3:classes.filter(c=>c.year==='Form 3').length };

  const PROG_COLOR = { 'General Science':'var(--royal-blue)', 'General Arts':'#7c3aed', 'Business':'#ca8a04', 'Technical':'var(--success-dark)' };
  const PROG_BG    = { 'General Science':'#eef2ff', 'General Arts':'#f5f3ff', 'Business':'#fefce8', 'Technical':'#f0fdf4' };

  const FInput = ({ label, field, options, type='text' }) => (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>{label}</label>
      {options
        ? <select value={form[field]} onChange={e=>set(field,e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none bg-white"
            style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
            onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
            onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}>
            {options.map(o=><option key={o}>{o}</option>)}
          </select>
        : <input type={type} value={form[field]||''} onChange={e=>set(field,e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none"
            style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
            onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
            onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
          />
      }
    </div>
  );

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor:toast.type==='error'?'var(--accent-red)':'var(--success-dark)' }}>
          <CheckCircle2 size={14}/> {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>Class Stream Setup</h1>
          <p className="text-xs text-gray-400 mt-0.5">{classes.length} classes · manage form classes and streams</p>
        </div>
        <button type="button" onClick={()=>{ setEditC(null); setForm(EMPTY); setShowForm(true); }}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
          style={{ backgroundColor:'var(--royal-blue)' }}>
          <Plus size={14}/> Add Class
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Classes', value:totals.total, color:'var(--royal-blue)' },
          { label:'Form 1',        value:totals.form1, color:'var(--success-dark)' },
          { label:'Form 2',        value:totals.form2, color:'#7c3aed' },
          { label:'Form 3',        value:totals.form3, color:'var(--accent-red)' },
        ].map(({label,value,color})=>(
          <div key={label} className="bg-white rounded-xl border p-4 text-center shadow-sm" style={{ borderColor:'var(--medium-gray)' }}>
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['All',...YEARS].map(f=>(
          <button key={f} type="button" onClick={()=>setFY(f)}
            className="text-xs font-semibold px-3 py-2 rounded-xl"
            style={{ backgroundColor:filterYear===f?'var(--royal-blue)':'white', color:filterYear===f?'white':'var(--dark-gray)', border:'1px solid var(--medium-gray)' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Classes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cls=>{
          const pct = Math.round((cls.enrolled/cls.capacity)*100);
          const pc = PROG_COLOR[cls.program]||'var(--royal-blue)';
          const pb = PROG_BG[cls.program]||'#eef2ff';
          return (
            <div key={cls.id} className="bg-white rounded-2xl border shadow-sm p-4"
              style={{ borderColor:'var(--medium-gray)', borderLeft:`4px solid ${pc}` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-black text-sm" style={{ color:'var(--dark-gray)' }}>{cls.name}</p>
                  <div className="flex gap-1.5 mt-1 flex-wrap">
                    <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ backgroundColor:pb, color:pc }}>
                      {cls.program.replace('General ','')}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                      style={{ backgroundColor:cls.track==='A'?'#fefce8':'#f0fdf4', color:cls.track==='A'?'#854d0e':'#166534' }}>
                      Track {cls.track}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={()=>{ setEditC(cls); setForm({...cls}); setShowForm(true); }}
                    style={{ color:'var(--warning)' }}><Edit3 size={14}/></button>
                  <button type="button" onClick={()=>handleDelete(cls)}
                    style={{ color:'var(--accent-red)' }}><Trash2 size={14}/></button>
                </div>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Enrolment</span>
                <span className="font-bold" style={{ color:pc }}>{cls.enrolled}/{cls.capacity}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor:'var(--medium-gray)' }}>
                <div className="h-full rounded-full" style={{ width:`${pct}%`, backgroundColor:pc }}/>
              </div>
              {cls.formTeacher && (
                <p className="text-xs text-gray-500 truncate">
                  <span className="font-semibold">Form Teacher:</span> {cls.formTeacher}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4"
              style={{ background:'linear-gradient(135deg,var(--royal-blue),var(--royal-blue-dark))' }}>
              <p className="text-white font-black">{editClass?'Edit Class':'Add New Class'}</p>
              <button type="button" onClick={()=>{setShowForm(false);setEditC(null);}} className="text-white"><X size={18}/></button>
            </div>
            <div className="h-1" style={{ backgroundColor:'var(--accent-red)' }}/>
            <div className="p-5 space-y-4">
              <FInput label="Class Name"   field="name"     />
              <FInput label="Year Group"   field="year"     options={YEARS}    />
              <FInput label="Programme"    field="program"  options={PROGRAMS} />
              <FInput label="Track"        field="track"    options={TRACKS}   />
              <FInput label="Capacity"     field="capacity" type="number" />
              <FInput label="Form Teacher" field="formTeacher" />
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t" style={{ borderColor:'var(--medium-gray)', backgroundColor:'var(--light-gray)' }}>
              <button type="button" onClick={()=>{setShowForm(false);setEditC(null);}}
                className="px-4 py-2 text-sm rounded-xl border font-semibold"
                style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>Cancel</button>
              <button type="button" onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white rounded-xl"
                style={{ backgroundColor:'var(--royal-blue)' }}>
                <Save size={13}/> {editClass?'Save Changes':'Add Class'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassStreamSetup;