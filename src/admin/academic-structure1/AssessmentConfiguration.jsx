// src/admin/academic-structure1/AssessmentConfiguration.jsx
import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit3, X, CheckCircle2, RotateCcw, Info } from 'lucide-react';

const DEFAULT = {
  caMax: 30, examMax: 70, passScore: 50,
  caBreakdown: [
    { id:1, name:'Class Test 1',             weight:10, type:'test'    },
    { id:2, name:'Class Test 2',             weight:10, type:'test'    },
    { id:3, name:'Project / Assignment',     weight:5,  type:'project' },
    { id:4, name:'Attendance & Participation',weight:5, type:'other'   },
  ],
  termWeight: [
    { term:'Term 1', weight:30 },
    { term:'Term 2', weight:30 },
    { term:'Term 3', weight:40 },
  ],
  examRules: {
    duration:    '3 hours',
    startTime:   '08:00',
    supervision: 'At least 2 invigilators per hall',
    materials:   'Pen, pencil, ruler, calculator (where applicable)',
    malpractice: 'Immediate disqualification and report to WAEC',
  },
  autoCalc: { total:true, grade:true, position:true, aggregate:true },
};

const TYPE_STYLE = {
  test:    { bg:'#eef2ff', color:'var(--royal-blue)', label:'Test'    },
  project: { bg:'#f5f3ff', color:'#7c3aed',           label:'Project' },
  other:   { bg:'#f0fdf4', color:'var(--success-dark)',label:'Other'  },
};

