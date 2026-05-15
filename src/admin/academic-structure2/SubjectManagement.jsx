// src/admin/academic-structure2/SubjectManagement.jsx
import React, { useState, useMemo } from 'react';
import { Plus, Edit3, Trash2, Save, X, CheckCircle2, Search, BookOpen } from 'lucide-react';

const INITIAL_SUBJECTS = [
  // Core
  { id:1,  name:'Core Mathematics',         code:'CMATH', type:'core',     department:'Mathematics',    programs:['General Science','General Arts','Business','Technical'], periodsPerWeek:5, active:true },
  { id:2,  name:'English Language',          code:'ENG',   type:'core',     department:'English',        programs:['General Science','General Arts','Business','Technical'], periodsPerWeek:5, active:true },
  { id:3,  name:'Integrated Science',        code:'ISCI',  type:'core',     department:'Science',        programs:['General Science','General Arts','Business','Technical'], periodsPerWeek:4, active:true },
  { id:4,  name:'Social Studies',            code:'SOCS',  type:'core',     department:'Social Studies', programs:['General Science','General Arts','Business','Technical'], periodsPerWeek:4, active:true },
  { id:5,  name:'ICT',                       code:'ICT',   type:'core',     department:'Technical',      programs:['General Science','General Arts','Business','Technical'], periodsPerWeek:3, active:true },
  // Science Electives
  { id:6,  name:'Elective Mathematics',      code:'EMATH', type:'elective', department:'Mathematics',    programs:['General Science'], periodsPerWeek:4, active:true },
  { id:7,  name:'Physics',                   code:'PHY',   type:'elective', department:'Science',        programs:['General Science'], periodsPerWeek:4, active:true },
  { id:8,  name:'Chemistry',                 code:'CHEM',  type:'elective', department:'Science',        programs:['General Science'], periodsPerWeek:4, active:true },
  { id:9,  name:'Biology',                   code:'BIO',   type:'elective', department:'Science',        programs:['General Science'], periodsPerWeek:4, active:true },
  // Arts Electives
  { id:10, name:'Literature in English',     code:'LIT',   type:'elective', department:'English',        programs:['General Arts'], periodsPerWeek:4, active:true },
  { id:11, name:'History',                   code:'HIST',  type:'elective', department:'Social Studies', programs:['General Arts'], periodsPerWeek:4, active:true },
  { id:12, name:'Geography',                 code:'GEO',   type:'elective', department:'Social Studies', programs:['General Arts'], periodsPerWeek:4, active:true },
  { id:13, name:'Economics',                 code:'ECON',  type:'elective', department:'Business',       programs:['General Arts','Business'], periodsPerWeek:4, active:true },
  { id:14, name:'Government',               code:'GOVT',  type:'elective', department:'Social Studies', programs:['General Arts'], periodsPerWeek:4, active:true },
  { id:15, name:'French',                    code:'FRE',   type:'elective', department:'English',        programs:['General Arts'], periodsPerWeek:3, active:true },
  // Business Electives
  { id:16, name:'Accounting',                code:'ACCT',  type:'elective', department:'Business',       programs:['Business'], periodsPerWeek:4, active:true },
  { id:17, name:'Business Management',       code:'BM',    type:'elective', department:'Business',       programs:['Business'], periodsPerWeek:4, active:true },
  { id:18, name:'Typewriting/Keyboarding',   code:'TYPE',  type:'elective', department:'Business',       programs:['Business'], periodsPerWeek:3, active:true },
  // Technical Electives
  { id:19, name:'Technical Drawing',         code:'TD',    type:'elective', department:'Technical',      programs:['Technical'], periodsPerWeek:4, active:true },
  { id:20, name:'Auto Mechanics',            code:'AUTO',  type:'elective', department:'Technical',      programs:['Technical'], periodsPerWeek:4, active:true },
  { id:21, name:'Welding & Fabrication',     code:'WELD',  type:'elective', department:'Technical',      programs:['Technical'], periodsPerWeek:4, active:true },
  { id:22, name:'Electronics',               code:'ELEC',  type:'elective', department:'Technical',      programs:['Technical'], periodsPerWeek:4, active:true },
  { id:23, name:'Electrical Installation',   code:'EI',    type:'elective', department:'Technical',      programs:['Technical'], periodsPerWeek:4, active:false },
];

