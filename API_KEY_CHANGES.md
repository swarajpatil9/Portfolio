# API Key Change Guide

This file explains how to update the app when a new API key is provided.

## 1) Store the key in environment variables

For Vite apps, use variables that start with `VITE_`.

Create a local env file (not committed):

```bash
# .env.local
VITE_API_KEY=your_new_api_key_here
VITE_API_BASE_URL=https://api.example.com
```

## 2) Read the key in code

Use `import.meta.env` in React/TypeScript files:

```ts
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
```

## 3) Use the key in API requests

Example:

```ts
await fetch(`${baseUrl}/endpoint`, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});
```

## 4) If a new key is given

1. Open `.env.local`.
2. Replace `VITE_API_KEY` with the new value.
3. Restart the Vite dev server.

## 5) Security checklist

- Do not hardcode keys in source files.
- Do not commit `.env.local`.
- Keep example placeholders only in `.env.example` if you add one.

## 6) Build verification

Run:

```bash
npm run build
```

If build succeeds, the env setup is valid for production build-time injection.