const AssessmentConfiguration = () => {
  const [cfg,     setCfg]    = useState(DEFAULT);
  const [editId,  setEditId] = useState(null);
  const [showAdd, setShowAdd]= useState(false);
  const [newItem, setNewItem]= useState({ name:'', weight:5, type:'test' });
  const [toast,   setToast]  = useState(null);

  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const totalCA = cfg.caBreakdown.reduce((s,c)=>s+c.weight,0);
  const caOk    = totalCA === cfg.caMax;
  const termOk  = cfg.termWeight.reduce((s,t)=>s+t.weight,0) === 100;

  const addItem = () => {
    if (!newItem.name.trim()) return;
    setCfg(c=>({...c,caBreakdown:[...c.caBreakdown,{...newItem,id:Date.now()}]}));
    setNewItem({name:'',weight:5,type:'test'}); setShowAdd(false);
    showToast('Component added');
  };
  const removeItem = (id) => { setCfg(c=>({...c,caBreakdown:c.caBreakdown.filter(x=>x.id!==id)})); showToast('Component removed','warning'); };
  const updateItem = (id,field,val) => setCfg(c=>({...c,caBreakdown:c.caBreakdown.map(x=>x.id===id?{...x,[field]:val}:x)}));
  const updateTermWeight = (i,w) => setCfg(c=>({...c,termWeight:c.termWeight.map((t,j)=>j===i?{...t,weight:w}:t)}));
  const updateRule = (k,v) => setCfg(c=>({...c,examRules:{...c.examRules,[k]:v}}));

  const inputCls = "w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none";
  const ib = { borderColor:'var(--medium-gray)', color:'var(--dark-gray)' };
  const onFocus = e=>e.target.style.borderColor='var(--royal-blue)';
  const onBlur  = e=>e.target.style.borderColor='var(--medium-gray)';

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor: toast.type==='warning'?'var(--warning)':toast.type==='error'?'var(--accent-red)':'var(--success-dark)' }}>
          <CheckCircle2 size={14}/> {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black" style={{ color:'var(--dark-gray)' }}>Assessment Configuration</h2>
          <p className="text-xs text-gray-400 mt-0.5">CA breakdown, exam weights, term weighting and auto-calculation rules</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={()=>{setCfg(DEFAULT);showToast('Reset to defaults','warning');}}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border"
            style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>
            <RotateCcw size={13}/> Reset
          </button>
          <button type="button" onClick={()=>showToast('Assessment configuration saved')}
            className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
            style={{ backgroundColor:'var(--royal-blue)' }}>
            <Save size={14}/> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Score Breakdown */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <h3 className="font-black text-sm mb-4" style={{ color:'var(--dark-gray)' }}>Score Breakdown</h3>
          <div className="space-y-3 mb-4">
            {[
              { label:'Continuous Assessment (CA)',  key:'caMax',    max:50  },
              { label:'End of Term Examination',     key:'examMax',  max:100 },
              { label:'Minimum Pass Score',          key:'passScore',max:100 },
            ].map(({ label, key, max }) => (
              <div key={key} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor:'var(--medium-gray)' }}>
                <span className="text-sm" style={{ color:'var(--dark-gray)' }}>{label}</span>
                <input type="number" min={0} max={max} value={cfg[key]}
                  onChange={e=>setCfg(c=>({...c,[key]:parseInt(e.target.value)||0}))}
                  className="w-20 px-3 py-1.5 text-sm rounded-xl border-2 text-center font-bold outline-none"
                  style={ib} onFocus={onFocus} onBlur={onBlur}/>
              </div>
            ))}
          </div>
          <div className="flex h-8 rounded-xl overflow-hidden text-xs font-black">
            <div className="flex items-center justify-center text-white transition-all" style={{ flex:cfg.caMax, backgroundColor:'var(--royal-blue)' }}>CA {cfg.caMax}%</div>
            <div className="flex items-center justify-center text-white transition-all" style={{ flex:cfg.examMax, backgroundColor:'var(--accent-red)' }}>Exam {cfg.examMax}%</div>
          </div>
          <p className="text-xs text-center mt-2" style={{ color: cfg.caMax+cfg.examMax===100?'var(--success-dark)':'var(--accent-red)' }}>
            {cfg.caMax+cfg.examMax===100 ? '✓ Total = 100%' : `⚠ Total = ${cfg.caMax+cfg.examMax}% (must be 100)`}
          </p>
        </div>

        {/* CA Breakdown */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-sm" style={{ color:'var(--dark-gray)' }}>CA Breakdown</h3>
            <span className="text-sm font-black px-3 py-0.5 rounded-xl"
              style={{ backgroundColor:caOk?'#f0fdf4':'#fff1f2', color:caOk?'var(--success-dark)':'var(--accent-red)' }}>
              {totalCA}/{cfg.caMax} {caOk?'✓':'⚠'}
            </span>
          </div>
          <div className="space-y-2 mb-3">
            {cfg.caBreakdown.map(item => {
              const ts = TYPE_STYLE[item.type]||TYPE_STYLE.other;
              return editId === item.id ? (
                <div key={item.id} className="flex items-center gap-2 p-2 rounded-xl border-2" style={{ borderColor:'var(--royal-blue)', backgroundColor:'#eef2ff' }}>
                  <input value={item.name} onChange={e=>updateItem(item.id,'name',e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs rounded-lg border outline-none" style={ib}/>
                  <input type="number" min={0} max={30} value={item.weight} onChange={e=>updateItem(item.id,'weight',parseInt(e.target.value)||0)}
                    className="w-14 px-2 py-1.5 text-xs rounded-lg border outline-none text-center font-bold" style={ib}/>
                  <select value={item.type} onChange={e=>updateItem(item.id,'type',e.target.value)}
                    className="px-2 py-1.5 text-xs rounded-lg border outline-none bg-white" style={ib}>
                    <option value="test">Test</option><option value="project">Project</option><option value="other">Other</option>
                  </select>
                  <button type="button" onClick={()=>setEditId(null)} style={{ color:'var(--success-dark)' }}><CheckCircle2 size={14}/></button>
                </div>
              ) : (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor:'var(--medium-gray)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor:ts.bg, color:ts.color }}>{ts.label}</span>
                    <span className="text-sm" style={{ color:'var(--dark-gray)' }}>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color:'var(--royal-blue)' }}>{item.weight}m</span>
                    <button type="button" onClick={()=>setEditId(item.id)} style={{ color:'var(--warning)' }}><Edit3 size={12}/></button>
                    <button type="button" onClick={()=>removeItem(item.id)} style={{ color:'var(--accent-red)' }}><Trash2 size={12}/></button>
                  </div>
                </div>
              );
            })}
            {showAdd ? (
              <div className="flex items-center gap-2 p-2 rounded-xl border-2" style={{ borderColor:'var(--royal-blue)' }}>
                <input value={newItem.name} onChange={e=>setNewItem(n=>({...n,name:e.target.value}))}
                  placeholder="Component name" className="flex-1 px-2 py-1.5 text-xs rounded-lg border outline-none" style={ib}/>
                <input type="number" min={0} max={30} value={newItem.weight} onChange={e=>setNewItem(n=>({...n,weight:parseInt(e.target.value)||0}))}
                  className="w-14 px-2 py-1.5 text-xs rounded-lg border outline-none text-center" style={ib}/>
                <select value={newItem.type} onChange={e=>setNewItem(n=>({...n,type:e.target.value}))}
                  className="px-2 py-1.5 text-xs rounded-lg border outline-none bg-white" style={ib}>
                  <option value="test">Test</option><option value="project">Project</option><option value="other">Other</option>
                </select>
                <button type="button" onClick={addItem} style={{ color:'var(--success-dark)' }}><CheckCircle2 size={14}/></button>
                <button type="button" onClick={()=>setShowAdd(false)} style={{ color:'var(--accent-red)' }}><X size={14}/></button>
              </div>
            ) : (
              <button type="button" onClick={()=>setShowAdd(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl border-2 border-dashed"
                style={{ borderColor:'var(--medium-gray)', color:'var(--royal-blue)' }}>
                <Plus size={13}/> Add Component
              </button>
            )}
          </div>
        </div>

        {/* Term Weights */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <h3 className="font-black text-sm mb-4" style={{ color:'var(--dark-gray)' }}>Term Weighting</h3>
          <div className="space-y-4">
            {cfg.termWeight.map((t,i) => (
              <div key={t.term}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold" style={{ color:'var(--dark-gray)' }}>{t.term}</span>
                  <input type="number" min={0} max={100} value={t.weight} onChange={e=>updateTermWeight(i,parseInt(e.target.value)||0)}
                    className="w-16 px-2 py-1.5 text-sm rounded-lg border-2 text-center font-bold outline-none"
                    style={ib} onFocus={onFocus} onBlur={onBlur}/>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor:'var(--medium-gray)' }}>
                  <div className="h-full rounded-full" style={{ width:`${t.weight}%`, backgroundColor:'var(--royal-blue)' }}/>
                </div>
              </div>
            ))}
            <div className="p-2 rounded-lg text-xs font-semibold text-center"
              style={{ backgroundColor:termOk?'#f0fdf4':'#fff1f2', color:termOk?'var(--success-dark)':'var(--accent-red)' }}>
              Total: {cfg.termWeight.reduce((s,t)=>s+t.weight,0)}% {termOk?'✓ Correct':'⚠ Must equal 100%'}
            </div>
          </div>
        </div>

        {/* Exam Rules + Auto Calc */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
            <h3 className="font-black text-sm mb-4" style={{ color:'var(--dark-gray)' }}>Exam Rules</h3>
            <div className="space-y-3">
              {Object.entries(cfg.examRules).map(([key,val]) => (
                <div key={key}>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-gray-400">
                    {key.replace(/([A-Z])/g,' $1').trim()}
                  </label>
                  <input value={val} onChange={e=>updateRule(key,e.target.value)}
                    className={`${inputCls} w-full`} style={ib} onFocus={onFocus} onBlur={onBlur}/>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
            <h3 className="font-black text-sm mb-4" style={{ color:'var(--dark-gray)' }}>Auto Calculation</h3>
            <div className="space-y-2.5">
              {Object.entries(cfg.autoCalc).map(([key,val]) => (
                <label key={key} className="flex items-center justify-between py-2 border-b last:border-0"
                  style={{ borderColor:'var(--medium-gray)' }}>
                  <span className="text-sm capitalize" style={{ color:'var(--dark-gray)' }}>
                    Calculate {key.replace(/([A-Z])/g,' $1')}
                  </span>
                  <button type="button" onClick={()=>setCfg(c=>({...c,autoCalc:{...c.autoCalc,[key]:!val}}))}
                    className="relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors"
                    style={{ backgroundColor:val?'var(--success-dark)':'#d1d5db' }}>
                    <span className="inline-block h-5 w-5 rounded-full bg-white shadow transition-transform"
                      style={{ transform:val?'translateX(20px)':'translateX(0)' }}/>
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentConfiguration;