// src/admin/academic-structure2/DepartmentManagement.jsx
import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, CheckCircle2, ChevronDown, BookOpen } from 'lucide-react';
import { TEACHERS } from '../data/adminData';

const INIT = [
  { id:1, name:'Mathematics',    code:'MTH', color:'var(--royal-blue)', bg:'#eef2ff', hodId:15, subjects:['Core Mathematics','Elective Mathematics'] },
  { id:2, name:'English',        code:'ENG', color:'#7c3aed',           bg:'#f5f3ff', hodId:13, subjects:['English Language','Literature in English'] },
  { id:3, name:'Science',        code:'SCI', color:'var(--accent-red)', bg:'#fff1f2', hodId:3,  subjects:['Integrated Science','Physics','Chemistry','Biology'] },
  { id:4, name:'Social Studies', code:'SOC', color:'#ca8a04',           bg:'#fefce8', hodId:5,  subjects:['Social Studies','History','Geography','Government'] },
  { id:5, name:'Technical',      code:'TCH', color:'var(--success-dark)',bg:'#f0fdf4', hodId:4,  subjects:['Technical Drawing','ICT','Auto Mechanics','Welding & Fabrication','Electronics'] },
  { id:6, name:'Business',       code:'BUS', color:'#0369a1',           bg:'#f0f9ff', hodId:9,  subjects:['Accounting','Economics','Business Management'] },
];

const EMPTY = { name:'', code:'', color:'var(--royal-blue)', bg:'#eef2ff', hodId:'', subjects:[] };

