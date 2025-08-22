import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import Navbar from '../components/Navbar.jsx';
import './AboutPage.css';
import founderImg from '../assets/meb.png';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube, FaFacebookF, FaTiktok } from 'react-icons/fa';

const storyBlocks = [
  {
    key:'origin',
    title:'Where It Started',
    text:`SocioVertex began as a weekend experiment to aggregate multi-platform creator metrics into one clean sheet. Rapidly, the prototype highlighted how fragmented analytics workflows were—multiple tabs, CSV exports, inconsistent terminology. We set out to unify them with a focus on clarity and speed.`,
    img:founderImg
  },
  {
    key:'why-now',
    title:'Why Now',
    text:`Short‑form velocity, algorithm volatility and brand deals demand faster signal loops. Point tools give slices; we deliver a living graph of audience momentum, content resonance and monetization leverage—continuously enriched by AI summarization.`,
    img:founderImg
  },
  {
    key:'vision',
    title:'The Vision',
    text:`A creator operations cockpit: link networks once, then get trusted anomaly alerts, predictive growth trajectories, creative angle suggestions and benchmark context—without surrendering data ownership.`,
    img:founderImg
  }
];

const team = [
  { name:'Yash Goswami', role:'Founder / Engineering', img:founderImg, socials:{ instagram:'#', twitter:'#', linkedin:'#', youtube:'#' } },
  { name:'Ava Sterling', role:'Product Strategy', socials:{ instagram:'#', twitter:'#', linkedin:'#' } },
  { name:'Liam Carter', role:'AI Systems', socials:{ twitter:'#', linkedin:'#' } },
  { name:'Noah Patel', role:'Data Pipelines', socials:{ twitter:'#', linkedin:'#' } },
  { name:'Sofia Reyes', role:'UX & Research', socials:{ instagram:'#', linkedin:'#' } },
  { name:'Ethan Brooks', role:'Growth & Success', socials:{ twitter:'#', linkedin:'#', instagram:'#' } }
];

const timeline = [
  { year:'2025', items:['Private alpha launches with unified mock dashboards','OAuth linking UX & AI prompt scaffolding released'] },
  { year:'2026', items:['Real provider ingestion cluster & normalization engine','Automated PDF / share links','Early partner API rollouts'] },
  { year:'Future', items:['Predictive revenue insights','Creative variant generation','Team workspaces & roles'] }
];

export default function AboutPage(){
  const [activeTab, setActiveTab] = useState('mission');
  useScrollReveal([activeTab]);
  return (
    <div className="about-page">
      <Navbar />
      <header className="about-hero reveal" data-reveal="fade" data-reveal-once>
        <h1>About <span className="grad">SocioVertex</span></h1>
        <p className="tag">Unified Creator & Social Media Intelligence Hub</p>
        <p className="lead">We unify multi‑network data and layer intelligence so creators & teams move from reactive spreadsheets to proactive growth decisions.</p>
  <div className="pill-tabs reveal" data-reveal="up" role="tablist">
          {['mission','vision','values'].map(t=> (
            <button key={t} role="tab" aria-selected={activeTab===t} className={activeTab===t? 'on':''} onClick={()=>setActiveTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
          ))}
        </div>
        <div className="tab-panel" role="tabpanel">
          {activeTab==='mission' && <p>Empower every creator & brand with enterprise‑grade analytics, automation & AI guidance—accessible, fast & privacy‑respectful.</p>}
          {activeTab==='vision' && <p>Become the always‑on operating system for growth: link once, get continuous intelligence, act confidently.</p>}
          {activeTab==='values' && <ul className="inline-values"><li>Clarity</li><li>Velocity</li><li>Trust</li><li>Craft</li><li>Integrity</li></ul>}
        </div>
      </header>
      <main className="about-main">
        <section className="story-section">
          {storyBlocks.map((b,i)=> (
            <div key={b.key} className={`story-row ${i%2? 'rev':''} reveal`} data-reveal={i%2? 'right':'left'} data-reveal-delay={i*120}> 
              <div className="story-media"><img src={b.img} alt={b.title} loading="lazy" /></div>
              <div className="story-body">
                <h2>{b.title}</h2>
                <p>{b.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="team-section reveal" data-reveal="fade" data-reveal-once>
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {team.map((m,i)=> (
              <div key={m.name} className="team-card reveal" data-reveal="up" data-reveal-delay={i*70} data-reveal-once>
                <div className="avatar-wrap">
                  {m.img ? <img src={m.img} alt={m.name} /> : <div className="avatar-fallback">{m.name.split(' ').map(p=>p[0]).slice(0,2).join('')}</div>}
                </div>
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
                <div className="social-line">
                  {m.socials.instagram && <a href={m.socials.instagram} aria-label="Instagram"><FaInstagram /></a>}
                  {m.socials.twitter && <a href={m.socials.twitter} aria-label="Twitter / X"><FaTwitter /></a>}
                  {m.socials.linkedin && <a href={m.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>}
                  {m.socials.youtube && <a href={m.socials.youtube} aria-label="YouTube"><FaYoutube /></a>}
                  {m.socials.facebook && <a href={m.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>}
                  {m.socials.tiktok && <a href={m.socials.tiktok} aria-label="TikTok"><FaTiktok /></a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="timeline-section reveal" data-reveal="fade" data-reveal-once>
          <h2 className="section-title">Journey</h2>
          <div className="timeline">
            {timeline.map((t,i)=> (
              <div key={t.year} className="time-block reveal" data-reveal="up" data-reveal-delay={i*120} data-reveal-once>
                <div className="time-year">{t.year}</div>
                <ul>{t.items.map(it=> <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-inline reveal" data-reveal="up" data-reveal-once>
          <h2>Get in Touch</h2>
            <p>Email <a href="mailto:support@sociovertex.io">support@sociovertex.io</a> or <a href="/contact">use the contact form</a>. Partnerships & media inquiries welcome.</p>
        </section>
      </main>
    </div>
  );
}
