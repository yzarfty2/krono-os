import React, { useState } from 'react';
import Logo from './Logo';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // טאבים ראשיים במערכת שמרכזים את הכל תחת אפליקציה אחת
  const [activeTab, setActiveTab] = useState('health'); // 'health', 'nutrition', 'calendar', 'finance'

  // --- 1. מודול כושר, בריאות, מחזור ומשקל (Health OS) ---
  const [isHealthSynced, setIsHealthSynced] = useState(true);
  const [stepsCount] = useState(8420);
  const [heartRate] = useState(72);
  const [lastPeriodDate, setLastPeriodDate] = useState('2026-11-01');
  const [nextPeriodPrediction] = useState('2026-11-29');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['נפיחות', 'עייפות קלה']);
  const symptomOptions = ['אקנה', 'נפיחות', 'כאבי בטן', 'עייפות', 'כאבי ראש', 'חשק למתוק'];

  const handleToggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const [goalType, setGoalType] = useState('חיטוב');
  const [weightLogs, setWeightLogs] = useState([
    { id: 1, date: '2026-11-01', weight: 62.4, waist: 68 },
    { id: 2, date: '2026-11-08', weight: 62.0, waist: 67.5 }
  ]);
  const [newWeight, setNewWeight] = useState('');
  const [newWaist, setNewWaist] = useState('');

  const handleAddWeighing = (e) => {
    e.preventDefault();
    if (!newWeight) return;
    setWeightLogs([
      { id: Date.now(), date: new Date().toISOString().split('T')[0], weight: parseFloat(newWeight), waist: parseFloat(newWaist) || 0 },
      ...weightLogs
    ]);
    setNewWeight('');
    setNewWaist('');
  };

  // --- 2. מודול תזונה ומים (Nutrition OS) ---
  const [waterDrank, setWaterDrank] = useState(1750);
  const waterTarget = 2500;
  const [foodLog, setFoodLog] = useState([
    { id: 1, name: 'סלמון בתנור עם ברוקולי', calories: 520, protein: 44, meal: 'צהריים' },
    { id: 2, name: 'יווני 3% עם אגוזים', calories: 240, protein: 18, meal: 'ביניים' }
  ]);
  const [foodName, setFoodName] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  const [foodProtein, setFoodProtein] = useState('');
  const [foodMealType, setFoodMealType] = useState('צהריים');
  const calorieGoal = 2000;
  const proteinGoal = 120;
  const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodLog.reduce((sum, item) => sum + item.protein, 0);

  // --- 3. מודול יומן, לו"ז ומזג אוויר (Calendar & Weather OS) ---
  const [calendarView, setCalendarView] = useState('monthly'); // 'daily', 'weekly', 'monthly', 'yearly'
  const [isPhoneSynced, setIsPhoneSynced] = useState(true);
  const [events, setEvents] = useState([
    { id: 1, title: 'שיעור באוניברסיטת בר-אילן', date: '2026-11-15', time: '10:00', type: 'קבוע', color: '#4285f4', reminder: '10 דקות לפני' },
    { id: 2, title: 'משמרת / עבודה במשרד הביטחון', date: '2026-11-16', time: '09:00', type: 'קבוע', color: '#34a853', reminder: 'שעה לפני' },
    { id: 3, title: 'אימון אשטנגה יוגה', date: '2026-11-17', time: '07:30', type: 'קבוע', color: '#fbbc05', reminder: 'יום לפני' }
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventType, setNewEventType] = useState('חד-פעמי');
  const [newEventColor, setNewEventColor] = useState('#4285f4');
  const [newEventReminder, setNewEventReminder] = useState('שעה לפני');
  const colorOptions = [
    { name: 'כחול', code: '#4285f4' },
    { name: 'ירוק', code: '#34a853' },
    { name: 'זהב', code: '#fbbc05' },
    { name: 'סגול', code: '#9333ea' },
    { name: 'אדום', code: '#ea4335' }
  ];
  const reminderOptions = ['ללא תזכורת', '10 דקות לפני', 'שעה לפני', 'יום לפני'];

  const currentWeather = {
    temp: '23°C',
    condition: 'שמשי ונעים',
    workoutAdvice: '🌤️ מזג אוויר מושלם לאימון ריצה בחוץ או סשן סרף בים!'
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate) return;
    setEvents([
      { id: Date.now(), title: newEventTitle, date: newEventDate, time: newEventTime || '00:00', type: newEventType, color: newEventColor, reminder: newEventReminder },
      ...events
    ]);
    setNewEventTitle(''); setNewEventDate(''); setNewEventTime('');
  };

  // --- 4. מודול מרכז פיננסי מלא בשליטה מלאה (Finance OS) ---
  const monthlyIncome = 5000;
  const [fixedExpenses, setFixedExpenses] = useState([
    { id: 1, name: 'הוראת קבע ואשראי מתגלגל', amount: 1500, category: 'התחייבויות' },
    { id: 2, name: 'הוראת קבע לחיסכון', amount: 1000, category: 'חיסכון' },
    { id: 3, name: 'דלק (הערכה חודשית)', amount: 600, category: 'דלק ותחבורה' },
    { id: 4, name: 'יוגה (אשטנגה)', amount: 300, category: 'רווחה וגוף' },
    { id: 5, name: 'חדר כושר', amount: 150, category: 'רווחה וגוף' },
    { id: 6, name: 'אפליקציית אימונים', amount: 100, category: 'טכנולוגיה וגוף' },
    { id: 7, name: 'מנויים (נטפליקס, iCloud)', amount: 89, category: 'דיגיטל' }
  ]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('אוכל וקפה');
  const [newFixedName, setNewFixedName] = useState('');
  const [newFixedAmount, setNewFixedAmount] = useState('');
  const [newFixedCategory, setNewFixedCategory] = useState('התחייבויות');
  const categoriesList = ['אוכל וקפה', 'בגדים', 'קוסמטיקה', 'דלק ותחבורה', 'בילויים ופנאי', 'התחייבויות', 'חיסכון', 'שונות'];

  const totalFixed = fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
  const totalDaily = dailyExpenses.reduce((sum, item) => sum + item.amount, 0);
  const totalAllExpenses = totalFixed + totalDaily;
  const netBalance = monthlyIncome - totalAllExpenses;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleSocialLogin = (provider) => {
    alert(`Connecting with ${provider}...`);
    setIsAuthenticated(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: "'Lora', serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      position: 'relative'
    }}>
      {/* סרגל עליון לאחר התחברות */}
      {isAuthenticated && (
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '32px',
          right: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #222',
          paddingBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Logo type="wordmark" size={24} dark={true} />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTab('health')} style={tabButtonStyle(activeTab === 'health')}>
                💪 בריאות ומחזור
              </button>
              <button onClick={() => setActiveTab('nutrition')} style={tabButtonStyle(activeTab === 'nutrition')}>
                🥗 תזונה ומים
              </button>
              <button onClick={() => setActiveTab('calendar')} style={tabButtonStyle(activeTab === 'calendar')}>
                📅 לו"ז ומזג אוויר
              </button>
              <button onClick={() => setActiveTab('finance')} style={tabButtonStyle(activeTab === 'finance')}>
                📊 מרכז פיננסי
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              background: 'transparent',
              color: '#888',
              border: '1px solid #333',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: "'Lora', serif",
              fontSize: '12px'
            }}
          >
            Lock System
          </button>
        </div>
      )}

      {!isAuthenticated ? (
        /* מסך כניסה והרשמה נקי */
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px', marginTop: '20px' }}>
          <div style={{ marginBottom: '32px' }}>
            <Logo type="wordmark" size={54} dark={true} />
            <p style={{ fontSize: '11px', color: '#777', letterSpacing: '3px', marginTop: '12px', textTransform: 'uppercase' }}>
              Executive Lifestyle Management
            </p>
          </div>

          <div style={{
            background: '#141414',
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid #222',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            textAlign: 'left'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 2px 0', color: '#fff' }}>
              {isRegistering ? 'Create Account' : 'Sign In'}
            </h2>
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 8px 0' }}>
              {isRegistering ? 'Set up your executive workspace' : 'Enter your credentials to continue'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => handleSocialLogin('Google')} style={socialButtonStyle}><span>🌐</span> Continue with Google</button>
              <button onClick={() => handleSocialLogin('Apple')} style={socialButtonStyle}><span>🍎</span> Continue with Apple</button>
              <button onClick={() => handleSocialLogin('Microsoft')} style={socialButtonStyle}><span>🪟</span> Continue with Microsoft</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0', color: '#444' }}>
              <div style={{ flex: 1, height: '1px', background: '#222' }}></div>
              <span style={{ padding: '0 10px', fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#222' }}></div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Email</label>
                <input type="email" placeholder="yam@krono.os" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
              </div>

              <button type="submit" style={{
                marginTop: '6px', background: '#ffffff', color: '#000000', border: 'none',
                padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: "'Lora', serif"
              }}>
                {isRegistering ? 'Sign Up' : 'Authenticate'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <button onClick={() => setIsRegistering(!isRegistering)} style={{ background: 'none', border: 'none', color: '#888', fontSize: '11px', cursor: 'pointer', fontFamily: "'Lora', serif", textDecoration: 'underline' }}>
                {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* תוכן האפליקציה המלא לאחר התחברות */
        <div style={{ width: '100%', maxWidth: '960px', marginTop: '80px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* 1. מודול כושר, בריאות, מחזור ומשקל */}
          {activeTab === 'health' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '26px', fontWeight: '600', margin: '0 0 4px 0' }}>Health, Cycle & Body OS</h1>
                  <p style={{ color: '#888', fontSize: '13px', margin: '0' }}>מעקב שעון חכם, מחזור חודשי, ותהליך חיטוב / מסה.</p>
                </div>
                <button
                  onClick={() => setIsHealthSynced(!isHealthSynced)}
                  style={{
                    background: isHealthSynced ? '#1a2e1a' : '#141414',
                    color: isHealthSynced ? '#34a853' : '#888',
                    border: `1px solid ${isHealthSynced ? '#34a853' : '#333'}`,
                    padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', fontFamily: "'Lora', serif", display: 'flex', alignItems: 'center', gap: '8px'
                  }}
                >
                  <span>⌚</span> {isHealthSynced ? 'שעון חכם מסונכרן (Apple Health)' : 'הפעל סנכרון שעון חכם'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>צעדים יומיים</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: '#34a853' }}>{stepsCount.toLocaleString()} <span style={{ fontSize: '14px', color: '#888', fontWeight: '400' }}>צעדים</span></h2>
                </div>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>קצב לב נוכחי</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: '#ea4335' }}>{heartRate} <span style={{ fontSize: '14px', color: '#888', fontWeight: '400' }}>BPM</span></h2>
                </div>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>מטרה גופנית</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: '#fbbc05' }}>{goalType} פעיל</h2>
                </div>
              </div>

              {/* מעקב מחזור ותסמינים */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0', color: '#fff' }}>🌸 יומן מעקב מחזור ותסמינים</h3>
                  <div style={{ fontSize: '12px', color: '#fbbc05', background: '#222', padding: '6px 12px', borderRadius: '8px', border: '1px solid #333' }}>
                    תחזית מחזור הבא: <strong>{nextPeriodPrediction}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <label style={{ fontSize: '12px', color: '#888' }}>תאריך קבלת מחזור אחרון:</label>
                    <input
                      type="date"
                      value={lastPeriodDate}
                      onChange={(e) => setLastPeriodDate(e.target.value)}
                      style={{ ...inputStyle, width: '160px', colorScheme: 'dark' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '8px' }}>תסמינים מלווים (לחיצה לבחירה):</span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {symptomOptions.map((sym, idx) => {
                        const isSelected = selectedSymptoms.includes(sym);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleToggleSymptom(sym)}
                            style={{
                              background: isSelected ? '#333' : '#1a1a1a',
                              color: isSelected ? '#fff' : '#888',
                              border: `1px solid ${isSelected ? '#fbbc05' : '#333'}`,
                              padding: '6px 12px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontFamily: "'Lora', serif"
                            }}
                          >
                            {isSelected ? '✓ ' : '+ '}{sym}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* מעקב שקילה שבועית והיקפים */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0', color: '#fff' }}>⚖️ מעקב שקילה שבועית והיקפים</h3>
                  <select value={goalType} onChange={(e) => setGoalType(e.target.value)} style={{ ...inputStyle, width: '120px', padding: '6px' }}>
                    <option value="חיטוב">חיטוב</option>
                    <option value="מסה">מסה</option>
                    <option value="שמירה">שמירה</option>
                  </select>
                </div>

                <form onSubmit={handleAddWeighing} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="משקל נוכחי (ק״ג)"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    style={{ ...inputStyle, flex: 1, minWidth: '130px' }}
                    required
                  />
                  <input
                    type="number"
                    step="0.5"
                    placeholder="היקף מותניים (ס״מ)"
                    value={newWaist}
                    onChange={(e) => setNewWaist(e.target.value)}
                    style={{ ...inputStyle, flex: 1, minWidth: '130px' }}
                  />
                  <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', fontFamily: "'Lora', serif" }}>
                    הוסף שקילה שבועית
                  </button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                  {weightLogs.map((log) => (
                    <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #262626' }}>
                      <span style={{ fontSize: '13px', color: '#888' }}>📅 {log.date}</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>משקל: {log.weight} ק"ג</span>
                      <span style={{ fontSize: '13px', color: '#fbbc05' }}>מותניים: {log.waist} ס"מ</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. מודול תזונה ומים */}
          {activeTab === 'nutrition' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h1 style={{ fontSize: '26px', fontWeight: '600', margin: '0 0 4px 0' }}>Nutrition & Wellness OS</h1>
                <p style={{ color: '#888', fontSize: '13px', margin: '0' }}>מעקב קלוריות יומי, שתיית מים, ערכי חלבון ותובעות תזונה בריאותיות.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>קלוריות יומיות</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: totalCalories > calorieGoal ? '#ea4335' : '#34a853' }}>
                    {totalCalories} / {calorieGoal} <span style={{ fontSize: '14px', fontWeight: '400', color: '#888' }}>קקל</span>
                  </h2>
                </div>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>צריכת חלבון</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: '#fbbc05' }}>
                    {totalProtein}g / {proteinGoal}g
                  </h2>
                </div>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>מעקב שתיית מים</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: '#4285f4' }}>
                    {waterDrank}ml / {waterTarget}ml
                  </h2>
                </div>
              </div>

              {/* הוספת שתייה */}
              <div style={cardStyle}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 12px 0', color: '#fff' }}>💧 הוסף שתיית מים</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button onClick={() => setWaterDrank(prev => prev + 250)} style={waterButtonStyle}>+ כוס (250 מ"ל)</button>
                  <button onClick={() => setWaterDrank(prev => prev + 500)} style={waterButtonStyle}>+ בקבוק (500 מ"ל)</button>
                  <button onClick={() => setWaterDrank(prev => Math.max(0, prev - 250))} style={{ ...waterButtonStyle, background: '#222', color: '#ea4335' }}>- 250 מ"ל</button>
                </div>
              </div>

              {/* הוספת מאכל */}
              <div style={cardStyle}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 14px 0', color: '#fff' }}>+ הוסף מאכל שאכלת היום</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!foodName || !foodCalories) return;
                  setFoodLog([{ id: Date.now(), name: foodName, calories: parseInt(foodCalories) || 0, protein: parseInt(foodProtein) || 0, meal: foodMealType }, ...foodLog]);
                  setFoodName(''); setFoodCalories(''); setFoodProtein('');
                }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input type="text" placeholder="שם המאכל..." value={foodName} onChange={(e) => setFoodName(e.target.value)} style={{ ...inputStyle, flex: 2, minWidth: '180px' }} required />
                    <input type="number" placeholder="קלוריות" value={foodCalories} onChange={(e) => setFoodCalories(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: '110px' }} required />
                    <input type="number" placeholder="חלבון (g)" value={foodProtein} onChange={(e) => setFoodProtein(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: '110px' }} />
                    <select value={foodMealType} onChange={(e) => setFoodMealType(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: '120px', cursor: 'pointer' }}>
                      <option value="בוקר">בוקר</option><option value="צהריים">צהריים</option><option value="ערב">ערב</option><option value="ביניים">ביניים</option>
                    </select>
                  </div>
                  <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', fontFamily: "'Lora', serif", alignSelf: 'flex-end' }}>
                    הוסף ליומן אכילה
                  </button>
                </form>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 14px 0', color: '#fff' }}>יומן אכילה יומי ({foodLog.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                  {foodLog.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #262626' }}>
                      <div><span style={{ fontSize: '13px', color: '#fff', display: 'block' }}>{item.name}</span><span style={{ fontSize: '10px', color: '#888' }}>{item.meal} | קלוריות: {item.calories} | חלבון: {item.protein}g</span></div>
                      <button onClick={() => setFoodLog(foodLog.filter(i => i.id !== item.id))} style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. מודול יומן, לו"ז ומזג אוויר */}
          {activeTab === 'calendar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '26px', fontWeight: '600', margin: '0 0 4px 0' }}>Google Calendar OS</h1>
                  <p style={{ color: '#888', fontSize: '13px', margin: '0' }}>ניהול זמנים מתקדם: סנכרון לטלפון, תזכורות ותחזית מזג אוויר.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setIsPhoneSynced(!isPhoneSynced)}
                    style={{
                      background: isPhoneSynced ? '#1a2e1a' : '#141414',
                      color: isPhoneSynced ? '#34a853' : '#888',
                      border: `1px solid ${isPhoneSynced ? '#34a853' : '#333'}`,
                      padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', fontFamily: "'Lora', serif"
                    }}
                  >
                    <span>📱</span> {isPhoneSynced ? 'מסונכרן לטלפון' : 'הפעל סנכרון לטלפון'}
                  </button>

                  <div style={{ background: '#141414', padding: '8px 14px', borderRadius: '10px', border: '1px solid #333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🌤️</span>
                    <span style={{ fontSize: '11px', color: '#34a853' }}>{currentWeather.temp} | {currentWeather.workoutAdvice}</span>
                  </div>
                </div>
              </div>

              {/* בורר תצוגות (יומי, שבועי, חודשי, שנתי) */}
              <div style={{ display: 'flex', gap: '6px', background: '#141414', padding: '4px', borderRadius: '10px', border: '1px solid #222', width: 'fit-content' }}>
                {[
                  { id: 'daily', label: 'יומי' },
                  { id: 'weekly', label: 'שבועי' },
                  { id: 'monthly', label: 'חודשי' },
                  { id: 'yearly', label: 'שנתי' }
                ].map(view => (
                  <button
                    key={view.id}
                    onClick={() => setCalendarView(view.id)}
                    style={{
                      background: calendarView === view.id ? '#333' : 'transparent',
                      color: calendarView === view.id ? '#fff' : '#888',
                      border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', fontFamily: "'Lora', serif"
                    }}
                  >
                    {view.label}
                  </button>
                ))}
              </div>

              {/* טופס הוספת אירוע / אימון ליומן */}
              <div style={cardStyle}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 12px 0', color: '#fff' }}>+ הוסף אירוע או אימון חדש</h3>
                <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input type="text" placeholder="שם האירוע/אימון..." value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} style={{ ...inputStyle, flex: 2, minWidth: '180px' }} required />
                    <input type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: '130px', colorScheme: 'dark' }} required />
                    <input type="time" value={newEventTime} onChange={(e) => setNewEventTime(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: '100px', colorScheme: 'dark' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <select value={newEventType} onChange={(e) => setNewEventType(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', padding: '6px 10px' }}>
                        <option value="חד-פעמי">חד-פעמי</option><option value="קבוע">קבוע (חוזר)</option>
                      </select>
                      <select value={newEventReminder} onChange={(e) => setNewEventReminder(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', padding: '6px 10px' }}>
                        {reminderOptions.map((rem, idx) => <option key={idx} value={rem} style={{ background: '#1a1a1a', color: '#fff' }}>🔔 {rem}</option>)}
                      </select>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#888' }}>צבע:</span>
                        {colorOptions.map(col => (
                          <div key={col.code} onClick={() => setNewEventColor(col.code)} style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: col.code, cursor: 'pointer', border: newEventColor === col.code ? '2px solid #fff' : '2px solid transparent' }} />
                        ))}
                      </div>
                    </div>
                    <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', fontFamily: "'Lora', serif" }}>
                      הוסף ליומן
                    </button>
                  </div>
                </form>
              </div>

              {/* תצוגות היומן (יומי, שבועי, חודשי, שנתי) */}
              {calendarView === 'daily' && (
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 14px 0', color: '#fff' }}>📅 תצוגה יומית - סדר היום</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {events.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #262626', borderRight: `4px solid ${item.color}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#fbbc05', minWidth: '50px' }}>{item.time}</span>
                          <div>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff', display: 'block' }}>{item.title}</span>
                            <span style={{ fontSize: '11px', color: '#888' }}>{item.date} | {item.type} | 🔔 {item.reminder}</span>
                          </div>
                        </div>
                        <button onClick={() => setEvents(events.filter(e => e.id !== item.id))} style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {calendarView === 'weekly' && (
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 14px 0', color: '#fff' }}>📆 תצוגה שבועית</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                    {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'].map((day, idx) => (
                      <div key={idx} style={{ background: '#1a1a1a', padding: '12px', borderRadius: '10px', border: '1px solid #262626', minHeight: '130px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff', display: 'block', marginBottom: '8px', borderBottom: '1px solid #333', paddingBottom: '4px' }}>{day}</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {events.filter((_, i) => i % 7 === idx).map(ev => (
                            <div key={ev.id} style={{ background: '#222', padding: '6px', borderRadius: '6px', borderRight: `3px solid ${ev.color}`, fontSize: '11px' }}>
                              <strong style={{ color: '#fff', display: 'block' }}>{ev.time}</strong>
                              <span style={{ color: '#ccc' }}>{ev.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {calendarView === 'monthly' && (
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 14px 0', color: '#fff' }}>🗓️ תצוגה חודשית (נובמבר 2026)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                    {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((d, i) => (
                      <div key={i} style={{ textAlign: 'center', fontSize: '11px', color: '#888', paddingBottom: '6px' }}>{d}</div>
                    ))}
                    {Array.from({ length: 30 }, (_, i) => {
                      const dayNum = i + 1;
                      const dayStr = `2026-11-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                      const dayEvents = events.filter(e => e.date === dayStr);
                      return (
                        <div key={i} style={{ background: '#1a1a1a', border: '1px solid #262626', borderRadius: '8px', minHeight: '75px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: dayEvents.length > 0 ? '#fbbc05' : '#777' }}>{dayNum}</span>
                          {dayEvents.map(ev => (
                            <div key={ev.id} style={{ background: ev.color, color: '#fff', fontSize: '9px', padding: '2px 4px', borderRadius: '4px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ev.title}</div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {calendarView === 'yearly' && (
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 14px 0', color: '#fff' }}>📅 תצוגה שנתית (2026)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    {['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'].map((month, idx) => (
                      <div key={idx} style={{ background: '#1a1a1a', padding: '12px', borderRadius: '10px', border: month === 'נובמבר' ? '1px solid #fbbc05' : '1px solid #262626' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: month === 'נובמבר' ? '#fbbc05' : '#fff', display: 'block', marginBottom: '4px' }}>{month}</span>
                        <span style={{ fontSize: '11px', color: '#777' }}>{month === 'נובמבר' ? `${events.length} אירועים פעילים` : 'אין אירועים'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. מרכז פיננסי מלא (Full Control Finance OS) */}
          {activeTab === 'finance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h1 style={{ fontSize: '26px', fontWeight: '600', margin: '0 0 6px 0' }}>Full Control Finance OS</h1>
                <p style={{ color: '#888', fontSize: '13px', margin: '0' }}>שליטה מלאה: ניהול הוצאות קבועות, יומיות, ומעקב קטגוריות חכם.</p>
              </div>

              {/* סיכום עליון */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>הכנסה חודשית</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: '#34a853' }}>₪{monthlyIncome.toLocaleString()}</h2>
                </div>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>סך הוצאות כולל</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: '#ea4335' }}>₪{totalAllExpenses.toLocaleString()}</h2>
                  <span style={{ fontSize: '11px', color: '#888' }}>קבועות: ₪{totalFixed} | יומיות: ₪{totalDaily}</span>
                </div>
                <div style={cardStyle}>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>יתרה פנויה חיה</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0', color: netBalance >= 0 ? '#fbbc05' : '#ea4335' }}>₪{netBalance.toLocaleString()}</h2>
                </div>
              </div>

              {/* טפסים להוספת הוצאות */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 12px 0', color: '#fff' }}>+ הוסף הוצאה יומית</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newExpenseName || !newExpenseAmount) return;
                    setDailyExpenses([{ id: Date.now(), name: newExpenseName, amount: parseFloat(newExpenseAmount), category: newExpenseCategory }, ...dailyExpenses]);
                    setNewExpenseName(''); setNewExpenseAmount('');
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" placeholder="שם ההוצאה..." value={newExpenseName} onChange={(e) => setNewExpenseName(e.target.value)} style={inputStyle} required />
                    <input type="number" placeholder="סכום (₪)" value={newExpenseAmount} onChange={(e) => setNewExpenseAmount(e.target.value)} style={inputStyle} required />
                    <select value={newExpenseCategory} onChange={(e) => setNewExpenseCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      {categoriesList.map((cat, idx) => <option key={idx} value={cat} style={{ background: '#1a1a1a', color: '#fff' }}>{cat}</option>)}
                    </select>
                    <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', fontFamily: "'Lora', serif" }}>הוסף הוצאה יומית</button>
                  </form>
                </div>

                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 12px 0', color: '#fff' }}>+ הוסף הוצאה קבועה</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newFixedName || !newFixedAmount) return;
                    setFixedExpenses([...fixedExpenses, { id: Date.now(), name: newFixedName, amount: parseFloat(newFixedAmount), category: newFixedCategory }]);
                    setNewFixedName(''); setNewFixedAmount('');
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" placeholder="שם ההוצאה הקבועה..." value={newFixedName} onChange={(e) => setNewFixedName(e.target.value)} style={inputStyle} required />
                    <input type="number" placeholder="סכום חודשי (₪)" value={newFixedAmount} onChange={(e) => setNewFixedAmount(e.target.value)} style={inputStyle} required />
                    <select value={newFixedCategory} onChange={(e) => setNewFixedCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      {categoriesList.map((cat, idx) => <option key={idx} value={cat} style={{ background: '#1a1a1a', color: '#fff' }}>{cat}</option>)}
                    </select>
                    <button type="submit" style={{ background: '#333', color: '#fff', border: '1px solid #444', padding: '10px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', fontFamily: "'Lora', serif" }}>הוסף הוצאה קבועה</button>
                  </form>
                </div>
              </div>

              {/* רשימות קבועות ויומיות */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 14px 0', color: '#fff' }}>הוצאות קבועות ({fixedExpenses.length})</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                    {fixedExpenses.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #262626' }}>
                        <div><span style={{ fontSize: '13px', color: '#fff' }}>{item.name}</span><span style={{ fontSize: '10px', color: '#888', display: 'block' }}>{item.category}</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>₪{item.amount}</span>
                          <button onClick={() => setFixedExpenses(fixedExpenses.filter(i => i.id !== item.id))} style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer' }}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 14px 0', color: '#fff' }}>הוצאות יומיות ({dailyExpenses.length})</h3>
                  {dailyExpenses.length === 0 ? (
                    <p style={{ fontSize: '12px', color: '#666' }}>אין הוצאות יומיות כרגע.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                      {dailyExpenses.map((item) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #262626' }}>
                          <div><span style={{ fontSize: '13px', color: '#fff' }}>{item.name}</span><span style={{ fontSize: '10px', color: '#888', display: 'block' }}>{item.category}</span></div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#ea4335' }}>-₪{item.amount}</span>
                            <button onClick={() => setDailyExpenses(dailyExpenses.filter(i => i.id !== item.id))} style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer' }}>✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

const tabButtonStyle = (isActive) => ({
  background: isActive ? '#fff' : '#141414',
  color: isActive ? '#000' : '#888',
  border: '1px solid #333',
  padding: '6px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '11px',
  fontWeight: '600',
  fontFamily: "'Lora', serif"
});

const inputStyle = {
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #333',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  fontSize: '12px',
  fontFamily: "'Lora', serif",
  outline: 'none'
};

const waterButtonStyle = {
  background: '#1a2a3a',
  color: '#64b5f6',
  border: '1px solid #2a4a6a',
  padding: '10px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '600',
  fontFamily: "'Lora', serif"
};

const socialButtonStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#1a1a1a',
  color: '#fff', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Lora', serif"
};

const cardStyle = {
  background: '#141414', padding: '24px', borderRadius: '16px', border: '1px solid #222', boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
};
