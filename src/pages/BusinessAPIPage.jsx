import React from 'react';
import Navbar from '../components/Navbar.jsx';
import './BusinessAPIPage.css';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { FaLock, FaDownload, FaCogs, FaCloud, FaBolt, FaClipboardList, FaChartLine, FaPlug, FaShieldAlt, FaRocket } from 'react-icons/fa';

const features = [
  { key:'unified', ico:<FaCloud />, title:'Unified Metrics API', desc:'Single normalized feed for followers, impressions, reach, engagement and monetization metrics across platforms.' },
  { key:'stream', ico:<FaBolt />, title:'Real-time Webhooks', desc:'Low-latency event delivery for spikes, new posts, and threshold alerts so systems react instantly.' },
  { key:'auth', ico:<FaLock />, title:'Enterprise-Grade Auth', desc:'OAuth + short-lived tokens, granular scopes & audit logs suitable for multi-client deployments.' },
  { key:'transform', ico:<FaCogs />, title:'On-the-fly Transformations', desc:'Aggregation, cohorting, percentile ranks and simple ML enrichments returned server-side.' },
  { key:'integrations', ico:<FaPlug />, title:'SDKs & Connectors', desc:'Lightweight SDKs, ETL connectors and ready-made Power BI & Looker adapters.' },
  { key:'sla', ico:<FaShieldAlt />, title:'SLA & Compliance', desc:'99.9% availability tiers, GDPR controls, and enterprise support packages.' }
];

export default function BusinessAPIPage(){
  useScrollReveal([]);
  return (
    <div className="api-page">
      <Navbar />
      <header className="api-hero reveal" data-reveal="fade" data-reveal-once>
        <div className="hero-inner">
          <h1>SocioVertex <span className="grad">Business API</span></h1>
          <p className="lead">Build bespoke analytics, automate reporting and embed creator signals directly into your product with a secure, scalable API.</p>
          <div className="hero-ctas">
            <a href="#features" className="primary-cta">Explore Features</a>
            <a href="/contact" className="secondary-cta">Contact Sales</a>
          </div>
        </div>
        <div className="hero-bg" aria-hidden="true">
          <div className="grid-orb" />
          <div className="mesh" />
        </div>
      </header>

      <main className="api-main">
        <section id="features" className="features-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Designed for engineering teams</h2>
          <div className="features-grid">
            {features.map((f,i)=> (
              <article key={f.key} className="feature-card reveal" data-reveal="up" data-reveal-delay={i*80} data-reveal-once>
                <div className="feat-ico">{f.ico}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="usage-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Typical integrations</h2>
          <div className="usage-grid">
            <div className="usage-card reveal" data-reveal="up" data-reveal-delay="60">
              <h3>Embedded Analytics</h3>
              <p>Surface normalized creator KPIs inside partner dashboards, CRM records or content management tools.</p>
            </div>
            <div className="usage-card reveal" data-reveal="up" data-reveal-delay="120">
              <h3>Automated Reporting</h3>
              <p>Power scheduled exports and on-demand PDF generation with clean, attribution-safe datasets.</p>
            </div>
            <div className="usage-card reveal" data-reveal="up" data-reveal-delay="180">
              <h3>Programmatic Deals</h3>
              <p>Enable partners to query creator reach and performance for programmatic offers or sponsorship pipelines.</p>
            </div>
          </div>
        </section>

        <section className="dev-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Developer Experience</h2>
          <div className="dev-grid">
            <div className="dev-card reveal" data-reveal="up" data-reveal-delay={60}>
              <strong>Fast Start</strong>
              <p>Get a sandbox key and sample curl/JS snippets to have data flowing in under 10 minutes.</p>
            </div>
            <div className="dev-card reveal" data-reveal="up" data-reveal-delay={120}>
              <strong>Reliable SDKs</strong>
              <p>Official JS, Python and Go clients with typed responses and automatic retry/backoff policies.</p>
            </div>
            <div className="dev-card reveal" data-reveal="up" data-reveal-delay={180}>
              <strong>Query Playground</strong>
              <p>Interactive console for composing queries, previewing normalized outputs and downloading CSVs.</p>
            </div>
          </div>
        </section>

        <section className="scale-section">
          <h2 className="section-title reveal" data-reveal="fade" data-reveal-once>Security & Scale</h2>
          <div className="scale-grid">
            <div className="scale-card reveal" data-reveal="up" data-reveal-delay={60}><FaShieldAlt className="big-ico"/><h4>Securable Scopes</h4><p>Fine-grained permissioning, token revocation and IP allow-lists.</p></div>
            <div className="scale-card reveal" data-reveal="up" data-reveal-delay={120}><FaChartLine className="big-ico"/><h4>Predictable SLAs</h4><p>Tiered availability with SLA credits and on-call support for enterprise plans.</p></div>
            <div className="scale-card reveal" data-reveal="up" data-reveal-delay={180}><FaDownload className="big-ico"/><h4>Bulk Exports</h4><p>High-throughput export jobs for large historical pulls and rehydration of analytics warehouses.</p></div>
          </div>
        </section>

        <section className="pricing-cta reveal" data-reveal="fade" data-reveal-once>
          <h2>Want to embed SocioVertex data?</h2>
          <p>Contact our platform team to discuss authentication model, throughput needs and pricing for your use case.</p>
          <a href="/contact" className="primary-cta alt">Get Started with API</a>
        </section>
      </main>
    </div>
  );
}
