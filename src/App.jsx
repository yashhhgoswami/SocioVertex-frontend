import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import YouTubePage from './pages/YouTubePage';
import InstagramPage from './pages/InstagramPage';
import LinkedInPage from './pages/LinkedInPage';
import TwitterPage from './pages/TwitterPage';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { firebaseConfigMissing } from './lib/firebase.js';
import ProfilePage from './pages/ProfilePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LinkedSocialPage from './pages/LinkedSocialPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          {firebaseConfigMissing && (
            <div style={{background:'#7f1d1d',color:'#fff',padding:'8px 16px',textAlign:'center',fontSize:'14px',letterSpacing:'0.5px'}}>
              Firebase environment variables missing. Add them to your .env file and restart the dev server.
            </div>
          )}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/youtube" element={<YouTubePage />} />
            <Route path="/instagram" element={<InstagramPage />} />
            <Route path="/linkedin" element={<LinkedInPage />} />
            <Route path="/twitter" element={<TwitterPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/linked" element={<ProtectedRoute><LinkedSocialPage /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;