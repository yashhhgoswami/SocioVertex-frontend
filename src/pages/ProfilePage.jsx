import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './ProfilePage.css';
import { FaPen, FaAward, FaUserCircle, FaChartLine, FaLink, FaShareAlt, FaEdit, FaTimes } from 'react-icons/fa';
import { fetchBackendProfile, updateProfile, uploadAvatar } from '../api/backend.js';

const SectionCard = ({ title, actionLabel = 'Edit', children, compact }) => (
  <div className={`pp-section ${compact ? 'compact' : ''}`}>
    <div className="pp-section-header">
      <h3>{title}</h3>
      <button className="pp-action-btn" type="button"><FaEdit /> {actionLabel}</button>
    </div>
    <div className="pp-section-body">{children}</div>
  </div>
);

const ProfilePage = () => {
  const { user } = useAuth(); // Firebase user (for auth gating only in this hybrid model)
  const [backendUser, setBackendUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ display_name: '', bio: '', about: '' });
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [error, setError] = useState('');

  // Load backend session profile (if user has a backend session via passport)
  useEffect(()=>{
    let active = true;
    (async ()=>{
      try {
        const data = await fetchBackendProfile();
        if(active && data.user){
          setBackendUser(data.user);
        }
      } catch(e){ /* ignore */ } finally {
        if(active) setLoadingProfile(false);
      }
    })();
    return ()=>{ active=false; };
  },[]);

  const displayName = backendUser?.display_name || user?.displayName || (user?.email ? user.email.split('@')[0] : 'Creator');
  const avatarUrl = backendUser?.avatar_url ? (backendUser.avatar_url.startsWith('http')? backendUser.avatar_url : 'http://localhost:3000'+backendUser.avatar_url) : null;
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const handleShare = () => { navigator.clipboard.writeText(window.location.href).catch(()=>{}); };

  const openEdit = () => {
    setForm({
      display_name: backendUser?.display_name || displayName,
      bio: backendUser?.bio || '',
      about: backendUser?.about || ''
    });
    setEditing(true);
    setError('');
  };
  const handleChange = e => setForm(f=>({...f,[e.target.name]: e.target.value}));
  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const { user: updated } = await updateProfile(form);
      setBackendUser(updated);
      setEditing(false);
    } catch(err){ setError(err.message||'Save failed'); }
    finally { setSaving(false); }
  };
  const handleAvatarPick = async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    if(file.size > 2*1024*1024){ setError('Avatar too large (max 2MB)'); return; }
    setAvatarUploading(true); setError('');
    try {
      const { user: updated } = await uploadAvatar(file);
      setBackendUser(updated);
    } catch(err){ setError(err.message||'Upload failed'); }
    finally { setAvatarUploading(false); }
  };
  const connected = !!backendUser;
  return (
    <div className="profile-layout">
      <Navbar />
      <div className="profile-cover">
        <div className="profile-cover-overlay" />
        <div className="profile-core">
            <div className="profile-avatar-wrap">
              {avatarUrl ? <img src={avatarUrl} alt={displayName} className="profile-avatar img" /> : <div className="profile-avatar">{avatarLetter}</div>}
              <label className="avatar-edit" aria-label="Change avatar">
                {avatarUploading ? '...' : <FaPen />}
                <input type="file" accept="image/*" style={{display:'none'}} onChange={handleAvatarPick} />
              </label>
            </div>
          <div className="profile-identity">
            <h1>{displayName}</h1>
            <p className="handle">@{displayName.toLowerCase()}</p>
            <p className="bio-rank">Emerging Creator • Social Performance Enthusiast</p>
            <div className="profile-stats">
              <div><span className="num">12.4K</span><span className="lbl">Followers</span></div>
              <div><span className="num">842</span><span className="lbl">Following</span></div>
              <div><span className="num">328</span><span className="lbl">Posts</span></div>
              <div><span className="num">89</span><span className="lbl">Reports</span></div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn ghost" type="button" onClick={openEdit} disabled={!connected}><FaPen /> Edit Profile</button>
            <button className="btn primary" type="button" onClick={handleShare}><FaShareAlt /> Share</button>
          </div>
        </div>
        <div className="profile-tabs" role="tablist">
          <button className="tab active" role="tab">Overview</button>
          <button className="tab" role="tab">Content</button>
          <button className="tab" role="tab">Performance</button>
          <button className="tab" role="tab">Awards</button>
          <button className="tab" role="tab">Integrations</button>
        </div>
      </div>
      <div className="profile-main-grid">
        <main className="profile-main">
          <SectionCard title="About" actionLabel="Edit About">
            <p>{backendUser?.about || 'Add an about section to let others know your focus and value proposition.'}</p>
          </SectionCard>
          <SectionCard title="Recent Performance" actionLabel="View All">
            <div className="metric-row">
              <div className="metric-chip"><FaChartLine /> 7d Followers +2.1%</div>
              <div className="metric-chip"><FaChartLine /> Avg ER 5.8%</div>
              <div className="metric-chip"><FaChartLine /> Watch Time 38h</div>
              <div className="metric-chip"><FaChartLine /> Viral Score 73</div>
            </div>
          </SectionCard>
          <SectionCard title="Linked Networks" actionLabel="Manage">
            <ul className="links-list">
              <li><FaLink /> YouTube Channel • Connected</li>
              <li><FaLink /> Instagram Account • Pending Sync</li>
              <li><FaLink /> Twitter Profile • Connected</li>
              <li><FaLink /> LinkedIn Page • Not Linked</li>
            </ul>
          </SectionCard>
          <SectionCard title="Pinned Reports" actionLabel="Open" compact>
            <div className="reports-grid">
              <div className="report-card">April Growth Recap</div>
              <div className="report-card">Content Theme Insights</div>
              <div className="report-card">Audience Geo Breakdown</div>
            </div>
          </SectionCard>
        </main>
        <aside className="profile-aside">
          <div className="awards-panel">
            <h3><FaAward /> Achievements</h3>
            <ul className="award-list">
              <li><span className="badge purple" /> Verified Creator Tier</li>
              <li><span className="badge gold" /> 10K Multi-Platform Followers</li>
              <li><span className="badge pink" /> Rising Engagement Award</li>
              <li><span className="badge cyan" /> Consistency Streak 90d</li>
            </ul>
            <button className="pp-action-btn small" type="button">View More</button>
          </div>
          <div className="mini-card">
            <h4><FaUserCircle /> Profile Completeness</h4>
            <div className="progress-bar"><span style={{width:'72%'}} /></div>
            <p className="progress-note">Add a cover image and connect LinkedIn to reach 100%.</p>
          </div>
          <div className="mini-card">
            <h4>Quick Tips</h4>
            <ul className="tips">
              <li>Post at least 3 cross-platform updates weekly.</li>
              <li>Repurpose high-retention YouTube Shorts to Reels.</li>
              <li>Enable auto-report emailing for clients.</li>
            </ul>
          </div>
        </aside>
      </div>
    {editing && (
      <div className="modal-overlay">
        <div className="modal profile-edit-modal">
          <button className="modal-close" onClick={()=>setEditing(false)}><FaTimes /></button>
          <h2>Edit Profile</h2>
          {!connected && <div className="warn">You are not connected to backend session. Log in via social auth for persistent profile.</div>}
          {error && <div className="error-box">{error}</div>}
          <form onSubmit={saveProfile} className="edit-form">
            <label>
              <span>Display Name</span>
              <input name="display_name" value={form.display_name} onChange={handleChange} maxLength={60} />
            </label>
            <label>
              <span>Bio (short tagline)</span>
              <input name="bio" value={form.bio} onChange={handleChange} maxLength={160} />
            </label>
            <label>
              <span>About (longer description)</span>
              <textarea name="about" value={form.about} onChange={handleChange} rows={5} />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn ghost" onClick={()=>setEditing(false)}>Cancel</button>
              <button className="btn primary" disabled={saving}>{saving? 'Saving...' : 'Save Changes'}</button>
            </div>
          </form>
        </div>
      </div>
    )}
    </div>
  );
};

export default ProfilePage;