const DEPARTMENTS  = ['Mathematics','English','Science','Social Studies','Technical','Business'];
const PROGRAMS     = ['General Science','General Arts','Business','Technical'];
const TYPES        = ['core','elective'];
const TYPE_STYLE   = { core:{ bg:'#eef2ff',color:'var(--royal-blue)',label:'Core' }, elective:{ bg:'#f5f3ff',color:'#7c3aed',label:'Elective' } };
const EMPTY        = { name:'', code:'', type:'core', department:'Mathematics', programs:[], periodsPerWeek:4, active:true };

const SubjectManagement = () => {
  const [subjects,  setSubjects] = useState(INITIAL_SUBJECTS);
  const [showForm,  setShowForm] = useState(false);
  const [editSubj,  setEditS]    = useState(null);
  const [form,      setForm]     = useState(EMPTY);
  const [toast,     setToast]    = useState(null);
  const [search,    setSearch]   = useState('');
  const [filterType,setFT]       = useState('all');
  const [filterDept,setFD]       = useState('all');

  const showToast = (msg,type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const toggleProg = (p) => set('programs', form.programs.includes(p)?form.programs.filter(x=>x!==p):[...form.programs,p]);

  const handleSave = () => {
    if (!form.name.trim()||!form.code.trim()) return;
    if (editSubj) {
      setSubjects(ss=>ss.map(s=>s.id===editSubj.id?{...s,...form}:s));
      showToast(`${form.name} updated`);
    } else {
      setSubjects(ss=>[...ss,{...form,id:Date.now()}]);
      showToast(`${form.name} added`);
    }
    setShowForm(false); setEditS(null); setForm(EMPTY);
  };

  const handleDelete = (s) => {
    setSubjects(ss=>ss.filter(x=>x.id!==s.id));
    showToast(`${s.name} removed`,'error');
  };

  const filtered = useMemo(() =>
    subjects.filter(s => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
      const matchType = filterType==='all' || s.type===filterType;
      const matchDept = filterDept==='all' || s.department===filterDept;
      return matchSearch && matchType && matchDept;
    })
  ,[subjects,search,filterType,filterDept]);

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
          <h1 className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>Subject Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {subjects.length} subjects · {subjects.filter(s=>s.type==='core').length} core · {subjects.filter(s=>s.type==='elective').length} elective
          </p>
        </div>
        <button type="button" onClick={()=>{ setEditS(null); setForm(EMPTY); setShowForm(true); }}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
          style={{ backgroundColor:'var(--royal-blue)' }}>
          <Plus size={14}/> Add Subject
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Subjects',    value:subjects.length,                            color:'var(--royal-blue)' },
          { label:'Core Subjects',     value:subjects.filter(s=>s.type==='core').length, color:'var(--success-dark)' },
          { label:'Elective Subjects', value:subjects.filter(s=>s.type==='elective').length, color:'#7c3aed' },
          { label:'Active Subjects',   value:subjects.filter(s=>s.active).length,        color:'var(--warning)' },
        ].map(({label,value,color})=>(
          <div key={label} className="bg-white rounded-xl border p-4 text-center shadow-sm" style={{ borderColor:'var(--medium-gray)' }}>
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl border shadow-sm p-4" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search subject name or code…"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border-2 outline-none"
              style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
              onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
              onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}/>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all','core','elective'].map(f=>(
              <button key={f} type="button" onClick={()=>setFT(f)}
                className="text-xs font-semibold px-3 py-2 rounded-xl capitalize"
                style={{ backgroundColor:filterType===f?'var(--royal-blue)':'white', color:filterType===f?'white':'var(--dark-gray)', border:'1px solid var(--medium-gray)' }}>
                {f==='all'?'All Types':f}
              </button>
            ))}
          </div>
          <select value={filterDept} onChange={e=>setFD(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border-2 outline-none bg-white"
            style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>
            <option value="all">All Departments</option>
            {DEPARTMENTS.map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <p className="text-xs text-gray-400 mt-2">Showing <strong>{filtered.length}</strong> of <strong>{subjects.length}</strong> subjects</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="border-b" style={{ backgroundColor:'var(--light-gray)', borderColor:'var(--medium-gray)' }}>
              <tr>
                {['Subject','Code','Type','Department','Programmes','Periods/Wk','Status','Actions'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor:'var(--medium-gray)' }}>
              {filtered.length===0
                ? <tr><td colSpan={8} className="px-4 py-10 text-center text-gray-400">No subjects match your search</td></tr>
                : filtered.map(s=>{
                  const ts = TYPE_STYLE[s.type];
                  return (
                    <tr key={s.id} className="hover:bg-gray-50" style={{ opacity:s.active?1:0.5 }}>
                      <td className="px-4 py-3 font-semibold" style={{ color:'var(--dark-gray)' }}>{s.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.code}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ backgroundColor:ts.bg, color:ts.color }}>{ts.label}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{s.department}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {s.programs.slice(0,2).map(p=>(
                            <span key={p} className="text-xs px-1.5 py-0.5 rounded font-medium"
                              style={{ backgroundColor:'var(--light-gray)', color:'var(--dark-gray)' }}>
                              {p.replace('General ','')}
                            </span>
                          ))}
                          {s.programs.length>2 && <span className="text-xs text-gray-400">+{s.programs.length-2}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-sm" style={{ color:'var(--royal-blue)' }}>{s.periodsPerWeek}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold" style={{ color:s.active?'var(--success-dark)':'var(--accent-red)' }}>
                          {s.active?'Active':'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={()=>{ setEditS(s); setForm({...s,programs:[...s.programs]}); setShowForm(true); }}
                            style={{ color:'var(--warning)' }}><Edit3 size={14}/></button>
                          <button type="button" onClick={()=>handleDelete(s)}
                            style={{ color:'var(--accent-red)' }}><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ background:'linear-gradient(135deg,var(--royal-blue),var(--royal-blue-dark))' }}>
              <p className="text-white font-black">{editSubj?'Edit Subject':'Add Subject'}</p>
              <button type="button" onClick={()=>{setShowForm(false);setEditS(null);}} className="text-white"><X size={18}/></button>
            </div>
            <div className="h-1 flex-shrink-0" style={{ backgroundColor:'var(--accent-red)' }}/>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>Subject Name *</label>
                  <input value={form.name} onChange={e=>set('name',e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none"
                    style={{ borderColor:'var(--medium-gray)' }}
                    onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                    onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}/>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>Code *</label>
                  <input value={form.code} onChange={e=>set('code',e.target.value.toUpperCase())}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none font-mono"
                    style={{ borderColor:'var(--medium-gray)' }}
                    onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                    onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}/>
                </div>
              </div>
              {[
                { label:'Type',          field:'type',       options:TYPES         },
                { label:'Department',    field:'department', options:DEPARTMENTS   },
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
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>Periods Per Week</label>
                <input type="number" min={1} max={10} value={form.periodsPerWeek}
                  onChange={e=>set('periodsPerWeek',parseInt(e.target.value)||4)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none text-center font-bold"
                  style={{ borderColor:'var(--medium-gray)' }}/>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color:'var(--dark-gray)' }}>Programmes</label>
                <div className="flex flex-wrap gap-2">
                  {PROGRAMS.map(p=>(
                    <button key={p} type="button" onClick={()=>toggleProg(p)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                      style={{ backgroundColor:form.programs.includes(p)?'var(--royal-blue)':'white', color:form.programs.includes(p)?'white':'var(--dark-gray)', border:'1px solid var(--medium-gray)' }}>
                      {p.replace('General ','')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold" style={{ color:'var(--dark-gray)' }}>Active</label>
                <button type="button" onClick={()=>set('active',!form.active)}
                  className="relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors"
                  style={{ backgroundColor:form.active?'var(--success-dark)':'#d1d5db' }}>
                  <span className="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
                    style={{ transform:form.active?'translateX(20px)':'translateX(0)' }}/>
                </button>
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
                <Save size={13}/> {editSubj?'Save Changes':'Add Subject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;