CoFrame – Human Framework (No Tools Required)

This repository uses CoFrame to describe how work should be done using three layers: Semantics (rulebook), Templates (menus), and Implementations (choices). Follow this guide to act consistently and keep decisions explicit and reviewable.

Scope
- Applies to this repo and subfolders unless otherwise noted.
- Do not change infrastructure/CI beyond the documented allowlist without approval.

Operating Principles
- Semantics own meaning and protocols; keep them tool-agnostic.
- Templates own allowed values and operator bindings; menus stay tight and clear.
- Implementations pick concrete values and parameters; keep them small and focused.
- Prefer deterministic, auditable steps with clear inputs/outputs.

What To Do (order of operations)
1) Install
- Ensure prerequisites for your chosen stack are available (e.g., Node, pnpm).
- Run the install command declared in the Implementation: `runtime.commands.install`.

2) Build
- Run the build command: `runtime.commands.build`.
- Verify artifacts exist and match `artifact.patterns`.

3) Test & Lint
- If commands are present, run `runtime.commands.test` and `runtime.commands.lint`.
- Fix failures before proceeding.

4) Deploy Prep
- Read `deploy.strategy` in the Implementation and its Template binding.
- If GitHub Pages is selected, ensure `.github/workflows/pages.yml` path matches params.

5) Review & Document
- Confirm postconditions in Semantics protocols are satisfied (build/deploy).
- Include a short “why” in PRs if choices change.

What Not To Do
- Do not add Template enum values without binding to an operator or including inline steps in the Template.
- Do not mix policy into Implementations; push reusable rules into Semantics or Templates.
- Do not touch directories outside the allowlist without maintainer approval.

Acceptance Checklist (tick before merging)
- Install/build complete with no errors.
- Produced artifacts match `artifact.patterns` and are committed/ignored as appropriate.
- If deployment files are added/changed, they match Implementation params and target branch.
- Docs updated if UX or behavior changes (README, Implementation `why`).
- Accessibility and performance validated if `ui.background` is used (contrast, budget).

How To Add a New Implementation
1) Copy `implementations/my-spa.cfi.json` to a new file.
2) Set `implements` to your target Template path#version.
3) Choose valid values for all Template `requires` keys.
4) Fill `runtime.commands` and `artifact.patterns` for your project.
5) Add optional `params` for bound operators (e.g., pages branch/path).

How To Propose a New Template Value
1) Edit the appropriate Template in `templates/`.
2) Add the enum value and bind it to an operator from Semantics.
3) If a new operator is needed, add it in Semantics with deterministic steps.
4) Open a PR with a brief rationale and expected outcomes.

Governance & Versioning
- Use semver for Semantics, Templates, and Implementations.
- Bump versions and add migration notes in `CONSTRUCTOR.md` if behavior changes.
- Keep Semantics compact (generic protocols); operators may reference tools.
- Use `provenance` for anything non-obvious or imported from external standards.

Merging & Ownership
- Changes to Semantics or Template enum sets require maintainer review.
- Implementations can be approved by product owners or leads.

Quality Bars
- Steps are explainable to a non-engineer (one short paragraph in PR).
- Operator steps are concrete: which file, what setting, what command.
- Arrays append by default; use `merge.hints` to override (e.g., replace patterns).

Safety Rails
- Write allowlist (documented in Semantics policies):
  - `templates/**`, `implementations/**`, `.github/workflows/**`, `apps/**`, `public/**`
- Max diff size: adhere to `policies.max_diff_lines` in Semantics.

Notes on UI Backgrounds
- If `ui.background=starry_night`, verify AA contrast, adequate motion performance, and fallbacks.

FAQ
- Why split values from meaning? Stable rules; flexible menus.
- Can we lock a brand decision? Yes—extend a Template and use overrides.
- How do we narrate outcomes? Read Implementation + Template + relevant Semantics, then summarize in PR.

