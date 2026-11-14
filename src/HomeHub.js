import React from 'react';
import Logo from './Logo';

export default function HomeHub({ setActiveTab }) {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      backgroundColor: '#fff5f7',
      minHeight: '100vh',
      padding: '24px 16px 90px 16px',
      direction: 'ltr',
      textAlign: 'left',
      color: '#2d3748',
      maxWidth: '480px',
      margin: '0 auto'
    }}>
      {/* Persistent Top Header with Logo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Logo size={42} />
        <div style={{ fontSize: '12px', background: '#ffe4e6', color: '#9f1239', padding: '6px 12px', borderRadius: '20px', fontWeight: '700' }}>
          ✨ OS Active
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a202c', margin: '0 0 4px 0' }}>Hello, Yam 🌸</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>All systems synchronized seamlessly.</p>
      </div>

      {/* Main Goal Card */}
      <div style={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)', 
        padding: '22px', 
        borderRadius: '24px', 
        marginBottom: '20px', 
        boxShadow: '0 10px 25px rgba(225, 29, 72, 0.08)',
        border: '1px solid rgba(253, 164, 175, 0.4)'
      }}>
        <div style={{ fontSize: '12px', fontWeight: '800', color: '#be185d', marginBottom: '6px', letterSpacing: '0.5px' }}>🎯 ACTIVE FUND GOAL</div>
        <div style={{ fontSize: '17px', fontWeight: '900', color: '#1f2937' }}>2-Year Real Estate Investment Fund</div>
        <div style={{ fontSize: '13px', color: '#4b5563', marginTop: '6px', lineHeight: '1.4' }}>
          Automated savings + budget management, Bar-Ilan studies, Battalion 951 reserves, and Suzuki Ignis maintenance.
        </div>
      </div>

      <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#374151', marginBottom: '14px' }}>System Modules</h3>

      {/* Bento Grid Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div onClick={() => setActiveTab('finance')} style={{ background: '#fff', padding: '18px', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #fce7f3' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>💰</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#1f2937' }}>Finances</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Budget & real estate</div>
        </div>

        <div onClick={() => setActiveTab('schedule')} style={{ background: '#fff', padding: '18px', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #fce7f3' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>📅</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#1f2937' }}>Calendar</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Google-style Hub</div>
        </div>

        <div onClick={() => setActiveTab('fitness')} style={{ background: '#fff', padding: '18px', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #fce7f3' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>🥗</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#1f2937' }}>Fitness & Diet</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Proteins & Ashtanga</div>
        </div>

        <div onClick={() => setActiveTab('care')} style={{ background: '#fff', padding: '18px', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #fce7f3' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>🚗</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#1f2937' }}>Car & Care</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Ignis PSI & styling</div>
        </div>
      </div>
    </div>
  );
}
