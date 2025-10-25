Constructor Helper (For Models/Agents)

Purpose
- Guide any model/agent to author, extend, or migrate CoFrame documents (Semantics, Templates, Implementations) in this repo with minimal ambiguity and safe changes.

Quick Glossary
- Semantics: The rulebook — what keys mean and how to evaluate them.
- Template: The menu — allowed values and bindings to operators from Semantics.
- Implementation: The choices — concrete selections for a project, with commands and params.

Where Things Live
- Semantics: `coframe/semantics.base.json`, `coframe/semantics.web.json`
- Templates: `templates/*.cft.json` (e.g., `templates/spa.the-choosen-one.cft.json`)
- Implementations: `implementations/*.cfi.json` (e.g., `implementations/the-choosen-one.cfi.json`)
- CI Deploy: `.github/workflows/pages.yml` (GitHub Pages via Actions)

Baseline Rules (Always)
- Respect Semantics: Do not invent new keys unless necessary. Prefer adding to Templates/Implementations.
- If adding keys: document in Semantics (desc + protocol) and add Template requires/defaults.
- Keep diffs small and focused; observe `policies.write_allowlist` from Semantics.
- Versioning: Bump versions (semver) if behavior or contract changes; add notes to `CONSTRUCTOR.md` when breaking.

Minimal Inputs to Collect
- use_case: e.g., `spa`, `api`.
- framework/runtime: e.g., `react`, `vite`.
- build_commands: install/build/dev/test/lint.
- artifact_patterns: e.g., `dist/**`.
- deploy_strategy: e.g., `github_actions_pages`.
- optional_ui: theme/style choices (e.g., `ui.theme`, `ui.buttons.style`, `ui.buttons.icons`).

Create/Update Flow
1) Template selection
- If the use-case matches an existing Template (e.g., `templates/spa.the-choosen-one.cft.json`), reuse it.
- If not, copy a close template, rename, set `template` + `version`, adjust `requires` and `defaults`.

2) Add operators (rare)
- Only when a new behavior is needed. Add in `coframe/semantics.*.json` under `operators`.

3) Implementation authoring
- Create `implementations/<name>.cfi.json` with:
  {
    "implements": "templates/<template>.cft.json#<version>",
    "name": "<name>",
    "version": "1.0.0",
    "<required keys>": <values>,
    "runtime.commands": { "install": "...", "build": "..." },
    "artifact.patterns": ["..."],
    "params": { "op.deploy.gha.pages": { "working_dir": "...", "artifact_path": "..." } }
  }

4) CI setup (Pages)
- If `deploy.strategy = github_actions_pages`, ensure `.github/workflows/pages.yml` exists and matches `working_dir` + `artifact_path`.

5) Validate
- Read the Template `requires`; ensure Implementation provides each key.
- For enum keys: verify chosen value is allowed and (if bound) the operator exists in Semantics.
- Run install/build locally or via CI; check `artifact.patterns` exist.

6) Version & notes
- If you changed Template/Semantics behavior: bump `version` and add a migration note in `CONSTRUCTOR.md`.

Safety Checklist
- Do not edit outside: `templates/**`, `implementations/**`, `.github/workflows/**`, `coframe/**`, `site/**`.
- Keep PR/commit descriptions short with a clear “why”.

Common Patterns (This Repo)
- SPA (React + Vite):
  - Template: `templates/spa.the-choosen-one.cft.json`
  - Implementation: `implementations/the-choosen-one.cfi.json`
  - UI keys used: `ui.theme`, `ui.buttons.layout`, `ui.buttons.style`, `ui.buttons.icons`, `ui.footer.attribution`, `ui.responsive.policy`, `ui.logo.size`, `ui.assets.*`

Commit Message Suggestions
- feat(template): add <name> template with <values>
- feat(impl): add <impl-name> for <template>
- chore(ci): configure pages workflow for <impl>

