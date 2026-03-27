# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Next.js 14 demo for secure Omni embeds. Application pages and API routes live in `src/pages`, including the server-side signed URL endpoint at `src/pages/api/embed-url.ts`. Reusable UI lives in `src/components`, Omni SDK wrappers live in `src/lib`, shared types live in `src/types`, and global styles live in `src/styles`. Static assets such as `logo.png` and screenshots are stored in `public/`.

## Build, Test, and Development Commands
Use `npm install` to install dependencies. Use `npm run dev` to start the local app at `http://localhost:3000`. Use `npm run build` to create a production build, `npm run start` to serve that build, and `npm run lint` to run the Next.js ESLint checks. For environment troubleshooting during local development, `curl http://localhost:3000/api/test-env` verifies server-side config wiring.

## Coding Style & Naming Conventions
Use TypeScript for all changes. Follow the existing React style: functional components, `async`/`await`, and absolute imports via `@/`. Use `PascalCase` for components (`OmniEmbed.tsx`), `camelCase` for functions and variables, and descriptive file names that match the primary export. Match the existing formatting in the repo: concise comments, semicolons, and 2-space indentation in JSX and object literals. Run `npm run lint` before opening a PR.

## Testing Guidelines
There is currently no committed automated test suite or coverage gate. Until one is added, treat `npm run lint` as the minimum validation step and do a manual smoke test in `npm run dev`: load the demo page, switch users/content, and confirm `/api/embed-url` still returns signed URLs correctly. If you add tests later, keep them close to the feature they cover and name them after the unit or route under test.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects such as `Add support for application mode...`. Follow that pattern and keep each commit focused on one change. Pull requests should include a brief summary, manual test notes, linked issue or task when relevant, and screenshots for UI updates to `src/pages/index.tsx` or embedded rendering behavior.

## Security & Configuration Tips
Keep secrets only in ignored local env files such as `.env` or `.env.local`; never hard-code Omni secrets or expose them in client-side code. Any logic that generates signed embed URLs must remain server-side in `src/pages/api` or `src/lib/omni-embed.ts`.
