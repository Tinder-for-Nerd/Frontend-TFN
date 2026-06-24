# ProMatch (TFN - "Tinder for Nerds") — Work Done Report

> **Generated:** 2026-06-24
> **Project Root:** `Frontend-TFN/`

---

## 1. Project Identity

| Attribute | Value |
|---|---|
| Name | `promatch-landing-page` / **ProMatch** (branded "Tinder for Nerds" / TFN) |
| Type | Monorepo (npm workspaces) |
| Platforms | Web (Vite + React) + Mobile (Expo/React Native) in progress |
| Package Manager | npm |
| Git | Initialized, no remote configured |

### Workspaces

| Path | Package | Purpose |
|---|---|---|
| `packages/shared` | `@promatch/shared` | Shared API query hooks, Zustand stores, socket event constants, mock API |
| `packages/tokens` | `@promatch/tokens` | Design token definitions (CSS custom properties + Tailwind export) |
| `apps/mobile` | (mobile) | Expo-based mobile app (workspace entry, scaffolded) |

### Secondary Frontend (TypeScript rewrite in progress)

| Path | Package | Purpose |
|---|---|---|
| `Frontend/` | `frontend` | TypeScript + React 19 + Tailwind v4 rewrite of the main app |

---

## 2. Tech Stack Implemented

| Layer | Technology | Status |
|---|---|---|
| Bundler | Vite 5 (`@vitejs/plugin-react`) | Done |
| UI Framework | React 18 (main), React 19 (Frontend/ TS rewrite) | Done |
| Routing | React Router 6 (nested `Outlet`-based layout) | Done |
| CSS Architecture | Pure CSS with ~30 custom stylesheets + CSS custom properties | Done |
| State (Server) | `@tanstack/react-query` via `QueryClientProvider` | Done |
| State (Client) | Zustand (user, chat, notification, subscription stores) | Done |
| Realtime | Socket.io-client + in-browser mock socket fallback | Done |
| Animation | Framer Motion 12, Three.js (GridDistortion shader component) | Done |
| Charts | Recharts, Canvas-confetti | Done |
| Icons | Lucide-react + custom inline SVG icons | Done |
| TypeScript (WIP) | `Frontend/` directory — React 19, Tailwind v4, Zod, react-hook-form, sonner toasts | In Progress |

---

## 3. Architecture & Entry Point

```
index.html
  └─ src/main.jsx
       ├─ imports ~30 CSS files (base → component → page → layout → mobile)
       ├─ QueryProvider
       │   └─ ToastProvider (from ui)
       │       └─ App
       ├─ AuthProvider
       ├─ SubscriptionProvider
       └─ SocketProvider
```

### `src/App.jsx` — Router Root

Routes are organized with:
- **Public routes** (in `RootLayout` — has `SiteNav` + `Outlet`)
- **Auth routes** (role selection → login per role)
- **Protected routes** (wrapped in `ProtectedRoute` — checks `isAuthenticated`)
- **Legacy redirects** (maps old `/chat`, `/booking`, `/swipe`, etc. to modern equivalents)

---

## 4. Authentication & Role System — COMPLETE

### Roles Implemented

| Role | Route Prefix | Dashboard Landing |
|---|---|---|
| Student | `/student/*` | `/student/home` |
| Professional | `/pro/*` | `/pro/overview` |
| Organization | `/org/*` | `/org/dashboard` |

### Auth Flow

1. `/login` → `RoleSelectorPage` → 3 `RoleCard` components
2. Click role → `/login/:rolePath` → `RoleLoginPage`
3. `AuthCredentialForm` with email/password + OAuth buttons (Google, LinkedIn)
4. Form validated via `validateLoginForm()` in `authConfig.js`
5. On success → `AuthContext.login()` writes `pm_user` to `localStorage`, `pm_workspace` to `sessionStorage`
6. `AuthProvider` hydrates on mount
7. `ProtectedRoute` redirects unauthenticated users to `/login`

### Auth Components (`src/modules/auth/components/`)

- `AuthShell.jsx` — page wrapper with `GridDistortion` background
- `AuthLogo.jsx`, `RoleCard.jsx` — role selector UI
- `AuthCredentialForm.jsx` — email/password form with OAuth
- `FormError.jsx` — shake-animated error display
- `AuthIcons.jsx` — inline SVG icons (Google, LinkedIn, Eye, Lock, etc.)
- `StudentVisualPanel.jsx`, `ProfessionalVisualPanel.jsx`, `OrganizationVisualPanel.jsx` — role-specific login panels

### Auth Config (`src/modules/auth/authConfig.js`)

- `AUTH_ROLES` — full role definitions (labels, icons, taglines, titles, dashboard routes, onboarding paths, OAuth order)
- `resolveAuthRole()`, `getRoleByPath()`, `getDashboardForRole()` — role resolution helpers
- `validateLoginForm()` — email format + password length + name (signup) validation

---

## 5. Layout & UI Components — COMPLETE

### Layout (`src/components/layout/`)

| File | Description |
|---|---|
| `RootLayout.jsx` | Public page shell with `SiteNav` + `Outlet` |
| `SiteNav.jsx` | Responsive nav bar — brand logo, workspace-aware links, notification bell, search trigger, user avatar menu |
| `AppShell.jsx` | Dashboard shell — `GridDistortion` background, skip link, top bar with title/subtitle/actions, children |

### UI Components (`src/components/ui/`)

| Component | Description |
|---|---|
| `Button.jsx` | Polymorphic button/link with variants (primary, secondary, ghost), sizes, icons |
| `Icon.jsx` | Lucide icon wrapper accepting string `name` prop |
| `Badge.jsx` | Small label with tone colors (teal, violet, rose, amber) |
| `Avatar.jsx` | Avatar with fallback initials and tone-colored border |
| `Chip.jsx` | Toggle chip with active state |
| `Input.jsx` | Styled input/textarea/select |
| `Card.jsx` | Generic card container |
| `Modal.jsx` | Focus-trapped dialog with overlay |
| `Skeleton.jsx` | Loading placeholder shapes |
| `Toast.jsx` / `ToastProvider` | Toast notification system |
| `CreativePricing.jsx` | Neobrutalist pricing section for landing page |
| `GridDistortion.jsx` | Three.js WebGL shader grid background |

### Common Components (`src/components/common/`)

| Component | Description |
|---|---|
| `Brand.jsx` | Logo link "Tinder for Nerds / TFN" |
| `ProtectedRoute.jsx` | Auth gate with loading spinner |
| `SectionHeader.jsx` | Eyebrow + title + description + actions |
| `StatCard.jsx` | Metric card with optional sparkline chart or ring SVG |
| `MiniProfileCard.jsx` | Expandable profile card with avatar, skills, match%, actions |
| `ActivityItem.jsx` | Simple icon + title + meta row |
| `EmptyState.jsx` | Icon + heading + description + optional action button |
| `CommandPalette.jsx` | Search modal with recent searches and filtered sections |
| `EventCalendarMenu.jsx` | Dropdown for Google/Outlook/LinkedIn calendar links + `.ics` download |
| `InstagramReelsFeed.jsx` | Vertical swipe feed (like Instagram Reels/TikTok) with physics-based drag, touch + wheel support, pool-of-3 rendering |

### Notifications

| Component | Description |
|---|---|
| `NotificationCenter.jsx` | Bell icon + dropdown panel — recent notifications, mark-read, view-all link |

### Fit Score

| Component | Description |
|---|---|
| `FitScore.jsx` | Overall match ring + dimension bars (skills, experience, projects, availability) |

---

## 6. Context & Providers — COMPLETE

### `AuthContext.jsx`
- Stores `{ user, loading, login, logout, isAuthenticated }`
- Reads/writes `pm_user` in localStorage, `pm_workspace` in sessionStorage
- Syncs to `@promatch/shared` Zustand user store

### `SocketProvider.jsx`
- Manages socket connection lifecycle
- Provides `{ status, isConnected, notifications, unreadCount, presence, markAsRead, markAllAsRead, clearAll, pushNotification, getPresenceLabel, isUserOnline, setActiveRoom, events }`
- Listens to: `presence_update`, `notification`, `user_typing`, `typing_stopped`, `message_read_ack`
- Seeds initial notifications from mock data

### `SubscriptionContext.jsx`
- Manages Pro subscription state (reads/writes `pm_pro_subscription` in localStorage)
- Provides `{ isPro, billingPlan, activatePro, cancelPro, canAccess(feature) }`
- `FeatureGate` component conditionally renders based on feature access

### `QueryProvider.jsx`
- Creates `QueryClient` via `createPromatchQueryClient()` from `@promatch/shared`
- Wraps children in `QueryClientProvider`

---

## 7. Socket Architecture — COMPLETE

