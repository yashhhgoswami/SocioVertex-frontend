const BASE = 'http://localhost:3000';

export async function fetchSession() {
  const res = await fetch(BASE + '/me', { credentials: 'include' });
  return res.json();
}

export async function fetchMyAnalytics() {
  const res = await fetch(BASE + '/api/v1/analytics/self', { credentials: 'include' });
  if (!res.ok) throw new Error('Failed analytics');
  return res.json();
}
