// migrate-to-monorepo.js
const fs = require('fs');
const path = require('path');

const foldersToMoveFrontend = [
  'components', 'content', 'generated', 'lib',
  'pages', 'public', 'styles', 'utils', 'state'
];
const filesToMoveFrontend = [
  'next.config.js', 'tsconfig.json', 'README.md',
  '.env', '.env.local', '.env.example'
];
const backendFolders = ['prisma', 'helpers'];
const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function move(item, target) {
  const src = path.join(root, item);
  const dest = path.join(root, target, item);
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
    console.log(`✔ Moved ${item} → ${target}/${item}`);
  }
}

function migrate() {
  ensureDir('apps/frontend');
  ensureDir('apps/backend');
  ensureDir('packages/shared');

  // Move frontend stuff
  foldersToMoveFrontend.forEach(f => move(f, 'apps/frontend'));
  filesToMoveFrontend.forEach(f => move(f, 'apps/frontend'));

  // Move backend stuff
  backendFolders.forEach(f => move(f, 'apps/backend'));

  // Move Docker/config if needed
  move('docker-compose.yml', 'apps/backend');
  move('Dockerfile', 'apps/backend');

  console.log('\n✅ Migration complete!');
  console.log('👉 Next steps:\n  1. Create package.json files for each app.\n  2. Setup root package.json with workspaces.\n  3. Update import paths and build scripts.');
}

migrate();