#!/usr/bin/env node
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const siteDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(siteDir, '..', '..')
const branch = process.env.GH_PAGES_BRANCH || 'gh-pages'
const worktreeDir = path.join(repoRoot, '.gh-pages')
const distDir = path.join(siteDir, 'dist')

function run(cmd, cwd = repoRoot) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd })
}

function emptyDirExceptGit(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir)) {
    if (entry === '.git') continue
    const p = path.join(dir, entry)
    fs.rmSync(p, { recursive: true, force: true })
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(s, d)
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(d), { recursive: true })
      fs.copyFileSync(s, d)
    }
  }
}

// 1) Build the site
run('pnpm build', siteDir)

// 2) Prepare worktree
try { run('git rev-parse --is-inside-work-tree', repoRoot) } catch {
  console.error('Not inside a Git repository.')
  process.exit(1)
}
try { run('git worktree prune') } catch {}
if (fs.existsSync(worktreeDir)) {
  try { run(`git worktree remove -f ${JSON.stringify(worktreeDir)}`) } catch {}
  fs.rmSync(worktreeDir, { recursive: true, force: true })
}
try { run(`git show-ref --verify --quiet refs/heads/${branch}`) } catch {
  run(`git branch ${branch}`)
}
run(`git worktree add -f ${JSON.stringify(worktreeDir)} ${branch}`)

// 3) Copy build output
if (!fs.existsSync(distDir)) {
  console.error(`Missing build output: ${distDir}`)
  process.exit(1)
}
emptyDirExceptGit(worktreeDir)
copyDir(distDir, worktreeDir)

// 4) Commit and push
run('git add .', worktreeDir)
try {
  run('git diff --staged --quiet', worktreeDir)
  console.log('No changes to publish.')
} catch {
  run('git commit -m "chore(site): publish gh-pages"', worktreeDir)
  run(`git push origin ${branch}`, worktreeDir)
}

console.log(`Published to ${branch}. Configure GitHub Pages to serve from that branch.`)

