import React, { useState } from 'react';

export default function FinanceDashboard() {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState({
    debtAndStanding: 1500,     // הוראת קבע / אשראי מתגלגל
    savingsStandingOrder: 1000,// הוראת קבע לחיסכון דירה
    carInsurance: 400,         // ביטוח רכב (סוזוקי איגניס)
    gym: 150,                  // חדר כושר
    workoutApp: 100,           // אפליקציית אימונים
    yoga: 300,                 // יוגה
    subscriptions: 89,         // נטפליקס + iCloud
    fuel: 600                  // דלק משתנה
  });

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const monthlySavings = income - totalExpenses;
  const savingsRate = income > 0 ? ((monthlySavings / income) * 100).toFixed(1) : 0;

  const handleChange = (key, value) => {
    setExpenses({ ...expenses, [key]: Number(value) });
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#fdf2f4',
      minHeight: '100vh',
      padding: '24px 16px 90px 16px',
      direction: 'rtl',
      textAlign: 'right',
      color: '#2d3748'
    }}>
      {/* Header ממותג בשם החדש Krono OS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px auto' }}>
        <div>
          <span style={{ fontSize: '13px', color: '#db2777', fontWeight: '700', letterSpacing: '1px' }}>KRONO OS • LIFE OS</span>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a202c', margin: '2px 0 0 0' }}>שלום, ים 🌸</h1>
        </div>
        <div style={{ 
          width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fce7f3', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
          boxShadow: '0 4px 12px rgba(219, 39, 119, 0.15)'
        }}>
          ⏱️
        </div>
      </div>

      {/* קונטיינר מרכזי בסגנון פרימיום */}
      <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* כרטיס ראשי - דשבורד חיסכון לדירה */}
        <div style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)', 
          padding: '22px', 
          borderRadius: '24px', 
          boxShadow: '0 12px 30px rgba(225, 29, 72, 0.08)',
          border: '1px solid rgba(253, 164, 175, 0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#701a75' }}>יעד נדל"ן ושליטה חודשית</span>
            <span style={{ fontSize: '12px', background: '#fce7f3', color: '#be185d', padding: '4px 10px', borderRadius: '20px', fontWeight: '700' }}>פעיל</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.7)', padding: '12px 14px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>הכנסה חודשית</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>₪{income}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.7)', padding: '12px 14px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>סך הוצאות</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#e11d48' }}>₪{totalExpenses}</div>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #fbcfe8' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#4b5563', fontWeight: '500' }}>עודף פנוי לחיסכון</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: monthlySavings >= 0 ? '#059669' : '#dc2626' }}>
                ₪{monthlySavings} <span style={{ fontSize: '13px', fontWeight: '600' }}>({savingsRate}%)</span>
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '11px', background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '8px', fontWeight: '700' }}>
                +1,000₪ קבוע
              </span>
            </div>
          </div>
        </div>

        {/* כותרת מחוונים */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', padding: '0 4px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#374151', margin: 0 }}>התאמת תקציב והוצאות</h3>
          <span style={{ fontSize: '12px', color: '#db2777', fontWeight: '600' }}>השתמש במחוונים</span>
        </div>

        {/* רשימת מחוונים */}
        {[
          { key: 'debtAndStanding', label: 'הוראת קבע / אשראי מתגלגל', val: expenses.debtAndStanding, max: 3000, tag: 'חוב' },
          { key: 'savingsStandingOrder', label: 'הוראת קבע לחיסכון דירה', val: expenses.savingsStandingOrder, max: 3000, tag: 'חיסכון' },
          { key: 'carInsurance', label: 'ביטוח רכב (סוזוקי איגניס)', val: expenses.carInsurance, max: 1000, tag: 'רכב' },
          { key: 'gym', label: 'חדר כושר', val: expenses.gym, max: 400, tag: 'כושר' },
          { key: 'workoutApp', label: 'אפליקציית אימונים', val: expenses.workoutApp, max: 300, tag: 'כושר' },
          { key: 'yoga', label: 'יוגה', val: expenses.yoga, max: 1000, tag: 'איזון' },
          { key: 'subscriptions', label: 'מנויים (נטפליקס + iCloud)', val: expenses.subscriptions, max: 300, tag: 'דיגיטל' },
          { key: 'fuel', label: 'דלק (משתנה חודשית)', val: expenses.fuel, max: 1500, tag: 'רכב' },
        ].map((item) => (
          <div key={item.key} style={{ 
            background: '#ffffff', 
            padding: '16px 20px', 
            borderRadius: '20px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #fce7f3'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1f2937' }}>{item.label}</span>
                <span style={{ fontSize: '10px', background: '#fdf2f4', color: '#db2777', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>{item.tag}</span>
              </div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#db2777' }}>₪{item.val}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={item.max} 
              step="25" 
              value={item.val} 
              onChange={(e) => handleChange(item.key, e.target.value)} 
              style={{ 
                width: '100%', 
                accentColor: '#db2777', 
                cursor: 'pointer',
                height: '6px',
                borderRadius: '3px'
              }} 
            />
          </div>
        ))}
      </div>

      {/* תפריט ניווט תחתון צף */}
      <div style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '420px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        border: '1px solid rgba(253, 164, 175, 0.3)',
        zIndex: 1000
      }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '6px' }} title="בית">🏠</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '6px' }} title="לוח זמנים">📅</button>
        <div style={{ 
          width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #f43f5e 0%, #db2777 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px',
          boxShadow: '0 6px 16px rgba(219, 39, 119, 0.3)', cursor: 'pointer', marginTop: '-18px'
        }}>
          +
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '6px' }} title="תזונה וכושר">🥗</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '6px' }} title="פרופיל">👤</button>
      </div>
    </div>
  );
}

