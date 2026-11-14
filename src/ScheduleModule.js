import React, { useState } from 'react';

export default function ScheduleModule() {
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month', 'year'
  const [selectedDate, setSelectedDate] = useState('2026-11-14'); // Today: Saturday, Nov 14, 2026
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '2026-11-14',
    time: '10:00',
    color: '#fbcfe8',
    textColor: '#831843',
    recurrence: 'Weekly',
    attendees: ''
  });

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  
  // Week days for November 2026 (Week of Nov 8 - Nov 14, 2026)
  const weekDays = [
    { name: 'Sun', date: '08' },
    { name: 'Mon', date: '09' },
    { name: 'Tue', date: '10' },
    { name: 'Wed', date: '11' },
    { name: 'Thu', date: '12' },
    { name: 'Fri', date: '13' },
    { name: 'Sat', date: '14' }
  ];

  const [events, setEvents] = useState([
    { id: 1, title: 'Morning Dog Walk 🐕', date: '2026-11-14', time: '08:00', color: '#fbcfe8', textColor: '#831843', recurrence: 'Daily' },
    { id: 2, title: 'Bar-Ilan University Lectures 📚', date: '2026-11-09', time: '10:00', color: '#e0e7ff', textColor: '#3730a3', recurrence: 'Weekly' },
    { id: 3, title: 'MoD Student Shift 🏛️', date: '2026-11-10', time: '09:00', color: '#d1fae5', textColor: '#065f46', recurrence: 'Weekly' },
    { id: 4, title: 'Strength Training 💪', date: '2026-11-10', time: '17:00', color: '#fee2e2', textColor: '#991b1b', recurrence: 'Weekly' },
    { id: 5, title: 'Battalion 951 Reserves (Miluim) 🛡️', date: '2026-11-14', time: '12:00', color: '#ffedd5', textColor: '#9a3412', recurrence: 'Custom' }
  ]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    setEvents([...events, { id: Date.now(), ...newEvent }]);
    setIsModalOpen(false);
    setNewEvent({ title: '', date: '2026-11-14', time: '10:00', color: '#fbcfe8', textColor: '#831843', recurrence: 'Weekly', attendees: '' });
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Roboto, sans-serif',
      backgroundColor: '#fdf2f4',
      minHeight: '100vh',
      padding: '24px 16px 90px 16px',
      direction: 'ltr',
      textAlign: 'left',
      color: '#2d3748',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Google Calendar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', color: '#db2777', fontWeight: '700', letterSpacing: '1px' }}>KRONO OS • GOOGLE CALENDAR ENGINE</span>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', margin: '2px 0 0 0' }}>November 2026 📅</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #db2777 100%)',
            color: '#fff', border: 'none', padding: '10px 16px',
            borderRadius: '16px', fontWeight: '700', fontSize: '13px', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(219,39,119,0.3)'
          }}
        >
          + Create
        </button>
      </div>

      {/* View Mode Tabs (Day / Week / Month / Year) */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: '#ffe4e6', padding: '4px', borderRadius: '16px' }}>
        {['day', 'week', 'month', 'year'].map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              flex: 1, padding: '8px 0', borderRadius: '12px', border: 'none',
              background: viewMode === mode ? '#db2777' : 'transparent',
              color: viewMode === mode ? '#fff' : '#881337',
              fontSize: '11px', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize'
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* CALENDAR MAIN CONTAINER */}
      <div style={{ background: '#ffffff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #fce7f3', overflow: 'hidden' }}>
        
        {/* 1. DAY VIEW (Hourly Google Calendar Grid) */}
        {viewMode === 'day' && (
          <div>
            <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff5f7' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#be185d' }}>Saturday, November 14, 2026</span>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ border: '1px solid #fbcfe8', borderRadius: '8px', padding: '4px 8px', fontSize: '12px', background: '#fff' }} />
            </div>
            <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
              {hours.map(hour => {
                const eventInHour = events.find(e => e.time === hour && e.date === selectedDate);
                return (
                  <div key={hour} style={{ display: 'flex', borderBottom: '1px solid #f9fafb', minHeight: '55px' }}>
                    <div style={{ width: '65px', padding: '12px 8px', fontSize: '11px', fontWeight: '700', color: '#9ca3af', borderRight: '1px solid #f3f4f6', textAlign: 'right' }}>
                      {hour}
                    </div>
                    <div style={{ flex: 1, padding: '6px 10px', display: 'flex', alignItems: 'center' }}>
                      {eventInHour ? (
                        <div style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', background: eventInHour.color, color: eventInHour.textColor, fontSize: '12px', fontWeight: '700', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                          {eventInHour.title} <span style={{ fontWeight: '400', fontSize: '10px', opacity: 0.8 }}>({eventInHour.time})</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#e5e7eb', fontStyle: 'italic' }}></span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. WEEK VIEW (Google Calendar 7-Day Columns) */}
        {viewMode === 'week' && (
          <div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', background: '#fff5f7', fontSize: '13px', fontWeight: '700', color: '#be185d' }}>
              Week of November 8 – November 14, 2026
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #f3f4f6', textAlign: 'center' }}>
              {weekDays.map((d, i) => (
                <div key={i} style={{ padding: '10px 4px', borderRight: i < 6 ? '1px solid #f3f4f6' : 'none' }}>
                  <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600' }}>{d.name}</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#1f2937', marginTop: '2px' }}>{d.date}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px', minHeight: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {events.map(ev => (
                <div key={ev.id} style={{
                  padding: '10px 14px', borderRadius: '12px',
                  background: ev.color, color: ev.textColor,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontSize: '12px', fontWeight: '700', boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}>
                  <span>{ev.title}</span>
                  <span style={{ fontSize: '10px', opacity: 0.85, background: 'rgba(255,255,255,0.6)', padding: '2px 6px', borderRadius: '6px' }}>{ev.date} @ {ev.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. MONTH VIEW (Full 30-Day Grid for Nov 2026) */}
        {viewMode === 'month' && (
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px', fontSize: '11px', fontWeight: '700', color: '#9ca3af' }}>
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {Array.from({ length: 30 }, (_, index) => {
                const dayNum = index + 1;
                const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
                const dateStr = `2026-11-${formattedDay}`;
                const hasEvent = events.some(e => e.date === dateStr);
                const isToday = dayNum === 14;

                return (
                  <div key={index} style={{
                    aspectRatio: '1', borderRadius: '10px', padding: '4px',
                    backgroundColor: isToday ? '#ffe4e6' : hasEvent ? '#fff1f2' : '#f9fafb',
                    border: isToday ? '1.5px solid #db2777' : '1px solid #f3f4f6',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: isToday ? '800' : '600', color: isToday ? '#db2777' : '#374151' }}>{dayNum}</span>
                    {hasEvent && <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#db2777' }} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. YEAR VIEW (12 Mini Months for 2026) */}
        {viewMode === 'year' && (
          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, idx) => (
              <div key={m} style={{
                padding: '10px', borderRadius: '12px', background: idx === 10 ? '#fff1f2' : '#f9fafb',
                border: idx === 10 ? '1px solid #fbcfe8' : '1px solid #e5e7eb', textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: idx === 10 ? '#db2777' : '#374151' }}>{m}</div>
                <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>2026</div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Google Calendar Create Event Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '16px'
        }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '24px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a202c', margin: '0 0 16px 0' }}>Create Google Event 🗓️</h3>
            
            <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563' }}>Event Title</label>
                <input
                  type="text"
                  placeholder="Add title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '13px', marginTop: '4px', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563' }}>Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '12px', marginTop: '4px', backgroundColor: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563' }}>Time</label>
                  <select
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '12px', marginTop: '4px', backgroundColor: '#fff', boxSizing: 'border-box' }}
                  >
                    {hours.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563' }}>Color Tag</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {[
                    { bg: '#fbcfe8', text: '#831843' },
                    { bg: '#e0e7ff', text: '#3730a3' },
                    { bg: '#d1fae5', text: '#065f46' },
                    { bg: '#ffedd5', text: '#9a3412' },
                    { bg: '#fee2e2', text: '#991b1b' }
                  ].map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => setNewEvent({ ...newEvent, color: c.bg, textColor: c.text })}
                      style={{
                        width: '26px', height: '26px', borderRadius: '50%', backgroundColor: c.bg,
                        cursor: 'pointer', border: newEvent.color === c.bg ? '2px solid #db2777' : '1px solid #ccc'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', borderRadius: '12px', border: 'none', background: '#db2777', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
