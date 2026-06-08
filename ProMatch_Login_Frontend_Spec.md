# ProMatch — Login Pages Frontend Specification
### Three Role-Based Authentication Interfaces: Student · Professional · Organization

> **Document Purpose:** Full frontend design & development specification for the three ProMatch login pages. This covers UI/UX design direction, component breakdown, layout structure, interactions, animations, form logic, routing, and code architecture — everything needed to build from scratch.

---

## 1. Overview & Context

ProMatch is a professional co-founder matching platform ("Tinder × LinkedIn"). The platform serves three distinct user types, each with a different mental model, goal, and dashboard destination:

| Role | Who They Are | Where They Land After Login |
|---|---|---|
| **Student** | College students, graduates, hackathon builders | `/student/home` — Match stats, swipe feed preview, skill radar |
| **Professional** | Experienced founders, engineers, advisors | `/pro/overview` — KPI strip, priority match queue, pipeline kanban |
| **Organization** | GDGs, incubators, accelerators, startup clubs | `/org/dashboard` — Cohort overview, hosted events, team connections |

Rather than one generic login page, ProMatch has **three dedicated login portals** — each with its own visual identity, copy tone, and feature highlights, while sharing a unified design system.

---

## 2. Design System (Shared Across All Three Pages)

### 2.1 Color Tokens

```css
/* tailwind.config.ts — extend colors */
colors: {
  coral:        "#FF4B6E",   /* Primary CTA, swipe/connect accent */
  "coral-light":"#FF6B87",
  "coral-soft": "#FFF0F3",
  blue:         "#0A66C2",   /* LinkedIn-trust anchor, Professional accent */
  "blue-soft":  "#EEF4FB",
  gold:         "#F5A623",   /* Organization / superconnect accent */
  "gold-soft":  "#FFF8EC",
  ink:          "#0D0D0D",   /* Primary text */
  mist:         "#F4F5F7",   /* Page background */
  "mist-dark":  "#E8EAED",
  slate:        "#6B7280",   /* Secondary text */
  white:        "#FFFFFF",
}
```

### 2.2 Typography

```css
/* Install via next/font/google in layout.tsx */
Display font:  "Bricolage Grotesque" — weights 400, 600, 800
Body font:     "Plus Jakarta Sans"   — weights 400, 500, 600
```

```css
/* Usage scale */
--text-hero:    clamp(2.5rem, 5vw, 4rem);   /* 40–64px */
--text-title:   clamp(1.5rem, 3vw, 2rem);   /* 24–32px */
--text-lead:    1.125rem;                    /* 18px */
--text-body:    1rem;                        /* 16px */
--text-label:   0.875rem;                    /* 14px */
--text-caption: 0.75rem;                     /* 12px */
```

### 2.3 Spacing & Radius

```css
--radius-card:   1.25rem;   /* 20px — main card radius */
--radius-input:  0.75rem;   /* 12px */
--radius-btn:    0.625rem;  /* 10px */
--radius-pill:   9999px;
--shadow-card:   0 8px 40px rgba(0,0,0,0.08);
--shadow-float:  0 24px 80px rgba(0,0,0,0.14);
```

### 2.4 Shared Components (build in `src/components/ui/`)

| Component | File | Used On |
|---|---|---|
| `<Button>` | `Button.tsx` | All three pages — CTA, OAuth |
| `<Input>` | `Input.tsx` | Email + Password fields |
| `<OAuthButton>` | `OAuthButton.tsx` | Google, LinkedIn sign-in |
| `<RoleCard>` | `RoleCard.tsx` | Role selector (landing redirect) |
| `<PasswordToggle>` | `PasswordToggle.tsx` | Show/hide password |
| `<FormError>` | `FormError.tsx` | Inline validation messages |
| `<Divider>` | `Divider.tsx` | "or continue with" separator |
| `<Logo>` | `Logo.tsx` | ProMatch wordmark + flame icon |

---

## 3. Page Architecture & Routing

### 3.1 File Structure (Next.js App Router)

