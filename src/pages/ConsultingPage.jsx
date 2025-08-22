import React from 'react';
import Navbar from '../components/Navbar.jsx';
import './ConsultingPage.css';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { FaRocket, FaUsers, FaLightbulb, FaCogs, FaChartLine, FaLock, FaArrowRight } from 'react-icons/fa';

const engagements = [
  { key:'audit', icon:<FaLightbulb />, title:'Growth & Strategy Audit', desc:'Deep-dive diagnostic of your multi‑platform presence: audience quality, content mix, timing, retention & monetization levers.' },
  { key:'playbook', icon:<FaRocket />, title:'Custom Growth Playbook', desc:'Prioritized 90‑day action plan with channel hypotheses, experimentation roadmap & KPI model.' },
  { key:'ops', icon:<FaCogs />, title:'Analytics Ops Setup', desc:'Implement unified tracking, dashboards, attribution tagging, automated reports & anomaly alerts.' },
  { key:'team', icon:<FaUsers />, title:'Team Enablement', desc:'Workshops & async training: analytics literacy, experiment design, AI assisted ideation & workflow acceleration.' },
  { key:'opt', icon:<FaChartLine />, title:'Ongoing Optimization', desc:'Retained iteration cycles: content diagnostics, benchmark drift analysis, topic & hook testing, retention uplift.' },
  { key:'privacy', icon:<FaLock />, title:'Data & Privacy Review', desc:'Token security, permission scoping, data minimization & compliance posture recommendations.' }
];

export default function ConsultingPage(){
  useScrollReveal([]);
  return (
    <div className="consulting-page">
      <Navbar />
      <header className="consult-hero reveal" data-reveal="fade" data-reveal-once>
        <div className="hero-inner">
          <h1>Creator & Brand <span className="grad">Consulting</span></h1>
          <p className="lead">Expert analytics + experimentation frameworks to compound your cross‑platform growth faster & safer.</p>
          <ul className="hero-points">
            <li className="reveal" data-reveal="up" data-reveal-delay="60" data-reveal-once>Multi‑network performance diagnostics</li>
            <li className="reveal" data-reveal="up" data-reveal-delay="120" data-reveal-once>AI assisted content & timing strategy</li>
            <li className="reveal" data-reveal="up" data-reveal-delay="180" data-reveal-once>Operational dashboards & alerting</li>
          </ul>
          <a href="#engagements" className="primary-cta">Explore Engagements <FaArrowRight /></a>
        </div>
        <div className="hero-bg" aria-hidden="true">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="mesh" />
        </div>
      </header>

      <main className="consult-main">
        <section id="engagements" className="engagements-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Engagement Models</h2>
          <div className="eng-grid">
            {engagements.map((e,i)=> (
              <div key={e.key} className="eng-card reveal" data-reveal="up" data-reveal-delay={i*90} data-reveal-once>
                <div className="eng-ico" aria-hidden>{e.icon}</div>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="process-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Our Process</h2>
          <ol className="process-steps">
            {['Discover','Instrument','Analyze','Experiment','Optimize','Scale'].map((step,i)=> (
              <li key={step} className="reveal" data-reveal="up" data-reveal-delay={i*80} data-reveal-once>
                <span className="step-num">{i+1}</span>
                <div className="step-body">
                  <strong>{step}</strong>
                  <p>{
                    step==='Discover'? 'Sync objectives, constraints & audience realities.' :
                    step==='Instrument'? 'Unify data sources, normalize metrics, configure dashboards.' :
                    step==='Analyze'? 'Surface baselines, anomalies & leverage points.' :
                    step==='Experiment'? 'Design rapid tests: hooks, formats, timing, CTA variations.' :
                    step==='Optimize'? 'Double down on validated drivers, prune drag, refine pacing.' :
                    'Embed playbooks, handoff knowledge & monitor strategic drift.'
                  }</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="why-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Why SocioVertex Consulting?</h2>
          <div className="why-grid">
            {[{
              title:'Unified Lens', desc:'Eliminate siloed platform views. Decisions anchored in normalized, comparable metrics.'
            },{
              title:'Faster Loops', desc:'Reduce idea → insight cycle time with automated data flows & AI summarization.'
            },{
              title:'Compounding System', desc:'Process over hacks: repeatable experimentation & durable growth engines.'
            },{
              title:'Privacy First', desc:'Minimal access scopes, revocable tokens, encryption best practices.'
            }].map((b,i)=>(
              <div key={b.title} className="why-card reveal" data-reveal="up" data-reveal-delay={i*100} data-reveal-once>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section reveal" data-reveal="fade" data-reveal-once>
          <h2>Ready to Accelerate?</h2>
          <p>Tell us your current growth ceiling and we will outline a tailored engagement within 48 hours.</p>
          <a href="/contact" className="primary-cta alt">Request Consultation</a>
        </section>
      </main>
    </div>
  );
}
