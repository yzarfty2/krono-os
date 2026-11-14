import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function AuthScreen({ onLogin }) {
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // מסך פתיחה שחור-לבן קציני ל-2.5 שניות
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  if (showSplash) {
    return (
      <div style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <Logo type="wordmark" size={50} />
        </div>
        <p style={{ fontSize: '11px', color: '#888888', letterSpacing: '3px', textTransform: 'uppercase', margin: 0, fontWeight: '600' }}>
          Executive Life Management OS
        </p>
      </div>
    );
  }

  // מסך התחברות שחור-לבן רשמי ויוקרתי
  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      padding: '40px 24px',
      color: '#ffffff',
      maxWidth: '400px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      direction: 'ltr',
      textAlign: 'left'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Logo type="wordmark" size={36} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', margin: '0 0 6px 0', color: '#ffffff' }}>
          System Access
        </h1>
        <p style={{ fontSize: '13px', color: '#888888', margin: 0 }}>
          Authenticate to synchronize your executive modules
        </p>
      </div>

      {/* Social Logins */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {[
          { name: 'Apple', icon: '' },
          { name: 'Google', icon: 'G' },
          { name: 'Microsoft', icon: '❖' }
        ].map((provider) => (
          <button
            key={provider.name}
            onClick={onLogin}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #222222',
              background: '#141414',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '15px' }}>{provider.icon}</span> Continue with {provider.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 20px 0', color: '#555555', fontSize: '11px', letterSpacing: '1px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#222222' }} />
        <span style={{ padding: '0 10px', textTransform: 'uppercase' }}>Secure Gateway</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#222222' }} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '11px', fontWeight: '700', color: '#888888', textTransform: 'uppercase' }}>Email</label>
          <input
            type="email"
            placeholder="yam@krono.os"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #333333', fontSize: '13px', marginTop: '6px', boxSizing: 'border-box', backgroundColor: '#141414', color: '#fff' }}
            required
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: '700', color: '#888888', textTransform: 'uppercase' }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #333333', fontSize: '13px', marginTop: '6px', boxSizing: 'border-box', backgroundColor: '#141414', color: '#fff' }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: '10px',
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            padding: '14px',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Authenticate & Enter
        </button>
      </form>
    </div>
  );
}
