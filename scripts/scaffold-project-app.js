#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
function arg(n, d){ const i = process.argv.findIndex(a=>a==='--'+n); return i>-1 && process.argv[i+1] ? process.argv[i+1] : d; }
function ensureDir(p){ if (!fs.existsSync(p)) fs.mkdirSync(p,{recursive:true}); }
function write(p, data){ ensureDir(path.dirname(p)); fs.writeFileSync(p, data, 'utf8'); console.log('write', p); }
const project = arg('project'); const template = arg('template'); const framework = arg('framework','vanilla');
if (!project || !template){ console.error('Usage: node scripts/scaffold-project-app.js --project "My-Project" --template "The-Chosen-One" [--framework vanilla]'); process.exit(1); }
const root = process.cwd(); const appRoot = path.resolve(root,'projects',project,'app');
if (framework==='vanilla'){
  const html = '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>' + project + '</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><style>@import '../../templates/' + template + '/uiux/tokens.css';html,body{height:100%;margin:0;overflow:hidden;background:var(--bg);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}</style></head><body><canvas id="constellation"></canvas><section style="position:relative;z-index:1;height:100dvh;display:grid;place-items:center;padding:24px"><div style="background:rgba(10,14,20,.45);border:1px solid #1f2a38;border-radius:16px;backdrop-filter:blur(10px);padding:24px;width:min(92vw,860px);text-align:center"><h1 style="margin:0">' + project + '</h1><p style="opacity:.8">Scaffolded from template: ' + template + '</p></div></section><script src="../../templates/' + template + '/uiux/scripts/constellation.js"></script></body></html>';
  write(path.resolve(appRoot,'index.html'), html);
} else { console.error('Only "vanilla" supported'); process.exit(2); }
console.log('\nScaffold complete at projects/' + project + '/app');