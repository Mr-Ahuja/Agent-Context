#!/usr/bin/env node
const { writeFileSync, mkdirSync, existsSync, readFileSync } = require('fs');
const { resolve, dirname } = require('path');
function arg(name, def){ const i = process.argv.findIndex(a=>a===`--${name}`); return i>-1 && process.argv[i+1] ? process.argv[i+1] : def; }
function ensureDir(p){ if (!existsSync(p)) mkdirSync(p, { recursive:true }); }
function write(p, data){ ensureDir(dirname(p)); writeFileSync(p, data, 'utf8'); console.log('write', p); }
function loadJson(p){ return JSON.parse(readFileSync(p,'utf8')); }

const name = arg('name');
const template = arg('template');
if (!name || !template){ console.error('Usage: node scripts/new-project.js --name "Project-Name" --template "The-Chosen-One"'); process.exit(1); }
const root = process.cwd();
const projRoot = resolve(root, 'projects', name);
const tplManifestPath = resolve(root, 'templates', template, 'template.manifest.json');
if (!existsSync(tplManifestPath)) { console.error('Template not found:', tplManifestPath); process.exit(1); }
const tpl = loadJson(tplManifestPath);
const tokensCss = `@import '../../templates/${template}/uiux/tokens.css';\n:root { /* overrides here */ }\n`;

write(resolve(projRoot,'README.md'), `# ${name} — Project\n\nTemplate: ${template} @ ${tpl.version}\n- Inherit tokens/components/patterns from template\n- Keep overrides minimal and explicit\n`);
write(resolve(projRoot,'project.manifest.json'), JSON.stringify({ name, template, templateVersion: tpl.version, overrides:{ tokens: `projects/${name}/overrides/tokens.css` } }, null, 2));
write(resolve(projRoot,'overrides/tokens.css'), tokensCss);
console.log('\nProject created:', name, '\nTemplate:', template, '\nNext: generate app code using template snippets');
