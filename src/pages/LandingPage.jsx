import React from 'react';
import './LandingPage.css';
import SocioVertexLogo from '../assets/logos/SocioVertex.svg';
import { FaCreditCard, FaChartLine, FaFileAlt, FaTools, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitch, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation Header */}
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
                <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> from <span className="em">United States</span></a>
                <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> from <span className="em">United Kingdom</span></a>
                <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> from <span className="em">Australia</span></a>
                <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> from <span className="em">Canada</span></a>
                <a href="#" className="mega-item" role="menuitem">Top <strong>250</strong> from <span className="em">Germany</span></a>
              </div>
              <div className="mega-col">
                <h4 className="mega-heading">YouTube Top Categories</h4>
                <a href="#" className="mega-item" role="menuitem">Autos & Vehicles</a>
                <a href="#" className="mega-item" role="menuitem">Comedy</a>
                <a href="#" className="mega-item" role="menuitem">Education</a>
                <a href="#" className="mega-item" role="menuitem">Entertainment</a>
                <a href="#" className="mega-item" role="menuitem">Film</a>
                <a href="#" className="mega-item" role="menuitem">Gaming</a>
                <a href="#" className="mega-item" role="menuitem">Science & Technology</a>
              </div>
            </div>
          </div>
          <div className="platform-group">
            <Link to="/instagram" className="platform-link has-mega">Instagram</Link>
            <div className="mega-menu" role="menu" aria-label="Instagram navigation">
              <div className="mega-col">
                <h4 className="mega-heading">Top Profiles</h4>
                <a href="#" className="mega-item">Top 50 Creators</a>
                <a href="#" className="mega-item">Top 100 Creators</a>
                <a href="#" className="mega-item">Top 500 Creators</a>
              </div>
              <div className="mega-col">
                <h4 className="mega-heading">Categories</h4>
                <a href="#" className="mega-item">Fashion</a>
                <a href="#" className="mega-item">Travel</a>
                <a href="#" className="mega-item">Sports</a>
                <a href="#" className="mega-item">Food</a>
              </div>
              <div className="mega-col">
                <h4 className="mega-heading">Regions</h4>
                <a href="#" className="mega-item">United States</a>
                <a href="#" className="mega-item">India</a>
                <a href="#" className="mega-item">Brazil</a>
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
                <a href="#" className="mega-item">Top Media</a>
              </div>
              <div className="mega-col">
                <h4 className="mega-heading">Influencers</h4>
                <a href="#" className="mega-item">C-Level Leaders</a>
                <a href="#" className="mega-item">Marketing Voices</a>
                <a href="#" className="mega-item">Talent & HR</a>
              </div>
              <div className="mega-col">
                <h4 className="mega-heading">Metrics</h4>
                <a href="#" className="mega-item">Follower Growth</a>
                <a href="#" className="mega-item">Engagement Rate</a>
                <a href="#" className="mega-item">Post Reach</a>
              </div>
            </div>
          </div>
          <div className="platform-group">
            <Link to="/twitter" className="platform-link has-mega">Twitter</Link>
            <div className="mega-menu" role="menu" aria-label="Twitter navigation">
              <div className="mega-col">
                <h4 className="mega-heading">Top Accounts</h4>
                <a href="#" className="mega-item">Top 50 Overall</a>
                <a href="#" className="mega-item">Top 100 Overall</a>
                <a href="#" className="mega-item">Top 500 Overall</a>
              </div>
              <div className="mega-col">
                <h4 className="mega-heading">Topics</h4>
                <a href="#" className="mega-item">Tech</a>
                <a href="#" className="mega-item">Gaming</a>
                <a href="#" className="mega-item">Politics</a>
                <a href="#" className="mega-item">Sports</a>
              </div>
              <div className="mega-col">
                <h4 className="mega-heading">Live Insights</h4>
                <a href="#" className="mega-item">Trending Hashtags</a>
                <a href="#" className="mega-item">Viral Tweets</a>
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
            <button className="dropdown-btn">
              Products and Services ▼
            </button>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon"><FaCreditCard /></span>
                SocioVertex Membership
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon"><FaChartLine /></span>
                Creator Consulting
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon"><FaFileAlt /></span>
                Custom Reports
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon"><FaTools /></span>
                Business API
              </a>
            </div>
          </div>
          <a href="#" className="nav-link">Contact Us</a>
          <div className="auth-section">
            <button className="login-btn">Login</button>
            <span className="auth-divider">/</span>
            <button className="signup-btn">SignUp</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Unify Your 
            <span className="gradient-text"> Social Media</span> Analytics
          </h1>
          <p className="hero-description">
            Connect all your social platforms in one dashboard. Track performance, analyze trends, and grow your audience with powerful insights from Twitter, Instagram, LinkedIn, and YouTube.
          </p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Enter username or URL to analyze..." 
                className="search-input"
              />
              <button className="search-btn">Analyze</button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button className="btn-primary large">Get Started Free</button>
            <button className="btn-secondary large">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* Platform Icons */}
      <section className="platforms">
        <div className="platforms-content">
          <p className="platforms-label">Supported Platforms</p>
          <div className="platform-icons modern">
            <div className="platform-item icon-only"><FaXTwitter className="plat-ico tw" /><span>Twitter</span></div>
            <div className="platform-item icon-only"><FaInstagram className="plat-ico ig" /><span>Instagram</span></div>
            <div className="platform-item icon-only"><FaLinkedinIn className="plat-ico li" /><span>LinkedIn</span></div>
            <div className="platform-item icon-only"><FaYoutube className="plat-ico yt" /><span>YouTube</span></div>
            <div className="platform-item icon-only"><FaTwitch className="plat-ico twc" /><span>Twitch</span></div>
            <div className="platform-item icon-only"><FaFacebookF className="plat-ico fb" /><span>Facebook</span></div>
            <div className="platform-item icon-only"><FaTiktok className="plat-ico tk" /><span>TikTok</span></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-content">
          <h2 className="section-title">
            Everything You Need to <span className="gradient-text">Grow</span>
          </h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Unified Dashboard</h3>
              <p className="feature-description">View all your social media metrics in one place. Track followers, engagement, and performance across platforms.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Growth Analytics</h3>
              <p className="feature-description">Detailed insights into your audience growth, best performing content, and optimal posting times.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI Insights</h3>
              <p className="feature-description">Get AI-powered recommendations for content strategy, optimal posting schedules, and audience engagement.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Multi-Platform</h3>
              <p className="feature-description">Connect Twitter, Instagram, LinkedIn, and YouTube. More platforms coming soon.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3 className="feature-title">Automated Reports</h3>
              <p className="feature-description">Generate beautiful PDF reports and schedule them to be sent automatically to your email.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Real-time Updates</h3>
              <p className="feature-description">Get instant notifications when your content goes viral or when there are significant changes in engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="pricing-content">
          <h2 className="section-title">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3 className="plan-name">Free</h3>
              <p className="plan-price">$0<span className="price-period">/month</span></p>
              <ul className="plan-features">
                <li>✓ 2 social accounts</li>
                <li>✓ Basic analytics</li>
                <li>✓ Weekly reports</li>
                <li>✓ Email support</li>
              </ul>
              <button className="btn-secondary full-width">Get Started</button>
            </div>

            <div className="pricing-card popular">
              <div className="popular-badge">Most Popular</div>
              <h3 className="plan-name">Pro</h3>
              <p className="plan-price">$29<span className="price-period">/month</span></p>
              <ul className="plan-features">
                <li>✓ Unlimited accounts</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Daily reports</li>
                <li>✓ AI insights</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="btn-primary full-width">Start Free Trial</button>
            </div>
          </div>
        </div>
      </section>

  {/* Global Footer now rendered in App layout */}
    </div>
  );
};

export default LandingPage;