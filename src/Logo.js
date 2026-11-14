import React from 'react';

export default function Logo({ type = 'wordmark', size = 44, dark = false }) {
  if (type === 'symbol') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, fontFamily: "'Lora', serif" }}>
        <span style={{ fontSize: size * 0.75, fontWeight: '700', color: dark ? '#ffffff' : '#1a202c' }}>K</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'Lora', serif" }}>
      <span style={{ 
        fontSize: size * 0.75, 
        fontWeight: '700', 
        letterSpacing: '4px', 
        color: dark ? '#ffffff' : '#1a202c',
        textTransform: 'uppercase'
      }}>
        Krono
      </span>
    </div>
  );
}
