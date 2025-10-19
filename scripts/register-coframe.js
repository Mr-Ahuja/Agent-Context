#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
function arg(name){ const i = process.argv.findIndex(a=>a===`--${name}`); return i>-1 ? process.argv[i+1] : undefined; }
const name = arg('name'); const pathArg = arg('path');
if (!name){ console.error('Usage: node scripts/register-coframe.js --name "My-Co-Frame" [--path coframes/My-Co-Frame/coframe.manifest.json]'); process.exit(1); }
const manifestRel = pathArg || `coframes/${name}/coframe.manifest.json`;
const schemaPath = resolve(process.cwd(), 'schema/context.manifest.json');
const schema = JSON.parse(readFileSync(schemaPath,'utf8'));
schema.coframes = schema.coframes || {}; schema.coframes[name] = manifestRel;
writeFileSync(schemaPath, JSON.stringify(schema,null,2), 'utf8');
console.log('Registered coframe', name, '->', manifestRel);
