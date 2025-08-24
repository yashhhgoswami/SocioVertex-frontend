import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import './YouTubePage.css';
import { searchYouTubeChannel, fetchYouTubeSummary } from '../api/backend';

function formatNumber(n) {
  if(n === null || n === undefined) return '-';
  if(n >= 1_000_000_000) return (n/1_000_000_000).toFixed(2)+'B';
  if(n >= 1_000_000) return (n/1_000_000).toFixed(2)+'M';
  if(n >= 1_000) return (n/1_000).toFixed(1)+'K';
  return n.toString();
}

export default function YouTubePage() {
  useScrollReveal([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [channel, setChannel] = useState(null); // basic stats
  const [summary, setSummary] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if(!query.trim()) return;
    setError('');
    setLoading(true);
    setSummary(null);
    try {
      const { stats } = await searchYouTubeChannel(query.trim());
      setChannel(stats);
      const sum = await fetchYouTubeSummary(stats.channel_id);
      setSummary(sum);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="yt-layout reveal" data-reveal="fade" data-reveal-once>
      <aside className="yt-sidebar reveal" data-reveal="left" data-reveal-once>
        <div className="yt-suggestions">
          <div className="yt-suggestions-header">Search Channel</div>
          <form onSubmit={handleSearch} className="yt-search-form">
            <input
              type="text"
              placeholder="Channel name, @handle or ID"
              value={query}
              onChange={e=>setQuery(e.target.value)}
              disabled={loading}
            />
            <button disabled={loading || !query.trim()}>{loading ? 'Searching...' : 'Search'}</button>
          </form>
          {error && <div className="yt-error">{error}</div>}
          {channel && (
            <div className="yt-channel-mini">
              <div className="yt-avatar" style={{backgroundImage: `url(${channel.thumbnails?.default?.url||''})`}} />
              <div>
                <div className="yt-name">{channel.title}</div>
                <div className="yt-mini">{formatNumber(channel.subscriber_count)} subs</div>
              </div>
            </div>
          )}
        </div>
      </aside>
      <main className="yt-main reveal" data-reveal="up" data-reveal-once>
        {!summary && !loading && <div className="yt-placeholder">Search for a YouTube channel to view analytics.</div>}
        {summary && (
          <div className="yt-card reveal" data-reveal="fade" data-reveal-delay="60" data-reveal-once>
            <header className="yt-card-header">
              <h2>{channel?.title}</h2>
              <span className="yt-grade">Grade {summary.grade}</span>
            </header>
            <div className="yt-stats-grid">
              <div className="yt-stat"><span>Subscribers</span><strong>{formatNumber(summary.latest.subscriber_count)}</strong></div>
              <div className="yt-stat"><span>Views</span><strong>{formatNumber(summary.latest.view_count)}</strong></div>
              <div className="yt-stat"><span>Videos</span><strong>{formatNumber(summary.latest.video_count)}</strong></div>
              <div className="yt-stat"><span>Subs 7d Δ</span><strong>{formatNumber(summary.subs7)}</strong></div>
              <div className="yt-stat"><span>Subs 30d Δ</span><strong>{formatNumber(summary.subs30)}</strong></div>
              <div className="yt-stat"><span>Views 30d Δ</span><strong>{formatNumber(summary.views30)}</strong></div>
              <div className="yt-stat"><span>Est. Monthly $</span><strong>{formatNumber(summary.estimatedMonthlyEarnings.low)} - {formatNumber(summary.estimatedMonthlyEarnings.high)}</strong></div>
            </div>
            <div className="yt-history">
              <h3>Recent Growth</h3>
              <div className="yt-history-chart">
                {summary.history.slice(-20).map(h => (
                  <div key={h.fetched_at} className="yt-bar" title={new Date(h.fetched_at).toLocaleDateString()+': '+formatNumber(h.subscriber_count)} style={{height: `${(h.subscriber_count/summary.latest.subscriber_count)*100}%`}} />
                ))}
              </div>
              <small>Relative subscriber history (last {summary.history.length} snapshots)</small>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
