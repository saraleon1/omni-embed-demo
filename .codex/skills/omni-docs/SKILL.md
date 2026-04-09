---
name: "omni-docs"
description: "Use when the user asks about Omni platform documentation outside the narrow embed flow, including modeling, REST API, AI and MCP features, administration, permissions, connections, and platform setup; browse official `docs.omni.co` pages, prefer `$omni-embed-docs` for embed-specific questions, and answer with source links."
---

# Omni Docs

Use this skill for general Omni documentation questions. It covers the broader platform and explicitly routes embed-specific requests to the embed skill.

## Quick Start

- Browse `https://docs.omni.co` for official Omni documentation.
- Read `references/routing.md` to pick the right section quickly.
- If the request is primarily about embedding, switch to `$omni-embed-docs`.
- If the request is about this demo repository, cross-check local code after reading the docs.

## Workflow

1. Decide whether the request is about modeling, API, AI and MCP, administration, connections, or embedding.
2. For embedding, use `$omni-embed-docs` instead of handling it as a generic docs question.
3. Open the most relevant official page from `references/routing.md`.
4. Follow adjacent pages only if the first page is insufficient.
5. Answer concisely with source links.

## Rules

- Prefer official Omni docs over memory for product behavior.
- Prefer embed docs over REST API docs for embed questions.
- Keep repo-specific explanations grounded in local code, and label them as inferences when they are not explicitly documented.
- Cite the official docs you used.

## Reference Map

- Read `references/routing.md` for topic-to-URL mappings across the Omni docs.