### `src/lib/socket.js`
- Singleton `socketInstance`
- Real `io()` client when `VITE_SOCKET_URL` is set
- Falls back to `createMockSocket()` from `mockSocket.js` when unset
- Exports: `getSocket()`, `connectSocket()`, `disconnectSocket()`, `resetSocket()`, `getSocketMode()`, `isMockSocket()`, `SOCKET_EVENTS`

### `src/lib/mockSocket.js`
- In-browser mock Socket.io server
- Events: `connect`, `disconnect`, `presence_update`, `receive_message`, `notification`, `user_typing`, `typing_stopped`, `message_read_ack`
- Auto-replies to messages with role-specific preset replies after random delays
- Broadcasts random presence updates every 28 seconds
- Mocks typing indicators

### `src/hooks/useSocket.js`
- Low-level hook wrapping socket connection lifecycle
- Returns `{ socket, status, isConnected, isMock, emit, on, off, connect, disconnect, events }`

### `src/hooks/useChat.js`
- Full chat hook (315 lines): manages threads, messages, typing, read receipts
- Supports room join/leave
- Uses variant ('student'/'pro') to select seed data
- Handles both mock and real socket events

---

## 8. Data Layer — COMPLETE

### `src/data/mockData.js` (869 lines)
- 9 detailed profiles (me, sarah, nora, raj, priya, liam, mei, david, ethan)
- `studentDiscoverProfiles`, `proDiscoverProfiles` — discovery feed data
- `studentConnections` — connected, pending, suggested, shortlisted
- `studentThreads`, `proThreads` — messaging threads with messages
- 3 session templates (intro call, deep dive, async feedback)
- 3 events (career night, AI workshop, portfolio lab)
- 5 seed notifications
- Settings tabs configuration
- Tagging vocabulary: skillTags, domainTags, intentTags, workStyleTags, commitmentTags, socialTypes
- Command palette config: commandActions, commandPaletteSections
- Landing page content: pricingPlans, landingFeatures, landingSteps, landingTestimonials, landingStats
- 4-step onboarding flow

### `src/data/platformData.js`
- `FIT_SCORE_DEFAULT`, `buildFitScore()` — generates FitScore (overall + 4 dimensions)
- 3 active freelancer projects
- 2 match alerts
- 4 profile strength checklist items
- `portfolioAnalysis` — mock GitHub analysis (score, breakdown, repos)
- `hiringPipeline` — kanban-style columns/cards for startup hiring
- `analyticsTrend`, `skillDemandData` — chart data
- `PRO_FEATURES`, `FREELANCER_ONBOARDING_STEPS`, `STARTUP_ONBOARDING_STEPS`

### `src/data/dashboardMessages.js`
- Role-specific copy (student vs pro) for home page and messages page

### `src/data/professionalSearch.js`
- 8 professional role categories with keyword matching
- `searchProfilesByRequirements()` — relevance-scored profile search
- `calculateRelevance()` — weighted scoring (type, domain, skills, intent, location, commitment)
- `loadStoredProfessionalSearch()` / `saveProfessionalSearch()` — persist to sessionStorage

---

## 9. Pages Implemented — COMPLETE

### Public Pages (`src/modules/public/pages/`)

| Page | Route | Features |
|---|---|---|
| LandingPage | `/` | Hero with GridDistortion, feature strip, how-it-works steps, CTA, pricing |
| FeaturesPage | `/features` | 6 feature cards with detail lists |
| AboutPage | `/about` | Mission, problems, approach steps, team, CTA |
| ContactPage | `/contact` | Contact form + ContactGlassCard |

### Auth Pages (`src/modules/auth/pages/`)

| Page | Route | Features |
|---|---|---|
| RoleSelectorPage | `/login` | 3 role cards (Student, Professional, Org) |
| RoleLoginPage | `/login/:rolePath` | Auth form with email/password + OAuth + role-specific visual panel (login & signup modes) |
| LogoutPage | `/logout` | Spinner + redirect after 800ms |

### Dashboard Pages (`src/modules/dashboard/pages/`) — 17 pages

