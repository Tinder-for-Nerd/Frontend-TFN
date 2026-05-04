# ProMatch Frontend

ProMatch is a light-mode-first networking experience for ambitious builders, founders, and professionals. This repository contains the Vite + React frontend that powers the public marketing pages, the student and pro dashboards, and the shared routing shell.

## Tech Stack

- Vite
- React 18
- React Router DOM
- CSS-based design system and page-specific styles

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the local dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## App Routes

- Public pages: `/`, `/features`, `/about`, `/contact`
- Student experience: `/student/home`, `/student/discover`, `/student/connections`, `/student/messages`, `/student/sessions`, `/student/events`, `/student/progress`
- Pro experience: `/pro/overview`, `/pro/discover`, `/pro/network`, `/pro/inbox`, `/pro/calendar`, `/pro/events`, `/pro/analytics`, `/pro/company`
- Shared routes and redirects: profile, settings, notifications, call sessions, and legacy URLs

## Project Structure

- `src/main.jsx` boots the app, imports global styles, and applies the `pm-light-theme` body class.
- `src/App.jsx` defines the router and legacy redirects.
- `src/modules/public`, `src/modules/student`, and `src/modules/pro` hold the main page experiences.
- `src/features/auth` contains the extracted auth flow and login form.
- `src/styles` contains the shared design-system styles and page-specific CSS.

## Notes

- Login, signup, and onboarding routes currently redirect to the student home page.
- The legacy `src/ProMatchDarkApp.jsx` file remains for extraction and refactor scripts.