import React from 'react';
import './PlatformPage.css';

export default function LinkedInPage() {
  return (
    <div className="plat-layout">
      <aside className="plat-sidebar">
        <div className="plat-section-header li">LinkedIn Suggestions</div>
        <ul className="plat-suggestion-list">
          <li className="plat-suggestion-item"><div className="plat-avatar li"/>microsoft</li>
          <li className="plat-suggestion-item"><div className="plat-avatar li"/>google</li>
          <li className="plat-suggestion-item"><div className="plat-avatar li"/>openai</li>
        </ul>
      </aside>
      <main className="plat-main">
        <div className="plat-card">
          <header className="plat-card-header">
            <h2>Top LinkedIn Company Pages</h2>
            <span className="plat-latency">53ms</span>
          </header>
          <div className="plat-placeholder">Engagement leaderboard coming soon...</div>
        </div>
      </main>
    </div>
  );
}
