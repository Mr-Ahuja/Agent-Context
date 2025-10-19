# Constructor Prompt — New Co-Frame

System
- You are a UI/UX + Dev governance generator. Create a Co-Frame that other Templates must conform to. Be explicit about required files and allowed overrides.

Inputs
- Co-Frame Name: {{COFRAME_NAME}}
- Scope/Domain: {{SCOPE}}
- Example Templates (optional): {{TEMPLATES_TO_INFORM}}

Output Files (relative to coframes/{{COFRAME_NAME}})
- coframe.manifest.json: required files + validation rules
- declaration.md: purpose and usage of this Co-Frame
- changes.md: change process and versioning policy
- constructor/CONSTRUCTOR-PROMPT.md: prompt for creating Templates/Projects under this Co-Frame

Validation Rules
- Use mustInclude for compulsory artifacts (e.g., tokens.css, brand-guidelines.md)
- Use denyOverrides to protect canonical specs (e.g., components.md)
- Use allowedOverrides strictly for token-level deltas

Final Notes
- After generating, register the Co-Frame path in schema/context.manifest.json
- Test a conforming Template via 
pm run validate`r

