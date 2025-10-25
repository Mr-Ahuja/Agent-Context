CoFrame Constructor Notes (Maintainers)

Overview
This document records how CoFrame is set up in this repo, how inheritance and mixins work here, and our change control and migration approach.

Files
- Semantics:
  - `coframe/semantics.base.json` (v1.0.0): core keys and operators.
  - `coframe/semantics.web.json` (v1.0.0): extends base; adds `ui.background` and `op.ui.starry`.
- Templates:
  - `templates/spa.base.cft.json` (v1.0.0): SPA use‑case with build/deploy/UI choices.
- Implementations:
  - `implementations/my-spa.cfi.json` (v1.0.0): concrete, example SPA choices.

Inheritance, Mixins, Overrides
- extends: a document may inherit from a parent (path#version). We apply fields from parent first.
- mixins: small, reusable JSON patches applied in order (none currently in repo; add under `traits/` if needed).
- overrides: final patch applied last to settle conflicts or pin values.
- Merge order: extends → mixins[] → self fields → overrides.
- Default merge behavior: scalars replace; objects deep‑merge; arrays append (use `merge.hints` to change, e.g., replace patterns).

Versioning Policy (semver)
- Semantics: bump minor for additive keys/operators; major for protocol changes; patch for doc clarifications.
- Templates: bump minor for additive enum values (with bindings); major for breaking menu changes; patch for notes.
- Implementations: bump minor for new params/fields; major for value changes that alter behavior; patch for copy edits.

Change Control
- Template enums and Semantics operators require maintainer review.
- Implementations can be approved by product owners/leads.
- If a change breaks a Template or Semantics behavior, bump version and add a Migration note below.

Migration Notes
- 1.0.0 → (future): If migrating SPA from CRA to Vite, update Implementation `build.strategy` from `react_cra` to `react_vite`, adjust `artifact.patterns` to `dist/**`, and ensure Vite config outputs static assets compatible with your deploy operator.

Quality Bar for Operators
- Deterministic: list exact files/paths/settings when applicable.
- Auditable: steps should be reproducible and verifiable by reading outputs.
- Tool‑agnostic Semantics: keep protocols generic; reference tools only in operators.

Writing a New Template
- Start from a similar Template; copy to `templates/<use>.cft.json`.
- Enumerate required keys; for enums, bind each value to a Semantics operator.
- Provide sensible defaults (e.g., `artifact.patterns`).
- Keep `notes` crisp on what success looks like.

Writing a New Implementation
- Copy an existing `.cfi.json`; set `implements` path#version.
- Choose allowed values; fill `runtime.commands` and `artifact.patterns`.
- Provide `params` for operators where helpful.
- Add a short `why` for future maintainers.

