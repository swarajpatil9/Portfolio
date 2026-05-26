# Project Overview

This project is a Vite + React + TypeScript single-page application for authentication, profile editing, and a personalized portfolio view. The app uses:

- `react-router-dom` for routing
- `zustand` for auth and profile state
- `tailwindcss` for styling
- `ogl` for the optional animated aurora background

## Root Structure

- `public/`: static assets served directly by Vite
- `src/`: application source code
- `package.json`: scripts and dependency definitions
- `vite.config.ts`: Vite build and chunk-splitting configuration
- `eslint.config.js`: ESLint rules
- `tsconfig*.json`: TypeScript configuration
- `index.html`: document shell, metadata, and font preconnect setup

## Source Architecture

The source tree is organized into five top-level areas under `src/`:

- `app/`: app bootstrap and route wiring
- `data/`: static app content such as portfolio content
- `shared/`: reusable UI, API utilities, and generic helpers
- `entities/`: stable domain models and persistence helpers
- `features/`: feature-owned pages, UI, validation, and store logic

## App Layer

### `src/main.tsx`

Vite entrypoint. It delegates immediately to the app bootstrap module.

### `src/app/main.tsx`

Creates the React root, loads global CSS, and renders the app.

### `src/app/App.tsx`

Wraps the application in `BrowserRouter` and renders the router.

### `src/app/router.tsx`

Defines route-level code splitting with lazy-loaded pages:

- `/login` -> login page
- `/register` -> registration page
- `/home` -> portfolio page
- `/profile` -> editable profile page

All routes render through a top-level `Suspense` boundary.

## Shared Layer

### `src/shared/ui/navigation/AppNavbar.tsx`

Reusable navigation shown on authenticated pages.

### `src/shared/ui/layout/SoftAurora.tsx`

Reusable shader-based aurora background built with OGL. It is loaded lazily so the effect does not block the initial page paint.

### `src/shared/lib/api/*`

Shared API client primitives and types used by feature APIs.

### `src/shared/utils/getInputClassName.ts`

Shared helper for consistent form input styling.

### `src/shared/utils/isValidEmail.ts`

Shared email validation helper reused by feature-level validation.

## Entity Layer

### `src/entities/user/model/types.ts`

Defines the `UserProfile` model and related types.

### `src/entities/user/model/createEmptyUserProfile.ts`

Builds a safe empty `UserProfile` value.

### `src/entities/user/model/normalizeUserProfile.ts`

Normalizes unknown persisted data into a complete `UserProfile` shape.

### `src/entities/user/lib/storage.ts`

Owns localStorage reads and writes for the user record and login flag.

### `src/entities/user/lib/tokenStorage.ts`

Separates token persistence from broader user-profile persistence.

## Feature Layer

### `src/features/auth/`

Owns authentication pages, fields, validation, API access, and state management:

- `pages/LoginPage.tsx`
- `pages/RegisterPage.tsx`
- `ui/AuthField.tsx`
- `ui/AuthLayout.tsx`
- `ui/LightRays.tsx`
- `api/authApi.ts`
- `model/validation.ts`
- `store/useAuthStore.ts`

`useAuthStore` coordinates login, registration, logout, hydration, and profile updates while delegating persistence to the user entity layer.

The login page also prefetches the portfolio page chunk during browser idle time so the transition to `/home` is faster after a successful sign-in.

### `src/features/portfolio/`

Owns the logged-in portfolio experience:

- `pages/PortfolioPage.tsx`
- `model/types.ts`
- `ui/PortfolioSidebar.tsx`
- `ui/SectionLabel.tsx`
- `ui/SocialIconLink.tsx`
- `ui/sections/*`

Portfolio content itself lives in `src/data/portfolio.content.ts` and is merged with persisted user data at render time.

`PortfolioPage.tsx` keeps the hero content eager, while below-the-fold sections such as experience, projects, skills, education, and contact are lazy-loaded behind a local `Suspense` boundary to reduce initial `/home` payload size.

### `src/features/profile/`

Owns the editable profile flow:

- `pages/ProfilePage.tsx`
- `api/profileApi.ts`
- `lib/imageUtils.ts`
- `model/config.ts`
- `model/validation.ts`
- `ui/ProfileFields.tsx`
- `ui/ProfileHero.tsx`
- `ui/ProfilePhotoSection.tsx`
- `ui/ProfileSidebar.tsx`

Profile-specific configuration, validation, and image helpers stay colocated with the profile feature.

## Build and Performance Notes

### `vite.config.ts`

The build config uses manual chunk splitting to keep heavy dependencies from shipping as one large bundle. Separate chunks are created for:

- `ogl`
- router dependencies
- `react-dom`
- `react` and `scheduler`
- `zustand`
- remaining third-party dependencies

### `index.html`

The document shell includes:

- portfolio metadata
- DNS prefetch for the resume host
- Google Fonts preconnect hints
- Inter font stylesheet loading with `display=swap`

### `src/features/portfolio/ui/sections/HomeHero.tsx`

The hero is tuned for perceived performance:

- the aurora effect is only enabled after mount and only on supported devices
- the profile image is marked for eager, high-priority loading
- the gradient background renders independently of the shader effect

## Runtime Flow

1. Vite starts from `src/main.tsx`.
2. `src/app/main.tsx` loads global styles and mounts the React app.
3. `src/app/App.tsx` creates the router boundary.
4. `src/app/router.tsx` lazy-loads the active page.
5. `useAuthStore` hydrates and manages auth/profile state.
6. The login page can prefetch the portfolio route chunk before navigation.
7. The portfolio page merges `src/data/portfolio.content.ts` with persisted user data.
8. Below-the-fold portfolio sections load after the hero so `/home` paints sooner.

## Notes

- Authentication remains primarily client-side and localStorage-based, which is acceptable for a demo but not for production-grade security.
- The codebase favors feature colocation so related UI, validation, APIs, and state stay together.
- The current structure is optimized for incremental growth without moving generic helpers into feature folders or feature logic into shared code too early.