| Page | Route(s) | Key Features |
|---|---|---|
| FeedPage | `/feed` | InstagramReelsFeed swipe discovery |
| DiscoverPage | `/discover`, `/student/discover`, `/pro/discover` | SwipeStack + filters + MatchModal (variant: student/pro) |
| ProfilePage | `/profile/:username` | GitHub-style profile with tabs (overview/posts/activity), edit mode |
| MessagesPage | `/messages`, `/student/messages`, `/pro/inbox` | WhatsApp-style chat UI with thread sidebar, search, filter, typing indicators |
| ConnectionsPage | `/connections`, `/student/connections` | Tabbed network list (connected/pending/suggested/shortlisted) |
| CalendarPage | `/calendar` | Month grid calendar with event/session agenda |
| SessionsPage | `/sessions` | Upcoming sessions + availability slots + booking |
| SettingsPage | `/settings` | 7-tab settings (Profile, Account, Notifications, Privacy, Appearance, Billing, Danger Zone) |
| NotificationsPage | `/notifications` | Full notification list with mark-read/clear-all |
| AnalyticsPage | `/analytics` | Stats grid + conversion rate + top skills searched |
| EventsPage | `/events` | Featured event hero + filter tabs + event card grid |
| EventDetailPage | `/event/:id` | Event detail with agenda, host info, RSVP, calendar add |
| HostEventPage | `/host` | Full event creation form (date, venue, tickets, tags, agenda, host info, settings) |
| OrganizerDashboardPage | `/organizer/dashboard` | Hosted events list, KPIs, RSVPs, attendees, announcements |
| CreateOpportunityPage | `/opportunities/create` | Opportunity post form (hackathons, internships, jobs) |
| CallPage | `/call/:sessionId` | WebRTC call room mockup with video tiles + controls |

### Student Pages (`src/modules/student/pages/`)

| Page | Route | Features |
|---|---|---|
| StudentHomePage | `/student/home` | LinkedIn-style feed with posts, composer, trending, people to follow |
| StudentFeedPage | `/student/feed` | Same feed layout as home (separate route) |
| StudentProgressPage | `/student/progress` | Profile strength ring + checklist + stat cards + growth trend + skill gap |
| StudentBillingPage | `/student/billing` | Session payment checkout with PaymentCheckoutForm |
| ProfessionalSearchPage | `/student/search` | Professional search modal + results |

### Professional Pages (`src/modules/pro/pages/`)

| Page | Route | Features |
|---|---|---|
| ProOverviewPage | `/pro/overview` | LinkedIn-style feed with pro-specific posts and sidebar |
| NetworkPage | `/pro/network` | Professional network management |
| ProInboxPage | `/pro/inbox` | Messages with pro variant |
| ProCalendarPage | `/pro/calendar` | Calendar with pro variant |
| ProAnalyticsPage | `/pro/analytics` | Analytics with pro variant |
| ProCompanyPage | `/pro/company` | Company profile page |

### Freelancer Pages (`src/modules/freelancer/pages/`)

| Page | Route | Features |
|---|---|---|
| FreelancerDashboardPage | `/freelancer/dashboard` | Active projects, match alerts, profile strength |
| FreelancerDiscoverPage | `/freelancer/discover` | AI-ranked swipe feed with FitScore panel |
| FreelancerProfilePage | `/freelancer/profile` | Profile (shared) |
| FreelancerOnboardingPage | `/freelancer/onboard/:step` | 4-step wizard (basic info, skills, portfolio, availability) |
| PortfolioAnalyzerPage | `/freelancer/portfolio-analyzer` | GitHub score + repos (Pro-gated via FeatureGate) |

### Startup Pages (`src/modules/startup/pages/`)

| Page | Route | Features |
|---|---|---|
| StartupOnboardingPage | `/startup/onboarding/:step` | 2-step wizard (company info, first project posting) |
| HiringDashboardPage | `/startup/hiring` | Kanban hiring pipeline (applied/screening/interview/offer) |
| ProjectPostPage | `/startup/post-project` | Project posting form |

### Organization Pages

| Page | Route | Features |
|---|---|---|
| OrgDashboardPage | `/org/dashboard` | Organization dashboard layout |

### Onboarding

| Page | Route | Features |
|---|---|---|
| OnboardingPage | `/onboarding/:step` | 4-step wizard (profile, skills, intent, preferences) with live preview |

---

## 10. CSS & Design System — COMPLETE

### Design Philosophy: "Academic Luminary"
Defined in `DESIGN.md` — light-first, editorial space, intentional asymmetry, layered paper concept.

