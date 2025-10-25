CoFrame Policy Docs for This Repo

What is CoFrame?
- CoFrame is a tiny, repo‑local convention for describing how work should be done using three layers:
  - Semantics (rulebook): meaning and protocols for keys like `build.strategy` and `deploy.strategy`.
  - Templates (menus): allowed values for a use‑case and bindings to operators.
  - Implementations (choices): concrete selections for this project with commands and params.

Why we use it
- Repeatability, clarity, and reviewability of decisions without prescribing a toolchain.
- Easy for contributors to understand “what good looks like.”

Where things live
- Semantics: `coframe/semantics.base.json`, `coframe/semantics.web.json`
- Templates: `templates/spa.base.cft.json`
- Implementations: `implementations/*.cfi.json` (e.g., `implementations/my-spa.cfi.json`)

Quick Start (Contributors)
1) Read `AGENTS.md` to understand the workflow and rules.
2) Pick a Template or create a new Implementation based on one.
3) Fill `runtime.commands` and `artifact.patterns` for your project.
4) Run install + build; verify artifacts exist.
5) If deploying, ensure config matches your Implementation params.

Add a New Implementation (5 steps)
1) Copy `implementations/my-spa.cfi.json`.
2) Set `implements` to your Template path#version.
3) Choose values that the Template allows for each required key.
4) Add `runtime.commands` and `artifact.patterns`.
5) Open a PR with a short “why”.

Propose a New Template Value
- Open a PR updating the Template:
  - Add the enum value.
  - Bind it to an existing operator or add a new operator in Semantics.

More
- Maintainer notes and versioning policy live in `CONSTRUCTOR.md`.

Helpers (for models/agents)
- Constructor helper: `docs/helpers/CONSTRUCTOR_HELPER.md` — how to assemble/update Semantics, Templates, and Implementations safely.
- README helper: `docs/helpers/README_HELPER.md` — how to explain CoFrame and guide contributors to add an Implementation.