```
src/app/
├── (public)/
│   ├── login/
│   │   ├── page.tsx              ← Role selector page (entry point)
│   │   ├── student/
│   │   │   └── page.tsx          ← Student login
│   │   ├── professional/
│   │   │   └── page.tsx          ← Professional login
│   │   └── organization/
│   │       └── page.tsx          ← Organization login
│   └── layout.tsx                ← No sidebar, no topbar
```

### 3.2 Navigation Flow

```
/login  (Role Selector)
   │
   ├──► /login/student        → on success → /student/home
   ├──► /login/professional   → on success → /pro/overview
   └──► /login/organization   → on success → /org/dashboard

New user (firstLogin: true):
   └──► /onboarding/step-1    (role pre-filled from login page)
```

### 3.3 Route Guard Logic (`src/middleware.ts`)

```typescript
// Redirect authenticated users away from login pages
// Redirect unauthenticated users away from dashboards
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const isLoginRoute = request.nextUrl.pathname.startsWith("/login");
  const isDashboardRoute = /^\/(student|pro|org)/.test(request.nextUrl.pathname);

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL("/student/home", request.url));
  }
  return NextResponse.next();
}
```

---

## 4. Role Selector Page (`/login`)

This is the **entry point** — users choose their identity before seeing any login form.

### 4.1 Layout

```
┌─────────────────────────────────────────────────────┐
│  [Logo]                                    [Back]   │  ← Topbar (minimal)
├─────────────────────────────────────────────────────┤
│                                                     │
│         🔥 ProMatch                                 │  ← Hero text
│    Find your co-builder.                           │
│                                                     │
│   ┌────────────┐  ┌────────────┐  ┌─────────────┐  │
│   │ 🎓         │  │ 💼         │  │ 🏢          │  │
│   │ Student    │  │Professional│  │Organization │  │
│   │            │  │            │  │             │  │
│   │ Hackathons,│  │ Co-founders│  │ Incubators, │  │
│   │ side proj, │  │ advisors,  │  │ GDGs, clubs │  │
│   │ early teams│  │ freelancers│  │             │  │
│   └────────────┘  └────────────┘  └─────────────┘  │
│                                                     │
│         Already have an account? Sign in →          │
└─────────────────────────────────────────────────────┘
```

### 4.2 Role Card Component (`<RoleCard>`)

Each card is a clickable `<button>` with hover and focus states:

```tsx
// Props
interface RoleCardProps {
  icon: string;           // emoji or icon component
  title: string;          // "Student" | "Professional" | "Organization"
  subtitle: string;       // short descriptor
  tags: string[];         // 2–3 audience tags
  accentColor: string;    // coral | blue | gold
  href: string;           // links to the specific login page
}
```

**Visual states:**
- **Default:** White card, subtle border (`border-mist-dark`), shadow-card
- **Hover:** Border color changes to accent, subtle lift (`translateY(-4px)`), shadow-float
- **Active (pressed):** Scale down slightly (`scale(0.98)`)
- **Focus (keyboard):** Visible outline in accent color

**Animation (Framer Motion):**
```tsx
// Staggered entrance — cards animate in one by one
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
```

---

## 5. Student Login Page (`/login/student`)

### 5.1 Visual Identity

| Property | Value |
|---|---|
| **Accent color** | Coral `#FF4B6E` |
| **Background** | Soft warm white `#FFFBFB` with a faint coral mesh gradient (top-left corner) |
| **Illustration** | Animated card stack (3 stacked cards, subtle float animation) — right panel |
| **Tone** | Energetic, youthful, exciting |
| **Tagline** | *"Your next co-founder is one swipe away."* |

### 5.2 Page Layout (Desktop — Split Screen)

