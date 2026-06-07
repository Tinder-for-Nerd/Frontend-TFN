# ProMatch — Complete Frontend Build Manual
### Full implementation guide for this repository (Vite + React + CSS)

> **Source spec:** [`ProMatch_Login_Frontend_Spec.md`](./ProMatch_Login_Frontend_Spec.md)  
> **Stack:** Vite 5 · React 18 · React Router 6 · CSS design system (no Tailwind, no Next.js)  
> **Repo:** `Frontend-TFN`

This document is the **complete instruction set** for building and extending the ProMatch website using the **current codebase format**. Every section from the login spec is translated into real file paths, components, CSS classes, and copy-paste patterns you can follow today.

---

## 1. Overview & Context

ProMatch is a professional co-founder matching platform ("Tinder × LinkedIn"). The frontend serves three user types with different dashboards:

| Role | Who they are | Login accent (spec) | Dashboard destination (this repo) |
|---|---|---|---|
| **Student** | College students, graduates, hackathon builders | Coral `#FF4B6E` (spec) → `--primary` `#0084FF` (repo) | `/student/home` |
| **Professional** | Founders, engineers, advisors | Blue `#0A66C2` (spec) → `--primary` (repo) | `/pro/overview` |
| **Organization** | GDGs, incubators, clubs (spec) | Gold `#F5A623` | `/org/dashboard` — **not built yet** |

### What is implemented today

| Area | Status | Entry files |
|---|---|---|
| Public marketing | ✅ Done | `LandingPage`, `FeaturesPage`, `AboutPage`, `ContactPage` |
| Auth (login/signup) | ✅ Done (unified page) | `LoginPage.jsx` at `/login` and `/signup` |
| Student workspace | ✅ Done | `src/modules/student/` |
| Pro workspace | ✅ Done | `src/modules/pro/` |
| Shared dashboard | ✅ Done | `src/modules/dashboard/` |
| Discover (Reels) | ✅ Done | `DiscoverPage.jsx` |
| Onboarding | ✅ Done | `OnboardingPage.jsx` |
| Org portal | ❌ Spec only | Future work |

### Spec → repo translation

| Original spec | This repository |
|---|---|
| Next.js App Router | `src/App.jsx` + React Router |
| `tailwind.config.ts` tokens | `src/styles/tinderfornerds-dark.css` CSS variables |
| `middleware.ts` | `ProtectedRoute` + `AuthContext` |
| Zustand | `AuthContext` (`localStorage`: `pm_user`) |
| Framer Motion | CSS transitions + keyframes |
| React Hook Form + Zod | Manual form state in `LoginPage.jsx` |
| 3 separate login URLs | Single page + Student/Pro role toggle |

---

## 2. Design System (Shared Across All Pages)

### 2.1 Color tokens

**File:** `src/styles/tinderfornerds-dark.css`  
**Applied in:** `src/main.jsx` → `document.body.classList.add('pm-light-theme')`

```css
/* Core palette — use these variables, never hard-code hex in components */
:root {
  --primary:           #0084FF;   /* CTAs, active nav, links */
  --primary-container: #319AFF;   /* Gradient buttons */
  --on-primary:        #FFFFFF;
  --secondary-fixed:   #111A3E;   /* Brand navy, headings */
  --on-surface:        #111A3E;   /* Body text on light surfaces */
  --on-surface-variant:#44475E;   /* Muted text */
  --surface:           #FFFFFF;   /* Cards */
  --surface-container-low: rgba(255, 255, 255, 0.45); /* Glass layers */
  --tertiary:          #FF801E;   /* Accent orange (ratings) */
  --success:           #15803d;
  --warning:           #b45309;
  --error:             #BA1A1A;
  --primary-rgb:       0, 132, 255;
}
```

**Role accent mapping (when building spec-accurate login portals):**

| Role | Spec color | Add to `:root` as |
|---|---|---|
| Student | `#FF4B6E` coral | `--accent-student: #FF4B6E` |
| Professional | `#0A66C2` | `--accent-pro: #0A66C2` |
| Organization | `#F5A623` gold | `--accent-org: #F5A623` |

Apply per page: `.pm-login-page--student { --primary: var(--accent-student); }`

### 2.2 Typography

**Loaded in:** `tinderfornerds-dark.css` via Google Fonts

| Token | Font | Usage |
|---|---|---|
| `--font-display` | Fustat 700/800 | Logo, page titles, hero headlines |
| `--font-body` | Inter 400–700 | Body copy, forms, nav links |
| `--font-mono` | JetBrains Mono | Code, IDs |

**Spec fonts (if migrating login to match spec exactly):**

| Spec | Replace with (current) |
|---|---|
| Bricolage Grotesque | Fustat |
| Plus Jakarta Sans | Inter |

**Type scale (use these CSS variables):**

