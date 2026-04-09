---
name: "omni-embed-docs"
description: "Use when the user asks about Omni embedding, signed SSO URLs, `@omni-co/embed` SDK usage, embed URL parameters, events, themes, vanity domains, session modes, or embed best practices; browse official `docs.omni.co/embed` pages and the npm package docs, cross-check this demo's embed implementation when relevant, and answer with source links."
---

# Omni Embed Docs

Use this skill for Omni embedding questions. Prefer official embed documentation and the `@omni-co/embed` package reference over general Omni docs or REST API docs.

## Quick Start

- Browse `https://docs.omni.co/embed` first.
- Use `https://www.npmjs.com/package/@omni-co/embed` when the question is specifically about SDK install details or package metadata.
- Read `references/routing.md` to choose the right documentation page quickly.
- Cross-check repo behavior in `src/lib/omni-embed.ts` and `src/pages/api/embed-url.ts` when the question is about this demo implementation.

## Workflow

1. Classify the request: setup, SSO flow, URL parameters, events, customization, admin, guides, or SDK usage.
2. Open the most relevant official doc page from `references/routing.md`.
3. If the question is about this repository, verify the current code path locally before answering.
4. Answer concisely and include source links.
5. Mark any repo-specific conclusion as an inference from local code rather than from the docs.

## Rules

- Prefer embed docs over `docs.omni.co/api` unless the user is explicitly asking about REST endpoints.
- Keep signed URL generation and secrets server-side.
- Cite the official docs you used.
- If the docs and repo code differ, call that out explicitly.

## Reference Map

- Read `references/routing.md` for topic-to-URL mappings and repo cross-check points.
