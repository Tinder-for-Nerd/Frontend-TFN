# ProMatch — Complete Website Build Prompt

> Copy this entire document as your system/context prompt when building the ProMatch platform.

---

## 1. Product Overview

**ProMatch** is a professional networking and co-founder/collaborator matching platform. It helps founders, engineers, designers, and domain experts find the right co-builders based on skills, domain, intent, and working style — powered by an AI embedding engine that learns from user interactions to refine recommendations over time.

**Core value proposition:** "Find your co-founder, not just your next connection."

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Real-time | Socket.io (client + server) |
| Video | WebRTC |
| Auth | NextAuth.js — Google OAuth + LinkedIn OAuth + Email/JWT |
| Backend | Node.js microservices behind an API Gateway |
| Primary DB | PostgreSQL (profiles, connections, messages) |
| Cache / Sessions | Redis |
| Vector DB | Pinecone (or pgvector) — AI profile embeddings |
| Media Storage | AWS S3 / Cloudinary |
| AI Engine | OpenAI `text-embedding-ada-002` or similar + custom ranker |
| Deployment | Vercel (frontend) + Render or Railway (backend services) |

---

## 3. Design System

### 3.1 Visual Identity

- **Aesthetic:** Refined dark-mode first, with sharp teal/emerald accents. Think "premium startup dashboard meets professional network." Not corporate, not playful — ambitious and confident.
- **Primary color:** `#0CAFA8` (teal)
- **Background:** `#0D0D0D` (near-black)
- **Surface:** `#161616` (cards/panels)
- **Border:** `#2A2A2A`
- **Text primary:** `#F5F5F0`
- **Text secondary:** `#9A9A8E`
- **Accent (CTA):** `#5B4BF5` (indigo-violet)
- **Success:** `#22C55E`
- **Warning:** `#EF9F27`

### 3.2 Typography

- **Display / Headings:** `Clash Display` or `Cabinet Grotesk` — bold, geometric
- **Body:** `DM Sans` — clean, readable at small sizes
- **Mono (code/tags):** `JetBrains Mono`
- Load via `next/font` for performance

### 3.3 Component Principles

- Rounded corners: `rounded-xl` (12px) for cards, `rounded-full` for pills/badges
- Glassmorphism sparingly — use for modals and floating panels
- Micro-animations on all interactive elements (hover lift, focus glow)
- Skeleton loaders on all async content
- Mobile-first responsive layout — all pages must work on 375px+

---

## 4. Pages & Routes

### 4.1 Public Pages (no auth required)

#### `/` — Landing Page
- Hero: Bold headline + sub-headline + two CTAs ("Get Started Free" + "See How It Works")
- Feature highlights section (3 columns): AI Matching, Real-time Chat, 1:1 Booking
- Social proof: testimonials / stats counter (animated on scroll)
- How it works: 4-step visual flow (Sign up → Profile → Match → Connect)
- Footer: links, socials, legal

#### `/login` — Auth Page
- Centered card with ProMatch logo
- "Continue with Google" button
- "Continue with LinkedIn" button
- Divider + Email/password fallback
- Toggle: Sign up / Log in
- Terms & Privacy links below

---

### 4.2 Onboarding Flow (new users only)

Triggered after first login. Multi-step wizard, progress bar at top.

#### `/onboarding/step-1` — Basic Info
- Fields: Full name, Profile photo upload, Location (city), Headline (one-liner)

#### `/onboarding/step-2` — Skills & Domain
- Skills: tag-based multi-select (e.g., React, Python, Growth, Design, Sales)
- Domain / Industry: dropdown (FinTech, EdTech, HealthTech, DeepTech, etc.)
- Years of experience: slider (0–10+)

#### `/onboarding/step-3` — Intent & Goals
- What are you looking for? (multi-select pills):
  - Co-founder
  - Technical collaborator
  - Advisor / Mentor
  - Side-project partner
  - Open to anything
- Commitment level: Part-time / Full-time / Flexible
- Brief bio: textarea (max 280 chars)

#### `/onboarding/step-4` — Preferences
- Preferred domains/skills in a co-founder (same tag pickers)
- Remote / In-person / Hybrid preference
- One optional social link (LinkedIn, GitHub, portfolio)

**On completion:** generate embedding from profile → store in Pinecone → redirect to `/feed`

---

### 4.3 Core App Pages (auth required)

