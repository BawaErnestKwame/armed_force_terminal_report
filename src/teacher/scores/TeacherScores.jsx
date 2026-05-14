// src/teacher/scores/TeacherScores.jsx
import React, { useState, useMemo } from 'react';
import { Save, CheckCircle2, Search } from 'lucide-react';
import { getGradeFromTotal, TERM_INFO } from '../data/teacherData';
import { useAuth } from '../../context/AuthContext';

const MY_CLASSES = [
  { id:1, class:'Form 3 Science A', subject:'Core Mathematics', track:'A', students:42 },
  { id:2, class:'Form 2 Science A', subject:'Core Mathematics', track:'A', students:40 },
  { id:3, class:'Form 1 Science A', subject:'Core Mathematics', track:'A', students:38 },
  { id:4, class:'Form 3 Science B', subject:'Core Mathematics', track:'B', students:41 },
  { id:5, class:'Form 2 Arts A',    subject:'Core Mathematics', track:'A', students:35 },
  { id:6, class:'Form 1 Business A',subject:'Core Mathematics', track:'A', students:36 },
];

const NAMES = [
  ['Kwabena','Acheampong'],['Adwoa','Mensah'],['Kofi','Boateng'],['Ama','Darkwah'],
  ['Yaw','Asante'],['Efua','Osei'],['Nana','Frimpong'],['Akosua','Tawiah'],
  ['Kwame','Bonsu'],['Abena','Annan'],['Esi','Adjei'],['Fiifi','Sarpong'],
  ['Kojo','Asare'],['Maame','Owusu'],['Kweku','Darko'],['Akua','Acheampong'],
  ['Nana Yaw','Mensah'],['Esi','Boateng'],['Kwabena','Frimpong'],['Adwoa','Bonsu'],
];

const generateStudents = (classId) =>
  NAMES.map((n, i) => ({
    id: classId * 100 + i,
    studentId: `AFTS/2024/${String(classId * 20 + i + 1).padStart(3,'0')}`,
    name: `${n[0]} ${n[1]}`,
    ca: null, exam: null,
  }));

const GRADE_COLORS = {
  A1:'text-green-700 bg-green-50', B2:'text-blue-700 bg-blue-50',
  B3:'text-blue-600 bg-blue-50',   C4:'text-yellow-700 bg-yellow-50',
  C5:'text-orange-600 bg-orange-50',C6:'text-orange-700 bg-orange-50',
  D7:'text-red-500 bg-red-50',     F9:'text-red-700 bg-red-50',
};

