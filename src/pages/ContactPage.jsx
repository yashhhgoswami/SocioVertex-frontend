import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar.jsx';
import './ContactPage.css';

// Simple utility for animated counters (pure CSS driven by len of items)
const initialForm = { name:'', email:'', subject:'', message:'', type:'general' };

// Accessible custom select styled to theme
function ThemedSelect({ label, name, value, onChange, options }) {
  const [open,setOpen] = useState(false);
  const btnRef = useRef(null);
  const listRef = useRef(null);
  useEffect(()=>{
    const onDoc = (e)=> { if(!e.target.closest?.('.themed-select')) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return ()=> document.removeEventListener('mousedown', onDoc);
  },[]);
  useEffect(()=>{
    if(open) {
      const active = listRef.current?.querySelector('[data-active="true"]');
      active?.scrollIntoView({block:'nearest'});
    }
  },[open]);
  const current = options.find(o=>o.value===value) || options[0];
  const setVal = (val)=> onChange({ target:{ name, value: val } });
  const onKey = (e)=>{
    if(e.key==='Enter' || e.key===' ') { e.preventDefault(); setOpen(o=>!o); }
    if(e.key==='Escape'){ setOpen(false); }
    if(!open && (e.key==='ArrowDown' || e.key==='ArrowUp')) { setOpen(true); return; }
    if(open && (e.key==='ArrowDown' || e.key==='ArrowUp')) {
      e.preventDefault();
      const idx = options.findIndex(o=>o.value===current.value);
      const next = e.key==='ArrowDown' ? Math.min(options.length-1, idx+1) : Math.max(0, idx-1);
      setVal(options[next].value);
    }
  };
  return (
    <div className="field full-sm themed-select" data-open={open}>
      <span>{label}</span>
      <button ref={btnRef} type="button" className="ts-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={()=>setOpen(o=>!o)} onKeyDown={onKey}>{current.label}<span className="chevron">▾</span></button>
      {open && (
        <ul className="ts-options" role="listbox" ref={listRef} tabIndex={-1} onKeyDown={onKey}>
          {options.map(o=> (
            <li key={o.value} role="option" aria-selected={o.value===current.value} data-active={o.value===current.value} onClick={()=>{ setVal(o.value); setOpen(false); }} className={o.value===current.value ? 'active': ''}>{o.label}</li>
          ))}
        </ul>
      )}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

export default function ContactPage(){
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state:'idle', msg:'' });
  const [messages, setMessages] = useState([]); // local showcase; later wire to backend

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const simulateSend = async () => {
    if(!form.name || !form.email || !form.message) {
      setStatus({ state:'error', msg:'Please fill required fields.' });
      return;
    }
    setStatus({ state:'sending', msg:'Sending...' });
    await new Promise(r=>setTimeout(r,900));
    const saved = { ...form, id:Date.now(), ts:new Date().toISOString() };
    setMessages(m=> [saved, ...m].slice(0,6));
    setForm(initialForm);
    setStatus({ state:'success', msg:'Message sent! Our team will reply shortly.' });
    setTimeout(()=> setStatus({ state:'idle', msg:'' }), 3200);
  };

  // Animated counters (hero stats)
  const counters = [
    { key:'reply', label:'Avg Reply Time', format:v=>`~${Math.round(v)}h`, target:2 },
    { key:'tickets', label:'Tickets Solved', format:v=>`${Math.round(v)}+`, target:1200 },
    { key:'satisfaction', label:'Satisfaction', format:v=>`${Math.round(v)}%`, target:98 },
  ];
  const [counts,setCounts] = useState(()=>Object.fromEntries(counters.map(c=>[c.key,0])));
  useEffect(()=>{
    let frame; const start=performance.now(); const dur=1400;
    const tick=(t)=>{ const p=Math.min(1,(t-start)/dur); const ease=p<.5 ? 4*p*p*p : 1 - Math.pow(-2*p+2,3)/2; setCounts(Object.fromEntries(counters.map(c=>[c.key, c.target*ease]))); if(p<1) frame=requestAnimationFrame(tick); };
    frame=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(frame);
  },[]);

  // Scroll animation reveal
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold:0.12 });
    document.querySelectorAll('.animate-on-scroll').forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  },[]);

  return (
    <div className="contact-page">
      <Navbar />
      <header className="contact-hero">
        <div className="hero-inner">
          <h1 className="hero-title">Let's Build <span className="gradient-text">Something</span> Great</h1>
          <p className="hero-lead">Have a question, partnership idea, media request or need a custom analytics solution? Reach out and our team will respond fast.</p>
          <div className="hero-stats glass-bar animate-on-scroll">
            {counters.map(c=> (
              <div key={c.key} className="hstat"><span className="num"><span className="pulse" /> <strong>{c.format(counts[c.key])}</strong></span><span className="lbl">{c.label.toUpperCase()}</span></div>
            ))}
          </div>
        </div>
        <div className="hero-bg-art" aria-hidden="true">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="mesh" />
        </div>
      </header>

      <main className="contact-main">
        <div className="form-panel glass animate-on-scroll">
          <div className="panel-head">
            <h2>Send Us a Message</h2>
            <p>We typically reply within a few hours during weekdays.</p>
          </div>
          <div className="form-grid">
            <label className="field"><span>Name *</span><input name="name" value={form.name} onChange={onChange} placeholder="Jane Creator" /></label>
            <label className="field"><span>Email *</span><input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" /></label>
            <ThemedSelect label="Topic" name="type" value={form.type} onChange={onChange} options={[
              { value:'general', label:'General' },
              { value:'support', label:'Support' },
              { value:'partnership', label:'Partnership' },
              { value:'media', label:'Media' },
              { value:'enterprise', label:'Enterprise' },
            ]} />
            <label className="field"><span>Subject</span><input name="subject" value={form.subject} onChange={onChange} placeholder="e.g. API access" /></label>
            <label className="field full"><span>Message *</span><textarea name="message" rows={5} value={form.message} onChange={onChange} placeholder="Describe how we can help..." />
            </label>
          </div>
          <div className="actions-row">
            <button disabled={status.state==='sending'} onClick={simulateSend} className="submit-btn">{status.state==='sending' ? 'Sending...' : 'Send Message'}</button>
            {status.msg && <span className={`status-msg ${status.state}`}>{status.msg}</span>}
          </div>
        </div>

        <aside className="contact-aside">
          <div className="info-card glass animate-on-scroll">
            <h3>Direct Channels</h3>
            <ul className="contact-list">
              <li><span>Email</span><a href="mailto:support@sociovertex.io">support@sociovertex.io</a></li>
              <li><span>Partnerships</span><a href="mailto:partners@sociovertex.io">partners@sociovertex.io</a></li>
              <li><span>Media</span><a href="mailto:press@sociovertex.io">press@sociovertex.io</a></li>
            </ul>
            <div className="divider" />
            <h4>Office (Remote-first)</h4>
            <p className="small">Operating across timezones (US / EU / India). Slack community invites issued on request.</p>
          </div>

          <div className="info-card glass alt animate-on-scroll">
            <h3>Recent Messages</h3>
            {messages.length === 0 && <p className="empty-note">(Your recent messages will appear here)</p>}
            <ul className="recent-list">
              {messages.map(m=> (
                <li key={m.id}>
                  <div className="r-top"><strong>{m.name}</strong><span>{new Date(m.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span></div>
                  <div className="r-subject">{m.subject || m.type}</div>
                  <div className="r-snippet">{m.message.slice(0,80)}{m.message.length>80 && '…'}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="info-card glass gradient-card animate-on-scroll">
            <h3>Why Reach Out?</h3>
            <ul className="bullets">
              <li>Request a custom cross-platform report</li>
              <li>Discuss enterprise analytics volume</li>
              <li>Co-marketing & launch collaborations</li>
              <li>Press & interview opportunities</li>
              <li>API usage & rate-limit extensions</li>
            </ul>
          </div>
        </aside>
      </main>

      {/* New highlight section to remove blank space and add dynamism */}
      <section className="support-highlights">
        <div className="sh-grid">
          {highlightData.map(h=> (
            <div key={h.title} className="sh-card animate-on-scroll">
              <div className="sh-icon" aria-hidden="true">{h.icon}</div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

  <section className="faq-section animate-on-scroll">
        <div className="faq-inner">
          <h2 className="faq-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="faq-grid">
            {faqData.map(item => <FAQItem key={item.q} item={item} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

const faqData = [
  { q:'How fast do you respond?', a:'Most inquiries get a first human response within 2 hours during business days. Complex data requests may take longer but we keep you updated.' },
  { q:'Can I get a custom metric added?', a:'Yes. Describe the metric and the platforms needed. Our product team reviews feasibility and typical turnaround is 3-7 days.' },
  { q:'Do you offer enterprise SLAs?', a:'We provide uptime and response SLAs for enterprise & API plans. Contact us with expected volume for a tailored quote.' },
  { q:'How do I link more than 10 accounts?', a:'Upgrade to Pro or Enterprise tiers; if you need higher limits we can extend after a quick usage review.' },
  { q:'Is my data secure?', a:'All platform tokens are stored encrypted. We never sell your data. You can revoke access at any time in your profile settings.' },
  { q:'Can I schedule a demo?', a:'Yes — send a message with subject "Demo" and preferred times. We support timezone-friendly slots.' },
];

function FAQItem({ item }) {
  const [open,setOpen] = useState(false);
  return (
    <div className={`faq-item ${open? 'open':''}`}>
      <button className="faq-q" onClick={()=>setOpen(o=>!o)} aria-expanded={open}>{item.q}<span className="chevron" aria-hidden>▾</span></button>
      <div className="faq-a" role="region" aria-hidden={!open}>{item.a}</div>
    </div>
  );
}

const highlightData = [
  { title:'Global Coverage', desc:'We monitor & process creator metrics across major platforms with region-aware latency optimization.', icon:'🌐' },
  { title:'Secure by Design', desc:'OAuth tokens are encrypted at rest & rotated. Granular revocation and audit logs coming soon.', icon:'🔐' },
  { title:'99.9% Uptime Goal', desc:'Redundant crawlers + queue smoothing keep your dashboards live & fresh.', icon:'⚡' },
  { title:'Human + AI Support', desc:'Blend of expert analysts & copilots accelerate responses & insights.', icon:'🤝' },
];
