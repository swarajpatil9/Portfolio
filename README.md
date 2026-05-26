<h1 align="center">Portfolio</h1>

<p align="center">
  A personal portfolio web app built with React 19, TypeScript, and Vite — featuring authentication, an editable profile, and animated portfolio sections.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.6-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Zustand-5.0-433E38?style=flat-square" alt="Zustand" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Architecture Notes](#architecture-notes)

---

## Overview

This is a single-page application (SPA) that serves as a personal developer portfolio. It includes user authentication, a fully editable profile, and a portfolio showcase page with smooth section-based navigation and optional WebGL aurora background effects.

---

## Tech Stack

| Technology                                   | Version | Purpose                   |
| -------------------------------------------- | ------- | ------------------------- |
| [React](https://react.dev)                   | 19.2.6  | UI library                |
| [TypeScript](https://www.typescriptlang.org) | 6.0     | Static typing             |
| [Vite](https://vitejs.dev)                   | 8.0     | Build tool and dev server |
| [React Router](https://reactrouter.com)      | 7.15.1  | Client-side routing       |
| [Zustand](https://zustand-demo.pmnd.rs)      | 5.0.13  | Global state management   |
| [Tailwind CSS](https://tailwindcss.com)      | 4.3     | Utility-first styling     |
| [OGL](https://github.com/oframe/ogl)         | 1.0.11  | WebGL aurora background   |

---

## Features

- **Authentication** — Login and registration with client-side validation
- **Editable Profile** — Update name, bio, photo, and social links; changes persist across sessions
- **Portfolio Page** — Section-based layout: Hero, Experience, Projects, Skills, Education, Contact
- **Performance** — Lazy-loaded routes and below-the-fold sections; manual Vite chunk splitting
- **Offline-first** — Works fully in localStorage-only mode when no API is configured
- **Animated Background** — Shader-based aurora effect via OGL, only enabled on supported devices

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/swarajpatil9/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values (see Environment Variables section)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following:

| Variable            | Description                                  | Required |
| ------------------- | -------------------------------------------- | -------- |
| `VITE_API_BASE_URL` | Base URL of the REST API (no trailing slash) | No       |
| `VITE_API_KEY`      | Static API key sent via `x-api-key` header   | No       |

> **Note:** If `VITE_API_BASE_URL` is left empty, the app runs in **localStorage-only mode** with no network requests. This is the default for local development.

> **Security:** Never commit `.env.local` to source control. It is already listed in `.gitignore`.

---

## Available Scripts

```bash
npm run dev       # Start the Vite development server
npm run build     # Type-check and produce a production bundle
npm run lint      # Run ESLint across all source files
npm run preview   # Serve the production build locally
```

---

## Project Structure

```text
Portfolio/
├── public/               # Static assets served directly by Vite
├── src/
│   ├── app/              # App bootstrap, router, and route wiring
│   ├── data/             # Static portfolio content
│   ├── entities/         # Domain models and localStorage persistence helpers
│   │   └── user/
│   │       ├── lib/      # storage.ts, tokenStorage.ts
│   │       └── model/    # types, normalizers, factories
│   ├── features/         # Feature-owned pages, UI, validation, and state
│   │   ├── auth/         # Login, registration, auth store, validation
│   │   ├── portfolio/    # Portfolio page and all section components
│   │   └── profile/      # Profile page, API, image utils, validation
│   └── shared/           # Reusable UI, API client, and utility helpers
├── .env.example          # Environment variable template
├── vite.config.ts        # Vite config with manual chunk splitting
├── tsconfig.json         # TypeScript project references
└── index.html            # Document shell with font and metadata setup
```

---

## Architecture Notes

- **Feature-oriented layout** — UI, validation, API calls, and state are colocated inside each feature folder rather than split by layer.
- **Lazy loading** — All routes are code-split via `React.lazy`. Below-the-fold portfolio sections have an additional local `Suspense` boundary.
- **Chunk splitting** — `vite.config.ts` manually splits heavy dependencies (`ogl`, `react-dom`, `zustand`, router) into separate chunks to reduce initial load size.
- **Auth model** — Authentication is localStorage-based and intended for demo use. It is not suitable for production without a real backend session or JWT strategy.

For a full architectural breakdown, see [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md).

---

<p align="center">Made by <a href="https://github.com/swarajpatil9">Swaraj Patil</a></p>
