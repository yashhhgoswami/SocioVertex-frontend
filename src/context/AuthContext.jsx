import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, googleProvider, githubProvider } from '../lib/firebase.js';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, fbUser => {
      setUser(fbUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = useCallback(async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    return cred.user;
  }, []);

  const oauthLogin = useCallback(async (provider) => {
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  }, []);

  const loginWithGoogle = useCallback(() => oauthLogin(googleProvider), [oauthLogin]);
  const loginWithGitHub = useCallback(() => oauthLogin(githubProvider), [oauthLogin]);

  const logout = useCallback(() => signOut(auth), []);

  const value = { user, loading, login, signup, logout, loginWithGoogle, loginWithGitHub, isAuthenticated: !!user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
