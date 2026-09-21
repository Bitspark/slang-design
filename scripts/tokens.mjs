import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const tokens = JSON.parse(await readFile(new URL('tokens/tokens.json', root), 'utf8'));
const block = (selector, values, prefix = '') =>
  `${selector} {\n${Object.entries(values)
    .map(([k, v]) => `  --sd-${prefix}${k}: ${v};`)
    .join('\n')}\n}\n`;
const css =
  '/* Generated from tokens/tokens.json. Run npm run tokens. */\n' +
  block(':root, .sd-theme', tokens.primitive, 'color-') +
  block(':root, .sd-theme', tokens.base) +
  block(':root, [data-theme="light"]', tokens.light) +
  block('[data-theme="dark"]', tokens.dark);
const target = new URL('styles/tokens.css', root);
if (process.argv.includes('--check')) {
  const existing = await readFile(target, 'utf8');
  if (existing.replaceAll('\r\n', '\n') !== css)
    throw new Error('Generated tokens are stale. Run npm run tokens.');
} else {
  await writeFile(target, css);
  console.log(`Generated ${fileURLToPath(target)}`);
}
