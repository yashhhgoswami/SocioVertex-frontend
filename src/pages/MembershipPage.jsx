import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import './MembershipPage.css';

const PLANS = {
  monthly: [
    { id:'free', name:'Starter', price:0, period:'/mo', tagline:'Get started & explore core insights', cta:'Get Started', popular:false, features:[
      'Link 2 social accounts',
      'Basic unified dashboard',
      '7‑day metrics history',
      'Weekly email summary',
      'Community support'
    ]},
    { id:'pro', name:'Pro', price:29, period:'/mo', tagline:'Serious growth & automation', cta:'Start 14‑day Trial', popular:true, features:[
      'Unlimited social accounts',
      '30‑day metrics history + export',
      'AI content suggestions',
      'Daily sync acceleration',
      'Custom PDF report builder',
      'Priority support (24h)' ]},
    { id:'scale', name:'Scale', price:79, period:'/mo', tagline:'Advanced intelligence & teams', cta:'Request Access', popular:false, features:[
      'Everything in Pro',
      '365‑day history & benchmarks',
      'Automated anomaly alerts',
      'Team workspaces & roles',
      'API & webhooks (fair use)',
      'Priority + chat support (4h)'
    ]}
  ],
  yearly: [
    { id:'free', name:'Starter', price:0, period:'/yr', tagline:'Always free core analytics', cta:'Get Started', popular:false, features:[
      'Link 2 social accounts',
      'Basic unified dashboard',
      '7‑day metrics history',
      'Weekly email summary',
      'Community support'
    ]},
    { id:'pro', name:'Pro', price:290, crossed:348, period:'/yr', save:'Save 17%', tagline:'Scale faster with automation', cta:'Upgrade Yearly', popular:true, features:[
      'Unlimited social accounts',
      '30‑day metrics history + export',
      'AI content suggestions',
      'Daily sync acceleration',
      'Custom PDF report builder',
      'Priority support (24h)'
    ]},
    { id:'scale', name:'Scale', price:790, crossed:948, period:'/yr', save:'Save 17%', tagline:'Full intelligence suite', cta:'Contact Sales', popular:false, features:[
      'Everything in Pro',
      '365‑day history & benchmarks',
      'Automated anomaly alerts',
      'Team workspaces & roles',
      'API & webhooks (fair use)',
      'Priority + chat support (4h)'
    ]}
  ]
};

export default function MembershipPage(){
  const [cycle,setCycle] = useState('monthly');
  const plans = PLANS[cycle];
  return (
    <div className="membership-page">
      <Navbar />
      <header className="mship-hero">
        <h1>SocioVertex <span className="grad">Membership</span></h1>
        <p className="lead">Choose the plan that matches your growth stage. Switch any time. Transparent pricing – powerful intelligence.</p>
        <div className="billing-toggle" role="tablist">
          <button className={cycle==='monthly'? 'on':''} onClick={()=>setCycle('monthly')} role="tab" aria-selected={cycle==='monthly'}>Monthly</button>
          <button className={cycle==='yearly'? 'on':''} onClick={()=>setCycle('yearly')} role="tab" aria-selected={cycle==='yearly'}>Yearly <span className="save-pill">Save</span></button>
        </div>
      </header>

      <main className="plans-wrapper">
        <div className="plans-grid">
          {plans.map(p=> (
            <div key={p.id} className={`plan-card ${p.popular? 'popular':''}`}> 
              {p.save && <div className="save-badge">{p.save}</div>}
              <h2>{p.name}</h2>
              <p className="tagline">{p.tagline}</p>
              <div className="price-row">
                {p.crossed && <span className="crossed">${p.crossed}</span>}
                <span className="price">{p.price===0? '$0': `$${p.price}`}</span><span className="period">{p.period}</span>
              </div>
              <ul className="features">
                {p.features.map(f=> <li key={f}>{f}</li>)}
              </ul>
              <button className="cta-btn">{p.cta}</button>
            </div>
          ))}
        </div>

        <section className="comparison">
          <h3>At a Glance</h3>
          <div className="compare-grid">
            <div className="cmp-row head"><span>Capability</span>{plans.map(p=> <span key={p.id}>{p.name}</span>)}</div>
            {['Accounts linked','History depth','AI suggestions','Automation & alerts','API Access','Support SLA'].map(cap=> (
              <div className="cmp-row" key={cap}><span className="cap">{cap}</span>{plans.map(p=> {
                let val='';
                switch(cap){
                  case 'Accounts linked': val = p.id==='free'? '2':'Unlimited'; break;
                  case 'History depth': val = p.id==='free'? '7d': p.id==='pro'? '30d':'365d'; break;
                  case 'AI suggestions': val = p.id==='free'? '—':'Yes'; break;
                  case 'Automation & alerts': val = p.id==='scale'? 'Advanced': p.id==='pro'? 'Basic':'—'; break;
                  case 'API Access': val = p.id==='scale'? 'Yes':'—'; break;
                  case 'Support SLA': val = p.id==='scale'? '4h': p.id==='pro'? '24h':'Community'; break;
                  default: break;
                }
                return <span key={p.id} className="val">{val}</span>;
              })}</div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
