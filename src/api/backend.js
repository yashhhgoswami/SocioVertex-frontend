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

// YouTube API helpers
export async function searchYouTubeChannel(query) {
  const res = await fetch(`${BASE}/public/youtube/search?q=${encodeURIComponent(query)}`);
  if(!res.ok) throw new Error('Search failed');
  return res.json(); // { stats }
}

export async function fetchYouTubeSummary(channelId) {
  const res = await fetch(`${BASE}/public/youtube/channel/${channelId}/summary`);
  if(!res.ok) throw new Error('Summary failed');
  return res.json();
}

// Profile API (session-based backend)
export async function fetchBackendProfile() {
  const res = await fetch(BASE + '/me', { credentials: 'include' });
  return res.json();
}

export async function updateProfile(data) {
  const res = await fetch(BASE + '/api/profile', {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if(!res.ok) throw new Error('Profile update failed');
  return res.json();
}

export async function uploadAvatar(file) {
  const form = new FormData();
  form.append('avatar', file);
  const res = await fetch(BASE + '/api/profile/avatar', {
    method: 'POST',
    credentials: 'include',
    body: form
  });
  if(!res.ok) throw new Error('Avatar upload failed');
  return res.json();
}
