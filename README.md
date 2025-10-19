# Agent-Context (Co-Frame • Template • Project)
[![Deploy Pages](https://github.com/Mr-Ahuja/Agent-Context/actions/workflows/pages.yml/badge.svg)](https://github.com/Mr-Ahuja/Agent-Context/actions/workflows/pages.yml)

A pragmatic, LLM‑friendly way to standardize UI/UX and dev practices across apps. It encodes your design system and operating rules so future projects inherit the same aesthetic, structure, and deployment playbook — with room for small, safe overrides.

## What
- Co‑Frame (Context‑Framework)
  - The governance for Templates: what files are required, how changes happen, what overrides are allowed, and the constructor prompts LLMs should follow.
- Template
  - A concrete, versioned bundle (design + dev) that conforms to a Co‑Frame. Holds UI/UX tokens, guidelines, components/patterns, starter code/snippets, and dev guidance (deployment, git, CI). Projects are created from Templates.
- Project
  - The real artifacts produced from a Template. Projects pin a template/version and add minimal, explicit overrides.

## Why
- Consistency: Every new app looks/behaves the same where it should (tokens, components, motion), and differs only where it must (explicit overrides).
- Speed: LLMs get the exact files and rules to generate high‑quality scaffolds quickly.
- Safety: Co‑Frame rules prevent accidental divergence; versioning + migration notes enable evolving without chaos.

## How
- Pick a Co‑Frame and Template, then either: (a) provide the files to an LLM using our constructor prompt; (b) scaffold a project, keeping any overrides explicit.

### This Repository at a Glance
- coframes/Project-Macro-Applications
  - coframe.manifest.json — required template files + validation/override rules
  - declaration.md — how Templates are declared/used/changed
  - changes.md — change process + semver
  - constructor/CONSTRUCTOR-PROMPT.md — fill‑in prompt for LLMs
- templates/The-Chosen-One (Template)
  - template.manifest.json — Template metadata + entries
  - uiux/
    - tokens.css / tokens.json — design tokens (dark‑first, light fallback)
    - brand-guidelines.md — Horus + CURLs baseline aesthetic
    - components.md, patterns.md — canonical specs and interactions
    - scripts/constellation.js — responsive constellation background
    - snippets/html/hero.html, snippets/react/Hero.tsx — starters
  - dev/
    - deployment.md — GitHub Pages / Firebase
    - git.md — branch & commit conventions
    - ci.md — validation & deployment
    - workflows/pages.yml, workflows/firebase.yml — sample CI
  - site/index.html — small demo page
- projects/The-Chosen-One (Project‑level reference)
  - brand-guidelines.md, tokens.css / tokens.json — for direct LLM use and minimal overrides
- shared/
  - components.md, patterns.md — canonical specs
  - scripts/constellation.js — shared utility
  - snippets/react — small set of React starters
- prompts/LLM-PROMPT-GUIDE.md — exactly what to feed LLMs + constructor pointer
- schema/context.manifest.json — machine‑readable index for tools/CI

## Quickstart (LLM)
- Prefer: Template "The‑Chosen‑One" under Co‑Frame "Project‑Macro‑Applications".
- Include files (at minimum):
  - templates/The-Chosen-One/uiux/tokens.css (and tokens.json)
  - templates/The-Chosen-One/uiux/brand-guidelines.md
  - templates/The-Chosen-One/uiux/components.md
  - templates/The-Chosen-One/uiux/patterns.md
  - Optional: templates/The-Chosen-One/uiux/scripts/constellation.js
- Use the constructor prompt: coframes/Project-Macro-Applications/constructor/CONSTRUCTOR-PROMPT.md
- Apply any Project‑specific overrides explicitly (tokens only, by default).

## Quickstart (Human)
1) Choose Template: templates/The-Chosen-One
2) Copy starters (snippets, site) into your app or point your generator at these files
3) Pick deployment
   - GitHub Pages → use dev/workflows/pages.yml and a /site (or /docs) folder
   - Firebase Hosting → use dev/workflows/firebase.yml and add FIREBASE_TOKEN secret
4) Protect main branch (PRs only) and use conventional commits

## UI/UX Aesthetic (The‑Chosen‑One)
- Dark‑first, Inter font, capsule buttons, glass panels (blur + subtle borders)
- Radial gradient background with responsive constellation animation
- Components are canonical; override via tokens only unless the Template is versioned

## Versioning & Change Management
- Co‑Frame and Template use semver. Projects pin a Template version in their own manifest.
- Template changes come with MIGRATION guidance (add a MIGRATION.md per future change).

## Extending
- Add a new Co‑Frame under coframes/ if you need a different governance model.
- Add a new Template under templates/ conforming to a Co‑Frame.
- Scaffold Projects that pin your chosen Template.

## Roadmap
- Add validation scripts (CI) to auto‑check Templates against the Co‑Frame manifest
- Add a small CLI to scaffold Projects from Templates and write project manifests
- Expand framework snippets (Next.js/Vite) and tokens.json usage in build systems

## Create a New Framework (Co-Frame)
- Process: coframes/PROCESS.md
- Prompt: coframes/CONSTRUCTOR-PROMPT.md
- After creation: register under schema/context.manifest.json and validate with npm run validate

### Co-Frame CLI
- Create new: npm run new:coframe -- --name "My-Co-Frame" --scope "Domain"
- Register existing: npm run register:coframe -- --name "My-Co-Frame" --path coframes/My-Co-Frame/coframe.manifest.json
### Template & Project CLI
- New template: npm run new:template -- --name "My-Template" --coframe "Project-Macro-Applications" [--from "The-Chosen-One"]
- New project: npm run new:project -- --name "My-Project" --template "The-Chosen-One"
### Template & Project Registration/Scaffold
- Register template: npm run register:template -- --name "Template-Name" [--path templates/Template-Name/template.manifest.json]
- Scaffold app (vanilla): npm run scaffold:project-app -- --project "My-Project" --template "The-Chosen-One"

### Local Validation
Run locally only: 
pm run validate. CI validation is disabled by default and can be triggered manually via the 'Validate Templates' workflow.
