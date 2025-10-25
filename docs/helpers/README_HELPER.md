README Helper (For Models/Agents)

Goal
- Provide a concise map to explain CoFrame to contributors and guide adding a new Implementation.

Explain CoFrame in One Paragraph
- CoFrame is a tiny, repo‑local convention: Semantics define what keys mean (protocols), Templates define allowed values for a use‑case and bind those values to behaviors, and Implementations make concrete choices for this repo with commands and params. It’s tool‑agnostic documentation that keeps decisions explicit and easy to review.

Where to Point People
- Semantics: `coframe/semantics.base.json`, `coframe/semantics.web.json`
- Template (SPA example): `templates/spa.the-choosen-one.cft.json`
- Implementation (example): `implementations/the-choosen-one.cfi.json`
- Site (demo): `site/coframe` (builds to `site/coframe/dist`)

How to Add a New Implementation (5 steps)
1) Copy `implementations/the-choosen-one.cfi.json` to a new file.
2) Set `implements` to your target Template path#version.
3) Choose valid values for all keys listed in Template `requires` (e.g., `build.strategy`, `deploy.strategy`).
4) Fill `runtime.commands` and `artifact.patterns` to match your project.
5) (If deploying via Pages) Keep `.github/workflows/pages.yml` in sync with `working_dir` and `artifact_path`.

How to Propose a New Template Value
1) Edit the appropriate Template in `templates/`.
2) Add an enum value and bind it to an operator from Semantics.
3) If you need a new operator, add it to `coframe/semantics.*.json` with deterministic steps.
4) Open a PR; include why and what changes for contributors.

What “Good” Looks Like (acceptance)
- install + build succeeds with declared commands.
- produced artifacts match `artifact.patterns`.
- if deployment changes, CI matches Implementation params and branch.
- docs updated if UX changes (README, Implementation `why`).

PR Template (short)
- Summary: what changed and why.
- Template: mention any added values + bindings.
- Implementation: list key choices.
- Validation: build output paths verified; (optional) URL if deployed.

