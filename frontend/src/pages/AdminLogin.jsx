import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck, ArrowLeft } from 'lucide-react';
import '../Admin.css';
import logo from '../images/LOGO.png';

const AdminLogin = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified validation for demo/development purposes
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      alert('Invalid credentials. Hint: admin / admin123');
    }
  };

  return (
    <div className="admin-login-page" style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'radial-gradient(circle at center, #1a2e1d 0%, #0b140c 100%)',
      fontFamily: 'Outfit, sans-serif'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
        style={{ 
          width: '90%', 
          maxWidth: '400px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(15px)', 
          padding: '2.5rem', 
          borderRadius: '30px', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <button 
          onClick={onBack}
          style={{ 
            position: 'absolute', 
            top: '25px', 
            left: '25px', 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            opacity: 0.5,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0.5}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ marginBottom: '2.5rem' }}>
          <div className="admin-logo-icon" style={{ margin: '0 auto 1.5rem', width: '120px', height: '120px', background: 'transparent' }}>
             <img src={logo} alt="RSV Groups Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 className="serif" style={{ fontSize: '2.4rem', color: 'white', letterSpacing: '2px' }}>RSV <span className="highlight">GROUPS</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '10px' }}>Secure Administration Portal</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group-modern" style={{ textAlign: 'left' }}>
            <label style={{ color: 'var(--accent-gold)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>Username</label>
            <div style={{ position: 'relative' }}>
               <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
               <input 
                 type="text" 
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 placeholder="Admin Username" 
                 style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} 
               />
            </div>
          </div>

          <div className="input-group-modern" style={{ textAlign: 'left' }}>
            <label style={{ color: 'var(--accent-gold)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
               <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••" 
                 style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} 
               />
            </div>
          </div>

          <button 
            type="submit" 
            className="book-btn"
            style={{ width: '100%', padding: '1.2rem', marginTop: '1rem', background: 'var(--accent-gold)', color: 'white', borderRadius: '12px', fontWeight: 700 }}
          >
            Access Dashboard
          </button>
        </form>

        <p style={{ marginTop: '2.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
          &copy; 2024 RSV Groups. All property data is confidential.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