```
┌─────────────────────────────────────────────────────────────────┐
│                         │                                       │
│   LEFT PANEL (50%)      │   RIGHT PANEL (50%)                   │
│   (Form side)           │   (Visual side)                       │
│                         │                                       │
│  [🔥 ProMatch]          │                                       │
│                         │   [Floating card stack animation]     │
│  Welcome back, builder  │                                       │
│  Sign in to your        │   Card 1 (front): Profile card        │
│  student account        │     Avatar, Name, Skills, Match %     │
│                         │   Card 2 (behind, rotated -4deg)      │
│  [Google OAuth btn]     │   Card 3 (behind, rotated +6deg)      │
│  [LinkedIn OAuth btn]   │                                       │
│  ─── or ───             │   "10,000+ builders. Find yours."     │
│  [Email input]          │                                       │
│  [Password input]       │   ┌──────────────────────────────┐    │
│  [Forgot password?]     │   │ 🎓 Students from 200+ colleges│    │
│                         │   │ 🤝 5,000+ connections made    │    │
│  [Sign In btn — coral]  │   │ ⚡ 72hr avg. to first match   │    │
│                         │   └──────────────────────────────┘    │
│  Don't have an account? │                                       │
│  Join as a Student →    │                                       │
│                         │                                       │
│  ← Back to role select  │                                       │
│                         │                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Mobile Layout

On mobile (`< 768px`), the right panel collapses. The form takes full width. A compact header strip with the tagline and a small card icon replaces the illustration.

```
┌──────────────────────────┐
│ 🔥 ProMatch   [← Back]  │
├──────────────────────────┤
│ 🎓 Student Login         │
│ Your next co-founder     │
│ is one swipe away.       │
├──────────────────────────┤
│ [Google]  [LinkedIn]     │
│ ─── or continue ───      │
│ [Email field]            │
│ [Password field] [👁]    │
│         Forgot password? │
│ [Sign In]                │
│ No account? Join →       │
└──────────────────────────┘
```

### 5.4 Right Panel — Animated Card Stack

Build as a CSS-only or Framer Motion animation:

```tsx
// Three cards layered with CSS transforms
// Front card slowly floats (keyframe: translateY -8px to 0, loop)
// Back cards have static rotation
<div className="relative h-96 w-72">
  {/* Card 3 — furthest back */}
  <div className="absolute inset-0 rotate-6 scale-90 opacity-60 bg-white rounded-2xl shadow-card" />
  {/* Card 2 — middle */}
  <div className="absolute inset-0 -rotate-3 scale-95 opacity-80 bg-white rounded-2xl shadow-card" />
  {/* Card 1 — front, animated float */}
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 bg-white rounded-2xl shadow-float p-6"
  >
    {/* Mini profile card content */}
  </motion.div>
</div>
```

---

## 6. Professional Login Page (`/login/professional`)

### 6.1 Visual Identity

| Property | Value |
|---|---|
| **Accent color** | LinkedIn Blue `#0A66C2` |
| **Background** | Clean white `#FFFFFF` with a cool blue gradient mesh (top-right corner) |
| **Illustration** | Network graph / connection web (subtle SVG, right panel) |
| **Tone** | Confident, credible, serious |
| **Tagline** | *"Where serious builders find their technical co-founder."* |

### 6.2 Page Layout (Desktop — Split Screen)

```
┌─────────────────────────────────────────────────────────────────┐
│                         │                                       │
│   LEFT PANEL (50%)      │   RIGHT PANEL (50%)                   │
│   (Form side)           │   (Visual side — dark panel)          │
│                         │                                       │
│  [🔥 ProMatch]          │  [Dark gradient bg: ink → blue]       │
│                         │                                       │
│  Sign in as a           │  "The professional layer              │
│  Professional           │   LinkedIn never built."              │
│                         │                                       │
│  [Google OAuth btn]     │  ┌──────────────────────────────┐    │
│  [LinkedIn OAuth btn]   │  │  [Profile preview card]       │    │
│  ─── or ───             │  │  Name, Role, Match Score 94%  │    │
│  [Email input]          │  │  Skills: Python, Rust, ML     │    │
│  [Password input]       │  │  "Why this match?" tooltip    │    │
│  [Forgot password?]     │  └──────────────────────────────┘    │
│                         │                                       │
│  [Sign In — blue btn]   │  ✓ AI-ranked matches, not random     │
│                         │  ✓ Verified professional profiles     │
│  New here?              │  ✓ 1:1 video session booking          │
│  Join as Professional → │                                       │
│                         │                                       │
│  ← Back to role select  │                                       │
│                         │                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Key Differences from Student Page

- **Right panel is dark** (`bg-ink` with blue gradient overlay) — creates more gravitas
- **Feature checklist** replaces social proof stats — professionals want specifics
- **"Why this match?" tooltip** shown in the preview card — highlights the AI credibility
- **LinkedIn OAuth is featured more prominently** (listed first, slightly larger button) — professionals trust LinkedIn identity
- **Typography:** Larger, heavier weight headline — `Bricolage Grotesque 800`

### 6.4 LinkedIn OAuth Priority

```tsx
// Professional page: LinkedIn button comes FIRST
<div className="flex flex-col gap-3">
  <OAuthButton provider="linkedin" label="Continue with LinkedIn" size="lg" />
  <OAuthButton provider="google" label="Continue with Google" size="md" variant="secondary" />
