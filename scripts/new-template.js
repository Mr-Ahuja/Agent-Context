#!/usr/bin/env node
const { writeFileSync, mkdirSync, existsSync, readFileSync, copyFileSync } = require('fs');
const { resolve, dirname } = require('path');
function arg(name, def){ const i = process.argv.findIndex(a=>a===`--${name}`); return i>-1 && process.argv[i+1] ? process.argv[i+1] : def; }
function ensureDir(p){ if (!existsSync(p)) mkdirSync(p, { recursive:true }); }
function write(p, data){ ensureDir(dirname(p)); writeFileSync(p, data, 'utf8'); console.log('write', p); }
function loadJson(p){ return JSON.parse(readFileSync(p,'utf8')); }
function copy(src, dst){ ensureDir(dirname(dst)); copyFileSync(src, dst); console.log('copy', src, '->', dst); }

const name = arg('name');
if (!name){ console.error('Usage: node scripts/new-template.js --name "Template-Name" [--coframe "Project-Macro-Applications"] [--from "The-Chosen-One"]'); process.exit(1); }
const coframe = arg('coframe','Project-Macro-Applications');
const from = arg('from');
const root = process.cwd();
const baseDir = resolve(root, 'templates', name);
ensureDir(baseDir);

if (from && existsSync(resolve(root, 'templates', from))){
  // Copy baseline from existing template
  const path = require('path');
  const fs = require('fs');
  function copyTree(src, dst){
    const st = fs.statSync(src);
    if (st.isDirectory()){
      ensureDir(dst);
      for (const f of fs.readdirSync(src)){
        copyTree(path.join(src,f), path.join(dst,f));
      }
    } else {
      copy(src, dst);
    }
  }
  copyTree(resolve(root,'templates',from,'uiux'), resolve(baseDir,'uiux'));
  copyTree(resolve(root,'templates',from,'dev'), resolve(baseDir,'dev'));
  // Optional site
  if (existsSync(resolve(root,'templates',from,'site'))){
    copyTree(resolve(root,'templates',from,'site'), resolve(baseDir,'site'));
  }
} else {
  // Minimal skeleton using shared specs
  const tokensCss = ":root{ --bg:#0b0f14; --panel:#121821; --text:#e6eef8; --muted:#95a3b8; --accent:#2e8cff; --line:#1f2a3833; }";
  write(resolve(baseDir,'uiux/tokens.css'), tokensCss);
  write(resolve(baseDir,'uiux/tokens.json'), JSON.stringify({color:{bg:'#0b0f14',panel:'#121821',text:'#e6eef8',muted:'#95a3b8',accent:'#2e8cff',line:'#1f2a3833'}},null,2));
  write(resolve(baseDir,'uiux/brand-guidelines.md'), `# ${name} — Brand Guidelines\n\nBaseline derived from The Chosen One. Customize tokens sparingly.`);
  // Pull shared components/patterns if available
  const comp = resolve(root,'shared/components.md');
  const patt = resolve(root,'shared/patterns.md');
  if (existsSync(comp)) copy(comp, resolve(baseDir,'uiux/components.md')); else write(resolve(baseDir,'uiux/components.md'), '# Components\n');
  if (existsSync(patt)) copy(patt, resolve(baseDir,'uiux/patterns.md')); else write(resolve(baseDir,'uiux/patterns.md'), '# Patterns\n');
  const script = resolve(root,'shared/scripts/constellation.js');
  if (existsSync(script)) copy(script, resolve(baseDir,'uiux/scripts/constellation.js'));
  // Simple snippet
  const hero = "<!doctype html>\n<html><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/><title>Hero</title><style>@import '../tokens.css';html,body{height:100%;margin:0;overflow:hidden;background:var(--bg);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}</style></head><body><canvas id=\"constellation\"></canvas><section style=\"position:relative;z-index:1;height:100dvh;display:grid;place-items:center;padding:24px\"><div style=\"background:rgba(10,14,20,.45);border:1px solid #1f2a38;border-radius:16px;backdrop-filter:blur(10px);padding:24px;width:min(92vw,860px);text-align:center\"><h1 style=\"margin:0\">"+name+"</h1><p style=\"opacity:.8\">Template hero</p></div></section><script src=\"../../scripts/constellation.js\"></script></body></html>";
  write(resolve(baseDir,'uiux/snippets/html/hero.html'), hero);
  // Dev docs
  write(resolve(baseDir,'dev/deployment.md'), '# Deployment\n- GitHub Pages or Firebase\n');
  write(resolve(baseDir,'dev/git.md'), '# Git\n- Default branch: main; protect main\n');
  write(resolve(baseDir,'dev/ci.md'), '# CI\n- Validate template and deploy site\n');
}

// Template manifest
const entries = {
  tokens: [ 'uiux/tokens.css', 'uiux/tokens.json' ],
  guidelines: 'uiux/brand-guidelines.md',
  components: 'uiux/components.md',
  patterns: 'uiux/patterns.md',
  scripts: ['uiux/scripts/constellation.js'],
  snippets: ['uiux/snippets/html/hero.html']
};
write(resolve(baseDir,'template.manifest.json'), JSON.stringify({ name, version:'1.0.0', coframe, entries }, null, 2));
console.log('\nTemplate created:', name, '\nCo-Frame:', coframe, '\nNext: npm run validate');
