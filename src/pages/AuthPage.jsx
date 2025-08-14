import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { FaGoogle, FaGithub, FaCheckCircle, FaChartLine, FaLayerGroup, FaRobot, FaShieldAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import SocioVertexLogo from '../assets/logos/SocioVertex.svg';
import { useAuth } from '../context/AuthContext.jsx';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, loginWithGitHub } = useAuth();
  const [mode, setMode] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('mode') === 'signup' ? 'signup' : 'login';
    } catch { return 'login'; }
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  // Sync mode if query param changes (e.g., user navigates via nav buttons without full reload)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qMode = params.get('mode') === 'signup' ? 'signup' : 'login';
    setMode(prev => prev === qMode ? prev : qMode);
  }, [location.search]);
  const toggle = (m) => setMode(m);
  return (
    <div className="auth-shell">
      <div className="auth-bg" aria-hidden="true" />
      <div className="auth-layout">
        <div className="marketing">
          <h2 className="mk-headline">Grow <span className="mk-gradient">Smarter</span><br /> Across Platforms</h2>
          <p className="mk-sub">Unified insights + AI guidance — all in one secure hub.</p>
          <ul className="mk-bullets">
            <li><FaChartLine /><span>Real‑time multi‑network analytics</span></li>
            <li><FaLayerGroup /><span>Side‑by‑side profile comparisons</span></li>
            <li><FaRobot /><span>AI content & timing suggestions</span></li>
            <li><FaShieldAlt /><span>Enterprise‑grade privacy & security</span></li>
          </ul>
          <div className="mk-stats" aria-label="Key platform scale stats">
            <div className="mk-stat"><span className="num">105M+</span><span className="label">Profiles</span></div>
            <div className="mk-stat"><span className="num">69M</span><span className="label">YouTube</span></div>
            <div className="mk-stat"><span className="num">11M</span><span className="label">Instagram</span></div>
            <div className="mk-stat"><span className="num">9.4M</span><span className="label">Twitter</span></div>
          </div>
        </div>
        <div className="auth-card" role="region" aria-label={mode === 'login' ? 'Login form' : 'Signup form'}>
          <div className="auth-panel-header">
            <img src={SocioVertexLogo} alt="SocioVertex" style={{height:42, marginBottom:14}} />
            <h1>{mode === 'login' ? 'Welcome Back' : 'Create Your Account'}</h1>
            <p>{mode === 'login' ? 'Access your unified creator analytics dashboard.' : 'Start tracking and amplifying your cross-platform presence.'}</p>
          </div>

          <div className="auth-toggle" role="tablist" aria-label="Authentication mode toggle">
            <button className={mode==='login' ? 'active' : ''} role="tab" aria-selected={mode==='login'} onClick={()=>toggle('login')}>Login</button>
            <button className={mode==='signup' ? 'active' : ''} role="tab" aria-selected={mode==='signup'} onClick={()=>toggle('signup')}>Sign Up</button>
          </div>

            {mode === 'signup' && (
              <div className="plan-highlight" style={{display:'flex',alignItems:'center',gap:10, background:'rgba(255,255,255,0.06)', padding: '0.55rem 0.8rem', borderRadius:14, marginTop:-6, marginBottom:8, fontSize:12, letterSpacing:.4}}>
                <FaCheckCircle style={{color:'var(--accent-strong)'}} /> No credit card needed to start.
              </div>
            )}

          <form className="auth-form" onSubmit={async (e)=>{ 
            e.preventDefault();
            setError('');
            const form = e.currentTarget;
            const data = new FormData(form);
            const name = data.get('name');
            const email = data.get('email');
            const password = data.get('password');
            const confirm = data.get('confirm');
            try {
              setSubmitting(true);
              if (mode === 'signup') {
                if (password !== confirm) throw new Error('Passwords do not match');
                await signup(name, email, password);
              } else {
                await login(email, password);
              }
              navigate('/');
            } catch (err) {
              setError(err.message || 'Authentication failed');
            } finally { setSubmitting(false); }
          }}>
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
            </div>
            {error && <div style={{background:'rgba(255,0,0,0.12)', border:'1px solid rgba(255,0,0,0.35)', padding:'.65rem .9rem', borderRadius:12, fontSize:'.7rem', color:'#ff91a1', fontWeight:600}} role="alert">{error}</div>}
            <button type="submit" disabled={submitting} className="auth-submit" style={submitting ? {opacity:.6, cursor:'wait'}:undefined}>{submitting ? (mode==='login'?'Logging in...':'Creating...') : (mode === 'login' ? 'Login' : 'Create Account')}</button>
          </form>

          <div className="divider"><span>OR CONTINUE WITH</span></div>
          <div className="oauth-row">
            <button className="oauth-btn" aria-label="Continue with Google" type="button" onClick={async()=>{setError(''); setSubmitting(true); try{ await loginWithGoogle(); navigate('/'); } catch(e){ setError(e.message); } finally{ setSubmitting(false);} }}><FaGoogle /> Google</button>
            <button className="oauth-btn" aria-label="Continue with GitHub" type="button" onClick={async()=>{setError(''); setSubmitting(true); try{ await loginWithGitHub(); navigate('/'); } catch(e){ setError(e.message); } finally{ setSubmitting(false);} }}><FaGithub /> GitHub</button>
            <button className="oauth-btn" aria-label="Continue with X" type="button" disabled title="Provider not configured yet"><FaXTwitter /> Twitter</button>
          </div>

          <p className="meta-note">
            {mode === 'login' ? <>New here? <button onClick={()=>toggle('signup')} className="ghost-link">Create an account</button></> : <>Already have an account? <button onClick={()=>toggle('login')} className="ghost-link">Login</button></>}<br />
            By continuing you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a>.
          </p>
          <div className="back-home"><Link to="/">← Back to home</Link></div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
