import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SocioVertexLogo from '../assets/logos/SocioVertex.svg';
import { FaCreditCard, FaChartLine, FaFileAlt, FaTools } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const displayName = user?.displayName || (user?.email ? user.email.split('@')[0] : '');
  const initial = displayName ? displayName.charAt(0).toUpperCase() : 'U';
  const toggleMenu = () => setMenuOpen(o => !o);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => { closeMenu(); }, [location.pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e) => { if (!e.target.closest('.user-menu')) closeMenu(); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="platform-group">
          <Link to="/youtube" className="platform-link has-mega" aria-haspopup="true" aria-expanded="false">YouTube</Link>
          <div className="mega-menu" role="menu" aria-label="YouTube navigation">
            <div className="mega-col">
              <h4 className="mega-heading">YouTube Top Charts</h4>
              <a href="#" className="mega-item" role="menuitem">Top <strong>50</strong> Creators</a>
              <a href="#" className="mega-item" role="menuitem">Top <strong>100</strong> Creators</a>
              <a href="#" className="mega-item" role="menuitem">Top <strong>500</strong> Creators</a>
              <a href="#" className="mega-item" role="menuitem">Top "<strong>Made for Kids</strong>" YouTube Creators</a>
            </div>
            <div className="mega-col">
              <h4 className="mega-heading">YouTube Popular Countries</h4>
              <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> US</a>
              <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> UK</a>
              <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> India</a>
              <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> Germany</a>
            </div>
            <div className="mega-col">
              <h4 className="mega-heading">YouTube Categories</h4>
              <a href="#" className="mega-item" role="menuitem">Education</a>
              <a href="#" className="mega-item" role="menuitem">Gaming</a>
              <a href="#" className="mega-item" role="menuitem">Tech</a>
              <a href="#" className="mega-item" role="menuitem">Entertainment</a>
            </div>
          </div>
        </div>
        <div className="platform-group">
          <Link to="/instagram" className="platform-link has-mega">Instagram</Link>
          <div className="mega-menu" role="menu" aria-label="Instagram navigation">
            <div className="mega-col">
              <h4 className="mega-heading">Top Profiles</h4>
              <a href="#" className="mega-item">Top 50</a>
              <a href="#" className="mega-item">Top 100</a>
              <a href="#" className="mega-item">Top 500</a>
            </div>
            <div className="mega-col">
              <h4 className="mega-heading">Categories</h4>
              <a href="#" className="mega-item">Fashion</a>
              <a href="#" className="mega-item">Sports</a>
              <a href="#" className="mega-item">Food</a>
            </div>
            <div className="mega-col">
              <h4 className="mega-heading">Regions</h4>
              <a href="#" className="mega-item">US</a>
              <a href="#" className="mega-item">India</a>
              <a href="#" className="mega-item">Europe</a>
            </div>
          </div>
        </div>
        <div className="platform-group">
          <Link to="/linkedin" className="platform-link has-mega">LinkedIn</Link>
          <div className="mega-menu" role="menu" aria-label="LinkedIn navigation">
            <div className="mega-col">
              <h4 className="mega-heading">Company Pages</h4>
              <a href="#" className="mega-item">Top Tech</a>
              <a href="#" className="mega-item">Top Finance</a>
            </div>
            <div className="mega-col">
              <h4 className="mega-heading">Influencers</h4>
              <a href="#" className="mega-item">Marketing</a>
              <a href="#" className="mega-item">HR</a>
            </div>
            <div className="mega-col">
              <h4 className="mega-heading">Metrics</h4>
              <a href="#" className="mega-item">Growth</a>
              <a href="#" className="mega-item">Engagement</a>
            </div>
          </div>
        </div>
        <div className="platform-group">
          <Link to="/twitter" className="platform-link has-mega">Twitter</Link>
          <div className="mega-menu" role="menu" aria-label="Twitter navigation">
            <div className="mega-col">
              <h4 className="mega-heading">Top Accounts</h4>
              <a href="#" className="mega-item">Top 50</a>
              <a href="#" className="mega-item">Top 100</a>
            </div>
            <div className="mega-col">
              <h4 className="mega-heading">Topics</h4>
              <a href="#" className="mega-item">Tech</a>
              <a href="#" className="mega-item">Gaming</a>
            </div>
            <div className="mega-col">
              <h4 className="mega-heading">Live</h4>
              <a href="#" className="mega-item">Trending</a>
              <a href="#" className="mega-item">Spaces</a>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-center">
        <img src={SocioVertexLogo} alt="SocioVertex Logo" className="logo-svg" />
      </div>

      <div className="nav-right">
        <div className="dropdown">
          <button className="dropdown-btn">Products and Services ▼</button>
          <div className="dropdown-menu">
            <a href="#" className="dropdown-item"><span className="dropdown-icon"><FaCreditCard /></span>Membership</a>
            <a href="#" className="dropdown-item"><span className="dropdown-icon"><FaChartLine /></span>Consulting</a>
            <a href="#" className="dropdown-item"><span className="dropdown-icon"><FaFileAlt /></span>Custom Reports</a>
            <a href="#" className="dropdown-item"><span className="dropdown-icon"><FaTools /></span>Business API</a>
          </div>
        </div>
        <a href="#" className="nav-link">Contact Us</a>
        {!user && (
          <div className="auth-section">
            <Link to="/auth?mode=login" className="login-btn" role="button">Login</Link>
            <span className="auth-divider">/</span>
            <Link to="/auth?mode=signup" className="signup-btn" role="button">SignUp</Link>
          </div>
        )}
        {user && (
          <div className={`user-menu ${menuOpen ? 'open' : ''}`}>
            <button className="user-trigger" onClick={toggleMenu} aria-haspopup="true" aria-expanded={menuOpen}>
              <span className="avatar" aria-hidden="true">{initial}</span>
              <span className="user-name">{displayName}</span>
              <span className="chevron" aria-hidden="true">▾</span>
            </button>
            <div className="user-dropdown" role="menu">
              <Link to="/profile" className="user-item" role="menuitem" onClick={closeMenu}>Your Profile</Link>
              <Link to="/dashboard" className="user-item" role="menuitem" onClick={closeMenu}>Dashboard</Link>
              <Link to="#" className="user-item" role="menuitem" onClick={closeMenu}>Linked Social Media</Link>
              <button className="user-item logout" role="menuitem" onClick={() => { logout(); closeMenu(); }}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