- **Light-first theme:** `bg-base: #f8f4ec`, `bg-surface: #ffffff`
- **3 brand colors:** Teal (`#0ecfbf`), Violet (`#6c5ce7`), Rose (`#f472b6`)
- **Fonts:** Cabinet Grotesk (display), Satoshi (body), JetBrains Mono (mono)
- **No-line rule:** Use background shifts instead of borders
- **Glassmorphism:** Floating elements (SiteNav)
- **Neobrutalist accents:** Event tabs, pricing cards

### CSS Architecture (~30 stylesheets)

```
Imports in main.jsx (in order):
  1. Base: tinderfornerds-dark.css
  2. Component: site-nav.css, notification-center.css, ui-library.css
  3. Page-specific: landing.css, login.css, discover.css, messages.css,
     profile.css, feed.css, calendar.css, settings.css, notifications.css,
     platform-pages.css, fit-score.css, analytics.css, professional-search.css,
     features.css, about.css, contact.css, event-detail.css,
     event-calendar-menu.css, billing.css, connections.css,
     student-feed.css, premium-messages.css, instagram-feed.css,
     organizer-dashboard.css, org-dashboard.css, mini-profile-card.css
  4. Layout override: site-layout.css (loads last)
  5. Mobile: mobile.css (responsive overrides)
```

---

## 11. Shared Packages (`packages/shared/src/`)

### API Layer
- Axios/fetch wrapper with query hooks
- API endpoint constants

### Query Layer
- `createPromatchQueryClient()` — preconfigured TanStack Query client
- Shared query hooks and mutations

### Zustand Stores
- `userStore` — user state and actions
- `chatStore` — messaging state
- `notificationStore` — notification state
- `subscriptionStore` — subscription state

### Socket Layer
- Socket event constants
- Socket connection helpers

### Design Tokens (`packages/tokens/src/`)
- CSS custom properties
- Tailwind CSS config export (for TS rewrite)

---

## 12. TypeScript Rewrite (`Frontend/`) — IN PROGRESS

A parallel TypeScript project with modern stack:

| Technology | Version |
|---|---|
| React | 19 |
| TypeScript | 6.0 |
| Vite | 8 |
| Tailwind CSS | 4 |
| React Router | 7 |
| TanStack Query | 5 |
| Zustand | 5 |
| React Hook Form | 7 |
| Zod | 4 |
| Sonner (toasts) | 2 |
| CVA + clsx + tailwind-merge | Utility classes |

### Implemented Stores:
- `authStore.ts`
- `feedStore.ts`
- `discoverStore.ts`
- `bookingStore.ts`
- `messageStore.ts`
- `notificationStore.ts`

---

## 13. Refactoring & Build Scripts

Multiple Node.js scripts were created to automate project transformation:

| Script | Purpose |
|---|---|
| `extract-routes.cjs` | Extract route definitions from App.jsx |
| `extract-data.cjs` | Extract mock data into separate files |
| `extract-discover.cjs` | Extract discover page components |
| `extract-onboarding.cjs` | Extract onboarding page components |
| `extract-remaining-pages.cjs` | Extract remaining dashboard pages |
| `refactor_app.js` | Refactor App.jsx structure |
| `refactor-css.cjs` | Refactor CSS file organization |
| `refactor-imports.cjs` | Fix and reorganize imports |
| `fix-all-imports.cjs` | Fix all import paths project-wide |
| `rebuild_discover.cjs` | Rebuild discover page from extracted parts |
| `rename.cjs` | File renaming automation |
| `replace_end.cjs` | String replacement utility |
| `inject.cjs` | Code injection utility |
| `add_icons.cjs` | Icons addition automation |
| `dedupe.cjs` / `fix_dupes.cjs` | Code deduplication |
| `fix_messages.cjs` / `update_messages.cjs` | Messages module fixes |
| `robust.cjs` / `repair.cjs` | General code repair scripts |

---

## 14. Utilities (`src/utils/`)

| File | Purpose |
|---|---|
| `helpers.js` | `cx()` class joiner, `initialsFromName()`, tone color mappers, `getDashboardRoute()` |
| `eventCalendar.js` | Calendar URL builders (Google, Outlook, LinkedIn), `.ics` file generation and download |
| `hooks.js` | `useLightThemeClass()`, `usePageMeta()` (title + meta description) |

### Custom Hooks (`src/hooks/`)
| Hook | Purpose |
|---|---|
| `usePageMeta.js` | Set document title and meta description dynamically |
| `useChat.js` | Full chat lifecycle (315 lines) — threads, messages, typing, read receipts |
| `useSocket.js` | Low-level socket connection lifecycle |

---

## 15. Constants & Config