</div>
```

---

## 7. Organization Login Page (`/login/organization`)

### 7.1 Visual Identity

| Property | Value |
|---|---|
| **Accent color** | Gold `#F5A623` |
| **Background** | Very light warm gray `#FAFAF8` |
| **Illustration** | Abstract grid / cohort dots visualization (right panel) |
| **Tone** | Institutional, trustworthy, community-forward |
| **Tagline** | *"Your community's builder network, supercharged."* |

### 7.2 Page Layout (Desktop — Centered Single Column)

Unlike Student and Professional (split-screen), Organization login uses a **centered card layout** — organizations are less frequent visitors, and the form-first approach reduces friction.

```
┌─────────────────────────────────────────────────────────────────┐
│  [🔥 ProMatch]                            [← Back to roles]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                ┌─────────────────────────────┐                 │
│                │  🏢  Organization Login      │                 │
│                │                             │                 │
│                │  "Your community's builder  │                 │
│                │   network, supercharged."   │                 │
│                │                             │                 │
│                │  [Google OAuth — large]     │                 │
│                │  ─── or use work email ─── │                 │
│                │  [Work email input]         │                 │
│                │  [Password input]    [👁]   │                 │
│                │  [Forgot password?]         │                 │
│                │                             │                 │
│                │  [Sign In — gold button]    │                 │
│                │                             │                 │
│                │  ─────────────────────────  │                 │
│                │  New organization?          │                 │
│                │  Apply for access →         │                 │
│                └─────────────────────────────┘                 │
│                                                                 │
│   ┌──────────────────────────────────────────────────────┐     │
│   │  Who uses the Org plan?                              │     │
│   │  GDG Chapters · Incubators · Accelerators · Clubs    │     │
│   └──────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Key Differences

- **No LinkedIn OAuth** — organizations log in with Google Workspace or work email
- **"Apply for access" CTA** instead of "Sign up" — org accounts are vetted, not self-served
- **Centered card layout** instead of split-screen — simpler, less frequent use case
- **Gold accent throughout** — differentiates from Student (coral) and Professional (blue)
- **"Who uses the Org plan?" strip** at the bottom — builds confidence for institutional visitors
- **Placeholder text:** `"name@gdgchennai.org"` — signals work/org email expectation

---

## 8. Shared Form Logic

### 8.1 Form State (React Hook Form + Zod)

```typescript
// src/lib/schemas/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

```tsx
// In each login page
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

### 8.2 Form Submission & API Call

```tsx
const onSubmit = async (data: LoginFormData) => {
  try {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // sends httpOnly cookie
      body: JSON.stringify({ ...data, role }),
    });

    const json = await res.json();

    if (json.firstLogin) {
      // New user — redirect to onboarding with role pre-filled
      router.push(`/onboarding/step-1?role=${role}`);
      return;
    }

    // Existing user — redirect to correct dashboard
    const dashboardMap = {
      student:      "/student/home",
      professional: "/pro/overview",
      organization: "/org/dashboard",
    };
    router.push(dashboardMap[role]);

  } catch (err) {
    // Show toast error
    toast.error("Sign in failed. Please check your credentials.");
  }
};
```

### 8.3 OAuth Flow

```tsx
// OAuthButton component
const handleOAuth = (provider: "google" | "linkedin") => {
  // The backend handles the OAuth redirect
  // Include role in state param so backend knows where to redirect
  window.location.href = `/api/v1/auth/oauth/${provider}?role=${role}`;
};
```

### 8.4 Input Component with Error State

```tsx
// src/components/ui/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  accent?: "coral" | "blue" | "gold";  // matches current login page
}