#### `/feed` — Discovery Feed
- Left sidebar: filters (domain, skills, intent, location, commitment)
- Main area: card grid (3 cols desktop, 1 col mobile) of profile cards
- Profile card contains: avatar, name, headline, skill pills (top 3), domain badge, intent tag, "Connect" + "Skip" actions
- Infinite scroll with skeleton loading
- AI-ranked: top matches shown first based on embedding similarity
- "Why this match?" tooltip on hover (shows matching signals)

#### `/profile/[username]` — Public Profile View
- Hero: avatar (large), name, headline, location
- About section: full bio
- Skills: tag cloud
- Domain + Intent badges
- Social links
- Mutual connections count
- Action buttons: "Connect", "Message" (if connected), "Book a Call" (if connected)
- Activity feed: recent projects, posts (Phase 2+)

#### `/profile/edit` — Edit Own Profile
- Same fields as onboarding, pre-filled
- Avatar re-upload
- Save changes → re-generate embedding

#### `/connections` — Connections Hub
- Tabs: "Explore" | "Pending" | "Connected"
- Explore: re-shows feed with different layout
- Pending: incoming and outgoing requests with Accept/Decline
- Connected: list of accepted connections with quick-message button

#### `/messages` — Messaging Center
- Two-panel layout: conversation list (left) + active chat (right)
- Real-time via Socket.io
- Message input: text + emoji + file attachment (Phase 2)
- Read receipts (double tick)
- Online/offline presence indicator
- Search conversations

#### `/bookings` — 1:1 Call Booking
- Calendar view of available slots
- User sets their own availability (day + time blocks)
- Book a slot with a connection → sends confirmation + adds to calendar
- Upcoming sessions list with join button (WebRTC call opens in `/call/[sessionId]`)

#### `/call/[sessionId]` — Video Call Room
- Full-screen WebRTC video call
- Controls: mute mic, toggle camera, end call, screenshare
- Minimal UI — camera feeds + floating control bar

#### `/events` — Events Hub
- Browse upcoming networking events (virtual + in-person)
- Filter by domain, format, date
- Event card: title, host, date/time, attendee count, tags
- RSVP button
- My events tab: events I'm hosting or attending

#### `/events/[id]` — Event Detail Page
- Full event description, agenda
- Attendees list (avatars)
- RSVP / Withdraw button
- Live chat room during event (Socket.io)

#### `/notifications` — Notifications
- List: connection requests, new messages, booking confirmations, event reminders
- Mark all read
- Real-time badge on nav icon

#### `/settings` — Account Settings
- Tabs: Profile, Account, Notifications, Privacy, Danger Zone
- Profile: same as edit page
- Account: email, password change
- Notifications: toggle email/in-app per type
- Privacy: profile visibility (public/connections only), block users
- Danger Zone: deactivate or delete account

---

### 4.4 Admin / Internal (Phase 3)

#### `/admin` — Admin Dashboard
- User stats, signups over time (charts)
- Connection graph metrics
- Event management
- Reported users queue

---

## 5. API Architecture

All API routes go through the **API Gateway** at `/api/v1/`. The gateway handles JWT verification, rate limiting, and routes to the appropriate microservice.

### 5.1 Auth Service — `/api/v1/auth`

| Method | Route | Description |
|---|---|---|
| POST | `/auth/register` | Email signup |
| POST | `/auth/login` | Email login → returns JWT |
| GET | `/auth/oauth/google` | Google OAuth redirect |
| GET | `/auth/oauth/linkedin` | LinkedIn OAuth redirect |
| POST | `/auth/refresh` | Refresh JWT |
| POST | `/auth/logout` | Invalidate token |

### 5.2 Profile Service — `/api/v1/profiles`

| Method | Route | Description |
|---|---|---|
| GET | `/profiles/:username` | Get public profile |
| PUT | `/profiles/me` | Update own profile |
| POST | `/profiles/me/avatar` | Upload avatar |
| GET | `/profiles/me` | Get own profile |
| DELETE | `/profiles/me` | Delete account |

### 5.3 Matching Service — `/api/v1/matches`

| Method | Route | Description |
|---|---|---|
| GET | `/matches/feed` | Get ranked feed (paginated) |
| POST | `/matches/connect` | Send connection request |
| PUT | `/matches/connect/:id/accept` | Accept request |
| PUT | `/matches/connect/:id/decline` | Decline request |
| GET | `/matches/connections` | List accepted connections |
| POST | `/matches/signal` | Log interaction signal (view, skip, connect) |

### 5.4 Messaging Service — `/api/v1/messages`