const DepartmentManagement = () => {
  const [depts,    setDepts]    = useState(INIT);
  const [showForm, setShowForm] = useState(false);
  const [editDept, setEditD]    = useState(null);
  const [form,     setForm]     = useState({...EMPTY});
  const [subInput, setSubInput] = useState('');
  const [openDept, setOpenDept] = useState(null);
  const [toast,    setToast]    = useState(null);

  const showToast = (msg,type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const addSub = () => {
    const s = subInput.trim();
    if (s && !form.subjects.includes(s)) { set('subjects',[...form.subjects,s]); setSubInput(''); }
  };
  const removeSub = (s) => set('subjects',form.subjects.filter(x=>x!==s));

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editDept) {
      setDepts(ds=>ds.map(d=>d.id===editDept.id?{...d,...form}:d));
      showToast(`${form.name} updated`);
    } else {
      setDepts(ds=>[...ds,{...form,id:Date.now()}]);
      showToast(`${form.name} created`);
    }
    setShowForm(false); setEditD(null); setForm({...EMPTY});
  };

  const handleDelete = (d) => {
    setDepts(ds=>ds.filter(x=>x.id!==d.id));
    showToast(`${d.name} removed`,'error');
  };

  const getTeacher = (id) => TEACHERS.find(t=>t.id===id||t.id===parseInt(id));
  const getDeptTeachers = (name) => TEACHERS.filter(t=>t.department===name);

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
          <h2 className="font-black text-base" style={{ color:'var(--dark-gray)' }}>Department Management</h2>
          <p className="text-xs text-gray-400">{depts.length} departments · assign HODs, subjects and staff</p>
        </div>
        <button type="button" onClick={()=>{ setEditD(null); setForm({...EMPTY}); setShowForm(true); }}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
          style={{ backgroundColor:'var(--royal-blue)' }}>
          <Plus size={14}/> Add Department
        </button>
      </div>

      {/* Quick-pick pills */}
      <div className="flex flex-wrap gap-2">
        {depts.map(d=>(
          <button key={d.id} type="button" onClick={()=>setOpenDept(openDept===d.id?null:d.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition"
            style={{ borderColor:openDept===d.id?d.color:'var(--medium-gray)', backgroundColor:openDept===d.id?d.bg:'white', color:openDept===d.id?d.color:'var(--dark-gray)' }}>
            {d.name} ({getDeptTeachers(d.name).length})
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label:'Departments',    value:depts.length,                                  color:'var(--royal-blue)' },
          { label:'Teaching Staff', value:TEACHERS.length,                               color:'#7c3aed'           },
          { label:'Total Subjects', value:depts.reduce((s,d)=>s+d.subjects.length,0),   color:'var(--success-dark)'},
          { label:'Avg Staff/Dept', value:Math.round(TEACHERS.length/Math.max(depts.length,1)), color:'var(--warning)' },
        ].map(({label,value,color})=>(
          <div key={label} className="bg-white rounded-xl border p-3 text-center shadow-sm" style={{ borderColor:'var(--medium-gray)' }}>
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Department cards */}
      <div className="space-y-3">
        {depts.map(dept=>{
          const hod    = getTeacher(dept.hodId);
          const staff  = getDeptTeachers(dept.name);
          const isOpen = openDept===dept.id;
          return (
            <div key={dept.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden"
              style={{ borderColor:isOpen?dept.color:'var(--medium-gray)', borderWidth:isOpen?2:1 }}>
              <div onClick={()=>setOpenDept(isOpen?null:dept.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black"
                    style={{ backgroundColor:dept.color }}>{dept.code}</div>
                  <div>
                    <p className="font-black text-sm" style={{ color:'var(--dark-gray)' }}>{dept.name} Department</p>
                    <p className="text-xs text-gray-400">
                      {staff.length} staff · {dept.subjects.length} subjects
                      {hod?` · HOD: ${hod.title} ${hod.lastName}`:''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={e=>{e.stopPropagation();setEditD(dept);setForm({...dept,subjects:[...dept.subjects]});setShowForm(true);}}
                    style={{ color:'var(--warning)' }}><Edit3 size={14}/></button>
                  <button type="button" onClick={e=>{e.stopPropagation();handleDelete(dept);}}
                    style={{ color:'var(--accent-red)' }}><Trash2 size={14}/></button>
                  <ChevronDown size={15} className="text-gray-400 transition-transform"
                    style={{ transform:isOpen?'rotate(180deg)':undefined }}/>
                </div>
              </div>

              {isOpen && (
                <div className="border-t px-4 pb-4 pt-3 space-y-4"
                  style={{ borderColor:'var(--medium-gray)', backgroundColor:'var(--light-gray)' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color:'var(--dark-gray)',opacity:0.5 }}>Subjects</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dept.subjects.map(s=>(
                          <span key={s} className="text-xs px-2 py-1 rounded-lg font-medium"
                            style={{ backgroundColor:dept.bg, color:dept.color, border:`1px solid ${dept.color}30` }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color:'var(--dark-gray)',opacity:0.5 }}>
                        Staff ({staff.length})
                      </p>
                      <div className="space-y-1.5">
                        {staff.length===0
                          ? <p className="text-xs text-gray-400">No staff assigned to this department</p>
                          : staff.map(t=>(
                          <div key={t.id} className="flex items-center gap-2 text-xs bg-white rounded-lg p-2 border"
                            style={{ borderColor:'var(--medium-gray)' }}>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                              style={{ backgroundColor:dept.color }}>
                              {t.firstName[0]}{t.lastName[0]}
                            </div>
                            <span className="font-semibold flex-1 truncate" style={{ color:'var(--dark-gray)' }}>
                              {t.title} {t.firstName} {t.lastName}
                            </span>
                            <div className="flex gap-1 flex-wrap justify-end">
                              {dept.hodId===t.id&&<span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor:dept.bg,color:dept.color }}>HOD</span>}
                              {t.formClass&&<span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor:'#f0fdf4',color:'var(--success-dark)' }}>FT</span>}
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">{t.currentPeriods||0}/{t.maxPeriods||30} periods</p>
                              <div className="h-1 rounded-full overflow-hidden mt-0.5" style={{ width:60, backgroundColor:'var(--medium-gray)' }}>
                                <div className="h-full rounded-full" style={{ width:`${Math.round(((t.currentPeriods||0)/(t.maxPeriods||30))*100)}%`, backgroundColor:dept.color }}/>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ background:'linear-gradient(135deg,var(--royal-blue),var(--royal-blue-dark))' }}>
              <p className="text-white font-black">{editDept?'Edit Department':'Add Department'}</p>
              <button type="button" onClick={()=>{setShowForm(false);setEditD(null);}} className="text-white"><X size={18}/></button>
            </div>
            <div className="h-1 flex-shrink-0" style={{ backgroundColor:'var(--accent-red)' }}/>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {[
                { label:'Department Name *', field:'name' },
                { label:'Code (3 letters)', field:'code' },
              ].map(({label,field})=>(
                <div key={field}>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>{label}</label>
                  <input value={form[field]||''} onChange={e=>set(field,e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none"
                    style={{ borderColor:'var(--medium-gray)' }}
                    onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                    onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}/>
                </div>
              ))}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>Head of Department</label>
                <select value={form.hodId||''} onChange={e=>set('hodId',parseInt(e.target.value)||'')}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none bg-white"
                  style={{ borderColor:'var(--medium-gray)' }}>
                  <option value="">-- Select HOD --</option>
                  {TEACHERS.filter(t=>t.status==='Active').map(t=>(
                    <option key={t.id} value={t.id}>{t.title} {t.firstName} {t.lastName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color:'var(--dark-gray)' }}>Courses</label>
                <div className="flex gap-2 mb-2">
                  <input value={subInput} onChange={e=>setSubInput(e.target.value)}
                    onKeyDown={e=>e.key==='Enter'&&addSub()} placeholder="Type course name + Enter"
                    className="flex-1 px-3 py-2 text-sm rounded-xl border-2 outline-none"
                    style={{ borderColor:'var(--medium-gray)' }}/>
                  <button type="button" onClick={addSub}
                    className="px-3 py-2 text-sm font-bold text-white rounded-xl"
                    style={{ backgroundColor:'var(--royal-blue)' }}>Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.subjects.map(s=>(
                    <span key={s} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                      style={{ backgroundColor:'#eef2ff', color:'var(--royal-blue)' }}>
                      {s}
                      <button type="button" onClick={()=>removeSub(s)}><X size={10}/></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t flex-shrink-0"
              style={{ borderColor:'var(--medium-gray)', backgroundColor:'var(--light-gray)' }}>
              <button type="button" onClick={()=>{setShowForm(false);setEditD(null);}}
                className="px-4 py-2 text-sm rounded-xl border font-semibold"
                style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}>Cancel</button>
              <button type="button" onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white rounded-xl"
                style={{ backgroundColor:'var(--royal-blue)' }}>
                <Save size={13}/> {editDept?'Save':'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DepartmentManagement;