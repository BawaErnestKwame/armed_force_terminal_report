// src/admin/academic-structure2/SubjectManagement.jsx
import React, { useState, useMemo } from 'react';
import { Plus, Edit3, Trash2, Save, X, CheckCircle2, Search, BookOpen } from 'lucide-react';

const INIT = [
  { id:1,  name:'Core Mathematics',         code:'CMATH', type:'core',     department:'Mathematics',    courses:['General Science','General Arts','Business','Technical'], periodsPerWeek:5, active:true  },
  { id:2,  name:'English Language',          code:'ENG',   type:'core',     department:'English',        courses:['General Science','General Arts','Business','Technical'], periodsPerWeek:5, active:true  },
  { id:3,  name:'Integrated Science',        code:'ISCI',  type:'core',     department:'Science',        courses:['General Science','General Arts','Business','Technical'], periodsPerWeek:4, active:true  },
  { id:4,  name:'Social Studies',            code:'SOCS',  type:'core',     department:'Social Studies', courses:['General Science','General Arts','Business','Technical'], periodsPerWeek:4, active:true  },
  { id:5,  name:'ICT',                       code:'ICT',   type:'core',     department:'Technical',      courses:['General Science','General Arts','Business','Technical'], periodsPerWeek:3, active:true  },
  { id:6,  name:'Elective Mathematics',      code:'EMATH', type:'elective', department:'Mathematics',    courses:['General Science'], periodsPerWeek:4, active:true  },
  { id:7,  name:'Physics',                   code:'PHY',   type:'elective', department:'Science',        courses:['General Science'], periodsPerWeek:4, active:true  },
  { id:8,  name:'Chemistry',                 code:'CHEM',  type:'elective', department:'Science',        courses:['General Science'], periodsPerWeek:4, active:true  },
  { id:9,  name:'Biology',                   code:'BIO',   type:'elective', department:'Science',        courses:['General Science'], periodsPerWeek:4, active:true  },
  { id:10, name:'Literature in English',     code:'LIT',   type:'elective', department:'English',        courses:['General Arts'],    periodsPerWeek:4, active:true  },
  { id:11, name:'History',                   code:'HIST',  type:'elective', department:'Social Studies', courses:['General Arts'],    periodsPerWeek:4, active:true  },
  { id:12, name:'Geography',                 code:'GEO',   type:'elective', department:'Social Studies', courses:['General Arts'],    periodsPerWeek:4, active:true  },
  { id:13, name:'Economics',                 code:'ECON',  type:'elective', department:'Business',       courses:['General Arts','Business'], periodsPerWeek:4, active:true  },
  { id:14, name:'Government',               code:'GOVT',  type:'elective', department:'Social Studies', courses:['General Arts'],    periodsPerWeek:4, active:true  },
  { id:15, name:'Accounting',                code:'ACCT',  type:'elective', department:'Business',       courses:['Business'],        periodsPerWeek:4, active:true  },
  { id:16, name:'Business Management',       code:'BM',    type:'elective', department:'Business',       courses:['Business'],        periodsPerWeek:4, active:true  },
  { id:17, name:'Technical Drawing',         code:'TD',    type:'elective', department:'Technical',      courses:['Technical'],       periodsPerWeek:4, active:true  },
  { id:18, name:'Auto Mechanics',            code:'AUTO',  type:'elective', department:'Technical',      courses:['Technical'],       periodsPerWeek:4, active:true  },
  { id:19, name:'Welding & Fabrication',     code:'WELD',  type:'elective', department:'Technical',      courses:['Technical'],       periodsPerWeek:4, active:true  },
  { id:20, name:'Electronics',               code:'ELEC',  type:'elective', department:'Technical',      courses:['Technical'],       periodsPerWeek:4, active:true  },
  { id:21, name:'French',                    code:'FRE',   type:'elective', department:'English',        courses:['General Arts'],    periodsPerWeek:3, active:true  },
  { id:22, name:'Typewriting/Keyboarding',   code:'TYPE',  type:'elective', department:'Business',       courses:['Business'],        periodsPerWeek:3, active:true  },
  { id:23, name:'Electrical Installation',   code:'EI',    type:'elective', department:'Technical',      courses:['Technical'],       periodsPerWeek:4, active:false },
];

const DEPTS    = ['Mathematics','English','Science','Social Studies','Technical','Business'];
const COURSES = ['General Science','General Arts','Business','Technical'];
const EMPTY    = { name:'', code:'', type:'elective', department:'Mathematics', courses:[], periodsPerWeek:4, active:true };
const TS       = { core:{ bg:'#eef2ff', color:'var(--royal-blue)', label:'Core' }, elective:{ bg:'#f5f3ff', color:'#7c3aed', label:'Elective' } };

const Toggle = ({ checked, onChange }) => (
  <button type="button" onClick={()=>onChange(!checked)}
    className="relative inline-flex h-5 w-9 rounded-full flex-shrink-0 transition-colors"
    style={{ backgroundColor:checked?'var(--success-dark)':'#d1d5db' }}>
    <span className="inline-block h-4 w-4 mt-0.5 rounded-full bg-white shadow transition-transform"
      style={{ transform:checked?'translateX(20px)':'translateX(2px)' }}/>
  </button>
);

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState(INIT);
  const [showForm, setShowForm] = useState(false);
  const [editS,    setEditS]    = useState(null);
  const [form,     setForm]     = useState({...EMPTY});
  const [toast,    setToast]    = useState(null);
  const [search,   setSearch]   = useState('');
  const [fType,    setFT]       = useState('all');
  const [fDept,    setFD]       = useState('all');

  const showToast = (msg,type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const toggleProg = (p) => set('programs', form.courses.includes(p)?form.courses.filter(x=>x!==p):[...form.courses,p]);

  const filtered = useMemo(()=>subjects.filter(s=>{
    const q=search.toLowerCase();
    const ms=!q||s.name.toLowerCase().includes(q)||s.code.toLowerCase().includes(q);
    const mt=fType==='all'||s.type===fType;
    const md=fDept==='all'||s.department===fDept;
    return ms&&mt&&md;
  }),[subjects,search,fType,fDept]);

  const handleSave = () => {
    if (!form.name.trim()||!form.code.trim()) return;
    if (editS) {
      setSubjects(ss=>ss.map(s=>s.id===editS.id?{...s,...form}:s));
      showToast(`${form.name} updated`);
    } else {
      setSubjects(ss=>[...ss,{...form,id:Date.now()}]);
      showToast(`${form.name} added`);
    }
    setShowForm(false); setEditS(null); setForm({...EMPTY});
  };

  const handleDelete = (s) => {
    setSubjects(ss=>ss.filter(x=>x.id!==s.id));
    showToast(`${s.name} removed`,'error');
  };

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
          <h2 className="font-black text-base" style={{ color:'var(--dark-gray)' }}>Subject Management</h2>
          <p className="text-xs text-gray-400">
            {subjects.length} subjects · {subjects.filter(s=>s.type==='core').length} core · {subjects.filter(s=>s.type==='elective').length} elective
          </p>
        </div>
        <button type="button" onClick={()=>{ setEditS(null); setForm({...EMPTY}); setShowForm(true); }}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
          style={{ backgroundColor:'var(--royal-blue)' }}>
          <Plus size={14}/> Add Subject
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label:'Total',    value:subjects.length,                            color:'var(--royal-blue)'   },
          { label:'Core',     value:subjects.filter(s=>s.type==='core').length, color:'var(--success-dark)' },
          { label:'Elective', value:subjects.filter(s=>s.type==='elective').length,'color':'#7c3aed'        },
        ].map(({label,value,color})=>(
          <div key={label} className="bg-white rounded-xl border p-3 text-center shadow-sm" style={{ borderColor:'var(--medium-gray)' }}>
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-3 shadow-sm" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-40">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or code…"
              className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border-2 outline-none"
              style={{ borderColor:'var(--medium-gray)' }}/>
          </div>
          {['all','core','elective'].map(f=>(
            <button key={f} type="button" onClick={()=>setFT(f)}
              className="text-xs font-semibold px-3 py-2 rounded-xl capitalize"
              style={{ backgroundColor:fType===f?'var(--royal-blue)':'white', color:fType===f?'white':'var(--dark-gray)', border:'1px solid var(--medium-gray)' }}>
              {f==='all'?'All Types':f}
            </button>
          ))}
          <select value={fDept} onChange={e=>setFD(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border-2 outline-none bg-white"
            style={{ borderColor:'var(--medium-gray)' }}>
            <option value="all">All Departments</option>
            {DEPTS.map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <p className="text-xs text-gray-400 mt-2">Showing {filtered.length} of {subjects.length}</p>
      </div>

      {/* ── CORE SUBJECTS — always shown, all courses ── */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden"
        style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor:'var(--medium-gray)', backgroundColor:'#eef2ff' }}>
          <div>
            <p className="text-sm font-black" style={{ color:'var(--royal-blue)' }}>
              Core Subjects
            </p>
            <p className="text-xs mt-0.5" style={{ color:'#6b7280' }}>
              Compulsory for all courses — {subjects.filter(s=>s.type==='core').length} subjects
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor:'var(--royal-blue)', color:'white' }}>
            All Courses
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="border-b" style={{ backgroundColor:'var(--light-gray)', borderColor:'var(--medium-gray)' }}>
              <tr>
                {['Subject','Code','Department','Status',''].map(h=>(
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor:'var(--medium-gray)' }}>
              {subjects.filter(s=>s.type==='core').map(s=>(
                <tr key={s.id} className="hover:bg-blue-50" style={{ opacity:s.active?1:0.5 }}>
                  <td className="px-4 py-3 font-semibold text-sm" style={{ color:'var(--dark-gray)' }}>
                    {s.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.code}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{s.department}</td>
                  <td className="px-4 py-3">
                    <Toggle checked={s.active}
                      onChange={v=>setSubjects(ss=>ss.map(x=>x.id===s.id?{...x,active:v}:x))}/>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button type="button"
                        onClick={()=>{ setEditS(s); setForm({...s, courses:[...s.courses]}); setShowForm(true); }}
                        style={{ color:'var(--warning)' }}><Edit3 size={14}/></button>
                      <button type="button" onClick={()=>handleDelete(s)}
                        style={{ color:'var(--accent-red)' }}><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ELECTIVE SUBJECTS ── */}
      <div className="flex items-center gap-3 pt-2">
        <div className="flex-1 h-px" style={{ backgroundColor:'var(--medium-gray)' }}/>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color:'#9ca3af' }}>
          Elective Subjects by Course
        </p>
        <div className="flex-1 h-px" style={{ backgroundColor:'var(--medium-gray)' }}/>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor:'var(--medium-gray)', backgroundColor:'#f5f3ff' }}>
          <div>
            <p className="text-sm font-black" style={{ color:'#7c3aed' }}>Elective Subjects</p>
            <p className="text-xs mt-0.5" style={{ color:'#6b7280' }}>
              Course-specific subjects · {subjects.filter(s=>s.type==='elective').length} subjects
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="border-b" style={{ backgroundColor:'var(--light-gray)', borderColor:'var(--medium-gray)' }}>
              <tr>
                {['Subject','Code','Department','Courses','Status',''].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor:'var(--medium-gray)' }}>
              {filtered.filter(s=>s.type==='elective').length===0
                ? <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No elective subjects match your filter</td></tr>
                : filtered.filter(s=>s.type==='elective').map(s=>(
                  <tr key={s.id} className="hover:bg-gray-50" style={{ opacity:s.active?1:0.5 }}>
                    <td className="px-4 py-3 font-semibold text-sm" style={{ color:'var(--dark-gray)' }}>{s.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.code}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{s.department}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.courses.slice(0,2).map(p=>(
                          <span key={p} className="text-xs px-1.5 py-0.5 rounded"
                            style={{ backgroundColor:'var(--light-gray)', color:'var(--dark-gray)' }}>
                            {p.replace('General ','')}
                          </span>
                        ))}
                        {s.courses.length>2&&<span className="text-xs text-gray-400">+{s.courses.length-2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Toggle checked={s.active} onChange={v=>setSubjects(ss=>ss.map(x=>x.id===s.id?{...x,active:v}:x))}/>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button type="button" onClick={()=>{ setEditS(s); setForm({...s,courses:[...s.courses]}); setShowForm(true); }}
                          style={{ color:'var(--warning)' }}><Edit3 size={14}/></button>
                        <button type="button" onClick={()=>handleDelete(s)}
                          style={{ color:'var(--accent-red)' }}><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ background:'linear-gradient(135deg,var(--royal-blue),var(--royal-blue-dark))' }}>
              <p className="text-white font-black">{editS?'Edit Subject':'Add Subject'}</p>
              <button type="button" onClick={()=>{setShowForm(false);setEditS(null);}} className="text-white"><X size={18}/></button>
            </div>
            <div className="h-1 flex-shrink-0" style={{ backgroundColor:'var(--accent-red)' }}/>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:'Subject Name *', field:'name', cls:'col-span-2' },
                  { label:'Code *',         field:'code' },
                ].map(({label,field,cls})=>(
                  <div key={field} className={cls||''}>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>{label}</label>
                    <input value={form[field]||''} onChange={e=>set(field,field==='code'?e.target.value.toUpperCase():e.target.value)}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none"
                      style={{ borderColor:'var(--medium-gray)' }}
                      onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                      onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}/>
                  </div>
                ))}
                {[
                  { label:'Type', field:'type', options:['core','elective'] },
                  { label:'Department', field:'department', options:DEPTS },
                ].map(({label,field,options})=>(
                  <div key={field}>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>{label}</label>
                    <select value={form[field]} onChange={e=>set(field,e.target.value)}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none bg-white"
                      style={{ borderColor:'var(--medium-gray)' }}>
                      {options.map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>Periods per Week</label>
                <input type="number" min={1} max={10} value={form.periodsPerWeek}
                  onChange={e=>set('periodsPerWeek',parseInt(e.target.value)||4)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none text-center font-black"
                  style={{ borderColor:'var(--medium-gray)', color:'var(--royal-blue)' }}/>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color:'var(--dark-gray)' }}>Courses</label>
                <div className="flex flex-wrap gap-2">
                  {COURSES.map(p=>(
                    <button key={p} type="button" onClick={()=>toggleProg(p)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                      style={{ backgroundColor:form.courses.includes(p)?'var(--royal-blue)':'white', color:form.courses.includes(p)?'white':'var(--dark-gray)', border:'1px solid var(--medium-gray)' }}>
                      {p.replace('General ','')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold" style={{ color:'var(--dark-gray)' }}>Active</label>
                <Toggle checked={form.active} onChange={v=>set('active',v)}/>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t flex-shrink-0"
              style={{ borderColor:'var(--medium-gray)', backgroundColor:'var(--light-gray)' }}>
              <button type="button" onClick={()=>{setShowForm(false);setEditS(null);}}
                className="px-4 py-2 text-sm rounded-xl border font-semibold"
                style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>Cancel</button>
              <button type="button" onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white rounded-xl"
                style={{ backgroundColor:'var(--royal-blue)' }}>
                <Save size={13}/> {editS?'Save':'Add Subject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SubjectManagement;