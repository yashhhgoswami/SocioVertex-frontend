import React, { useState, useMemo, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import { fetchMyAnalytics } from '../api/backend.js';
import './Dashboard.css';

// Lightweight SVG chart helpers (no external libs to keep bundle small)
function LineChart({ data, height = 140, stroke = '#ff35d8' }) {
  if (!data?.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 100;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
  const areaPath = `M0,100 L ${points.replace(/ /g,' L ')} L100,100 Z`;
  const linePath = `M ${points.replace(/ /g,' L ')}`;
  return (
    <svg className="line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Growth line chart">
      <defs>
        <linearGradient id="lcGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.6" />
          <stop offset="85%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#lcGrad)" stroke="none" />
      <path d={linePath} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BarChart({ data, colors }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bar-chart" role="img" aria-label="Weekly performance bar chart">
      {data.map((d, i) => (
        <div key={d.label} className="bar-wrap" title={`${d.label}: ${d.value}`}> 
          <div className="bar" style={{height:`${(d.value/max)*100}%`, background: colors?.[i % colors.length] || 'var(--accent-start)'}} />
          <span className="bar-label">{d.label[0]}</span>
        </div>
      ))}
    </div>
  );
}

function PieChart({ data }) {
  if (!data?.length) return null;
  const total = data.reduce((a,c)=>a+c.value,0) || 1;
  let cumulative = 0;
  const segments = data.map((seg,i)=> {
    const start = (cumulative/total)*100; cumulative += seg.value; const end = (cumulative/total)*100;
    return { ...seg, start, end };
  });
  return (
    <div className="pie-chart" role="img" aria-label="Audience distribution pie chart">
      <div className="pie" style={{background: segments.map(s=>`conic-gradient(${segments.map(s2=>`${s2.color || 'var(--accent-start)'} ${s2.start}%, ${s2.color || 'var(--accent-start)'} ${s2.end}%`).join(',')})`).shift()}} />
      <ul className="pie-legend">
        {segments.map(s=> (
          <li key={s.label}><span className="swatch" style={{background:s.color}} /> {s.label} <strong>{Math.round((s.value/total)*100)}%</strong></li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [range, setRange] = useState('month');
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);
  useScrollReveal([range]);

  useEffect(()=> {
    let ignore = false;
    async function load() {
      setLoadingAnalytics(true); setAnalyticsError(null);
      try {
        const data = await fetchMyAnalytics();
        if(!ignore) setAnalytics(data);
      } catch(e){
        if(!ignore) setAnalyticsError(e.message);
      } finally { if(!ignore) setLoadingAnalytics(false); }
    }
    // only try if user exists (session cookie separate from firebase user, but guard anyway)
    if (user) load();
    return ()=> { ignore = true; };
  }, [user]);

  // Demo analytics (placeholder) - replace with real fetched metrics later
  const growthData = useMemo(()=> {
    const base = range === 'week' ? 7 : range === 'month' ? 30 : 12; // weeks or months
    return Array.from({length: base}, (_,i)=> Math.round(50 + Math.sin(i/2)*20 + i* (range==='year'?2:0) + (Math.random()*10)));
  }, [range]);

  const weeklyBars = [
    { label:'Mon', value: 12 },{ label:'Tue', value: 18 },{ label:'Wed', value: 9 },{ label:'Thu', value: 22 },{ label:'Fri', value: 30 },{ label:'Sat', value: 14 },{ label:'Sun', value: 17 }
  ];

  const audiencePie = [
    { label: 'YouTube', value: 46, color:'#ff2fb9' },
    { label: 'Instagram', value: 32, color:'#a000ff' },
    { label: 'Twitter', value: 14, color:'#34d0ff' },
    { label: 'LinkedIn', value: 8, color:'#ff9f2f' }
  ];

  const kpis = [
    { label: 'Total Likes (Twitter)', value: analytics? analytics.totalLikes : '—', delta: '', tone:'up' },
    { label: 'Total Retweets', value: analytics? analytics.totalRetweets : '—', delta: '', tone:'up' },
    { label: 'Top Post Likes', value: analytics?.topPost ? analytics.topPost.like_count : '—', delta: '', tone:'up' },
    { label: 'Content Processed', value: analytics? (analytics.totalLikes+analytics.totalRetweets>0? 'Yes':'Pending') : '—', delta: '', tone:'up' },
  ];

  const recentPosts = [
    { id:1, title:'How to optimize video hooks', platform:'YouTube', reach: '34.8K', eng:'7.1%', trend:'+12%' },
    { id:2, title:'Behind the scenes reel', platform:'Instagram', reach:'18.2K', eng:'9.4%', trend:'+4%' },
    { id:3, title:'Thread: 5 growth hacks', platform:'Twitter', reach:'9.1K', eng:'5.2%', trend:'+2%' },
    { id:4, title:'Industry insight post', platform:'LinkedIn', reach:'6.7K', eng:'4.1%', trend:'+9%' },
  ];

  return (
    <div className="dashboard-page reveal" data-reveal="fade" data-reveal-once>
      <Navbar />
      {analyticsError && <div className="panel" style={{margin:'1rem',color:'var(--danger)'}}>Analytics Error: {analyticsError}</div>}
      {loadingAnalytics && <div className="panel" style={{margin:'1rem'}}>Loading analytics...</div>}
      <header className="dash-header reveal" data-reveal="down" data-reveal-once>
        <div className="dash-header-main">
          <h1 className="dash-title">Creator Analytics</h1>
          <p className="dash-sub">Welcome back <strong>{user?.displayName || user?.email?.split('@')[0]}</strong>, here is your unified performance snapshot.</p>
        </div>
        <div className="range-switch" role="group" aria-label="Time range">
          {['week','month','year'].map(r=> (
            <button key={r} className={r===range? 'active': ''} onClick={()=>setRange(r)}>{r}</button>
          ))}
        </div>
      </header>

      <section className="kpi-grid reveal" data-reveal="up" data-reveal-once>
        {kpis.map((k,i)=> (
          <div key={k.label} className="kpi-card reveal" data-reveal="up" data-reveal-delay={i*80} data-reveal-once>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className={`kpi-delta ${k.tone}`}>{k.delta}</div>
          </div>
        ))}
      </section>

      <div className="dash-main-grid reveal" data-reveal="fade" data-reveal-once>
        <div className="panel large reveal" data-reveal="up" data-reveal-delay="40" data-reveal-once>
          <div className="panel-head">
            <h3>Growth Overview</h3>
            <span className="mini-label">Followers over selected range</span>
          </div>
          <LineChart data={growthData} />
        </div>

        <div className="panel medium reveal" data-reveal="up" data-reveal-delay="120" data-reveal-once>
          <div className="panel-head"><h3>Weekly Activity</h3><span className="mini-label">Posts / uploads</span></div>
          <BarChart data={weeklyBars} colors={['#a000ff','#ff35d8','#34d0ff','#ff9f2f']} />
        </div>

        <div className="panel medium reveal" data-reveal="up" data-reveal-delay="200" data-reveal-once>
          <div className="panel-head"><h3>Audience Split</h3><span className="mini-label">By platform</span></div>
          <PieChart data={audiencePie} />
        </div>

        <div className="panel wide reveal" data-reveal="up" data-reveal-delay="280" data-reveal-once>
          <div className="panel-head"><h3>Recent Content Performance</h3></div>
          <table className="posts-table">
            <thead>
              <tr><th>Title</th><th>Platform</th><th>Reach</th><th>Engagement</th><th>Trend</th></tr>
            </thead>
            <tbody>
              {recentPosts.map(p=> (
                <tr key={p.id}>
                  <td className="title-cell">{p.title}</td>
                  <td><span className={`plat-badge ${p.platform.toLowerCase()}`}>{p.platform}</span></td>
                  <td>{p.reach}</td>
                  <td>{p.eng}</td>
                  <td><span className={p.trend.startsWith('+')? 'trend-up':'trend-down'}>{p.trend}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  <div className="panel compact reveal" data-reveal="up" data-reveal-delay="360" data-reveal-once>
          <div className="panel-head"><h3>Actionable Tips</h3></div>
          <ul className="tips-list">
            <li>Reels posted between 6-8pm gained 18% more engagement last week.</li>
            <li>Your LinkedIn posts with carousels outperform text-only by 34%.</li>
            <li>Consider a cross-post of top performing thread to LinkedIn.</li>
          </ul>
        </div>

  <div className="panel compact reveal" data-reveal="up" data-reveal-delay="420" data-reveal-once>
          <div className="panel-head"><h3>Platform Health</h3></div>
          <ul className="health-metrics">
            <li><span>YouTube Growth</span><strong className="metric good">+12%</strong></li>
            <li><span>Instagram Growth</span><strong className="metric good">+7%</strong></li>
            <li><span>Twitter Growth</span><strong className="metric neutral">+2%</strong></li>
            <li><span>LinkedIn Growth</span><strong className="metric good">+9%</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
