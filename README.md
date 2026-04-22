# ProMatch Frontend

React + Vite frontend for the light ProMatch experience.

## Run It

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Main Routes

- `/` - public landing page
- `/login` - sign in
- `/signup` - create account
- `/forgot-password` - reset password
- `/onboarding/:step` - onboarding flow
- `/discover` - discovery feed
- `/matches` - connections hub
- `/chat/:matchId` - messaging
- `/booking/:professionalId` - session booking
- `/events/:eventId` - event detail
- `/profile/:userId` - profile page
- `/call/:sessionId` - call room

## Notes

- The active shell is [src/ProMatchDarkApp.jsx](src/ProMatchDarkApp.jsx).
- Shared theme tokens live in [src/promatch-dark.css](src/promatch-dark.css).
- Legacy dark-theme shells and unused styles have been removed.
