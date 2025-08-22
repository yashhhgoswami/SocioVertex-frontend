import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import './YouTubePage.css';

const sampleCreators = [
  { rank: 1, grade: 'A++', name: 'Vijay Television', subs: '27.3M', views: '53.04B', videos: '128.5K' },
  { rank: 2, grade: 'A++', name: '김프로KIMPRO', subs: '113M', views: '94.5B', videos: '3.35K' },
  { rank: 3, grade: 'A++', name: 'Double Date', subs: '17.9M', views: '32.31B', videos: '6.02K' }
];

export default function YouTubePage() {
  useScrollReveal([]);
  return (
    <div className="yt-layout reveal" data-reveal="fade" data-reveal-once>
      <aside className="yt-sidebar reveal" data-reveal="left" data-reveal-once>
        <div className="yt-suggestions">
          <div className="yt-suggestions-header">YouTube Suggestions</div>
          <ul className="yt-suggestion-list">
            {sampleCreators.map(c => (
              <li key={c.rank} className="yt-suggestion-item reveal" data-reveal="up" data-reveal-delay={c.rank*70} data-reveal-once>
                <div className="yt-avatar" aria-hidden></div>
                <div className="yt-suggestion-meta">
                  <span className="yt-name">{c.name}</span>
                  <span className="yt-mini">{c.subs} subs</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="yt-main reveal" data-reveal="up" data-reveal-once>
        <div className="yt-card reveal" data-reveal="fade" data-reveal-delay="120" data-reveal-once>
          <header className="yt-card-header reveal" data-reveal="down" data-reveal-delay="180" data-reveal-once>
            <h2>Top YouTube Creators by SocioVertex Rank</h2>
            <span className="yt-latency">42ms</span>
          </header>
          <table className="yt-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Grade</th>
                <th>Name</th>
                <th>Subscribers</th>
                <th>Views</th>
                <th>Videos</th>
              </tr>
            </thead>
            <tbody>
              {sampleCreators.map(c => (
                <tr key={c.rank}>
                  <td>{c.rank}</td>
                  <td className="yt-grade">{c.grade}</td>
                  <td>{c.name}</td>
                  <td>{c.subs}</td>
                  <td>{c.views}</td>
                  <td>{c.videos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
