import React, { useState } from 'react';
import './AuthPage.css';
import { FaGoogle, FaGithub, FaTwitter, FaCheckCircle } from 'react-icons/fa';
import SocioVertexLogo from '../assets/logos/SocioVertex.svg';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const toggle = (m) => setMode(m);

  return (
    <div className="auth-shell">
      <div className="auth-art" aria-hidden="true">
        <div className="auth-art-grid" />
        <div className="auth-art-noise" />
        <div className="rings">
          <div className="ring" />
          <div className="ring" />
            <div className="ring" />
        </div>
      </div>
      <div className="auth-panel-wrapper">
        <div className="auth-panel" role="region" aria-label={mode === 'login' ? 'Login form' : 'Signup form'}>
          <div className="auth-panel-header">
            <img src={SocioVertexLogo} alt="SocioVertex" style={{height:48, marginBottom:18}} />
            <h1>{mode === 'login' ? 'Welcome Back' : 'Create Your Account'}</h1>
            <p>{mode === 'login' ? 'Access your unified creator analytics dashboard.' : 'Start tracking and amplifying your cross-platform presence.'}</p>
          </div>

          <div className="auth-toggle" role="tablist" aria-label="Authentication mode toggle">
            <button className={mode==='login' ? 'active' : ''} role="tab" aria-selected={mode==='login'} onClick={()=>toggle('login')}>Login</button>
            <button className={mode==='signup' ? 'active' : ''} role="tab" aria-selected={mode==='signup'} onClick={()=>toggle('signup')}>Sign Up</button>
          </div>

          {mode === 'signup' && (
            <div className="plan-highlight" style={{display:'flex',alignItems:'center',gap:10, background:'rgba(255,255,255,0.06)', padding: '0.65rem 0.9rem', borderRadius:14, marginTop:-10, marginBottom:10, fontSize:12, letterSpacing:.4}}>
              <FaCheckCircle style={{color:'var(--accent-strong)'}} /> No credit card needed to start.
            </div>
          )}

          <form className="auth-form" onSubmit={(e)=>{ e.preventDefault(); }}>
            {mode === 'signup' && (
              <div className="form-row">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Jane Doe" autoComplete="name" required />
              </div>
            )}
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="••••••••" autoComplete={mode==='login' ? 'current-password' : 'new-password'} required />
            </div>
            {mode === 'signup' && (
              <div className="form-row">
                <label htmlFor="confirm">Confirm Password</label>
                <input id="confirm" name="confirm" type="password" placeholder="Repeat password" required />
              </div>
            )}
            <div className="inline-row">
              {mode === 'login' ? <a href="#">Forgot password?</a> : <span style={{fontSize:'.7rem', color:'#776f87'}}>Password must be at least 8 characters.</span>}
              {mode === 'login' && <span style={{fontSize:'.7rem', color:'#776f87'}} />}
            </div>
            <button type="submit" className="auth-submit">{mode === 'login' ? 'Login' : 'Create Account'}</button>
          </form>

          <div className="divider"><span>OR CONTINUE WITH</span></div>
          <div className="oauth-row">
            <button className="oauth-btn" aria-label="Continue with Google"><FaGoogle /> Google</button>
            <button className="oauth-btn" aria-label="Continue with GitHub"><FaGithub /> GitHub</button>
            <button className="oauth-btn" aria-label="Continue with Twitter"><FaTwitter /> X</button>
          </div>

          <p className="meta-note">
            {mode === 'login' ? <>New here? <button onClick={()=>toggle('signup')} style={{background:'none',border:'none',color:'var(--accent-strong)',cursor:'pointer',fontWeight:600}}>Create an account</button></> : <>Already have an account? <button onClick={()=>toggle('login')} style={{background:'none',border:'none',color:'var(--accent-strong)',cursor:'pointer',fontWeight:600}}>Login</button></>}<br />
            By continuing you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a>.
          </p>

          <div style={{marginTop:24, textAlign:'center'}}>
            <Link to="/" style={{fontSize:12, color:'#9d96aa', textDecoration:'none'}}>← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
