import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { calculate, filterOperators, LEGAL } from '../site/data.js';

const tokens = JSON.parse(
  await readFile(new URL('../tokens/tokens.json', import.meta.url), 'utf8'),
);
const luminance = (hex) => {
  const c = hex
    .slice(1)
    .match(/../g)
    .map((n) => parseInt(n, 16) / 255)
    .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
};

test('semantic text and action pairs meet WCAG AA for normal text in both themes', () => {
  for (const theme of ['light', 'dark']) {
    const t = tokens[theme];
    for (const [fg, bg] of [
      ['text', 'surface'],
      ['text-muted', 'surface'],
      ['text-soft', 'surface'],
      ['text-muted', 'bg'],
      ['text-soft', 'bg'],
      ['on-primary', 'primary'],
      ['on-accent', 'accent'],
      ['success', 'success-soft'],
      ['warning', 'warning-soft'],
      ['danger', 'danger-soft'],
      ['link', 'surface'],
    ]) {
      const ratio = contrast(t[fg], t[bg]);
      assert.ok(ratio >= 4.5, `${theme}: ${fg} / ${bg} = ${ratio.toFixed(2)}`);
    }
  }
});
test('focus indicators contrast with adjacent surfaces', () => {
  for (const theme of ['light', 'dark'])
    for (const bg of ['surface', 'bg', 'surface-subtle'])
      assert.ok(contrast(tokens[theme].focus, tokens[theme][bg]) >= 3, `${theme}: focus / ${bg}`);
});
test('studio calculates finite values and rejects missing, nonnumeric and overflowing input', () => {
  assert.equal(calculate(21, 2), 42);
  assert.equal(calculate(-3, 0.5), -1.5);
  assert.equal(calculate(0, 4), 0);
  for (const args of [
    ['', 2],
    ['hello', 2],
    [Infinity, 2],
    [1e308, 1e308],
  ])
    assert.throws(() => calculate(...args));
});
test('library search combines case-insensitive text, descriptions, type names and category', () => {
  assert.deepEqual(
    filterOperators(' MULTIPLY ').map((o) => o.name),
    ['Multiply'],
  );
  assert.ok(filterOperators('number', 'Math').length >= 2);
  assert.equal(filterOperators('number', 'Data').length, 0);
  assert.equal(filterOperators('no matching result').length, 0);
  assert.equal(filterOperators('tabular')[0].name, 'Read CSV');
});
test('themes implement the same semantic contract', () => {
  assert.deepEqual(Object.keys(tokens.light).sort(), Object.keys(tokens.dark).sort());
});

test('custom elements can be imported by server-rendered applications without a browser', async () => {
  const { registerSlangElements, SlangType, SlangFlow } = await import('../components/index.js');
  assert.equal(typeof SlangType, 'function');
  assert.equal(typeof SlangFlow, 'function');
  assert.doesNotThrow(() => registerSlangElements());
});
test('every view links the imprint and privacy policy, with and without JavaScript', async () => {
  const app = await readFile(new URL('../site/app.js', import.meta.url), 'utf8');
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const noscript = html.match(/<noscript[\s\S]*<\/noscript/)[0];
  assert.match(
    app,
    /<footer class="site-footer">.*\$\{LEGAL\.imprint\}.*\$\{LEGAL\.privacy\}.*<\/footer>/,
  );
  for (const url of Object.values(LEGAL)) {
    assert.match(url, /^https:\/\/slang\.bitspark\.com\//);
    assert.ok(noscript.includes(`href="${url}"`), `noscript lacks ${url}`);
  }
});
