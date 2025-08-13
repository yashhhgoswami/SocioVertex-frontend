import React from 'react';
import './PlatformPage.css';

export default function InstagramPage() {
  return (
    <div className="plat-layout">
      <aside className="plat-sidebar">
        <div className="plat-section-header ig">Instagram Suggestions</div>
        <ul className="plat-suggestion-list">
          <li className="plat-suggestion-item"><div className="plat-avatar ig"/>natgeo</li>
          <li className="plat-suggestion-item"><div className="plat-avatar ig"/>nasa</li>
          <li className="plat-suggestion-item"><div className="plat-avatar ig"/>9gag</li>
        </ul>
      </aside>
      <main className="plat-main">
        <div className="plat-card">
          <header className="plat-card-header">
            <h2>Top Instagram Creators</h2>
            <span className="plat-latency">41ms</span>
          </header>
          <div className="plat-placeholder">Analytics table coming soon...</div>
        </div>
      </main>
    </div>
  );
}
