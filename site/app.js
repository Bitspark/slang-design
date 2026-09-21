import '../styles/index.css';
import './showcase.css';
import '../components/index.js';
import { operators, sources, filterOperators, calculate } from './data.js';
import tokens from '../tokens/tokens.json';
import mark from '../assets/slang-mark.svg';
import { pages } from './pages.js';

export const icon = (name) => {
  const paths = {
    grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
    layers: 'm12 3 10 6-10 6L2 9z M2 14l10 6 10-6',
    globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M3 12h18 M12 3c5 5 5 13 0 18-5-5-5-13 0-18',
    flow: 'M3 4h6v6H3z M15 14h6v6h-6z M9 7h9v7 M6 10v7h9',
    book: 'M4 3h14a2 2 0 0 1 2 2v16H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 M3 17h17 M8 7h7 M8 11h7',
    cloud: 'M6 18a4 4 0 0 1-1-8 7 7 0 0 1 13-2 5 5 0 0 1 0 10Z',
    arrow: 'M5 12h14 m-5-5 5 5-5 5',
    external: 'M14 3h7v7 M21 3 10 14 M10 3H3v18h18v-7',
    moon: 'M20 14A9 9 0 0 1 10 4a9 9 0 1 0 10 10Z',
    sun: 'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1 1 M18 18l1 1',
    search: 'M10 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14 m5 12 6 6',
    play: 'm8 4 12 8-12 8Z',
    pause: 'M7 4v16 M17 4v16',
    plus: 'M12 4v16 M4 12h16',
    check: 'm4 12 5 5L20 6',
    copy: 'M8 8h13v13H8z M16 8V3H3v13h5',
    download: 'M12 3v12 m-5-5 5 5 5-5 M4 17v4h16v-4',
    menu: 'M3 6h18 M3 12h18 M3 18h18',
    close: 'm6 6 12 12 M6 18 18 6',
    time: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18 M12 7v6l4 2',
    terminal: 'm4 6 6 6-6 6 M13 18h7',
  };
  return `<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.grid}"/></svg>`;
};
export const safe = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const getStored = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const store = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage is optional. */
  }
};
const routes = [
  ['foundations', 'Overview', 'grid', 'System'],
  ['components', 'Components', 'layers', 'System'],
  ['heritage', 'Origins & principles', 'time', 'System'],
  ['website', 'Product website', 'globe', 'Examples'],
  ['library', 'Operator library', 'grid', 'Examples'],
  ['studio', 'Visual studio', 'flow', 'Examples'],
  ['docs', 'Documentation', 'book', 'Examples'],
  ['cloud', 'Cloud workspace', 'cloud', 'Examples'],
];
export const state = {
  route: 'foundations',
  category: 'All',
  query: '',
  node: 'transform',
  result: 42,
  input: 21,
  factor: 2,
  runs: 0,
  deployments: getStored('slang-design-deployments', [
    {
      name: 'City population',
      description: 'CSV → filter → chart',
      status: 'Running',
      runtime: 'HTTP endpoint',
      runs: 1284,
    },
    {
      name: 'Greenhouse monitor',
      description: 'Sensor → threshold → notification',
      status: 'Running',
      runtime: 'Scheduled flow',
      runs: 384,
    },
    {
      name: 'Daily summary',
      description: 'Collect → reduce → format',
      status: 'Paused',
      runtime: 'Scheduled flow',
      runs: 62,
    },
  ]),
};
if (
  !Array.isArray(state.deployments) ||
  state.deployments.some(
    (d) => !d || typeof d.name !== 'string' || !['Running', 'Paused'].includes(d.status),
  )
)
  state.deployments = [];
document.documentElement.dataset.theme =
  getStored('slang-design-theme', 'light') === 'dark' ? 'dark' : 'light';

