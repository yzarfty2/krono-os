import React, { useState } from 'react';

export default function CarAndCareModule() {
  const [items, setItems] = useState([
    { id: 1, title: 'בדיקת לחץ אוויר בצמיגים (סוזוקי איגניס - יעד 32-36 PSI)', category: 'רכב', checked: false },
    { id: 2, title: 'חידוש לק ג\'ל ותיאום תור טיפוח אישי', category: 'טיפוח', checked: false },
    { id: 3, title: 'מעקב ביטוח רכב שנתי וטסט', category: 'רכב', checked: false }
  ]);

  const toggleItem = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
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
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '13px', color: '#db2777', fontWeight: '700', letterSpacing: '1px' }}>KRONO OS • תחזוקה וטיפוח</span>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a202c', margin: '2px 0 0 0' }}>רכב, טיפוח ולוגיסטיקה 🚗</h2>
      </div>

      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #fce7f3' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#be185d', marginBottom: '14px' }}>✨ צ'ק-ליסט תחזוקה שוטפת</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map(item => (
            <div key={item.id} onClick={() => toggleItem(item.id)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: '14px', background: item.checked ? '#fdf2f4' : '#f9fafb',
              border: '1px solid', borderColor: item.checked ? '#f43f5e' : '#e5e7eb', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: item.checked ? '#be185d' : '#374151', textDecoration: item.checked ? 'line-through' : 'none' }}>
                {item.title}
              </span>
              <span style={{ fontSize: '11px', background: '#ffe4e6', color: '#be185d', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
