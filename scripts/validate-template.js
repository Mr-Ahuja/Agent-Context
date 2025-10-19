#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
function fail(m){ console.error('ERROR:', m); process.exitCode = 1; }
function ok(m){ console.log('OK:', m); }
function loadJson(p){ try{ let s = fs.readFileSync(p,'utf8'); if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1); return JSON.parse(s); } catch(e){ fail('Cannot read JSON: ' + p + ' -> ' + e.message); return null; } }
(function(){
  const root = process.cwd();
  const schemaPath = path.resolve(root, 'schema/context.manifest.json');
  if (!fs.existsSync(schemaPath)) return fail('schema not found: ' + schemaPath);
  const schema = loadJson(schemaPath); if (!schema) return;
  const templates = schema.templates || {}; const coframes = schema.coframes || {};
  if (!Object.keys(templates).length) return fail('No templates declared in schema.templates');
  for (const name in templates){
    const rel = templates[name];
    const mpath = path.resolve(root, rel); if (!fs.existsSync(mpath)) { fail('Template manifest missing: ' + mpath); continue; }
    const man = loadJson(mpath); if (!man) continue; const troot = path.dirname(mpath); ok('Validating template: ' + name);
    const cfname = man.coframe; if (!cfname) { fail('Template ' + name + ' missing \'coframe\''); continue; }
    let cfrel = coframes[cfname] || ('coframes/' + cfname + '/coframe.manifest.json'); const cfpath = path.resolve(root, cfrel);
    if (!fs.existsSync(cfpath)) { fail('Coframe manifest missing: ' + cfpath); continue; }
    const cf = loadJson(cfpath); if (!cf) continue; const requires = cf.requires || {}; const reqTpl = requires.template || []; const reqDev = requires.dev || [];
    reqTpl.forEach(function(r){ const p = path.resolve(troot, r); if (!fs.existsSync(p)) fail('Missing required template file: ' + r); else ok('exists: ' + r); });
    reqDev.forEach(function(r){ const p = path.resolve(troot, r); if (!fs.existsSync(p)) fail('Missing required dev file: ' + r); else ok('exists: ' + r); });
    const entries = man.entries || {}; const must = { tokens: 'array', guidelines:'string', components:'string', patterns:'string' };
    for (const k in must){
      const typ = must[k]; if (!(k in entries)) { fail('entries.' + k + ' missing'); continue; }
      const v = entries[k];
      if (typ==='array'){ if (!Array.isArray(v) || !v.length){ fail('entries.' + k + ' must be array'); continue; } v.forEach(function(f){ const p=path.resolve(troot,f); if(!fs.existsSync(p)) fail('entries.' + k + ' missing file: ' + f); else ok('entries.' + k + ': ' + f); }); }
      else { const p=path.resolve(troot,v); if(!fs.existsSync(p)) fail('entries.' + k + ' missing file: ' + v); else ok('entries.' + k + ': ' + v); }
    }
    const mig = path.resolve(troot, 'MIGRATION.md'); if (!fs.existsSync(mig)) ok('tip: MIGRATION.md not found (recommended)');
  }
})();