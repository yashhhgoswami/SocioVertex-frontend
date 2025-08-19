<div align="center">
	<img src="src/assets/logos/SocioVertex.svg" alt="SocioVertex Logo" width="160" />
	<h1>SocioVertex</h1>
	<p><strong>Unified Creator & Social Media Intelligence Hub</strong><br/>Multi‑platform analytics, AI insights, automated reporting & growth tooling.</p>
	<p>
		<a href="#getting-started">Getting Started</a> ·
		<a href="#features">Features</a> ·
		<a href="#roadmap">Roadmap</a> ·
		<a href="#contributing">Contributing</a>
	</p>
</div>

![Stack](https://img.shields.io/badge/React-19-61dafb?logo=react&style=flat) ![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&style=flat) ![Firebase Auth](https://img.shields.io/badge/Firebase-Auth-ffca28?logo=firebase&style=flat) ![License](https://img.shields.io/badge/License-MIT-green)

SocioVertex is a React + Vite frontend for a next‑gen social analytics platform. It consolidates metrics across YouTube, Instagram, LinkedIn, Twitter/X, Twitch (and more coming) into a single, extensible interface with a focus on performance, clarity, and rapid iteration.

---

## ✨ Features

- 🔐 Authentication (Email/Password, Google, GitHub) via Firebase
- 🧭 Protected routes (`/dashboard`, `/profile`, `/linked`) with a lightweight `ProtectedRoute` wrapper
- 🗂 Multi‑platform navigation mega menus (YouTube / Instagram / LinkedIn / Twitter)
- 📊 Dashboard & Profile scaffolding for future deep analytics
- 🤖 AI‑themed placeholders for upcoming intelligent recommendations
- 🔌 Linked Social Media management page (mock connection management, sync & token state visualization)
- 🎨 Modern UI: glassmorphism accents, gradients, animated stats, responsive component layout
- ♿ Accessibility considerations (aria labels, focus handling, semantic grouping)
- 🧩 Modular component structure for rapid expansion

---

## 📁 Project Structure

```
src/
	components/      Reusable UI (Navbar, Footer, ProtectedRoute)
	context/         Auth & Theme providers
	pages/           Route pages (Landing, Contact, Dashboard, LinkedSocialPage, etc.)
	lib/             Firebase initialization
	assets/          Static SVG/logo assets
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yashhhgoswami/SocioVertex-frontend.git
cd SocioVertex-frontend
npm install
```

### 2. Configure Environment

Create a `.env` (never commit secrets) in project root:

```
VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
# Optional
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

> The repo currently includes fallback demo values; override them for production.

### 3. Run Dev Server

```bash
npm run dev
```

Visit the printed local URL (default `http://localhost:5173` or next available port).

### 4. Lint

```bash
npm run lint
```

### 5. Production Build

```bash
npm run build
npm run preview
```

---

## 🔌 Linked Social Media Page
The `/linked` route (protected) demonstrates the UX for managing connected social accounts:

- Dynamic provider cards (YouTube, Instagram, LinkedIn, Twitter/X, Twitch)
- Mock connect / disconnect / sync actions with optimistic UI
- Token status states (Active / Expired placeholder)
- Aggregated follower & content metrics at top

This logic is currently in‑memory; you can later back it with real OAuth flows + API integration.

---

## 🧱 Key Components

| Component | Purpose |
|-----------|---------|
| `Navbar` | Global navigation + auth user menu |
| `ProtectedRoute` | Redirects unauthenticated users to `/auth` |
| `AuthContext` | Centralizes Firebase auth state & login helpers |
| `LinkedSocialPage` | Account linking management UI (mock) |
| `ContactPage` | Interactive contact form, FAQ, animated stats |

---

## 🛡 Security & Data

- Avoid committing real Firebase keys for production environments
- Use Firebase Rules & server middleware (future) to gate analytics APIs
- Add rate limiting & audit logs when backend is introduced

---

## 🗺 Roadmap

- [ ] Real OAuth flows for each provider
- [ ] Unified analytics dashboard with charts (engagement, retention, velocity)
- [ ] AI content recommendation engine (LLM-powered prompts)
- [ ] Exportable PDF / CSV multi‑platform reporting
- [ ] Team / workspace roles & permissions
- [ ] Usage quotas & billing integration
- [ ] Dark mode toggle (ThemeContext extension)
- [ ] Internationalization (i18n) scaffolding

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit changes: `git commit -m "feat: add awesome"`
4. Push: `git push origin feat/awesome`
5. Open a Pull Request

Coding style: follow existing component patterns, keep components focused, and prefer semantic HTML + accessible aria attributes.

---

## 🧪 Testing (Planned)
Lightweight unit tests & integration UI snapshots will be introduced alongside backend API wiring. Suggestions welcome.

---

## 📄 License

Licensed under the MIT License. (Add LICENSE file if not present.)

---

## 🙌 Acknowledgements

- React & Vite teams for a blazing DX
- Firebase for rapid auth setup
- Community iconography via `react-icons`

---

> Have feedback or feature ideas? Open an issue or reach out via the Contact page.

Enjoy building with SocioVertex! 🎉
