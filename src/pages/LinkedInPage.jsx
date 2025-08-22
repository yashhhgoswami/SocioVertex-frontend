import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import './PlatformPage.css';

export default function LinkedInPage() {
  useScrollReveal([]);
  return (
    <div className="plat-layout reveal" data-reveal="fade" data-reveal-once>
      <aside className="plat-sidebar reveal" data-reveal="left" data-reveal-once>
        <div className="plat-section-header li">LinkedIn Suggestions</div>
        <ul className="plat-suggestion-list">
          <li className="plat-suggestion-item"><div className="plat-avatar li"/>microsoft</li>
          <li className="plat-suggestion-item"><div className="plat-avatar li"/>google</li>
          <li className="plat-suggestion-item"><div className="plat-avatar li"/>openai</li>
        </ul>
      </aside>
      <main className="plat-main reveal" data-reveal="up" data-reveal-once>
        <div className="plat-card reveal" data-reveal="fade" data-reveal-delay="140" data-reveal-once>
          <header className="plat-card-header reveal" data-reveal="down" data-reveal-delay="220" data-reveal-once>
            <h2>Top LinkedIn Company Pages</h2>
            <span className="plat-latency">53ms</span>
          </header>
          <div className="plat-placeholder">Engagement leaderboard coming soon...</div>
        </div>
      </main>
    </div>
  );
}
