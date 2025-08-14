import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{minHeight:'100vh', color:'#fff', padding:'4rem 2rem'}}>
      <h1 style={{fontSize:'2.4rem', marginBottom:'1rem'}}>Dashboard</h1>
  <p>Welcome <strong>{user?.displayName || user?.email?.split('@')[0]}</strong> ({user?.email})</p>
      <button onClick={logout} style={{marginTop:'1.2rem', background:'linear-gradient(90deg,var(--accent-start),var(--accent-end))', color:'#fff', border:'none', padding:'0.75rem 1.2rem', borderRadius:12, cursor:'pointer'}}>Log out</button>
    </div>
  );
}