const TeacherScores = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(MY_CLASSES[0]);
  const [students, setStudents] = useState(()=>generateStudents(MY_CLASSES[0].id));
  const [search, setSearch] = useState('');
  const [saved, setSaved]   = useState(false);
  const [errors, setErrors] = useState({});

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setStudents(generateStudents(cls.id));
    setSaved(false); setErrors({});
  };

  const updateScore = (sid, field, value) => {
    const num = value===''?null:parseInt(value);
    setStudents(ss=>ss.map(s=>s.id===sid?{...s,[field]:num}:s));
    setErrors(e=>{const ne={...e};delete ne[`${sid}_${field}`];return ne;});
    setSaved(false);
  };

  const validate = () => {
    const e = {};
    students.forEach(s=>{
      if (s.ca!==null&&(s.ca<0||s.ca>30))   e[`${s.id}_ca`]   = '0–30';
      if (s.exam!==null&&(s.exam<0||s.exam>70)) e[`${s.id}_exam`] = '0–70';
    });
    setErrors(e); return Object.keys(e).length===0;
  };

  const handleSave = () => { if(validate()){ setSaved(true); setTimeout(()=>setSaved(false),3000); } };

  const filtered = useMemo(()=>
    students.filter(s=>!search||s.name.toLowerCase().includes(search.toLowerCase())||s.studentId.includes(search))
  ,[students,search]);

  const submitted  = students.filter(s=>s.ca!==null&&s.exam!==null).length;
  const pending    = students.length - submitted;
  const hasErrors  = Object.keys(errors).length>0;
  const getTotal   = s => s.ca!==null&&s.exam!==null ? s.ca+s.exam : null;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-black" style={{color:'var(--dark-gray)'}}>Score Entry</h1>
          <p className="text-xs text-gray-400 mt-0.5">{TERM_INFO.term} · {TERM_INFO.academicYear} · CA and Exam scores</p>
        </div>
        <button type="button" onClick={handleSave}
          className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white"
          style={{backgroundColor:hasErrors?'var(--accent-red)':'var(--royal-blue)'}}>
          <Save size={15}/> {saved?'Saved!':hasErrors?'Fix Errors':'Save Scores'}
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold"
          style={{backgroundColor:'#f0fdf4',color:'var(--success-dark)',border:'1px solid #bbf7d0'}}>
          <CheckCircle2 size={16}/> Scores saved for {selectedClass.class}
        </div>
      )}

      {/* Class picker */}
      <div className="bg-white rounded-xl border shadow-sm p-4" style={{borderColor:'var(--medium-gray)'}}>
        <p className="text-xs font-black uppercase tracking-widest mb-3" style={{color:'var(--dark-gray)',opacity:0.5}}>Select Class</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MY_CLASSES.map(cls=>(
            <button key={cls.id} type="button" onClick={()=>handleClassChange(cls)}
              className="p-3 rounded-xl border-2 text-left text-xs transition-all"
              style={{borderColor:selectedClass.id===cls.id?'var(--royal-blue)':'var(--medium-gray)',backgroundColor:selectedClass.id===cls.id?'#eef2ff':'white'}}>
              <p className="font-bold truncate" style={{color:selectedClass.id===cls.id?'var(--royal-blue)':'var(--dark-gray)'}}>{cls.class}</p>
              <p className="text-gray-400 mt-0.5">{cls.students} students</p>
              <span className="inline-block mt-1 px-1 py-0.5 rounded text-xs font-bold"
                style={{backgroundColor:cls.track==='A'?'#fefce8':'#f0fdf4',color:cls.track==='A'?'#854d0e':'var(--success-dark)'}}>
                Track {cls.track}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {label:'Total',    value:students.length, color:'var(--royal-blue)'  },
          {label:'Done',     value:submitted,        color:'var(--success-dark)'},
          {label:'Pending',  value:pending,          color:pending>0?'var(--accent-red)':'var(--success-dark)'},
        ].map(({label,value,color})=>(
          <div key={label} className="bg-white rounded-xl border p-4 text-center shadow-sm" style={{borderColor:'var(--medium-gray)'}}>
            <p className="text-2xl font-black" style={{color}}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Guidelines */}
      <div className="flex flex-wrap gap-2 p-3 rounded-xl border" style={{backgroundColor:'#eef2ff',borderColor:'#c7d2fe'}}>
        <span className="text-xs font-bold" style={{color:'var(--royal-blue)'}}>Marking:</span>
        {[['CA','0–30'],['Exam','0–70'],['Total','100'],['Pass','50+'],['Credit','60+'],['A1','80+']].map(([k,v])=>(
          <span key={k} className="text-xs font-semibold px-2 py-0.5 rounded" style={{backgroundColor:'white',color:'var(--royal-blue)'}}>
            {k}: {v}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{borderColor:'var(--medium-gray)'}}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3.5 border-b"
          style={{borderColor:'var(--medium-gray)',backgroundColor:'var(--light-gray)'}}>
          <h3 className="font-semibold text-sm" style={{color:'var(--dark-gray)'}}>
            {selectedClass.class} · {selectedClass.subject}
          </h3>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
              className="pl-8 pr-3 py-2 text-sm rounded-xl border outline-none w-44"
              style={{borderColor:'var(--medium-gray)'}}
              onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
              onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead className="border-b" style={{backgroundColor:'var(--light-gray)',borderColor:'var(--medium-gray)'}}>
              <tr>
                {['#','Student','CA (/30)','Exam (/70)','Total','Grade'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{borderColor:'var(--medium-gray)'}}>
              {filtered.map((s,i)=>{
                const total = getTotal(s);
                const grade = total!==null?getGradeFromTotal(total):null;
                const caErr = errors[`${s.id}_ca`];
                const exErr = errors[`${s.id}_exam`];
                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-xs text-gray-400">{i+1}</td>
                    <td className="px-4 py-2.5">
                      <p className="font-semibold" style={{color:'var(--dark-gray)'}}>{s.name}</p>
                      <p className="text-xs font-mono text-gray-400">{s.studentId}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="number" min="0" max="30" value={s.ca??''} onChange={e=>updateScore(s.id,'ca',e.target.value)}
                        placeholder="—" className="w-20 px-2 py-1.5 text-sm rounded-lg border-2 outline-none text-center"
                        style={{borderColor:caErr?'var(--accent-red)':'var(--medium-gray)',color:'var(--dark-gray)'}}
                        onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                        onBlur={e=>e.target.style.borderColor=caErr?'var(--accent-red)':'var(--medium-gray)'}
                      />
                      {caErr&&<p className="text-xs mt-0.5" style={{color:'var(--accent-red)'}}>{caErr}</p>}
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="number" min="0" max="70" value={s.exam??''} onChange={e=>updateScore(s.id,'exam',e.target.value)}
                        placeholder="—" className="w-20 px-2 py-1.5 text-sm rounded-lg border-2 outline-none text-center"
                        style={{borderColor:exErr?'var(--accent-red)':'var(--medium-gray)',color:'var(--dark-gray)'}}
                        onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
                        onBlur={e=>e.target.style.borderColor=exErr?'var(--accent-red)':'var(--medium-gray)'}
                      />
                      {exErr&&<p className="text-xs mt-0.5" style={{color:'var(--accent-red)'}}>{exErr}</p>}
                    </td>
                    <td className="px-4 py-2.5">
                      {total!==null
                        ?<span className="font-black text-base"
                            style={{color:total>=80?'var(--success-dark)':total>=60?'var(--royal-blue)':total>=50?'var(--warning)':'var(--accent-red)'}}>
                            {total}
                          </span>
                        :<span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-2.5">
                      {grade
                        ?<span className={`px-2 py-0.5 rounded text-xs font-black ${GRADE_COLORS[grade]||'bg-gray-50 text-gray-600'}`}>{grade}</span>
                        :<span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t"
          style={{borderColor:'var(--medium-gray)',backgroundColor:'var(--light-gray)'}}>
          <p className="text-xs" style={{color:pending>0?'var(--warning)':'var(--success-dark)'}}>
            {pending>0?`⚠ ${pending} student(s) still need scores`:'✓ All scores entered'}
          </p>
          <button type="button" onClick={handleSave}
            className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-xl text-white"
            style={{backgroundColor:hasErrors?'var(--accent-red)':'var(--royal-blue)'}}>
            <Save size={14}/> {saved?'Saved!':hasErrors?'Fix Errors':'Save Scores'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherScores;