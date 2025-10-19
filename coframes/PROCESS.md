# Co-Frame Creation Process (Frameworks)

Goal
- Define a new governance model (Co-Frame) that Templates must conform to.

Steps
1) Name the Co-Frame and scope (e.g., Project-Macro-Applications)
2) Declare required files and rules in coframe.manifest.json
   - Required Template files (tokens, guidelines, components, patterns)
   - Required Dev files (deployment, git, ci)
   - Validation rules: mustInclude, denyOverrides, allowedOverrides
3) Write declaration.md (what this Co-Frame enforces; how Templates evolve)
4) Write changes.md (change proposal, semver policy, migration expectations)
5) Author constructor/CONSTRUCTOR-PROMPT.md (LLM prompt to generate conformant Templates/Projects)
6) Test: point an existing Template to this Co-Frame and run 
pm run validate`r
7) Register in schema/context.manifest.json under coframes`r