| Method | Route | Description |
|---|---|---|
| GET | `/messages/conversations` | List all conversations |
| GET | `/messages/conversations/:id` | Get messages in thread |
| POST | `/messages/send` | Send a message |
| PUT | `/messages/:id/read` | Mark as read |

### 5.5 Booking Service — `/api/v1/bookings`

| Method | Route | Description |
|---|---|---|
| GET | `/bookings/availability/:userId` | Get user's available slots |
| POST | `/bookings/availability` | Set own availability |
| POST | `/bookings/request` | Request a booking slot |
| GET | `/bookings/upcoming` | Get upcoming sessions |
| DELETE | `/bookings/:id` | Cancel a booking |

### 5.6 Events Service — `/api/v1/events`

| Method | Route | Description |
|---|---|---|
| GET | `/events` | List events (filterable) |
| GET | `/events/:id` | Get event detail |
| POST | `/events` | Create event |
| POST | `/events/:id/rsvp` | RSVP to event |
| DELETE | `/events/:id/rsvp` | Withdraw RSVP |

---

## 6. Database Schema (PostgreSQL)

```sql
-- Users & Auth
users (id, email, password_hash, provider, provider_id, created_at)
profiles (id, user_id, username, full_name, avatar_url, headline, bio, location,
          domain, experience_years, commitment, visibility, created_at, updated_at)
skills (id, name)
profile_skills (profile_id, skill_id)
profile_intent (profile_id, intent_type) -- e.g. cofounder, advisor, etc.

-- Social links
profile_links (id, profile_id, platform, url)

-- Connections
connections (id, requester_id, receiver_id, status, created_at, updated_at)
-- status: pending | accepted | declined | blocked

-- Messaging
conversations (id, created_at)
conversation_participants (conversation_id, user_id)
messages (id, conversation_id, sender_id, content, read_at, created_at)

-- Bookings
availability_slots (id, user_id, day_of_week, start_time, end_time)
bookings (id, host_id, guest_id, scheduled_at, duration_mins, status, session_id)

-- Events
events (id, host_id, title, description, format, domain, starts_at, ends_at,
        location_url, created_at)
event_rsvps (event_id, user_id, created_at)

-- Notifications
notifications (id, user_id, type, payload_json, read_at, created_at)

-- AI signals
interaction_signals (id, actor_id, target_id, signal_type, created_at)
-- signal_type: view | skip | connect | message | book
```

---

## 7. AI Embedding Engine

### 7.1 Profile Embedding

When a user completes onboarding or updates their profile, generate a text embedding from:

```
"{full_name} is a {headline}. {bio}. Skills: {skills_list}. 
Domain: {domain}. Looking for: {intent_list}. 
Commitment: {commitment}. Location: {location}."
```

Store the embedding vector in **Pinecone** with the `user_id` as the record ID and profile metadata as filterable fields.

### 7.2 Feed Ranking

1. Query Pinecone with the current user's embedding vector → returns top-N cosine-similar profiles
2. Filter out: already connected, pending requests, blocked users
3. Apply signal re-ranking: boost profiles with shared interaction signals, penalise skipped profiles
4. Return ranked list to frontend

### 7.3 Signal Processing

On every `interaction_signal` write:
- Aggregate signals weekly per user pair
- Adjust ranking weights: connect/message = strong positive, skip = mild negative, view = neutral
- Re-query Pinecone periodically (or on next feed load) with signal-adjusted weights

---

## 8. Real-time Layer (Socket.io)

### Events

| Event | Direction | Payload |
|---|---|---|
| `join_room` | client → server | `{ conversationId }` |
| `send_message` | client → server | `{ conversationId, content }` |
| `receive_message` | server → client | `{ messageId, senderId, content, createdAt }` |
| `typing_start` | client → server | `{ conversationId }` |
| `typing_stop` | client → server | `{ conversationId }` |
| `user_typing` | server → client | `{ userId, conversationId }` |
| `message_read` | client → server | `{ messageId }` |
| `notification` | server → client | `{ type, payload }` |
| `presence_update` | server → client | `{ userId, status }` |

---

## 9. User Journey (End-to-End)

```
Sign up (OAuth / email)
  ↓
Onboarding wizard (4 steps) → embedding generated
  ↓
Discovery feed (AI-ranked profile cards)
  ↓
  ├─ Connect path:
  │    Send connect → mutual accept → chat opens → book call → video session
  │
  └─ Events path:
       Browse events → RSVP → attend event → meet attendees
  ↓
Interaction signals → re-rank feed → better matches over time
```

---

## 10. Build Roadmap

### Phase 1 — MVP (Build First)

