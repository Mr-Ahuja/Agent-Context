#!/usr/bin/env node
const { readFileSync, existsSync } = require('fs');
const { resolve, dirname } = require('path');
function fail(m){ console.error('ERROR:', m); process.exitCode = 1; }
function ok(m){ console.log('OK:', m); }
function loadJson(p){ try{ return JSON.parse(readFileSync(p,'utf8')); } catch(e){ fail(Cannot read JSON:  -> ); return null; } }
(function(){
  const root = process.cwd();
  const schemaPath = resolve(root, 'schema/context.manifest.json');
  if (!existsSync(schemaPath)) return fail(schema not found: );
  const schema = loadJson(schemaPath); if (!schema) return;
  const templates = schema.templates || {}; const coframes = schema.coframes || {};
  if (!Object.keys(templates).length) return fail('No templates declared in schema.templates');
  for (const [name, rel] of Object.entries(templates)){
    const mpath = resolve(root, rel); if (!existsSync(mpath)) { fail(Template manifest missing: ); continue; }
    const man = loadJson(mpath); if (!man) continue; const troot = dirname(mpath); ok(Validating template: );
    const cfname = man.coframe; if (!cfname) { fail(Template  missing 'coframe'); continue; }
    let cfrel = coframes[cfname] || coframes//coframe.manifest.json; const cfpath = resolve(root, cfrel);
    if (!existsSync(cfpath)) { fail(Coframe manifest missing: ); continue; }
    const cf = loadJson(cfpath); if (!cf) continue; const requires = cf.requires || {}; const reqTpl = requires.template || []; const reqDev = requires.dev || [];
    for (const r of reqTpl){ const p = resolve(troot, r); if (!existsSync(p)) fail(Missing required template file: ); else ok(exists: ); }
    for (const r of reqDev){ const p = resolve(troot, r); if (!existsSync(p)) fail(Missing required dev file: ); else ok(exists: ); }
    const entries = man.entries || {};
    // Optional but recommended: MIGRATION.md
    const mig = resolve(troot, 'MIGRATION.md');
    if (!existsSync(mig)) ok('tip: MIGRATION.md not found (recommended)'); const must = { tokens: 'array', guidelines:'string', components:'string', patterns:'string' };
    for (const [k, typ] of Object.entries(must)){
      if (!(k in entries)) { fail(entries. missing); continue; }
      const v = entries[k];
      if (typ==='array'){ if (!Array.isArray(v)||!v.length){ fail(entries. must be array); continue; } v.forEach(f=>{ const p=resolve(troot,f); if(!existsSync(p)) fail(entries. missing file: ); else ok(entries.: ); }); }
      else { const p=resolve(troot,v); if(!existsSync(p)) fail(entries. missing file: ); else ok(entries.: ); }
    }
  }
})();


