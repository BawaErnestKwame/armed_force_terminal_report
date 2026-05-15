// src/admin/academic-structure1/AssessmentConfiguration.jsx
import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit3, X, CheckCircle2, Info, RotateCcw } from 'lucide-react';

const DEFAULT_CONFIG = {
  caMax: 30,
  examMax: 70,
  totalMax: 100,
  passScore: 50,
  caBreakdown: [
    { id:1, name:'Class Test 1',    weight:10, type:'test'      },
    { id:2, name:'Class Test 2',    weight:10, type:'test'      },
    { id:3, name:'Project / Assignment', weight:5, type:'project' },
    { id:4, name:'Attendance & Participation', weight:5, type:'other' },
  ],
  examRules: {
    duration:     '3 hours',
    startTime:    '08:00',
    supervision:  'At least 2 invigilators per hall',
    materials:    'Pen, pencil, ruler, calculator (where applicable)',
    malpractice:  'Immediate disqualification and report to WAEC',
  },
  termWeight: [
    { term:'Term 1', weight:30, desc:'Contributes 30% to annual result' },
    { term:'Term 2', weight:30, desc:'Contributes 30% to annual result' },
    { term:'Term 3', weight:40, desc:'Final term — weighted higher'     },
  ],
};

const TYPE_STYLE = {
  test:    { bg:'#eef2ff', color:'var(--royal-blue)' },
  project: { bg:'#f5f3ff', color:'#7c3aed'           },
  other:   { bg:'#f0fdf4', color:'var(--success-dark)'},
};