```css
--text-display-lg: clamp(2.5rem, 5vw, 3.5rem);
--text-h1:         clamp(2rem, 4vw, 2.75rem);
--text-base:       1rem;
--text-sm:         0.875rem;
--text-xs:         0.75rem;
```

### 2.3 Spacing & radius

```css
--space-xs:  4px;
--space-sm:  8px;
--space-md:  16px;
--space-lg:  24px;
--space-xl:  32px;
--space-2xl: 48px;

--radius-sm:   0.25rem;  /* Inputs */
--radius-md:   0.75rem;  /* Buttons */
--radius-lg:   1rem;
--radius-xl:   1.5rem;   /* Cards (.pm-card) */
--radius-full: 9999px;

--shadow-glass:   0 8px 32px rgba(0, 0, 0, 0.04);
--shadow-ambient: 0 12px 24px rgba(17, 26, 62, 0.06);
--ease-spring:    cubic-bezier(0.16, 1, 0.3, 1);
--dur-normal:     240ms;
```

### 2.4 Shared components — file map

Build and use components from these locations:

| Component | File | Used on |
|---|---|---|
| `<Button>` | `src/components/ui/Button.jsx` | All pages — CTAs, toolbars |
| `<Avatar>` | `src/components/ui/Avatar.jsx` | Nav, feeds, profile cards |
| `<Badge>` | `src/components/ui/Badge.jsx` | Status pills, skill tags |
| `<Icon>` | `src/components/ui/Icon.jsx` | Inside buttons, search inputs |
| `<Chip>` | `src/components/ui/Chip.jsx` | Filters, removable tags |
| `<GridDistortion>` | `src/components/ui/GridDistortion.jsx` | Landing + AppShell backgrounds |
| `<RootLayout>` | `src/components/layout/RootLayout.jsx` | Wraps all routes |
| `<SiteNav>` | `src/components/layout/SiteNav.jsx` | Global top navigation |
| `<AppShell>` | `src/components/layout/AppShell.jsx` | All dashboard pages |
| `<ProtectedRoute>` | `src/components/common/ProtectedRoute.jsx` | Auth-gated routes |
| `<SectionHeader>` | `src/components/common/SectionHeader.jsx` | List/grid section titles |
| `<EmptyState>` | `src/components/common/EmptyState.jsx` | Empty lists |
| `<MiniProfileCard>` | `src/components/common/MiniProfileCard.jsx` | Connections, suggestions |
| `<StatCard>` | `src/components/common/StatCard.jsx` | Pro overview KPIs |
| `<CommandPalette>` | `src/components/common/CommandPalette.jsx` | ⌘K search (in AppShell) |

**Spec components to extract when splitting login (future):**

| Spec component | Create at | Current location |
|---|---|---|
| `<Input>` | `src/components/ui/Input.jsx` | Inline in `LoginPage.jsx` |
| `<OAuthButton>` | `src/components/ui/OAuthButton.jsx` | Inline OAuth buttons in `LoginPage.jsx` |
| `<RoleCard>` | `src/components/ui/RoleCard.jsx` | `.pm-role-btn` toggle in `LoginPage.jsx` |
| `<PasswordToggle>` | Part of `<Input type="password">` | `.pm-login-form__eye` |
| `<FormError>` | `src/components/ui/FormError.jsx` | `.pm-login-form__error` |
| `<Divider>` | `src/components/ui/Divider.jsx` | `.pm-login-form__divider` |
| `<Logo>` | `src/components/common/Brand.jsx` | `SiteNav` + `.pm-login-logo` |

### 2.5 Global CSS import order

**File:** `src/main.jsx` — always follow this order:

```javascript
import './styles/tinderfornerds-dark.css';  // 1. Design system
import './styles/login.css';                // 2. Page-specific
import './styles/landing.css';
import './styles/discover.css';
import './styles/profile.css';
// ... other page CSS
import './styles/site-nav.css';             // 3. Layout last
import './styles/site-layout.css';

document.body.classList.add('pm-light-theme');
```

**Rule:** New page = new CSS file in `src/styles/` + import in `main.jsx`.

---

## 3. Page Architecture & Routing

### 3.1 File structure (this repo)

```
src/
├── main.jsx                    # Boot + CSS imports
├── App.jsx                     # All routes
├── context/
│   └── AuthContext.jsx         # Auth state (pm_user)
├── config/
│   └── navigation.js           # Navbar links + workspace
├── hooks/
│   └── usePageMeta.js          # document.title + meta
├── components/
│   ├── layout/                 # RootLayout, SiteNav, AppShell
│   ├── ui/                     # Button, Avatar, Icon…
│   └── common/                 # ProtectedRoute, SectionHeader…
├── modules/
│   ├── public/pages/           # Landing, Features, About, Contact
│   ├── auth/pages/             # Login, Logout
│   ├── onboarding/pages/       # Onboarding wizard
│   ├── student/pages/          # Student-only pages
│   ├── pro/pages/              # Pro-only pages
│   └── dashboard/pages/        # Shared dashboard pages
├── styles/                     # One CSS file per feature
└── data/mockData.js            # Mock profiles, connections, events
```

### 3.2 Navigation flow

```
/  (Landing)
├── /login, /signup             → role toggle → dashboard
├── /features, /about, /contact
│
├── Student (protected)
│   ├── /student/home           ← default after student login
│   ├── /student/discover
│   ├── /student/messages
│   ├── /student/connections
│   ├── /student/events
│   └── /student/settings
│
├── Pro (protected)
│   ├── /pro/overview           ← default after pro login
│   ├── /pro/discover
│   ├── /pro/inbox
│   ├── /pro/analytics
│   └── /pro/settings
│
├── Shared (protected)
│   ├── /profile/:username
│   ├── /notifications
│   ├── /onboarding
│   └── /call/:sessionId
│
└── /preview/discover           ← public Discover preview
```

**Post-login redirect logic** (`LoginPage.jsx`):

```javascript
const defaultRedirect = role === 'pro' ? '/pro/overview' : '/student/home';
navigate(location.state?.from?.pathname || defaultRedirect, { replace: true });
```

**First-login / onboarding (spec target):**

```javascript
// When API returns firstLogin: true
navigate(`/onboarding/step-1?role=${role}`, { replace: true });
```

### 3.3 Route guard (equivalent to spec middleware)

**File:** `src/components/common/ProtectedRoute.jsx`

```jsx
// In App.jsx — wrap protected routes:
const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

<Route path="/student/home" element={<P><StudentHomePage /></P>} />
```

Behavior:

| Condition | Result |
|---|---|
| `loading === true` | Show spinner |
| Not authenticated | Redirect to `/login` with `state.from` |
| Authenticated | Render children |

**SiteNav hidden on:** `/onboarding/*`, `/call/*` (see `RootLayout.jsx` + `navigation.js`).

### 3.4 Page render tree

Every page follows one of two patterns:

**Pattern A — Public / auth (no AppShell):**

```
AuthProvider
  └─ BrowserRouter
       └─ RootLayout
            ├─ SiteNav
            └─ Outlet → Page (LandingPage, LoginPage…)
```

**Pattern B — Dashboard (with AppShell):**

```
RootLayout
  ├─ SiteNav (center links + profile avatar + bell icon)
  └─ Outlet
       └─ AppShell (glass art + orb + optional header)
            └─ Page content
```

---

## 4. Global Navigation (`SiteNav`)

**Files:** `src/components/layout/SiteNav.jsx`, `src/config/navigation.js`, `src/styles/site-nav.css`

### 4.1 Anatomy

```
┌──────────────────────────────────────────────────────────────────┐
│  ProMatch   Home  Discover  Messages  …  Settings    🔔  👤  ☰  │
└──────────────────────────────────────────────────────────────────┘
     brand          center nav links (variant-specific)   actions
```

### 4.2 Nav variants

| State | Center links source | Right actions |
|---|---|---|
| Public (logged out) | `getPublicNavLinks()` | **Get Started** → `/signup` |
| Student (logged in) | `getStudentNavLinks()` | **Bell** → `/notifications`, **Avatar** → `/profile/me` |
| Pro (logged in) | `getProNavLinks()` | Same icons |

**Important:** Navbar workspace is locked to `user.role` in `resolveWorkspace(user)` — it does **not** change when visiting `/profile/me` or other shared routes.

### 4.3 Adding a nav link

Edit `src/config/navigation.js`:

```javascript
export function getStudentNavLinks() {
  return [
    { label: 'Home', href: '/student/home' },
    { label: 'Your Page', href: '/student/your-page', activePrefix: '/student/your-page' },
    // activePrefix optional — highlights parent routes
  ];
}
```

No change needed in `SiteNav.jsx` unless adding a new icon type.

---

## 5. Login & Signup Pages

**Files:** `src/modules/auth/pages/LoginPage.jsx`, `src/styles/login.css`  
**Routes:** `/login` (mode=`login`), `/signup` (mode=`signup`)

### 5.1 Current layout (split screen)

```
┌─────────────────────────────────────────────────────────────────┐
│  LEFT (.pm-login-card)          │  RIGHT (.pm-login-showcase)     │
│                                 │                                 │
│  Logo → home                    │  Feature highlights           │
│  Title + subtitle               │  Social proof stats             │
│  [Student | Professional]     │  Animated visual                │
│  OAuth: Google, GitHub          │                                 │
│  ─── or continue with email ─── │                                 │
│  Email input                    │                                 │
│  Password + show/hide           │                                 │
│  Remember me (login only)       │                                 │
│  [Submit button]                │                                 │
│  Toggle login ↔ signup          │                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Role selection (spec §4 RoleCard equivalent)

Current implementation uses a toggle, not separate routes:

```jsx
<div className="pm-login-form__role-toggle">
  <button type="button" className={`pm-role-btn ${role === 'student' ? 'is-active' : ''}`}
    onClick={() => setRole('student')}>Student</button>
  <button type="button" className={`pm-role-btn ${role === 'pro' ? 'is-active' : ''}`}
    onClick={() => setRole('pro')}>Professional</button>
</div>
```

Role is passed to auth on submit:

```javascript
login({ email, name: name || email, role }); // role: 'student' | 'pro'
```

### 5.3 Form fields — CSS classes to use

| Element | Class | Notes |
|---|---|---|
| Form wrapper | `.pm-login-form` | `noValidate` on form |
| Field group | `.pm-login-form__group` | Add `.has-error` when invalid |
| Label | `.pm-login-form__label` | Always use `<label htmlFor>` |
| Input | `.pm-login-form__input` | Add `.is-invalid` on error |
| Field error | `.pm-login-form__field-error` | `id` for `aria-describedby` |
| Banner error | `.pm-login-form__error` | `role="alert"` |
| Submit | `.pm-login-form__button` | Shows spinner when `loading` |
| Password eye | `.pm-login-form__eye` | `aria-label` Show/Hide password |
| OAuth | `.pm-login-form__oauth-btn` | Google / GitHub |

### 5.4 Validation (current — manual)

```javascript
const emailError = touched.email && email && !isValidEmail(email)
  ? 'Enter a valid email address' : '';
const passwordError = touched.password && password.length > 0 && password.length < 6
  ? 'At least 6 characters' : '';
const canSubmit = email && password && (isSignup ? name : true) && !emailError && !passwordError;
```

**Spec target (Zod):** create `src/lib/schemas/auth.js` and swap validation when adding API.

### 5.5 OAuth buttons (current)

```jsx
<button type="button" className="pm-login-form__oauth-btn pm-login-form__oauth-btn--google">
  <GoogleLogo /> Continue with Google
</button>
```

**Spec:** Professional page lists LinkedIn first — reorder buttons when role === 'pro'.

### 5.6 Building spec-accurate 3-portal login (future phases)

| Step | Action |
|---|---|
| 1 | Create `src/modules/auth/pages/RoleSelectorPage.jsx` at `/login` |
| 2 | Create `StudentLoginPage`, `ProLoginPage`, `OrgLoginPage` |
| 3 | Extract `RoleCard`, `OAuthButton`, `Input` to `src/components/ui/` |
| 4 | Add CSS modifiers: `.pm-login-page--student`, `--pro`, `--org` |
| 5 | Add routes in `App.jsx` under `RootLayout` |
| 6 | Keep `AuthContext.login({ role })` unchanged |

---

## 6. Student Workspace Pages

**Default landing:** `/student/home`  
**AppShell variant:** `variant="student"`

### 6.1 Page inventory

| Page | File | CSS | Key components |
|---|---|---|---|
| Home feed | `student/pages/StudentHomePage.jsx` | `student-feed.css` | AppShell, Button, Avatar, Badge, feed composer |
| Discover | `dashboard/pages/DiscoverPage.jsx` | `discover.css` | AppShell (hideTopbar), reel scroll |
| Connections | `dashboard/pages/ConnectionsPage.jsx` | design system | AppShell, `.pm-tabs`, MiniProfileCard |
| Messages | `dashboard/pages/MessagesPage.jsx` | `messages.css` | AppShell, thread list + chat |
| Events | `dashboard/pages/EventsPage.jsx` | design system | AppShell, event cards |
| Profile | `dashboard/pages/ProfilePage.jsx` | `profile.css` | AppShell, `.pm-gh-profile` |
| Settings | `dashboard/pages/SettingsPage.jsx` | `settings.css` | AppShell, form sections |
| Notifications | `dashboard/pages/NotificationsPage.jsx` | `notifications.css` | AppShell, notification list |
| Sessions | `dashboard/pages/SessionsPage.jsx` | design system | AppShell, booking list |
| Progress | `student/pages/StudentProgressPage.jsx` | design system | AppShell, stat cards |
| Billing | `student/pages/StudentBillingPage.jsx` | design system | AppShell, plan cards |

### 6.2 Standard student page template

```jsx
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon, Avatar } from '../../../components/ui';
import { SectionHeader, EmptyState } from '../../../components/common';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { useAuth } from '../../../context/AuthContext';

export function YourStudentPage() {
  usePageMeta('Page Title | ProMatch', 'SEO description here.');

  return (
    <AppShell
      variant="student"
      title="Page Title"
      subtitle="One-line description of this page."
      actions={
        <Button variant="primary" icon="spark" to="/student/discover">
          Discover more
        </Button>
      }
    >
      <div className="your-page">
        <SectionHeader
          title="Section name"
          description="What the user sees in this section."
        />
        {/* content */}
      </div>
    </AppShell>
  );
}
```

### 6.3 Student Home feed structure

```
AppShell
  └─ .pm-student-feed (student-feed.css)
       ├─ Composer (avatar + textarea + post button)
       ├─ Search / filter bar
       └─ Post cards (.pm-feed-post)
            ├─ Author Avatar + name
            ├─ Content + attachments
            └─ Like / comment actions
```

**Data:** `src/constants/profiles.js` for authors; local `useState` for posts (mock).

---

## 7. Professional Workspace Pages

**Default landing:** `/pro/overview`  
**AppShell variant:** `variant="pro"`

### 7.1 Page inventory

| Page | File | Key components |
|---|---|---|
| Overview | `pro/pages/ProOverviewPage.jsx` | StatCard, match queue, pipeline |
| Discover | `dashboard/pages/DiscoverPage.jsx` | Same reels, `variant="pro"` |
| Inbox | `pro/pages/ProInboxPage.jsx` | Messages-style thread UI |
| Network | `pro/pages/NetworkPage.jsx` | Connection grid |
| Calendar | `pro/pages/ProCalendarPage.jsx` | Calendar grid |
| Analytics | `pro/pages/ProAnalyticsPage.jsx` | Charts, StatCard |
| Company | `pro/pages/ProCompanyPage.jsx` | Company profile form |
| Settings | `dashboard/pages/SettingsPage.jsx` | `variant="pro"` |

### 7.2 Pro page template

Same as student template — change `variant="pro"` and use pro routes in buttons/links.

---

## 8. Discover Page (Instagram Reels)

**File:** `src/modules/dashboard/pages/DiscoverPage.jsx`  
**CSS:** `src/styles/discover.css`  
**Routes:** `/student/discover`, `/pro/discover`, `/preview/discover`

### 8.1 Layout

```
SiteNav (fixed top)
  └─ AppShell (hideTopbar, transparent background)
       └─ .discover
            └─ .discover__reels (vertical scroll-snap)
                 └─ .reel (one profile per viewport)
                      ├─ .reel__image (full bleed photo)
                      ├─ .reel__vignette (gradient overlay)
                      └─ .reel__content
                           ├─ .reel__info (name, bio, tags, skill score)
                           └─ .reel__actions (Connect, Profile, Share, Save)
            ├─ .progress-dots (right edge)
            └─ .discover__scroll-hint
```

### 8.2 Components used

| UI piece | Implementation |
|---|---|
| Connect button | `ReelAction` + Lucide `UserPlus` / `Check` |
| Profile link | `ReelAction` + `Link` to `/profile/:username` or `/pro/profile/:username` |
| Save | Local `useState` Set of saved IDs |
| Scroll index | `scroll` listener on `.discover__reels` |

### 8.3 Data source

```javascript
import { studentDiscoverProfiles, proDiscoverProfiles } from '../../../data/mockData';
const profilesSource = variant === 'pro' ? proDiscoverProfiles : studentDiscoverProfiles;
```

### 8.4 Key CSS

```css
.discover__reels {
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
}
.reel {
  height: 100%;
  min-height: 100%;
  scroll-snap-align: start;
}
.pm-app-shell--discover-page .pm-main {
  height: calc(100dvh - var(--site-header-h));
  padding: 0;
}
```

---

## 9. Public Marketing Pages

### 9.1 Landing page

**File:** `src/modules/public/pages/LandingPage.jsx`  
**CSS:** `src/styles/landing.css`

```
RootLayout + SiteNav
  └─ .taskly-page
       ├─ GridDistortion (.taskly-background-art)
       ├─ Hero (.taskly-hero) + orb video (.taskly-orb)
       ├─ Community stats (.taskly-partners)
       ├─ Features (.taskly-feature-band)
       └─ Pricing CTA (.taskly-pricing-band)
```

**Components:** `Link`, Lucide icons, `GridDistortion`. No AppShell.

### 9.2 Other public pages

| Page | File | CSS |
|---|---|---|
| Features | `FeaturesPage.jsx` | `features.css` |
| About | `AboutPage.jsx` | `about.css` |
| Contact | `ContactPage.jsx` | `contact.css` |

### 9.3 New public page checklist

1. Create `src/modules/public/pages/YourPage.jsx`
2. Create `src/styles/your-page.css`
3. Export from `src/modules/public/pages/index.js`
4. Add route in `App.jsx` inside `<Route element={<RootLayout />}>`
5. Import CSS in `main.jsx`
6. Call `usePageMeta('Title | ProMatch', 'description')`

---

## 10. AppShell (Dashboard Wrapper)

**File:** `src/components/layout/AppShell.jsx`

### 10.1 What it provides

| Feature | Class / behavior |
|---|---|
| Glass grid background | `.pm-shell-art` + `GridDistortion` |
| Orb video | `.pm-shell-orb` |
| Skip link | `.pm-skip-link` → `#main` |
| Page header | `.pm-page-header` (title, subtitle, actions) |
| Main content | `#main.pm-main` |
| Command palette | ⌘K / Ctrl+K |
| Loading skeleton | `loading={true}` prop |

### 10.2 Props reference

```jsx
<AppShell
  variant="student"           // 'student' | 'pro' — affects shell class
  title="Connections"         // optional
  subtitle="Manage network"   // optional
  hideTopbar={false}          // true for full-bleed (Discover)
  actions={<Button />}        // top-right slot
  className="custom-modifier"
  loading={false}
>
  {children}
</AppShell>
```

---

## 11. Auth & State Management

### 11.1 AuthContext

**File:** `src/context/AuthContext.jsx`

```javascript
// Stored in localStorage as pm_user:
{ name, email, role: 'student' | 'pro', loggedInAt }

// API:
const { user, isAuthenticated, loading, login, logout } = useAuth();

login({ email, name, role: 'pro' });
logout(); // clears pm_user + pm_workspace
```

### 11.2 Workspace persistence

**File:** `src/config/navigation.js`

```javascript
// Navbar uses user.role — NOT the URL path
export function resolveWorkspace(user) {
  if (user?.role === 'pro' || user?.role === 'student') return user.role;
  return sessionStorage.getItem('pm_workspace') || 'student';
}
```

### 11.3 Spec equivalent (Zustand) — if migrating

Keep `AuthContext` unless the team standardizes on Zustand. The spec's `useAuthStore` maps 1:1 to `useAuth()`.

---

## 12. Form Logic & API Integration

