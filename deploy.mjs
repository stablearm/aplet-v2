import { readFileSync, readdirSync, statSync } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';

const API_TOKEN = process.env.CF_API_TOKEN;
const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const PROJECT_NAME = process.env.CF_PROJECT_NAME || 'aplet';

if (!API_TOKEN || !ACCOUNT_ID) {
  console.error('Missing required environment variables: CF_API_TOKEN, CF_ACCOUNT_ID');
  process.exit(1);
}

function hashContent(content) {
  return createHash('sha256').update(content).digest('hex');
}

function walk(dir, base = '') {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walk(full, (base ? base + '/' : '') + entry));
    } else {
      files.push({ path: ((base ? base + '/' : '') + entry).replace(/\\/g, '/'), fullPath: full });
    }
  }
  return files;
}

async function deploy() {
  const outDir = join(process.cwd(), 'out');
  const files = walk(outDir);
  console.log(`Files: ${files.length}`);

  const manifest = {};
  const form = new FormData();

  for (const file of files) {
    const content = readFileSync(file.fullPath);
    const hash = hashContent(content);
    manifest['/' + file.path.replace(/\\/g, '/')] = hash;
    form.append(hash, new Blob([content]), file.path);
  }

  form.append('manifest', JSON.stringify(manifest));

  console.log('Uploading...');
  const resp = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      body: form,
    }
  );
  const data = await resp.json();

  if (data.success) {
    console.log(`Deployed! https://${PROJECT_NAME}.pages.dev`);
  } else {
    console.error('Error:', JSON.stringify(data.errors, null, 2));
    process.exit(1);
  }
}

deploy().catch(console.error);
