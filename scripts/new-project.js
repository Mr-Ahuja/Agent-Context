#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
function arg(n, d){ const i = process.argv.findIndex(a=>a==='--'+n); return i>-1 && process.argv[i+1] ? process.argv[i+1] : d; }
function ensureDir(p){ if (!fs.existsSync(p)) fs.mkdirSync(p,{recursive:true}); }
function write(p, data){ ensureDir(path.dirname(p)); fs.writeFileSync(p, data, 'utf8'); console.log('write', p); }
function loadJson(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
const name = arg('name'); const template = arg('template');
if (!name || !template){ console.error('Usage: node scripts/new-project.js --name "Project-Name" --template "The-Chosen-One"'); process.exit(1); }
const root = process.cwd(); const projRoot = path.resolve(root,'projects',name);
const tplManifestPath = path.resolve(root,'templates',template,'template.manifest.json'); if (!fs.existsSync(tplManifestPath)) { console.error('Template not found:', tplManifestPath); process.exit(1); }
const tpl = loadJson(tplManifestPath);
const tokensCss = '@import '../../templates/' + template + '/uiux/tokens.css';\n:root { /* overrides here */ }\n';
write(path.resolve(projRoot,'README.md'), '# ' + name + ' — Project\n\nTemplate: ' + template + ' @ ' + tpl.version + '\n- Inherit tokens/components/patterns from template\n- Keep overrides minimal and explicit\n');
write(path.resolve(projRoot,'project.manifest.json'), JSON.stringify({ name:name, template:template, templateVersion: tpl.version, overrides:{ tokens: 'projects/' + name + '/overrides/tokens.css' } }, null, 2));
write(path.resolve(projRoot,'overrides/tokens.css'), tokensCss);
console.log('\nProject created:', name, '\nTemplate:', template, '\nNext: generate app code using template snippets');