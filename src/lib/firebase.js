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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBgcRq7hQc-8eh9T_1i7bqYuup-ACyaaAg',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'sociovertex-ce0f0.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'sociovertex-ce0f0',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'sociovertex-ce0f0.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '759934968221',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:759934968221:web:22ad6ce001b2da51e40f74',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-QRDRSF31MF',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
