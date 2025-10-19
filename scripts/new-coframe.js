#!/usr/bin/env node
const { writeFileSync, mkdirSync, existsSync, readFileSync } = require('fs');
const { resolve, dirname } = require('path');
function arg(name, def){ const i = process.argv.findIndex(a=>a===`--${name}`); return i>-1 && process.argv[i+1] ? process.argv[i+1] : def; }
function sanitizeName(s){ return (s||'').trim().replace(/\s+/g,'-'); }
function ensureDir(p){ if (!existsSync(p)) mkdirSync(p,{recursive:true}); }
function write(p, data){ ensureDir(dirname(p)); writeFileSync(p, data, 'utf8'); console.log('write', p); }
function loadJson(p){ return JSON.parse(readFileSync(p,'utf8')); }
const nameInput = arg('name'); if (!nameInput){ console.error('Usage: node scripts/new-coframe.js --name "My-Co-Frame" [--scope "Domain"]'); process.exit(1); }
const scope = arg('scope',''); const name = sanitizeName(nameInput); const root = process.cwd(); const base = resolve(root,'coframes',name);
const manifest = { name, version:'1.0.0', requires:{ template:[ 'template.manifest.json','uiux/tokens.css','uiux/brand-guidelines.md','uiux/components.md','uiux/patterns.md' ], dev:['dev/deployment.md','dev/git.md','dev/ci.md'] }, validation:{ mustInclude:['uiux/tokens.css','uiux/brand-guidelines.md'], denyOverrides:['uiux/components.md'], allowedOverrides:['uiux/tokens.css'] } };
const decl = `# Co-Frame: ${name}\n\nScope: ${scope || '(describe domain/surface)'}\n\nDefines how a Template is declared, used, versioned, and changed.\n`;
const changes = `# Changes Process\n\n1) Propose change with impact analysis\n2) Update template files and MIGRATION.md\n3) Bump version (semver)\n4) Validate against coframe.manifest.json\n`;
const prompt = `# Constructor Prompt — ${name}\n\nSystem: You are a UI/UX generator that obeys this Co-Frame. Produce output that conforms to the Template and only allow permitted overrides.\n\nInputs\n- Project Name: {{PROJECT_NAME}}\n- Domain: {{DOMAIN}}\n- Prefer Template: (choose relevant)\n\nInclude\n- templates/<Template>/uiux/* (tokens.css/json, brand-guidelines.md, components.md, patterns.md)\n- templates/<Template>/dev/* (deployment, git, ci)\n\nProcess\n1) Summarize visual language and constraints from Template.\n2) Define IA and sections for {{DOMAIN}}.\n3) Map components to screens; note any token overrides needed.\n4) Emit skeleton HTML/CSS and React snippets; respect mobile and accessibility.\n5) Provide deployment steps (Pages or Firebase) from dev docs.\n`;
write(resolve(base,'coframe.manifest.json'), JSON.stringify(manifest,null,2));
write(resolve(base,'declaration.md'), decl);
write(resolve(base,'changes.md'), changes);
write(resolve(base,'constructor/CONSTRUCTOR-PROMPT.md'), prompt);
try{
  const schemaPath = resolve(root,'schema/context.manifest.json'); const schema = loadJson(schemaPath); schema.coframes = schema.coframes || {}; schema.coframes[name] = `coframes/${name}/coframe.manifest.json`; write(schemaPath, JSON.stringify(schema,null,2)); console.log('Registered in schema.context.manifest.json');
}catch(e){ console.warn('WARN: schema update failed:', e.message); }
console.log('\nCoframe created:', name, '\nNext: npm run validate');