const FInput = ({ label, value, onChange, type='text', placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold uppercase tracking-wider" style={{ color:'var(--dark-gray)' }}>{label}</label>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      className="px-3 py-2.5 text-sm rounded-xl border-2 outline-none"
      style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
      onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
      onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
    />
  </div>
);

const AssessmentConfiguration = () => {
  const [cfg,     setCfg]     = useState(DEFAULT_CONFIG);
  const [toast,   setToast]   = useState(null);
  const [editId,  setEditId]  = useState(null);
  const [newItem, setNewItem] = useState({ name:'', weight:0, type:'test' });
  const [showAdd, setShowAdd] = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  const totalCA = cfg.caBreakdown.reduce((s,c)=>s+c.weight,0);
  const caOk    = totalCA === cfg.caMax;

  const handleSave = () => showToast('Assessment configuration saved successfully');
  const handleReset = () => { setCfg(DEFAULT_CONFIG); showToast('Reset to defaults'); };

  const addItem = () => {
    if (!newItem.name.trim()) return;
    setCfg(c=>({ ...c, caBreakdown:[...c.caBreakdown, { ...newItem, id:Date.now() }] }));
    setNewItem({ name:'', weight:0, type:'test' });
    setShowAdd(false);
  };

  const removeItem = (id) => setCfg(c=>({ ...c, caBreakdown:c.caBreakdown.filter(x=>x.id!==id) }));

  const updateItem = (id, field, val) =>
    setCfg(c=>({ ...c, caBreakdown:c.caBreakdown.map(x=>x.id===id?{...x,[field]:val}:x) }));

  const SectionHeader = ({ title, desc }) => (
    <div className="mb-4">
      <h2 className="font-black text-base" style={{ color:'var(--dark-gray)' }}>{title}</h2>
      {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor:'var(--success-dark)' }}>
          <CheckCircle2 size={14}/> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>Assessment Configuration</h1>
          <p className="text-xs text-gray-400 mt-0.5">Define CA breakdown, exam weights and assessment rules</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border"
            style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>
            <RotateCcw size={13}/> Reset
          </button>
          <button type="button" onClick={handleSave}
            className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
            style={{ backgroundColor:'var(--royal-blue)' }}>
            <Save size={14}/> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Score Breakdown */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <SectionHeader title="Score Breakdown" desc="Define how total 100 marks are split"/>
          <div className="space-y-3">
            {[
              { label:'Continuous Assessment (CA)',  key:'caMax',    max:50 },
              { label:'End of Term Examination',     key:'examMax',  max:100},
              { label:'Pass Score (Minimum)',         key:'passScore', max:100},
            ].map(({ label, key, max }) => (
              <div key={key} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor:'var(--medium-gray)' }}>
                <span className="text-sm" style={{ color:'var(--dark-gray)' }}>{label}</span>
                <input type="number" min={0} max={max}
                  value={cfg[key]}
                  onChange={e=>setCfg(c=>({...c,[key]:parseInt(e.target.value)||0}))}
                  className="w-20 px-3 py-1.5 text-sm rounded-xl border-2 text-center font-bold outline-none"
                  style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
                  onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                  onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
                />
              </div>
            ))}
            {/* Visual bar */}
            <div className="pt-2">
              <p className="text-xs text-gray-400 mb-1.5">Score distribution</p>
              <div className="flex h-7 rounded-xl overflow-hidden text-xs font-black">
                <div className="flex items-center justify-center text-white"
                  style={{ flex:cfg.caMax, backgroundColor:'var(--royal-blue)' }}>CA {cfg.caMax}</div>
                <div className="flex items-center justify-center text-white"
                  style={{ flex:cfg.examMax, backgroundColor:'var(--accent-red)' }}>Exam {cfg.examMax}</div>
              </div>
            </div>
          </div>
        </div>

        {/* CA Breakdown */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-black text-base" style={{ color:'var(--dark-gray)' }}>CA Breakdown</h2>
              <p className="text-xs text-gray-400 mt-0.5">Total must equal {cfg.caMax}</p>
            </div>
            <span className="text-sm font-black px-3 py-1 rounded-xl"
              style={{ backgroundColor:caOk?'#f0fdf4':'#fff1f2', color:caOk?'var(--success-dark)':'var(--accent-red)' }}>
              {totalCA}/{cfg.caMax} {caOk?'✓':'⚠'}
            </span>
          </div>
          <div className="space-y-2">
            {cfg.caBreakdown.map(item => {
              const ts = TYPE_STYLE[item.type] || TYPE_STYLE.other;
              return editId === item.id ? (
                <div key={item.id} className="flex items-center gap-2 p-2 rounded-xl border-2"
                  style={{ borderColor:'var(--royal-blue)', backgroundColor:'#eef2ff' }}>
                  <input value={item.name} onChange={e=>updateItem(item.id,'name',e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs rounded-lg border outline-none"
                    style={{ borderColor:'var(--medium-gray)' }}/>
                  <input type="number" min={0} max={30} value={item.weight}
                    onChange={e=>updateItem(item.id,'weight',parseInt(e.target.value)||0)}
                    className="w-14 px-2 py-1.5 text-xs rounded-lg border outline-none text-center font-bold"
                    style={{ borderColor:'var(--medium-gray)' }}/>
                  <select value={item.type} onChange={e=>updateItem(item.id,'type',e.target.value)}
                    className="px-2 py-1.5 text-xs rounded-lg border outline-none bg-white"
                    style={{ borderColor:'var(--medium-gray)' }}>
                    <option value="test">Test</option>
                    <option value="project">Project</option>
                    <option value="other">Other</option>
                  </select>
                  <button type="button" onClick={()=>setEditId(null)}
                    className="p-1 rounded" style={{ color:'var(--success-dark)' }}><CheckCircle2 size={14}/></button>
                </div>
              ) : (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border"
                  style={{ borderColor:'var(--medium-gray)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor:ts.bg, color:ts.color }}>
                      {item.type}
                    </span>
                    <span className="text-sm" style={{ color:'var(--dark-gray)' }}>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color:'var(--royal-blue)' }}>{item.weight} marks</span>
                    <button type="button" onClick={()=>setEditId(item.id)} style={{ color:'var(--warning)' }}><Edit3 size={13}/></button>
                    <button type="button" onClick={()=>removeItem(item.id)} style={{ color:'var(--accent-red)' }}><Trash2 size={13}/></button>
                  </div>
                </div>
              );
            })}
            {showAdd ? (
              <div className="flex items-center gap-2 p-2 rounded-xl border-2" style={{ borderColor:'var(--royal-blue)' }}>
                <input value={newItem.name} onChange={e=>setNewItem(n=>({...n,name:e.target.value}))}
                  placeholder="Component name" className="flex-1 px-2 py-1.5 text-xs rounded-lg border outline-none"
                  style={{ borderColor:'var(--medium-gray)' }}/>
                <input type="number" min={0} max={30} value={newItem.weight}
                  onChange={e=>setNewItem(n=>({...n,weight:parseInt(e.target.value)||0}))}
                  className="w-14 px-2 py-1.5 text-xs rounded-lg border outline-none text-center"
                  style={{ borderColor:'var(--medium-gray)' }}/>
                <select value={newItem.type} onChange={e=>setNewItem(n=>({...n,type:e.target.value}))}
                  className="px-2 py-1.5 text-xs rounded-lg border outline-none bg-white" style={{ borderColor:'var(--medium-gray)' }}>
                  <option value="test">Test</option>
                  <option value="project">Project</option>
                  <option value="other">Other</option>
                </select>
                <button type="button" onClick={addItem} style={{ color:'var(--success-dark)' }}><CheckCircle2 size={14}/></button>
                <button type="button" onClick={()=>setShowAdd(false)} style={{ color:'var(--accent-red)' }}><X size={14}/></button>
              </div>
            ) : (
              <button type="button" onClick={()=>setShowAdd(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl border-2 border-dashed transition"
                style={{ borderColor:'var(--medium-gray)', color:'var(--royal-blue)' }}>
                <Plus size={13}/> Add Component
              </button>
            )}
          </div>
        </div>

        {/* Term Weights */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <SectionHeader title="Term Weighting" desc="How much each term contributes to the annual result"/>
          <div className="space-y-3">
            {cfg.termWeight.map((t,i) => (
              <div key={t.term}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold" style={{ color:'var(--dark-gray)' }}>{t.term}</span>
                  <input type="number" min={0} max={100} value={t.weight}
                    onChange={e=>{
                      const w = parseInt(e.target.value)||0;
                      setCfg(c=>({ ...c, termWeight:c.termWeight.map((x,j)=>j===i?{...x,weight:w}:x) }));
                    }}
                    className="w-16 px-2 py-1.5 text-sm rounded-lg border-2 text-center font-bold outline-none"
                    style={{ borderColor:'var(--medium-gray)' }}
                    onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                    onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
                  />
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor:'var(--medium-gray)' }}>
                  <div className="h-full rounded-full" style={{ width:`${t.weight}%`, backgroundColor:'var(--royal-blue)' }}/>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </div>
            ))}
            <div className="p-2 rounded-lg text-xs font-semibold text-center"
              style={{ backgroundColor: cfg.termWeight.reduce((s,t)=>s+t.weight,0)===100?'#f0fdf4':'#fff1f2',
                color: cfg.termWeight.reduce((s,t)=>s+t.weight,0)===100?'var(--success-dark)':'var(--accent-red)' }}>
              Total: {cfg.termWeight.reduce((s,t)=>s+t.weight,0)}% {cfg.termWeight.reduce((s,t)=>s+t.weight,0)===100?'✓ Correct':'⚠ Must equal 100%'}
            </div>
          </div>
        </div>

        {/* Exam Rules */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <SectionHeader title="Examination Rules" desc="Rules that apply to all end-of-term exams"/>
          <div className="space-y-3">
            {Object.entries(cfg.examRules).map(([key, val]) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {key.replace(/([A-Z])/g,' $1').trim()}
                </label>
                <input value={val}
                  onChange={e=>setCfg(c=>({...c,examRules:{...c.examRules,[key]:e.target.value}}))}
                  className="px-3 py-2.5 text-sm rounded-xl border-2 outline-none"
                  style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
                  onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                  onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentConfiguration;