// src/admin/calendar/SchoolCalendar.jsx
import React, { useState } from 'react';
import { Calendar, Plus, ChevronLeft, ChevronRight, Clock, MapPin, AlertCircle } from 'lucide-react';

const EVENT_TYPES = {
  exam:       { color: 'var(--accent-red)',    bg: '#fff1f2', label: 'Examination'  },
  holiday:    { color: 'var(--success-dark)',  bg: '#f0fdf4', label: 'Holiday'      },
  event:      { color: 'var(--royal-blue)',    bg: '#eef2ff', label: 'School Event' },
  term:       { color: 'var(--warning)',       bg: '#fffbeb', label: 'Term Date'    },
  meeting:    { color: '#7c3aed',              bg: '#f5f3ff', label: 'Meeting'      },
};

const EVENTS = [
  { id: 1,  date: '2025-01-06', title: 'Term 2 Begins — Track A',          type: 'term',    time: '07:00',        venue: 'School Grounds'         },
  { id: 2,  date: '2025-01-20', title: 'Parent-Teacher Conference',         type: 'meeting', time: '09:00–15:00',  venue: 'Main Hall'              },
  { id: 3,  date: '2025-02-14', title: 'Founders\' Day (Public Holiday)',   type: 'holiday', time: 'All Day',      venue: ''                       },
  { id: 4,  date: '2025-02-21', title: 'Inter-House Sports Day',            type: 'event',   time: '07:30',        venue: 'School Field'           },
  { id: 5,  date: '2025-03-06', title: 'Independence Day (Holiday)',        type: 'holiday', time: 'All Day',      venue: ''                       },
  { id: 6,  date: '2025-03-17', title: 'HOD Meeting — Term Review',        type: 'meeting', time: '10:00',        venue: 'Conference Room'        },
  { id: 7,  date: '2025-03-24', title: 'Term 2 Exams Begin',               type: 'exam',    time: '08:00',        venue: 'Exam Halls A, B, C'     },
  { id: 8,  date: '2025-04-04', title: 'Term 2 Exams End',                 type: 'exam',    time: '16:00',        venue: 'Exam Halls A, B, C'     },
  { id: 9,  date: '2025-04-11', title: 'Term 2 Ends — Track A',            type: 'term',    time: '12:00',        venue: 'School Grounds'         },
  { id: 10, date: '2025-04-14', title: 'Term 2 Begins — Track B',          type: 'term',    time: '07:00',        venue: 'School Grounds'         },
  { id: 11, date: '2025-04-18', title: 'Good Friday (Holiday)',            type: 'holiday', time: 'All Day',      venue: ''                       },
  { id: 12, date: '2025-04-21', title: 'Easter Monday (Holiday)',          type: 'holiday', time: 'All Day',      venue: ''                       },
  { id: 13, date: '2025-05-01', title: 'Workers\' Day (Holiday)',          type: 'holiday', time: 'All Day',      venue: ''                       },
  { id: 14, date: '2025-05-12', title: 'WASSCE Begins',                    type: 'exam',    time: '08:30',        venue: 'AFTS Centre GH0042'     },
  { id: 15, date: '2025-06-13', title: 'Term 3 Begins — Track A',          type: 'term',    time: '07:00',        venue: 'School Grounds'         },
  { id: 16, date: '2025-07-04', title: 'Graduation Ceremony — Form 3',     type: 'event',   time: '10:00',        venue: 'Main Hall'              },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const AdminCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return EVENTS.filter(e => e.date === dateStr && (filterType === 'all' || e.type === filterType));
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const upcomingEvents = EVENTS
    .filter(e => new Date(e.date) >= today && (filterType === 'all' || e.type === filterType))
    .sort((a,b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-black" style={{ color: 'var(--dark-gray)' }}>School Calendar</h1>
          <p className="text-xs text-gray-400 mt-0.5">2024/2025 Academic Year · All Events & Dates</p>
        </div>
        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          {[{ key: 'all', label: 'All' }, ...Object.entries(EVENT_TYPES).map(([k,v]) => ({ key: k, label: v.label }))].map(f => (
            <button key={f.key} onClick={() => setFilterType(f.key)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition"
              style={{
                backgroundColor: filterType === f.key ? 'var(--royal-blue)' : 'white',
                color: filterType === f.key ? 'white' : 'var(--dark-gray)',
                border: '1px solid var(--medium-gray)',
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)' }}>
          {/* Month nav */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b"
            style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'var(--light-gray)' }}>
            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-200 transition">
              <ChevronLeft size={16} style={{ color: 'var(--dark-gray)' }} />
            </button>
            <h2 className="font-black text-base" style={{ color: 'var(--dark-gray)' }}>
              {MONTHS[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-200 transition">
              <ChevronRight size={16} style={{ color: 'var(--dark-gray)' }} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
            {DAYS.map(d => (
              <div key={d} className="py-2 text-center text-xs font-bold uppercase text-gray-400">{d}</div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="border-b border-r p-2 min-h-[70px]" style={{ borderColor: 'var(--medium-gray)' }} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const events = getEventsForDate(day);
              const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
              const isSelected = selectedDate === day;

              return (
                <div key={day}
                  onClick={() => setSelectedDate(day === selectedDate ? null : day)}
                  className="border-b border-r p-1.5 min-h-[70px] cursor-pointer transition-colors hover:bg-gray-50"
                  style={{ borderColor: 'var(--medium-gray)', backgroundColor: isSelected ? '#eef2ff' : undefined }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${isToday ? 'text-white' : ''}`}
                    style={{ backgroundColor: isToday ? 'var(--royal-blue)' : undefined, color: isToday ? 'white' : 'var(--dark-gray)' }}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {events.slice(0,2).map(e => {
                      const t = EVENT_TYPES[e.type];
                      return (
                        <div key={e.id} className="text-xs px-1 py-0.5 rounded truncate font-medium"
                          style={{ backgroundColor: t.bg, color: t.color }}>
                          {e.title}
                        </div>
                      );
                    })}
                    {events.length > 2 && (
                      <div className="text-xs text-gray-400 px-1">+{events.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">

          {/* Selected day events */}
          {selectedDate && (
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'var(--light-gray)' }}>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--dark-gray)' }}>
                  {selectedDate} {MONTHS[month]} {year}
                </h3>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--medium-gray)' }}>
                {selectedEvents.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6">No events on this day</p>
                ) : selectedEvents.map(e => {
                  const t = EVENT_TYPES[e.type];
                  return (
                    <div key={e.id} className="p-3">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: t.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold" style={{ color: 'var(--dark-gray)' }}>{e.title}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10} /> {e.time}</p>
                          {e.venue && <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {e.venue}</p>}
                          <span className="text-xs px-1.5 py-0.5 rounded font-semibold mt-1 inline-block"
                            style={{ backgroundColor: t.bg, color: t.color }}>{t.label}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upcoming events */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--medium-gray)' }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'var(--light-gray)' }}>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--dark-gray)' }}>Upcoming Events</h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--medium-gray)' }}>
              {upcomingEvents.map(e => {
                const t = EVENT_TYPES[e.type];
                const d = new Date(e.date);
                return (
                  <div key={e.id} className="flex items-start gap-3 p-3">
                    <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white"
                      style={{ backgroundColor: t.color }}>
                      <span className="text-xs font-black leading-none">{d.getDate()}</span>
                      <span className="text-xs leading-none opacity-80">{MONTHS[d.getMonth()].slice(0,3)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: 'var(--dark-gray)' }}>{e.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{e.time}{e.venue ? ` · ${e.venue}` : ''}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                        style={{ backgroundColor: t.bg, color: t.color }}>{t.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl border shadow-sm p-4" style={{ borderColor: 'var(--medium-gray)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--dark-gray)', opacity: 0.5 }}>Legend</p>
            <div className="space-y-2">
              {Object.entries(EVENT_TYPES).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: val.color }} />
                  <span className="text-xs" style={{ color: 'var(--dark-gray)' }}>{val.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;