#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
function arg(n){ const i = process.argv.findIndex(a=>a==='--'+n); return i>-1 ? process.argv[i+1] : undefined; }
const name = arg('name'); const pathArg = arg('path') || (name ? 'coframes/' + name + '/coframe.manifest.json' : undefined);
if (!name){ console.error('Usage: node scripts/register-coframe.js --name "My-Co-Frame" [--path coframes/My-Co-Frame/coframe.manifest.json]'); process.exit(1); }
const schemaPath = path.resolve(process.cwd(), 'schema/context.manifest.json');
const schema = JSON.parse(fs.readFileSync(schemaPath,'utf8'));
schema.coframes = schema.coframes || {}; schema.coframes[name] = pathArg;
fs.writeFileSync(schemaPath, JSON.stringify(schema,null,2), 'utf8');
console.log('Registered coframe', name, '->', pathArg);