function shell() {
  document.querySelector('#app').innerHTML =
    `<div class="sd-scope app-shell"><aside class="sidebar" aria-label="Showcase navigation"><a class="brand" href="#/foundations"><img src="${mark}" width="34" height="34" alt=""/><span>slang<span class="brand-design">design</span></span></a><div class="sidebar-intro">One language.<br/>Every interface.</div><nav>${[
      'System',
      'Examples',
    ]
      .map(
        (group) =>
          `<div class="nav-group"><div class="nav-label">${group}</div>${routes
            .filter((r) => r[3] === group)
            .map(
              ([id, name, glyph]) =>
                `<a href="#/${id}" data-route="${id}">${icon(glyph)}<span>${name}</span>${group === 'Examples' ? '<span class="nav-tick">↗</span>' : ''}</a>`,
            )
            .join('')}</div>`,
      )
      .join(
        '',
      )}</nav><div class="sidebar-bottom"><div class="flow-dots"><i></i><span></span><i></i><span></span><i></i></div><p>Small pieces.<br/>Shared possibilities.</p><a href="https://github.com/Bitspark/slang-design" target="_blank" rel="noopener">Bitspark / Slang Design ${icon('external')}</a></div></aside><button class="nav-backdrop" aria-label="Close navigation" tabindex="-1"></button><div class="main-shell"><header class="topbar"><div class="topbar-left"><button class="sd-button sd-button--quiet sd-button--icon mobile-menu" aria-label="Open navigation" aria-expanded="false">${icon('menu')}</button><span class="breadcrumb">Design system <span>/</span> <b id="route-title">Overview</b></span></div><div class="topbar-actions"><span class="version">v0.1 <span>·</span> A shared foundation</span><button id="theme-toggle" class="sd-button sd-button--quiet sd-button--icon" aria-label="Switch to dark theme">${icon('moon')}</button><a class="source-link" href="https://github.com/Bitspark/slang-design" target="_blank" rel="noopener">View source ${icon('external')}</a></div></header><main id="main" tabindex="-1"></main><footer class="site-footer"><span>Slang Design <span class="footer-dot">/</span> Built from our shared history.</span><span>Open source. Open possibilities. <a href="https://github.com/Bitspark/slang-design">GitHub ↗</a></span></footer></div><div class="toast" role="status" aria-live="polite" aria-atomic="true"></div><dialog class="sd-dialog" id="detail-dialog"></dialog></div>`;
  document.querySelector('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store('slang-design-theme', next);
    themeButton();
  });
  document
    .querySelector('.mobile-menu')
    .addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  document.querySelector('.nav-backdrop').addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      setMenu(false);
      document.querySelector('.mobile-menu').focus();
    }
  });
  themeButton();
}
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  const toggle = document.querySelector('.mobile-menu');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (open) document.querySelector('.sidebar [aria-current="page"]').focus();
}
function themeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const b = document.querySelector('#theme-toggle');
  b.innerHTML = icon(dark ? 'sun' : 'moon');
  b.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
}
let toastTimer;
function toast(message) {
  clearTimeout(toastTimer);
  const el = document.querySelector('.toast');
  el.textContent = message;
  el.classList.add('visible');
  toastTimer = setTimeout(() => el.classList.remove('visible'), 3500);
}
async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied to clipboard.');
  } catch {
    toast('Clipboard unavailable. Select and copy the visible code.');
  }
}
function render() {
  const next = location.hash.replace('#/', '').split('?')[0] || 'foundations';
  state.route = routes.some((r) => r[0] === next) ? next : 'foundations';
  document.querySelector('#main').innerHTML = pages[state.route]();
  const title = routes.find((r) => r[0] === state.route)[1];
  document.querySelector('#route-title').textContent = title;
  document.title = `${title} — Slang Design`;
  document.querySelectorAll('[data-route]').forEach((a) => {
    if (a.dataset.route === state.route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  setMenu(false);
  window.scrollTo({ top: 0 });
  bind();
}
function openDialog(html) {
  const d = document.querySelector('#detail-dialog');
  d.innerHTML = `<button class="dialog-close sd-button sd-button--quiet sd-button--icon" aria-label="Close dialog">${icon('close')}</button>${html}`;
  d.querySelector('.dialog-close').addEventListener('click', () => d.close());
  d.showModal();
  return d;
}
function showOperator(name) {
  const op = operators.find((o) => o.name === name);
  if (!op) return;
  const d = openDialog(
    `<div class="eyebrow">${op.category} / OPERATOR REFERENCE</div><h2>${op.name}</h2><p>${op.description}</p><div class="operator-signature"><div><span>INPUT</span><code>${safe(op.input)}</code></div>${icon('arrow')}<div><span>OUTPUT</span><code>${safe(op.output)}</code></div></div><p class="fine-print">This reference is a design example. The studio demonstrates Multiply.</p><div class="dialog-actions"><a class="sd-button sd-button--accent" href="#/studio">Try the studio example ${icon('arrow')}</a><a class="sd-button sd-button--outline" href="#/docs">Read the guide</a></div>`,
  );
  d.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => d.close()));
}
function bindCards() {
  document
    .querySelectorAll('[data-operator]')
    .forEach((b) => b.addEventListener('click', () => showOperator(b.dataset.operator)));
  document.querySelector('#reset-search')?.addEventListener('click', () => {
    state.category = 'All';
    state.query = '';
    document.querySelector('#operator-search').value = '';
    refreshLibrary();
    document.querySelector('#operator-search').focus();
  });
}
function refreshLibrary() {
  const list = filterOperators(state.query, state.category);
  document.querySelector('#operator-results').innerHTML = pages.operatorCards(list);
  document.querySelector('.library-count').textContent =
    `${list.length} operator${list.length === 1 ? '' : 's'}`;
  document
    .querySelectorAll('[data-category]')
    .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.category === state.category)));
  bindCards();
}
function setNode(id) {
  if (!['input', 'transform', 'output'].includes(id)) return;
  state.node = id;
  document.querySelector('#node-details').innerHTML = pages.inspector();
  document.querySelector('#studio-flow').setAttribute('selected', id);
  document
    .querySelectorAll('[data-node-select]')
    .forEach((b) => b.classList.toggle('selected', b.dataset.nodeSelect === id));
}
function runFlow() {
  const input = document.querySelector('#flow-input'),
    factor = document.querySelector('#flow-factor');
  try {
    const result = calculate(input.value, factor.value);
    state.input = Number(input.value);
    state.factor = Number(factor.value);
    state.result = result;
    state.runs++;
    input.removeAttribute('aria-invalid');
    factor.removeAttribute('aria-invalid');
    document.querySelector('#studio-flow').setAttribute('result', String(result));
    document.querySelector('#console-input').textContent = String(state.input);
    document.querySelector('#console-output').textContent = String(result);
    document.querySelector('#console-message').textContent =
      `Run ${state.runs} complete · ${state.input} × ${state.factor} = ${result}`;
    document.querySelector('.saved-label').innerHTML = icon('check') + 'Flow complete';
    document.querySelector('#definition-view pre').textContent = pages.definition();
  } catch (e) {
    document.querySelector('#console-message').textContent = e.message;
    input.setAttribute('aria-invalid', 'true');
    factor.setAttribute('aria-invalid', 'true');
  }
}
function bind() {
  document
    .querySelectorAll('[data-copy]')
    .forEach((b) => b.addEventListener('click', () => copy(b.dataset.copy)));
  document
    .querySelectorAll('[data-toast]')
    .forEach((b) => b.addEventListener('click', () => toast(b.dataset.toast)));
  document.querySelector('#download-tokens')?.addEventListener('click', () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slang-design.tokens.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  document.querySelector('#example-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    toast(
      `“${document.querySelector('#component-name').value.trim()}” created in this component demo.`,
    );
  });
  document
    .querySelector('#copy-install')
    ?.addEventListener('click', () =>
      copy("import '@bitspark/slang-design/styles.css';\nimport '@bitspark/slang-design';"),
    );
  document
    .querySelector('#component-flow')
    ?.addEventListener(
      'slang-node-select',
      (e) =>
        (document.querySelector('#component-selection').textContent = `Selected: ${e.detail.id}`),
    );
  document.querySelector('#operator-search')?.addEventListener('input', (e) => {
    state.query = e.target.value;
    refreshLibrary();
  });
  document.querySelectorAll('[data-category]').forEach((b) =>
    b.addEventListener('click', () => {
      state.category = b.dataset.category;
      refreshLibrary();
    }),
  );
  bindCards();
  document
    .querySelector('#studio-flow')
    ?.addEventListener('slang-node-select', (e) => setNode(e.detail.id));
  document
    .querySelectorAll('[data-node-select]')
    .forEach((b) => b.addEventListener('click', () => setNode(b.dataset.nodeSelect)));
  document.querySelector('#run-flow')?.addEventListener('click', runFlow);
  ['#flow-input', '#flow-factor'].forEach((s) =>
    document.querySelector(s)?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runFlow();
    }),
  );
  document.querySelector('#save-example')?.addEventListener('click', () => {
    const input = document.querySelector('#flow-input').value,
      factor = document.querySelector('#flow-factor').value;
    try {
      calculate(input, factor);
      store('slang-design-flow', { input: Number(input), factor: Number(factor) });
      toast('Example values saved in this browser.');
    } catch (e) {
      toast(e.message);
    }
  });
  document.querySelectorAll('[data-studio-view]').forEach((b) =>
    b.addEventListener('click', () => {
      document.querySelector('#graph-view').hidden = b.dataset.studioView !== 'graph';
      document.querySelector('#definition-view').hidden = b.dataset.studioView !== 'definition';
      document
        .querySelectorAll('[data-studio-view]')
        .forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    }),
  );
  document.querySelectorAll('[data-scroll]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(a.dataset.scroll)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      });
    }),
  );
  document.querySelectorAll('[data-deploy-toggle]').forEach((b) =>
    b.addEventListener('click', () => {
      const d = state.deployments[Number(b.dataset.deployToggle)];
      d.status = d.status === 'Running' ? 'Paused' : 'Running';
      store('slang-design-deployments', state.deployments);
      const y = window.scrollY;
      render();
      window.scrollTo(0, y);
      toast(`${d.name}: ${d.status.toLowerCase()} in this demo.`);
    }),
  );
  document.querySelector('#new-deployment')?.addEventListener('click', () => {
    const d = openDialog(
      `<div class="eyebrow">DEMO WORKSPACE</div><h2>Give your flow a home.</h2><p>Create an illustrative deployment. Nothing will run on a server.</p><form id="deployment-form"><label class="sd-label" for="deployment-name">Name</label><input autofocus class="sd-input" id="deployment-name" required maxlength="60" placeholder="e.g. Weekly report"/><label class="sd-label factor-label" for="deployment-runtime">Runtime</label><select class="sd-input" id="deployment-runtime"><option>HTTP endpoint</option><option>Scheduled flow</option></select><div class="dialog-actions"><button type="submit" class="sd-button sd-button--accent">Create example</button></div></form>`,
    );
    d.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = d.querySelector('#deployment-name').value.trim();
      if (!name) return;
      state.deployments.push({
        name,
        description: 'New example flow',
        status: 'Paused',
        runtime: d.querySelector('#deployment-runtime').value,
        runs: 0,
      });
      store('slang-design-deployments', state.deployments);
      d.close();
      render();
      toast('Example deployment created. Start it when you are ready.');
    });
  });
}
const saved = getStored('slang-design-flow', null);
if (saved) {
  try {
    state.result = calculate(saved.input, saved.factor);
    state.input = Number(saved.input);
    state.factor = Number(saved.factor);
  } catch {
    /* Ignore invalid browser-local values. */
  }
}
shell();
document.querySelector('.sd-skip').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#main').focus();
});
render();
window.addEventListener('hashchange', () => {
  render();
  document.querySelector('#main').focus({ preventScroll: true });
});
