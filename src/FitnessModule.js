import React, { useState } from 'react';

export default function FitnessModule() {
  const [meals, setMeals] = useState([
    { id: 1, name: 'סלמון בתנור עם סילאן וטריאקי + ברוקולי', protein: 'גבוה', checked: false },
    { id: 2, name: 'דג טונה בנוסח מרוקאי + פיתה פרוטאין', protein: 'גבוה', checked: false },
    { id: 3, name: 'חזה עוף מוקפץ עם טופו וירקות', protein: 'גבוה', checked: false },
    { id: 4, name: 'יוגורט דנונה פרו + שוקולד מילקה (צופר מדוד)', protein: 'בינוני', checked: false }
  ]);

  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'אימון כוח (3 בשבוע) + שגרת בטן ממוקדת', category: 'כושר', done: false },
    { id: 2, name: 'הליכה יומית (7k-14k צעדים בקצב 5 קמ/ש, ASICS GT-2160)', category: 'קרדיו', done: false },
    { id: 3, name: 'תרגול אשטנגה (90 דקות / סדרה שנייה)', category: 'איזון', done: false },
    { id: 4, name: 'סשן גלישת גלים / צלילה חופשית', category: 'ספורט ימי', done: false }
  ]);

  const toggleMeal = (id) => {
    setMeals(meals.map(m => m.id === id ? { ...m, checked: !m.checked } : m));
  };

  const toggleWorkout = (id) => {
    setWorkouts(workouts.map(w => w.id === id ? { ...w, done: !w.done } : w));
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Roboto, sans-serif',
      backgroundColor: '#fdf2f4',
      minHeight: '100vh',
      padding: '24px 16px 90px 16px',
      direction: 'rtl',
      textAlign: 'right',
      color: '#2d3748',
      maxWidth: '480px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '13px', color: '#db2777', fontWeight: '700', letterSpacing: '1px' }}>KRONO OS • תזונה וכושר</span>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a202c', margin: '2px 0 0 0' }}>בנק המנות והאנרגיה 🥗</h2>
      </div>

      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '24px', marginBottom: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #fce7f3' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#be185d', marginBottom: '14px' }}>🥩 תפריט עתיר חלבון וצופרים</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {meals.map(meal => (
            <div key={meal.id} onClick={() => toggleMeal(meal.id)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: '14px', background: meal.checked ? '#fdf2f4' : '#f9fafb',
              border: '1px solid', borderColor: meal.checked ? '#f43f5e' : '#e5e7eb', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: meal.checked ? '#be185d' : '#374151', textDecoration: meal.checked ? 'line-through' : 'none' }}>
                {meal.name}
              </span>
              <span style={{ fontSize: '11px', background: '#ffe4e6', color: '#be185d', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                {meal.protein}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #fce7f3' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#be185d', marginBottom: '14px' }}>⚡ שגרת אימונים וספורט ימי</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {workouts.map(w => (
            <div key={w.id} onClick={() => toggleWorkout(w.id)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: '14px', background: w.done ? '#fdf2f4' : '#f9fafb',
              border: '1px solid', borderColor: w.done ? '#f43f5e' : '#e5e7eb', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: w.done ? '#be185d' : '#374151', textDecoration: w.done ? 'line-through' : 'none' }}>
                {w.name}
              </span>
              <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                {w.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
