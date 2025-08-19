import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import './ContactPage.css';

// Simple utility for animated counters (pure CSS driven by len of items)
const initialForm = { name:'', email:'', subject:'', message:'', type:'general' };

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

  return (
    <div className="contact-page">
      <Navbar />
      <header className="contact-hero">
        <div className="hero-inner">
          <h1 className="hero-title">Let's Build <span className="gradient-text">Something</span> Great</h1>
          <p className="hero-lead">Have a question, partnership idea, media request or need a custom analytics solution? Reach out and our team will respond fast.</p>
          <div className="hero-stats">
            <div className="hstat"><span className="num"><span className="pulse" /> <strong>~2h</strong></span><span className="lbl">Avg Reply Time</span></div>
            <div className="hstat"><span className="num"><strong>1.2K+</strong></span><span className="lbl">Tickets Solved</span></div>
            <div className="hstat"><span className="num"><strong>98%</strong></span><span className="lbl">Satisfaction</span></div>
          </div>
        </div>
        <div className="hero-bg-art" aria-hidden="true">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="mesh" />
        </div>
      </header>

      <main className="contact-main">
        <div className="form-panel glass">
          <div className="panel-head">
            <h2>Send Us a Message</h2>
            <p>We typically reply within a few hours during weekdays.</p>
          </div>
          <div className="form-grid">
            <label className="field"><span>Name *</span><input name="name" value={form.name} onChange={onChange} placeholder="Jane Creator" /></label>
            <label className="field"><span>Email *</span><input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" /></label>
            <label className="field select"><span>Topic</span>
              <select name="type" value={form.type} onChange={onChange}>
                <option value="general">General</option>
                <option value="support">Support</option>
                <option value="partnership">Partnership</option>
                <option value="media">Media</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </label>
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
          <div className="info-card glass">
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

          <div className="info-card glass alt">
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

          <div className="info-card glass gradient-card">
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

      <section className="faq-section">
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
