// Firebase client initialization.
// 1. Install firebase (already added to package.json)
// 2. Create a Firebase project at https://console.firebase.google.com
// 3. Enable Email/Password and (optionally) Google, GitHub providers in Authentication settings.
// 4. Copy your web app config and place values in environment variables or directly here (avoid committing secrets in production).

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// For learning convenience, we read from Vite env variables: import.meta.env.VITE_...
// Create a .env file in project root with these keys (values from Firebase console):
// VITE_FIREBASE_API_KEY=...
// VITE_FIREBASE_AUTH_DOMAIN=...
// VITE_FIREBASE_PROJECT_ID=...
// VITE_FIREBASE_STORAGE_BUCKET=...
// VITE_FIREBASE_MESSAGING_SENDER_ID=...
// VITE_FIREBASE_APP_ID=...
// (Optional) VITE_FIREBASE_MEASUREMENT_ID=...

// IMPORTANT: For security, do not rely on fallback literals in production. Provide values via .env.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Basic validation to help avoid a silent blank screen if env not configured.
const missing = Object.entries(firebaseConfig)
  .filter(([_,v]) => !v)
  .map(([k]) => k);
if(missing.length){
  // eslint-disable-next-line no-console
  console.error('[Firebase Config] Missing environment variables:', missing.join(', '));
  // Provide harmless placeholder so initializeApp does not crash (will block auth usage until fixed)
  // NOTE: Do NOT use this placeholder config in production.
}

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('Firebase init failed. Check env configuration.', e);
}
export const auth = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const firebaseConfigMissing = missing.length > 0;
