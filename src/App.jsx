import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import YouTubePage from './pages/YouTubePage';
import InstagramPage from './pages/InstagramPage';
import LinkedInPage from './pages/LinkedInPage';
import TwitterPage from './pages/TwitterPage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/youtube" element={<YouTubePage />} />
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/linkedin" element={<LinkedInPage />} />
          <Route path="/twitter" element={<TwitterPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;