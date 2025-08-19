import React, { useState, useEffect } from 'react';
import './LinkedSocialPage.css';
import { FaYoutube, FaInstagram, FaLinkedinIn, FaTwitter, FaTwitch, FaPlug, FaUnlink, FaSyncAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// Providers config
const PROVIDERS = [
	{ key:'youtube', label:'YouTube', icon: <FaYoutube />, color:'#f87171' },
	{ key:'instagram', label:'Instagram', icon: <FaInstagram />, color:'#f472b6' },
	{ key:'linkedin', label:'LinkedIn', icon: <FaLinkedinIn />, color:'#60a5fa' },
	{ key:'twitter', label:'Twitter / X', icon: <FaTwitter />, color:'#e5e7eb' },
	{ key:'twitch', label:'Twitch', icon: <FaTwitch />, color:'#a78bfa' },
];

// Initial mock linked data
const initialLinked = {
	youtube: { status:'ok', lastSync: Date.now() - 1000*60*5, followers: 120340, posts: 432 },
	instagram: { status:'expired', lastSync: Date.now() - 1000*60*60*25, followers: 9032, posts: 189 },
	linkedin: null,
	twitter: { status:'ok', lastSync: Date.now() - 1000*60*33, followers: 12049, posts: 210 },
	twitch: null,
};

export default function LinkedSocialPage(){
	useAuth(); // Ensure auth context hook triggers redirect via ProtectedRoute if not logged in
	const [accounts, setAccounts] = useState(initialLinked);
	const [busy, setBusy] = useState(null);
	const [, setTick] = useState(0);

	// Refresh relative time every minute
	useEffect(()=>{ const id=setInterval(()=>setTick(t=>t+1),60_000); return ()=>clearInterval(id); },[]);

	const relative = (ts)=>{
		const diff = Date.now() - ts;
		const mins = Math.floor(diff/60000);
		if(mins < 60) return mins+'m ago';
		const hrs = Math.floor(mins/60);
		if(hrs < 24) return hrs+'h ago';
		const days = Math.floor(hrs/24); return days+'d ago';
	};

	const connect = async (key)=>{ setBusy(key); await new Promise(r=>setTimeout(r,900)); setAccounts(a=>({...a,[key]:{ status:'ok', lastSync:Date.now(), followers:Math.floor(Math.random()*50_000)+1000, posts:Math.floor(Math.random()*800)+40 }})); setBusy(null); };
	const disconnect = async (key)=>{ setBusy(key); await new Promise(r=>setTimeout(r,600)); setAccounts(a=>({...a,[key]:null})); setBusy(null); };
	const resync = async (key)=>{ setBusy(key); await new Promise(r=>setTimeout(r,700)); setAccounts(a=>({...a,[key]:{ ...a[key], lastSync:Date.now() }})); setBusy(null); };

	const linkedCount = Object.values(accounts).filter(Boolean).length;
	const totalFollowers = Object.values(accounts).reduce((s,v)=>v? s+v.followers:s,0);
	const totalPosts = Object.values(accounts).reduce((s,v)=>v? s+v.posts:s,0);

	return (
		<div className="linked-page">
			<Navbar />
			<header className="linked-hero">
				<h1>Linked Social Media</h1>
				<p className="lead">Securely connect your social profiles to unify analytics, automate reporting and unlock AI optimization.</p>
				<div className="aggregate-cards">
					<div className="agg-card"><span className="agg-label">Accounts Linked</span><span className="agg-value">{linkedCount}</span></div>
					<div className="agg-card"><span className="agg-label">Total Followers</span><span className="agg-value">{totalFollowers.toLocaleString()}</span></div>
						<div className="agg-card"><span className="agg-label">Total Posts Tracked</span><span className="agg-value">{totalPosts.toLocaleString()}</span></div>
				</div>
			</header>
			<main className="linked-main">
				<section className="providers">
					<h2 className="section-heading">Manage Connections</h2>
					<div className="providers-grid">
						{PROVIDERS.map(p=>{
							const data = accounts[p.key];
							const status = data?.status;
							return (
								<div key={p.key} className={`provider-card ${data? 'linked':''} ${status==='expired'? 'expired':''}`}>
									<div className="pc-top">
										<div className="p-icon" style={{'--pcolor':p.color}}>{p.icon}</div>
										<h3>{p.label}</h3>
									</div>
									<div className="pc-meta">
										{data ? <>
											<div className="meta-row"><span>Followers</span><strong>{data.followers.toLocaleString()}</strong></div>
											<div className="meta-row"><span>Posts</span><strong>{data.posts.toLocaleString()}</strong></div>
											<div className="meta-row"><span>Last Sync</span><strong>{relative(data.lastSync)}</strong></div>
											{status==='expired' && <p className="expired-note"><FaExclamationTriangle /> Token expired</p>}
										</> : <p className="disconnected">Not linked</p>}
									</div>
									<div className="pc-actions">
										{!data && <button className="btn-mini primary" disabled={busy===p.key} onClick={()=>connect(p.key)}><FaPlug /> {busy===p.key?'Connecting...':'Connect'}</button>}
										{data && status==='ok' && <>
											<button className="btn-mini subtle" disabled={busy===p.key} onClick={()=>resync(p.key)}><FaSyncAlt /> {busy===p.key?'Syncing...':'Sync'}</button>
											<button className="btn-mini danger" disabled={busy===p.key} onClick={()=>disconnect(p.key)}><FaUnlink /> {busy===p.key?'Removing...':'Disconnect'}</button>
										</>}
										{data && status==='expired' && <button className="btn-mini warning" disabled={busy===p.key} onClick={()=>connect(p.key)}><FaPlug /> Reconnect</button>}
									</div>
									{data && status==='ok' && <div className="status-pill ok"><FaCheckCircle /> Active</div>}
									{status==='expired' && <div className="status-pill expired"><FaExclamationTriangle /> Expired</div>}
								</div>
							);
						})}
					</div>
				</section>
				<section className="how-it-works">
					<h2 className="section-heading">How It Works</h2>
					<ol className="steps">
						<li><strong>OAuth Secure</strong> – Authorize via official platform screens.</li>
						<li><strong>Encrypted Token Vault</strong> – Tokens stored & rotated.</li>
						<li><strong>Scheduled Harvest</strong> – Smart fetch intervals by growth velocity.</li>
						<li><strong>Unified Metrics</strong> – Normalized for cross-platform comparison.</li>
						<li><strong>AI Assist</strong> – Strategy adapts as performance shifts.</li>
					</ol>
				</section>
				<section className="next-suggestions">
					<h2 className="section-heading">Next Suggestions</h2>
					<div className="suggest-box">
						{PROVIDERS.filter(p=>!accounts[p.key]).length===0 && <p>All available platforms linked. Coverage maxed!</p>}
						{PROVIDERS.filter(p=>!accounts[p.key]).slice(0,2).map(p=> (
							<div key={p.key} className="suggest-item">
								<div className="s-icon" style={{'--pcolor':p.color}}>{p.icon}</div>
								<div className="s-body">
									<h4>Connect {p.label}</h4>
									<p>Unlock follower & engagement tracking plus AI optimization for {p.label} content.</p>
									<button className="btn-mini primary" disabled={busy===p.key} onClick={()=>connect(p.key)}><FaPlug /> {busy===p.key?'Connecting...':'Connect'}</button>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