- [ ] Auth: Google OAuth + Email/JWT
- [ ] Onboarding: 4-step wizard + embedding generation
- [ ] Profile: CRUD (bio, skills, domain, intent)
- [ ] Discovery feed: basic scroll, AI embedding ranked
- [ ] Connections: send/accept/decline requests
- [ ] Real-time chat: Socket.io + message persistence

### Phase 2 — Growth Features

- [ ] LinkedIn profile import (auto-fill onboarding)
- [ ] AI "Why this match?" explanation UI
- [ ] 1:1 booking system with calendar availability
- [ ] WebRTC video calls
- [ ] Events: creation, RSVP, live event chat
- [ ] Push/email notifications
- [ ] File attachments in chat

### Phase 3 — Scale & Monetisation

- [ ] Mobile app (React Native, shared API)
- [ ] Pro plan: unlimited connects, priority ranking, analytics
- [ ] Enterprise / team accounts
- [ ] Advanced admin dashboard with analytics
- [ ] Referral / invite system

---

## 11. Folder Structure (Next.js App Router)

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx               ← Landing
│   │   └── login/page.tsx
│   ├── (onboarding)/
│   │   └── onboarding/
│   │       ├── step-1/page.tsx
│   │       ├── step-2/page.tsx
│   │       ├── step-3/page.tsx
│   │       └── step-4/page.tsx
│   ├── (app)/                     ← Auth-required group
│   │   ├── layout.tsx             ← App shell + nav
│   │   ├── feed/page.tsx
│   │   ├── profile/
│   │   │   ├── [username]/page.tsx
│   │   │   └── edit/page.tsx
│   │   ├── connections/page.tsx
│   │   ├── messages/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── bookings/page.tsx
│   │   ├── call/[sessionId]/page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── settings/page.tsx
│   └── api/                       ← Next.js API routes (proxy to microservices)
│
├── components/
│   ├── ui/                        ← Button, Input, Badge, Modal, Skeleton, etc.
│   ├── layout/                    ← Navbar, Sidebar, Footer, AppShell
│   ├── feed/                      ← ProfileCard, FeedFilters, FeedGrid
│   ├── profile/                   ← ProfileHero, SkillTags, IntentBadge
│   ├── chat/                      ← ConversationList, MessageBubble, ChatInput
│   ├── bookings/                  ← CalendarPicker, SlotCard, UpcomingSession
│   └── events/                    ← EventCard, EventDetail, RSVPButton
│
├── lib/
│   ├── api.ts                     ← Axios/fetch wrapper
│   ├── socket.ts                  ← Socket.io client singleton
│   ├── auth.ts                    ← NextAuth config
│   ├── embeddings.ts              ← Pinecone query helpers
│   └── utils.ts
│
├── hooks/
│   ├── useSocket.ts
│   ├── useFeed.ts
│   ├── useMessages.ts
│   └── useProfile.ts
│
├── store/
│   └── index.ts                   ← Zustand global state
│
└── types/
    └── index.ts                   ← Shared TypeScript types
```

---

## 12. Key Implementation Notes

### Authentication
- Use `NextAuth.js` with `GoogleProvider` and `CredentialsProvider`
- On first OAuth login, check if profile exists — if not, redirect to `/onboarding/step-1`
- Store JWT in httpOnly cookie (not localStorage)

### Embedding Pipeline
- Run embedding generation as a background job after profile save (do not block the API response)
- Use a queue (BullMQ + Redis) for embedding jobs in production

### Feed Performance
- Cache feed results in Redis for 5 minutes per user
- Invalidate cache on new connection/skip signals
- Implement cursor-based pagination (not offset) for scalability

### Socket.io
- Authenticate socket connections using the same JWT from cookie
- Use Socket.io rooms per conversation ID
- Store user socket IDs in Redis for cross-server presence (if scaling to multiple nodes)

### Responsive Layout
- Sidebar collapses to bottom tab bar on mobile
- Messages page becomes full-screen on mobile (conversation list → tap → chat, back button to list)
- Profile cards go from 3-col grid to 1-col on mobile

### Accessibility
- All interactive elements keyboard-navigable
- ARIA labels on icon buttons
- Focus-visible styles on all focusable elements
- Color contrast ratio minimum 4.5:1 for all text

---

## 13. Environment Variables

```env
# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# AI
OPENAI_API_KEY=
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX=promatch-profiles

# Storage
S3_BUCKET=
S3_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# App
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SOCKET_URL=
```

---

*This document is the single source of truth for building ProMatch. Reference it for any architecture decision, component design, or API contract question.*
