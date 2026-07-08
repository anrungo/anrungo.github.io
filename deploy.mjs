// Deploy: render the Quarto site and mirror it into the GitHub Pages clone.
// It does NOT commit or push — review the diff and push yourself.
//
//   node deploy.mjs            # render + sync into the deploy repo
//   node deploy.mjs --no-render  # sync the existing _site only
//
// After it runs:
//   cd D:/GitHub/anrungo.github.io
//   git add -A && git commit -m "Rebuild site with Quarto (Clinical Clean)" && git push
import { execSync } from 'node:child_process';
import { cpSync, rmSync, readdirSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const siteDir = join(here, '_site');
const DEPLOY = process.env.DEPLOY_REPO || 'D:/GitHub/anrungo.github.io';
// The CV is a separate project; its built web files live in the resume repo.
// They are copied into DEPLOY/resume so antoniorungo.com/resume stays in sync.
const RESUME_SRC = process.env.RESUME_SRC || join(here, '..', '..', 'resume', 'docs');
const CV_ITEMS = ['index.html', 'cv.pdf', 'assets', 'img'];
// Files/dirs at the deploy root that must survive the mirror.
// 'resume' holds the CV site (served at antoniorungo.com/resume); it is copied
// in from the separate resume repo, not produced by Quarto, so preserve it.
const KEEP = new Set(['.git', '.gitignore', 'CNAME', '.nojekyll', 'resume']);

if (!process.argv.includes('--no-render')) {
  console.log('• quarto render …');
  try {
    execSync('quarto render', { cwd: here, stdio: 'inherit' });
  } catch (e) {
    // Quarto/Deno on Windows can return a non-zero exit code even on success
    // (e.g. when stdout is a pipe). Trust a freshly-written _site instead.
    const idx = join(siteDir, 'index.html');
    const fresh = existsSync(idx) && (Date.now() - statSync(idx).mtimeMs < 120000);
    if (!fresh) { console.error('quarto render failed.'); throw e; }
    console.warn('  (ignored spurious non-zero exit; _site is fresh)');
  }
}
if (!existsSync(siteDir)) { console.error('No _site/ found — render first.'); process.exit(1); }
if (!existsSync(join(DEPLOY, '.git'))) { console.error(`Deploy repo not a git clone: ${DEPLOY}`); process.exit(1); }

// 1) Clear the deploy repo except the KEEP list.
for (const name of readdirSync(DEPLOY)) {
  if (KEEP.has(name)) continue;
  rmSync(join(DEPLOY, name), { recursive: true, force: true });
}
// 2) Copy the rendered site in.
for (const name of readdirSync(siteDir)) {
  cpSync(join(siteDir, name), join(DEPLOY, name), { recursive: true });
}
// 2.5) Sync the CV site from the resume repo into DEPLOY/resume.
const RESUME_DST = join(DEPLOY, 'resume');
if (existsSync(RESUME_SRC)) {
  rmSync(RESUME_DST, { recursive: true, force: true });
  mkdirSync(RESUME_DST, { recursive: true });
  let copied = 0;
  for (const item of CV_ITEMS) {
    const from = join(RESUME_SRC, item);
    if (existsSync(from)) { cpSync(from, join(RESUME_DST, item), { recursive: true }); copied++; }
  }
  console.log(`✓ Synced CV (${copied} items): ${RESUME_SRC} → ${RESUME_DST}`);
} else {
  console.warn(`! CV source not found at ${RESUME_SRC} — kept existing resume/. Set RESUME_SRC to override.`);
}

// 3) Ensure .nojekyll (GitHub Pages must not run Jekyll on Quarto output).
writeFileSync(join(DEPLOY, '.nojekyll'), '');

const count = readdirSync(DEPLOY).length;
console.log(`✓ Synced _site → ${DEPLOY} (${count} entries at root).`);
console.log('  Review & publish:  cd ' + DEPLOY + '  &&  git add -A && git commit -m "…" && git push');
