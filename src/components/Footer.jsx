import React from 'react';
import { FaYoutube, FaTwitter, FaInstagram, FaLinkedinIn, FaTwitch } from 'react-icons/fa';
import SocioVertexLogo from '../assets/logos/SocioVertex.svg';
import './Footer.css';

const year = new Date().getFullYear();

const social = [
  { icon: <FaYoutube />, label: 'YouTube', href: '#' },
  { icon: <FaTwitter />, label: 'Twitter', href: '#' },
  { icon: <FaInstagram />, label: 'Instagram', href: '#' },
  { icon: <FaLinkedinIn />, label: 'LinkedIn', href: '#' },
  { icon: <FaTwitch />, label: 'Twitch', href: '#' },
];

export default function Footer() {
  return (
    <footer className="sv-footer">
      <div className="sv-footer-inner">
        <div className="sv-footer-col brand">
          <div className="sv-brand-row">
            <img src={SocioVertexLogo} alt="SocioVertex Logo" className="sv-footer-logo" />
          </div>
          <p className="sv-copy">Copyright © 2023-{year} SocioVertex, Inc.</p>
          <div className="sv-social">
            {social.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} className="sv-social-link">{s.icon}</a>
            ))}
          </div>
          <button className="sv-support-btn">Contact Support</button>
        </div>

        <div className="sv-footer-col">
          <h4 className="sv-foot-heading">About</h4>
            <ul className="sv-foot-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Meet the Team</a></li>
              <li><a href="#">Press Inquiries</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
        <div className="sv-footer-col">
          <h4 className="sv-foot-heading">More SocioVertex</h4>
            <ul className="sv-foot-list">
              <li><a href="#">Product Blog</a></li>
              <li><a href="#">Business API</a></li>
              <li><a href="#">Creator EDU</a></li>
              <li><a href="#">Consulting</a></li>
              <li><a href="#">Earnings Calculator</a></li>
            </ul>
        </div>
        <div className="sv-footer-col">
          <h4 className="sv-foot-heading">Helpful Pages</h4>
            <ul className="sv-foot-list">
              <li><a href="#">Connect Your Social Media</a></li>
              <li><a href="#">Find Influencers</a></li>
              <li><a href="#">Remove Ads & Unlock</a></li>
              <li><a href="#">Join Our Community</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
        </div>
      </div>
    </footer>
  );
}
