CoFrame Site (SPA)

Description
- Context Framework • Template • Project — LLM‑ready design + dev governance for consistent apps.

Tech
- React + Vite. Output in `dist/` (for GitHub Pages).

Scripts
- `pnpm dev` — Run local dev server.
- `pnpm build` — Build static assets to `dist/`.
- `pnpm preview` — Preview built site.

Deploy (Git CLI → gh-pages)
- Ensure your repo has a `gh-pages` branch and Pages is configured to serve from it.
- Build: `pnpm build`
- Publish (one approach):
  1. `git worktree add -f .gh-pages gh-pages`
  2. Copy `dist/*` to `.gh-pages/` (use your platform’s copy tool)
  3. `cd .gh-pages && git add . && git commit -m "chore: publish site" && git push origin gh-pages && cd ..`
  4. `git worktree remove .gh-pages`

Notes
- The homepage links to this repo’s CoFrame Semantics, Template, and Implementation.
- Theme: the‑choosen‑one (shared tokens and look & feel).