| File | Content |
|---|---|
| `src/constants/landingData.js` | Public nav, landing features, testimonials, pricing plans, FAQ |
| `src/constants/profiles.js` | Re-export of mock profiles |
| `src/modules/auth/authConfig.js` | Full auth role definitions, validators, helpers |

---

## 16. Design Assets & Screenshots

| File | Description |
|---|---|
| `landing-desktop.png` | Desktop landing page screenshot |
| `landing-mobile.png` | Mobile landing page screenshot |
| `dashboard-desktop.png` | Desktop dashboard screenshot |
| `profile-page.png` | Profile page screenshot |
| `settings-page.png` | Settings page screenshot |
| `settings-mobile.png` | Mobile settings page screenshot |
| `promatch_settings_page.html` | Standalone settings page HTML |
| `discover.html` | Standalone discover page HTML |
| `matches.json` | Match data export |

---

## 17. Documentation Files

| File | Description |
|---|---|
| `README.md` | Project overview and getting started guide |
| `DESIGN.md` | "Academic Luminary" design system strategy |
| `promatch_build_prompt.md` | Original product + tech stack prompt (Next.js spec) |
| `ProMatch_Login_Frontend_Spec.md` | Full login/signup spec for 3 roles |
| `ProMatch_Website_Build_Guide.md` | Comprehensive build manual (1045 lines) |
| `tutor_website_template_guidelines.md` | Additional website template guidelines |

---

## 18. Summary of Work Status

| Area | Status |
|---|---|
| Public landing pages (Home, Features, About, Contact) | ✅ Complete |
| Auth system (Role selection, Login, Signup, Logout) | ✅ Complete |
| Student workspace (Home, Discover, Messages, Connections, Sessions, Events, Progress, Billing, Search, Settings) | ✅ Complete |
| Professional workspace (Overview, Discover, Network, Inbox, Calendar, Events, Analytics, Company, Settings) | ✅ Complete |
| Organization workspace (Dashboard, Events, Settings) | ✅ Complete |
| Freelancer workspace (Dashboard, Discover, Profile, Onboarding, Portfolio Analyzer) | ✅ Complete |
| Startup workspace (Onboarding, Hiring Kanban, Project Posting) | ✅ Complete |
| Dashboard shared pages (Feed, Profile, Messages, Connections, Calendar, Settings, Notifications, Analytics, Events, Event Detail, Host Event, Organizer Dashboard, Call Room, Create Opportunity) | ✅ Complete |
| Onboarding flow (4-step wizard) | ✅ Complete |
| Real-time Socket layer (with mock fallback) | ✅ Complete |
| Chat system (threads, typing, read receipts) | ✅ Complete |
| Notification system (real-time + dropdown + full page) | ✅ Complete |
| Fit Score matching UI | ✅ Complete |
| Instagram Reels-style feed | ✅ Complete |
| WebRTC call room mockup | ✅ Complete |
| Event calendar integration (Google, Outlook, LinkedIn, .ics) | ✅ Complete |
| Command palette (⌘K search) | ✅ Complete |
| Subscription/pro feature gating | ✅ Complete |
| CSS design system (~30 stylesheets) | ✅ Complete |
| Shared packages (API, Query, Stores, Socket, Tokens) | ✅ Complete |
| TypeScript rewrite (React 19 + Tailwind 4) | 🔄 In Progress |
| Mobile app (Expo) | 🔄 Scaffolded |
| Backend integration (real API) | ❌ Mock-only |
| Tests | ❌ Not implemented |

---

## 19. Key Architectural Patterns

1. **Variant prop pattern:** Dashboard pages accept `variant='student' | 'pro'` to switch content copy and navigation
2. **Module-scoped pages:** Each role family has its own `/pages` directory; many re-export from dashboard module
3. **Mock-first:** All data flows through `mockData.js`; socket falls back to in-browser mock; auth uses mock OAuth
4. **Feature gating:** `SubscriptionContext.FeatureGate` controls Pro-only features (analytics, portfolio-analyzer, unlimited-matches, fit-breakdown)
5. **Workspace routing:** `navigation.js` reads `pm_workspace` from sessionStorage and filters nav links by role
6. **Dashboard shell:** `AppShell` provides consistent layout (top bar, background, skip link) for all dashboard pages
7. **Singleton socket:** Socket instance created once and shared; providers/hooks subscribe with cleanup
8. **No-line CSS rule:** Background shifts replace borders throughout the design system