### 12.1 Current login submit

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!canSubmit) { setError('Please fill in all fields correctly'); return; }
  setLoading(true);
  try {
    // Replace mock delay with real API:
    // const res = await fetch('/api/v1/auth/login', { method: 'POST', body: JSON.stringify({ email, password, role }) });
    await new Promise((r) => setTimeout(r, 1200));
    login({ email, name: name || email, role });
    navigate(role === 'pro' ? '/pro/overview' : '/student/home', { replace: true });
  } catch (err) {
    setError(err.message || 'Invalid credentials. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

### 12.2 OAuth (spec §8.3)

```javascript
// When backend is ready:
window.location.href = `/api/v1/auth/oauth/${provider}?role=${role}`;
```

### 12.3 Input error states

```jsx
<div className={`pm-login-form__group ${emailError ? 'has-error' : ''}`}>
  <label htmlFor="email" className="pm-login-form__label">Email</label>
  <input
    id="email"
    aria-invalid={!!emailError}
    aria-describedby={emailError ? 'email-error' : undefined}
    className={`pm-login-form__input ${emailError ? 'is-invalid' : ''}`}
  />
  {emailError && <span id="email-error" className="pm-login-form__field-error">{emailError}</span>}
</div>
```

---

## 13. Animations & Micro-interactions

This repo uses **CSS only** (no Framer Motion).

### 13.1 Button loading

```jsx
<button type="submit" className="pm-login-form__button" disabled={loading}>
  {loading ? (<><SpinnerIcon /> Signing in…</>) : buttonText}
</button>
```

### 13.2 Password toggle

Already in `LoginPage.jsx` — `.pm-login-form__eye` with `EyeIcon` / `EyeOffIcon`.

### 13.3 Hover / focus (global)

```css
.pm-button--primary:hover { transform: translateY(-1px); }
.site-header__link:focus-visible { outline: 2px solid var(--primary); }
```

### 13.4 Discover scroll hint

```css
@keyframes hint-float {
  0%, 100% { opacity: 0.45; transform: translateX(-50%) translateY(0); }
  50%       { opacity: 0.9;  transform: translateX(-50%) translateY(-4px); }
}
```

### 13.5 Spec animations → CSS equivalents

| Spec (Framer Motion) | CSS approach |
|---|---|
| Staggered card entrance | `@keyframes fadeUp` + `animation-delay` on children |
| Card stack float | `@keyframes float` on `.pm-login-showcase__card` |
| Form shake on error | `@keyframes shake` on `.pm-login-card.is-error` |
| Reduced motion | `@media (prefers-reduced-motion: reduce) { animation: none; }` |

---

## 14. Responsive Behavior

### 14.1 Breakpoints (informal — no Tailwind)

| Breakpoint | Behavior |
|---|---|
| `< 768px` | Single column; mobile nav hamburger; Discover full width |
| `768px–1024px` | Dashboard grids collapse to 1–2 columns |
| `> 1024px` | Split login screen; Discover centered column max 480px |
| `> 1200px` | SiteNav max-width 1200px; AppShell content max 1440px |

### 14.2 SiteNav mobile

**File:** `src/styles/site-nav.css`

- `@media (max-width: 900px)` — nav links collapse into dropdown
- Profile + bell icons stay visible in header bar
- Hamburger toggles `.site-header__nav.is-open`

### 14.3 Login mobile

**File:** `src/styles/login.css`

- Right showcase panel hidden below `768px`
- Form card goes full width with reduced padding

---

## 15. Accessibility (WCAG 2.1 AA)

| Requirement | Implementation in this repo |
|---|---|
| Labels on inputs | `<label htmlFor="email">` on LoginPage |
| Error announcements | `role="alert"` on `.pm-login-form__error` |
| Password toggle | `aria-label="Show password"` / `"Hide password"` |
| OAuth buttons | Descriptive button text: "Continue with Google" |
| Icon-only nav | `aria-label="Notifications"`, `aria-label="Your profile"` |
| Skip link | AppShell `.pm-skip-link` → `#main` |
| Focus order | Logo → nav links → actions → menu |
| Keyboard | Enter submits login form; Escape closes command palette |
| Reduced motion | Add `@media (prefers-reduced-motion: reduce)` when adding animations |

---

## 16. Error Handling & Edge Cases

| Scenario | Current behavior | File |
|---|---|---|
| Wrong password | Inline banner: "Invalid credentials…" | `LoginPage.jsx` |
| Empty fields | "Please fill in all fields correctly" | `LoginPage.jsx` |
| Invalid email format | Field-level `.pm-login-form__field-error` | `LoginPage.jsx` |
| Not authenticated | Redirect to `/login` with return path | `ProtectedRoute.jsx` |
| Already logged in | Redirect away from `/login` | `LoginPage.jsx` useEffect |
| Navbar wrong on profile | Fixed — workspace from `user.role` | `navigation.js` |
| OAuth failure | Not wired — show toast when API exists | Future |
| Network error | Not wired — show toast when API exists | Future |
| First login | Redirect to `/onboarding` when API flag exists | Future |

---

## 17. Data Layer

### 17.1 Mock data files

| File | Contents |
|---|---|
| `src/data/mockData.js` | Profiles, discover cards, connections, events, command palette |
| `src/constants/profiles.js` | Feed author profiles |
| `src/constants/data.js` | Legacy nav constants |

### 17.2 Using mock data in a page

```javascript
import { studentConnections, profiles } from '../../../data/mockData';

const [items, setItems] = useState(() => studentConnections.connected);
```

### 17.3 Replacing with API (pattern)

```javascript
useEffect(() => {
  let cancelled = false;
  fetch('/api/v1/connections')
    .then((r) => r.json())
    .then((data) => { if (!cancelled) setItems(data); });
  return () => { cancelled = true; };
}, []);
```

Keep the same JSX structure — only swap the data source.

---

## 18. Complete Build Order

### Phase 1 — Foundation
- [ ] `npm install && npm run dev`
- [ ] Verify `main.jsx` imports `tinderfornerds-dark.css` + `pm-light-theme`
- [ ] Confirm `Button`, `Avatar`, `Icon` render correctly
- [ ] Wire `AuthProvider` in `App.jsx`
- [ ] Create `ProtectedRoute` wrapper `P`

### Phase 2 — Global shell
- [ ] `RootLayout` + `SiteNav` + `navigation.js`
- [ ] `site-nav.css` + `site-layout.css`
- [ ] `AppShell` with GridDistortion + orb
- [ ] Test public / student / pro nav variants

### Phase 3 — Public site
- [ ] `LandingPage` — hero, orb, features, CTA
- [ ] `FeaturesPage`, `AboutPage`, `ContactPage`
- [ ] Page CSS files + `main.jsx` imports

### Phase 4 — Auth
- [ ] `LoginPage` — role toggle, OAuth, email/password
- [ ] `AuthContext.login({ role })`
- [ ] Redirect: student → `/student/home`, pro → `/pro/overview`
- [ ] *(Optional)* Split into 3 spec login portals

### Phase 5 — Student workspace
- [ ] `StudentHomePage` — feed
- [ ] `DiscoverPage` — reels
- [ ] `ConnectionsPage`, `MessagesPage`, `EventsPage`
- [ ] `ProfilePage`, `SettingsPage`, `NotificationsPage`

### Phase 6 — Pro workspace
- [ ] `ProOverviewPage`
- [ ] Pro Discover, Inbox, Analytics
- [ ] Pro Settings

### Phase 7 — Onboarding & polish
- [ ] `OnboardingPage` flow
- [ ] `usePageMeta` on every page
- [ ] Mobile nav + Discover responsive pass
- [ ] Accessibility audit
- [ ] `npm run build` — zero errors

---

## 19. Adding Any New Page — Master Checklist

```
[ ] 1. Create page component in src/modules/{area}/pages/YourPage.jsx
[ ] 2. Create src/styles/your-page.css
[ ] 3. Import CSS in src/main.jsx
[ ] 4. Export from module index.js
[ ] 5. Add route in App.jsx (wrap with <P> if protected)
[ ] 6. Add nav link in navigation.js (if needed)
[ ] 7. usePageMeta('Title | ProMatch', 'description')
[ ] 8. Wrap dashboard pages in <AppShell variant="student|pro">
[ ] 9. Add mock data to mockData.js (if lists/cards)
[ ] 10. Test: desktop, mobile, logged out, student login, pro login
```

---

## 20. Complete Route Reference

| Route | Page | Protected | AppShell |
|---|---|---|---|
| `/` | LandingPage | No | No |
| `/features` | FeaturesPage | No | No |
| `/about` | AboutPage | No | No |
| `/contact` | ContactPage | No | No |
| `/login` | LoginPage | No | No |
| `/signup` | LoginPage | No | No |
| `/preview/discover` | DiscoverPage | No | Yes |
| `/student/home` | StudentHomePage | Yes | Yes |
| `/student/discover` | DiscoverPage | Yes | Yes |
| `/student/messages` | MessagesPage | Yes | Yes |
| `/student/connections` | ConnectionsPage | Yes | Yes |
| `/student/events` | EventsPage | Yes | Yes |
| `/student/settings` | SettingsPage | Yes | Yes |
| `/pro/overview` | ProOverviewPage | Yes | Yes |
| `/pro/discover` | DiscoverPage | Yes | Yes |
| `/pro/inbox` | ProInboxPage | Yes | Yes |
| `/pro/analytics` | ProAnalyticsPage | Yes | Yes |
| `/pro/settings` | SettingsPage | Yes | Yes |
| `/profile/:username` | ProfilePage | Yes | Yes |
| `/notifications` | NotificationsPage | Yes | Yes |
| `/onboarding` | OnboardingPage | Yes | No |
| `/call/:sessionId` | CallPage | Yes | No |

---

## 21. QA Checklist (before shipping)

- [ ] All routes load without console errors
- [ ] Login as student → lands on `/student/home` with student nav
- [ ] Login as pro → lands on `/pro/overview` with pro nav
- [ ] Nav stays consistent on `/profile/me` and `/notifications`
- [ ] Profile avatar → `/profile/me`; bell → `/notifications`
- [ ] Discover scrolls vertically; Connect/Save work
- [ ] Protected routes redirect to `/login` when logged out
- [ ] Mobile hamburger opens/closes nav
- [ ] `npm run build` succeeds
- [ ] Forms have labels + error states
- [ ] Focus visible on interactive elements
- [ ] Page titles update via `usePageMeta`

---

## 22. Spec Gap Tracker

Items from `ProMatch_Login_Frontend_Spec.md` not yet fully implemented:

| Spec item | Status | Action when building |
|---|---|---|
| `/login` role selector with 3 RoleCards | Partial | Extract `RoleCard.jsx`, build selector page |
| `/login/student`, `/login/professional`, `/login/organization` | Not split | Add routes + per-role accent CSS |
| Organization login (gold) | Not started | New page + `/org/dashboard` |
| LinkedIn OAuth first on pro login | Not done | Reorder OAuth buttons by role |
| Framer Motion animations | Not used | Use CSS keyframes (§13) |
| React Hook Form + Zod | Not used | Add when wiring real API |
| Dedicated Input/OAuthButton UI files | Inline | Extract to `src/components/ui/` |
| API auth endpoints | Mock delay | Replace in `handleSubmit` |

---

## 23. Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server → http://localhost:5173
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

---

## 24. Quick Reference — Spec §15 Per-Page Summary (adapted)

| | Student | Professional | Organization |
|---|---|---|---|
| **Accent** | `--primary` `#0084FF` (spec: coral) | `--primary` (spec: blue) | Not built (spec: gold) |
| **Login route** | `/login` + Student toggle | `/login` + Pro toggle | Future `/login/organization` |
| **Layout** | Split screen (form + showcase) | Same page, role toggle | Future centered card |
| **OAuth** | Google, GitHub | Same (spec: LinkedIn first) | Future Google only |
| **Post-login** | `/student/home` | `/pro/overview` | Future `/org/dashboard` |
| **First-login** | `/onboarding` | `/onboarding` | Future |
| **Dashboard shell** | `AppShell variant="student"` | `AppShell variant="pro"` | Future |
| **Discover** | `/student/discover` | `/pro/discover` | N/A |
| **Profile** | `/profile/me` | `/profile/me` | N/A |
| **Notifications** | `/notifications` | `/notifications` | N/A |

---

*ProMatch Complete Frontend Build Manual v2.0 — fully adapted from ProMatch Login Frontend Spec for the Frontend-TFN Vite/React/CSS codebase.*
