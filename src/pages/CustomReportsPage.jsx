import React from 'react';
import Navbar from '../components/Navbar.jsx';
import './CustomReportsPage.css';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { FaChartPie, FaBullseye, FaUsersCog, FaFileSignature, FaSearchDollar, FaGlobe, FaLayerGroup, FaChartBar, FaClipboardCheck, FaCubes, FaArrowRight, FaShieldAlt, FaClock } from 'react-icons/fa';

// Structured descriptors (content intentionally crafted – can be iterated later)
const reportTypes = [
  { key:'exec', icon:<FaClipboardCheck />, title:'Executive Performance Brief', desc:'Concise 6–8 page narrative summarizing cross‑platform growth, engagement deltas & strategic focus items.' },
  { key:'comp', icon:<FaBullseye />, title:'Competitor & Category Benchmark', desc:'Side‑by‑side KPI normalization, share‑of‑voice trends, posting cadence, hook archetypes & retention gaps.' },
  { key:'cohort', icon:<FaUsersCog />, title:'Audience Cohort & Retention', desc:'Lifecycle segmentation, watch / view curves, follow conversion funnels & churn risk signals.' },
  { key:'forecast', icon:<FaSearchDollar />, title:'Revenue & Reach Forecast', desc:'Scenario modeling for ad, partner & product revenue given content velocity & historical conversion efficiency.' },
  { key:'format', icon:<FaLayerGroup />, title:'Content Format Diagnostic', desc:'Frame‑by‑frame structural breakdown: hook strength, pacing, topic clustering & creative fatigue indicators.' },
  { key:'risk', icon:<FaShieldAlt />, title:'Brand & Risk Pulse', desc:'Sentiment drift, category adjacency shifts, safety flag monitoring & reputational risk early warnings.' }
];

const modules = [
  'Unified KPI Normalization', 'Retention Curve Modeling', 'Hook & Topic Clustering', 'Optimal Post Timing Heatmaps',
  'Competitor Share‑of‑Voice', 'Virality Spike Root Cause', 'Audience Geo / Device Mix', 'Monetization Scenario Trees',
  'Engagement Quality Scoring', 'Creative Fatigue Detection', 'Cross‑Network Funnel Attribution', 'Anomaly Alert Archive'
];

export default function CustomReportsPage(){
  useScrollReveal([]);
  return (
    <div className="reports-page">
      <Navbar />
      <header className="reports-hero reveal" data-reveal="fade" data-reveal-once>
        <div className="hero-inner">
          <h1>Bespoke <span className="grad">Custom Reports</span></h1>
          <p className="lead">Action‑dense, design‑polished intelligence packs synthesizing what matters – not dashboards you still have to analyze.</p>
          <ul className="hero-tags">
            <li className="reveal" data-reveal="up" data-reveal-delay="80" data-reveal-once>Normalized Cross‑Platform KPIs</li>
            <li className="reveal" data-reveal="up" data-reveal-delay="140" data-reveal-once>Strategic Insight Narratives</li>
            <li className="reveal" data-reveal="up" data-reveal-delay="200" data-reveal-once>Designed for Stakeholder Share‑out</li>
          </ul>
          <a href="#types" className="primary-cta">Explore Report Types <FaArrowRight /></a>
        </div>
        <div className="hero-bg" aria-hidden="true">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="mesh" />
        </div>
      </header>

      <main className="reports-main">
        <section id="types" className="types-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Report Types</h2>
          <div className="types-grid">
            {reportTypes.map((r,i)=> (
              <div key={r.key} className="type-card reveal" data-reveal="up" data-reveal-delay={i*90} data-reveal-once>
                <div className="type-ico">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="modules-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Analysis Modules</h2>
          <div className="modules-cluster">
            {modules.map((m,i)=>(
              <span key={m} className="module-chip reveal" data-reveal="up" data-reveal-delay={i*40} data-reveal-once>{m}</span>
            ))}
          </div>
        </section>

        <section className="flow-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Delivery Flow</h2>
          <ol className="flow-steps">
            {[{
              t:'Scoping Call', d:'Clarify core objectives, time horizon, stakeholders & existing data touchpoints.' , ico:<FaFileSignature />
            },{
              t:'Data Ingest', d:'Secure token handoff, environment audit & metric normalization layer established.' , ico:<FaGlobe />
            },{
              t:'Deep Analysis', d:'Module selection applied – anomalies flagged, narratives drafted, visuals composed.' , ico:<FaChartPie />
            },{
              t:'Review & Iterate', d:'Collaborative refinement pass ensuring alignment & actionable clarity.' , ico:<FaUsersCog />
            },{
              t:'Final Delivery', d:'Polished PDF + layered slide deck + optional raw data appendix.' , ico:<FaCubes />
            },{
              t:'30‑Day Support', d:'Async clarifications, metric follow‑ups & mini re‑runs on new spikes.' , ico:<FaClock />
            }].map((s,i)=>(
              <li key={s.t} className="reveal" data-reveal="up" data-reveal-delay={i*70} data-reveal-once>
                <div className="step-ico">{s.ico}</div>
                <div className="step-body">
                  <strong>{i+1}. {s.t}</strong>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="value-section">
            <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Why Custom vs Self‑Serve?</h2>
            <div className="value-grid">
              {[{
                title:'Signal Extraction', desc:'We compress noise into 6–10 crisp decisions so teams move now – not after another sync.'
              },{
                title:'Narrative Design', desc:'Strategic copy & infographics shaped for immediate stakeholder distribution.'
              },{
                title:'Analyst Acceleration', desc:'Skip weeks of manual pulling, cleaning & chart formatting – focus on acting.'
              },{
                title:'System Memory', desc:'Each cycle enriches benchmarks & anomaly libraries, compounding future speed.'
              }].map((v,i)=>(
                <div key={v.title} className="value-card reveal" data-reveal="up" data-reveal-delay={i*110} data-reveal-once>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
        </section>

        <section className="cta-section reveal" data-reveal="fade" data-reveal-once>
          <h2>Need Decision‑Ready Intelligence?</h2>
          <p>Describe your objective & timeframe – we will scope modules and send a proposal within 48 hours.</p>
          <a href="/contact" className="primary-cta alt">Request Custom Report</a>
        </section>
      </main>
    </div>
  );
}
