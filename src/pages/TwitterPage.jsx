import React from 'react';
import './PlatformPage.css';

export default function TwitterPage() {
  return (
    <div className="plat-layout">
      <aside className="plat-sidebar">
        <div className="plat-section-header tw">Twitter Suggestions</div>
        <ul className="plat-suggestion-list">
          <li className="plat-suggestion-item"><div className="plat-avatar tw"/>elonmusk</li>
          <li className="plat-suggestion-item"><div className="plat-avatar tw"/>nasa</li>
          <li className="plat-suggestion-item"><div className="plat-avatar tw"/>barackobama</li>
        </ul>
      </aside>
      <main className="plat-main">
        <div className="plat-card">
          <header className="plat-card-header">
            <h2>Top Twitter Accounts</h2>
            <span className="plat-latency">37ms</span>
          </header>
          <div className="plat-placeholder">Follower growth chart coming soon...</div>
        </div>
      </main>
    </div>
  );
}
