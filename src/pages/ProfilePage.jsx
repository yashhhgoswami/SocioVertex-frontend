import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './ProfilePage.css';
import { FaPen, FaAward, FaUserCircle, FaChartLine, FaLink, FaShareAlt, FaEdit } from 'react-icons/fa';

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
  const { user } = useAuth();
  const displayName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'Creator');
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(()=>{});
  };
  return (
    <div className="profile-layout">
      <Navbar />
      <div className="profile-cover">
        <div className="profile-cover-overlay" />
        <div className="profile-core">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{avatarLetter}</div>
            <button className="avatar-edit" aria-label="Change avatar"><FaPen /></button>
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
            <button className="btn ghost" type="button"><FaPen /> Edit Profile</button>
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
            <p>Welcome to my analytics hub! I analyze multi-platform creator performance and experiment with AI-assisted content strategies. Passionate about data visualization, growth loops, and community building.</p>
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
    </div>
  );
};

export default ProfilePage;
