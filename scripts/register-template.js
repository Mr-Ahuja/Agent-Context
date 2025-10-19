#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
function arg(n){ const i = process.argv.findIndex(a=>a===`--${n}`); return i>-1 ? process.argv[i+1] : undefined; }
const name = arg('name');
const pathArg = arg('path') || (name ? `templates/${name}/template.manifest.json` : undefined);
if (!name){
  console.error('Usage: node scripts/register-template.js --name "Template-Name" [--path templates/Template-Name/template.manifest.json]');
  process.exit(1);
}
const schemaPath = resolve(process.cwd(), 'schema/context.manifest.json');
const schema = JSON.parse(readFileSync(schemaPath,'utf8'));
schema.templates = schema.templates || {}; schema.templates[name] = pathArg;
writeFileSync(schemaPath, JSON.stringify(schema,null,2), 'utf8');
console.log('Registered template', name, '->', pathArg);