// Visual states:
// Default:  border-mist-dark, placeholder text in slate
// Focus:    border-{accent}, ring-2 ring-{accent}/20
// Error:    border-red-400, red helper text below
// Filled:   border-{accent}/50
```

---

## 9. Animations & Micro-interactions

### 9.1 Page Load Animation

All three pages use a **staggered entrance**:

```tsx
// Framer Motion — form elements animate in from bottom
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  })
};

// Each element gets a custom index: logo=0, headline=1, subtext=2, oauth=3, divider=4, email=5, pass=6, btn=7
```

### 9.2 Button Loading State

```tsx
// CTA button shows spinner while API call is in progress
<Button disabled={isSubmitting} className="w-full">
  {isSubmitting ? (
    <span className="flex items-center gap-2">
      <Spinner size="sm" /> Signing in...
    </span>
  ) : "Sign In"}
</Button>
```

### 9.3 Password Toggle

```tsx
// Eye icon inside the password input — toggles visibility
const [show, setShow] = useState(false);

<div className="relative">
  <input type={show ? "text" : "password"} {...register("password")} />
  <button
    type="button"
    onClick={() => setShow(!show)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink transition-colors"
  >
    {show ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</div>
```

### 9.4 Error Shake Animation

When form submission fails (wrong password), the form card shakes:

```tsx
const [shakeKey, setShakeKey] = useState(0);

// On error:
setShakeKey(k => k + 1);

// In JSX:
<motion.div
  key={shakeKey}
  animate={shakeKey > 0 ? { x: [-8, 8, -6, 6, -4, 0] } : {}}
  transition={{ duration: 0.4 }}
>
  {/* Form content */}
</motion.div>
```

### 9.5 Role-Specific Right Panel Animations

| Page | Right Panel Animation |
|---|---|
| Student | Card stack floats continuously (`y: [0, -10, 0]`, 3s loop) |
| Professional | Network nodes pulse softly (SVG `opacity: [0.4, 0.8, 0.4]`, 4s stagger) |
| Organization | Cohort grid dots fade in sequentially on page load |

---

## 10. Responsive Behavior

### 10.1 Breakpoint Strategy

```css
/* Tailwind breakpoints used */
sm:  640px   /* Compact mobile layout */
md:  768px   /* Tablet — stack vertically */
lg:  1024px  /* Split screen activates */
xl:  1280px  /* Wider panels, larger text */
```

### 10.2 Layout Shifts Per Breakpoint

| Breakpoint | Student / Professional | Organization |
|---|---|---|
| `< 768px` | Single column, no illustration | Single column, narrow card |
| `768px–1024px` | Single column, illustration hidden | Wider card, tagline visible |
| `> 1024px` | Full split-screen | Centered card + bottom strip |

---

## 11. Accessibility

All three login pages must meet **WCAG 2.1 AA**:

- All inputs have associated `<label>` elements (not just placeholder text)
- Error messages are announced via `aria-live="polite"` regions
- OAuth buttons have descriptive `aria-label` values: `"Sign in with Google"`, `"Sign in with LinkedIn"`
- Password toggle button has `aria-label` that changes: `"Show password"` / `"Hide password"`
- Focus order is logical: Logo → Headline → OAuth → Divider → Email → Password → Submit → Sign up link
- Color contrast: all text meets 4.5:1 minimum (coral and gold text on white backgrounds verified)
- Keyboard navigation: Enter key submits form, Escape clears errors
- Role cards on `/login` are `<button>` elements (not `<div>`) — keyboard and screen-reader accessible

---

## 12. State Management (Zustand)

```typescript
// src/stores/authStore.ts
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  role: "student" | "professional" | "organization" | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setRole: (role: AuthStore["role"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  role: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  logout: () => set({ user: null, role: null }),
}));
```

The `role` is set when the user selects their role on `/login` and persists through the login flow. It is used to:
1. Pre-fill the `role` param in OAuth redirect URLs
2. Determine dashboard redirect after successful login
3. Pre-select the role in the onboarding wizard if `firstLogin: true`

---

## 13. Error Handling & Edge Cases

| Scenario | Behavior |
|---|---|
| Wrong password | Form shakes, inline error: `"Incorrect password. Try again or reset it."` |
| Email not found | Inline error: `"No account found. Would you like to sign up?"` with a sign-up link |
| OAuth failure | Toast: `"Google sign-in failed. Try email instead."` |
| Network error | Toast: `"Connection issue. Check your internet and try again."` |
| Already logged in | Middleware redirects to correct dashboard before page renders |
| Wrong role (Student tries Professional page) | After login, backend sends correct role → redirect to correct dashboard |
| Account suspended | Toast: `"Your account has been suspended. Contact support."` |
| First login (new OAuth user) | Redirect to `/onboarding/step-1?role={role}` |

---

## 14. Build Order & Implementation Checklist

Build in this sequence for maximum efficiency:

### Phase 1 — Foundation
- [ ] Install fonts (`Bricolage Grotesque`, `Plus Jakarta Sans`) in `layout.tsx`
- [ ] Add color tokens to `tailwind.config.ts`
- [ ] Build shared UI components: `Button`, `Input`, `OAuthButton`, `Divider`, `FormError`
- [ ] Set up Zod schema (`loginSchema`) and React Hook Form integration
- [ ] Create `useAuthStore` (Zustand)
- [ ] Build `middleware.ts` route guard

### Phase 2 — Role Selector Page
- [ ] Build `RoleCard` component with hover animations
- [ ] Build `/login/page.tsx` with staggered card entrance

### Phase 3 — Student Login Page
- [ ] Build left panel (form side) with Framer Motion entrance
- [ ] Build animated card stack for right panel
- [ ] Wire up form submission → API → redirect logic
- [ ] Test OAuth flow (Google + LinkedIn)
- [ ] Mobile responsive layout

### Phase 4 — Professional Login Page
- [ ] Adapt left panel — update copy, button order (LinkedIn first)
- [ ] Build dark right panel with network animation
- [ ] Apply blue accent system-wide on this page

### Phase 5 — Organization Login Page
- [ ] Build centered card layout (different from split-screen)
- [ ] Build bottom org-type strip
- [ ] "Apply for access" link (not a standard sign-up)
- [ ] Gold accent system

### Phase 6 — Polish
- [ ] Error state animations (shake)
- [ ] Loading states on all buttons
- [ ] Password visibility toggle
- [ ] Accessibility audit (aria labels, focus order, contrast)
- [ ] Cross-browser test (Safari — important for WebKit differences in input styling)
- [ ] Mobile test on real devices

---

## 15. Quick Reference — Per-Page Summary

| | Student `/login/student` | Professional `/login/professional` | Organization `/login/organization` |
|---|---|---|---|
| **Accent** | Coral `#FF4B6E` | Blue `#0A66C2` | Gold `#F5A623` |
| **Layout** | Split screen | Split screen | Centered card |
| **Right panel** | Floating card stack (light bg) | Network/profile preview (dark bg) | Cohort dots grid |
| **OAuth order** | Google first, LinkedIn second | LinkedIn first, Google second | Google only |
| **Sign-up link** | "Join as Student →" | "Join as Professional →" | "Apply for access →" |
| **Tagline** | "Your next co-founder is one swipe away." | "Where serious builders find their technical co-founder." | "Your community's builder network, supercharged." |
| **Post-login route** | `/student/home` | `/pro/overview` | `/org/dashboard` |
| **First-login route** | `/onboarding/step-1?role=student` | `/onboarding/step-1?role=professional` | `/onboarding/step-1?role=organization` |

---

*ProMatch Frontend Spec — Login Pages v1.0*
*Based on ProMatch Build Manual v1.0 by Vyas S.*
