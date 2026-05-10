// src/teacher/dashboard/TeacherHome.jsx
import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ─── All 14 dashboards ────────────────────────────────────────────────────────
import DashSubjectTeacher                        from '../dashboards/DashSubjectTeacher';
import DashSubjectFormTeacher                    from '../dashboards/DashSubjectFormTeacher';
import { DashHOD, DashHODSubject, DashHODSubjectForm } from '../dashboards/DashHOD';
import { DashAssistantHOD, DashAssistantHODSubject }   from '../dashboards/DashAssistantHOD';
import DashHouseMaster                           from '../dashboards/DashHouseMaster';
import { DashWorkshop, DashSports, DashCounsellor }    from '../dashboards/DashWorkshop';
import { DashExamCoord, DashHODExamCoord, DashFormSports } from '../dashboards/DashExamCoord';

// ─── Combo key → dashboard component ─────────────────────────────────────────
const DASHBOARDS = {
  'Subject Teacher':                                DashSubjectTeacher,
  'Subject Teacher + Form Teacher':                 DashSubjectFormTeacher,
  'HOD':                                            DashHOD,
  'HOD + Subject Teacher':                          DashHODSubject,
  'HOD + Subject Teacher + Form Teacher':           DashHODSubjectForm,
  'Assistant HOD':                                  DashAssistantHOD,
  'Assistant HOD + Subject Teacher':                DashAssistantHODSubject,
  'House Master/Mistress':                          DashHouseMaster,
  'Workshop Supervisor':                            DashWorkshop,
  'Sports Master/Mistress':                         DashSports,
  'Guidance Counsellor':                            DashCounsellor,
  'Exam Coordinator':                               DashExamCoord,
  'Subject Teacher + HOD + Exam Coordinator':       DashHODExamCoord,
  'Subject Teacher + Form Teacher + Sports Master': DashFormSports,
};

// All combo options for the switcher
const ALL_COMBOS = Object.keys(DASHBOARDS);

// ─── Role switcher (floating top-right on every dashboard) ───────────────────
const RoleSwitcher = ({ activeRole, onSwitch }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-40 sm:top-20 sm:right-6">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition-all"
          style={{ backgroundColor: 'var(--royal-blue)', border: '2px solid rgba(255,255,255,0.2)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--royal-blue-dark)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--royal-blue)'}
        >
          🎭 <span className="max-w-[150px] truncate">{activeRole}</span>
          <ChevronDown size={12} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div
              className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border z-40 overflow-hidden"
              style={{ borderColor: 'var(--medium-gray)', minWidth: '260px', maxHeight: '70vh', overflowY: 'auto' }}
            >
              <div className="px-4 py-2.5 border-b sticky top-0 bg-white"
                style={{ borderColor: 'var(--medium-gray)' }}>
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--dark-gray)', opacity: 0.5 }}>
                  Switch Role Combination
                </p>
              </div>
              {ALL_COMBOS.map(combo => (
                <button
                  key={combo}
                  onClick={() => { onSwitch(combo); setOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-left transition-colors hover:bg-gray-50"
                  style={{
                    color: combo === activeRole ? 'var(--royal-blue)' : 'var(--dark-gray)',
                    backgroundColor: combo === activeRole ? '#eef2ff' : undefined,
                    fontWeight: combo === activeRole ? 700 : 400,
                  }}
                >
                  <span className="leading-snug">{combo}</span>
                  {combo === activeRole && (
                    <CheckCircle2 size={13} style={{ color: 'var(--royal-blue)' }} className="flex-shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Main router ──
const TeacherHome = () => {
  const { activeRole, switchRole } = useAuth();

  // Pick dashboard — fallback to Subject Teacher if key not found
  const Dashboard = DASHBOARDS[activeRole] || DashSubjectTeacher;

  return (
    <div className="relative">
      {/* Role switcher — always visible */}
      <RoleSwitcher activeRole={activeRole} onSwitch={switchRole} />

      {/* Render the correct dashboard */}
      <Dashboard />
    </div>
  );
};

export default TeacherHome;