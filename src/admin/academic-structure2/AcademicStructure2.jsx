// src/admin/academic-structure2/AcademicStructure2.jsx
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ProgramTrackManagement from './ProgramTrackManagement';
import ClassStreamSetup       from './ClassStreamSetup';
import SubjectManagement      from './SubjectManagement';
import DepartmentManagement   from './DepartmentManagement';

const STEPS = [
  { id:1, title:'Programmes & Tracks', desc:'Courses & track assignment'  },
  { id:2, title:'Class Streams',       desc:'Form classes & capacity'     },
  { id:3, title:'Subjects',            desc:'Core & elective subjects'    },
  { id:4, title:'Departments',         desc:'Depts, HODs & staff'         },
];

const AcademicStructure2 = () => {
  const [step, setStep] = useState(1);
  const [visited, setVisited] = useState(new Set([1]));
  const goTo = (s) => { setStep(s); setVisited(v=>new Set([...v,s])); };
  const next = () => goTo(Math.min(step+1, 4));
  const prev = () => goTo(Math.max(step-1, 1));

  const renderStep = () => {
    switch(step) {
      case 1: return <ProgramTrackManagement/>;
      case 2: return <ClassStreamSetup/>;
      case 3: return <SubjectManagement/>;
      case 4: return <DepartmentManagement/>;
      default: return null;
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>School Organisation Setup</h1>
        <p className="text-xs text-gray-400 mt-0.5">Programmes, classes, subjects and departments</p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="flex overflow-x-auto border-b" style={{ borderColor:'var(--medium-gray)' }}>
          {STEPS.map((s,i) => {
            const done   = visited.has(s.id) && s.id < step;
            const active = step === s.id;
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

      <div className="flex items-center justify-between">
        <button type="button" onClick={prev} disabled={step===1}
          className="px-4 py-2 text-sm font-semibold rounded-xl border"
          style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)', opacity:step===1?0.4:1 }}>
          ← Previous
        </button>
        <span className="text-xs text-gray-400">Step {step} of {STEPS.length}</span>
        {step<4
          ? <button type="button" onClick={next}
              className="px-5 py-2 text-sm font-bold text-white rounded-xl"
              style={{ backgroundColor:'var(--royal-blue)' }}>Next →</button>
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
export default AcademicStructure2;