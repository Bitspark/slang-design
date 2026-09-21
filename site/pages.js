import { icon, safe, state } from './app.js';
import { operators, sources, filterOperators } from './data.js';
import tokens from '../tokens/tokens.json';
import mark from '../assets/slang-mark.svg';
import { examplePages } from './examples.js';
import { brand } from './brand.js';

export const eyebrow = (text) => `<div class="eyebrow"><span></span>${text}</div>`;
export const link = (href, text, style = '') =>
  `<a class="sd-button ${style}" href="${href}">${text} ${icon('arrow')}</a>`;
export const heading = (overline, title, description, action = '') =>
  `<div class="page-heading"><div>${eyebrow(overline)}<h1>${title}</h1><p>${description}</p></div>${action}</div>`;
export const sampleNote = (text) =>
  `<div class="sample-note"><span class="sd-badge">Example interface</span>${text}</div>`;

function foundations() {
  return `<div class="page foundations"><section class="foundation-hero"><div class="hero-copy">${eyebrow('THE SLANG DESIGN SYSTEM')}<h1>Connected<br/>by <em>design.</em></h1><p>A common visual language for the things we build. Clear interfaces, expressive connections, and room for ideas to flow.</p><div class="hero-actions">${link('#/components', 'Explore the components', 'sd-button--accent')}<a class="text-link" href="#/heritage">Discover our roots ${icon('arrow')}</a></div><div class="hero-note"><span class="sd-dot"></span>Designed for the entire Slang family</div></div><div class="hero-diagram"><div class="diagram-label"><span>01 — THE LANGUAGE OF CONNECTION</span><span class="diagram-plus">+</span></div><slang-flow variant="overview"></slang-flow><div class="diagram-caption"><span>Individual parts. A meaningful whole.</span><span class="tiny-types"><slang-type kind="number"></slang-type><slang-type kind="string"></slang-type></span></div></div></section>
<section class="palette-section"><div class="section-heading"><div><span class="section-index">01 / COLOR</span><h2>Familiar, at first sight.</h2></div><p>Our original hues, given clear roles.<br/>Click a swatch to copy its value.</p></div><div class="palette">${[
    ['Petrol', '#164968', 'A steady foundation'],
    ['Blue', '#1c6f9a', 'A clear direction'],
    ['Raspberry', '#b21546', 'A little momentum'],
    ['Paper', '#fcfcfc', 'Space to think'],
    ['Ink', '#212124', 'Clarity in every detail'],
  ]
    .map(
      ([name, hex, sub]) =>
        `<button class="swatch" data-copy="${hex}" style="--swatch:${hex}" aria-label="Copy ${name} color ${hex}"><span class="swatch-color"><span>${name}</span><span>${icon('copy')}</span></span><span class="swatch-caption"><span>${sub}</span><code>${hex}</code></span></button>`,
    )
    .join('')}</div></section>
<section class="foundation-pair"><div class="type-specimen"><span class="section-index">02 / TYPOGRAPHY</span><h2>Make the complex<br/><em>feel natural.</em></h2><p>Roboto Slab gives ideas a human voice. Roboto keeps interfaces clear. Share Tech Mono lets the data speak.</p><div class="font-samples"><span>Aa <small>Roboto Slab</small></span><span>Aa <small>Roboto</small></span><span>01 <small>Share Tech Mono</small></span></div></div><div class="language-specimen"><span class="section-index">03 / VISUAL GRAMMAR</span><h2>Color carries meaning.</h2><p>A number stays a number, wherever it flows. Use labels and port shapes alongside color.</p><div class="type-list">${['number', 'string', 'boolean', 'binary', 'primitive', 'generic'].map((t) => `<div><slang-type kind="${t}"></slang-type><code>${tokens.base[`type-${t}`]}</code></div>`).join('')}</div></div></section>
<section class="theme-section"><div><span class="section-index">04 / A QUIET CONFIDENCE</span><h2>Let the idea<br/>take the foreground.</h2><p>Petrol gives structure. Raspberry marks a meaningful next step. Pale surfaces leave room for the connections between them.</p><a class="text-link" href="#/components">See the system in detail ${icon('arrow')}</a></div><div class="theme-preview sd-card"><div class="preview-heading"><span class="mini-mark">${icon('flow')}</span><span>Double a number<small>A small idea, connected.</small></span><span class="sd-badge sd-badge--success"><i class="sd-dot"></i>Ready</span></div><div class="preview-flow"><span>21</span><i></i><b>× 2</b><i></i><span>42</span></div><div class="preview-footer"><slang-type kind="number"></slang-type>${link('#/studio', 'Open in studio', 'sd-button--accent sd-button--small')}</div></div></section>
<section class="examples-strip"><span class="section-index">SEE THE SYSTEM AT WORK</span><div>${[
    ['website', 'A first impression', 'Product website'],
    ['studio', 'A place to create', 'Visual studio'],
    ['cloud', 'Everything in view', 'Cloud workspace'],
  ]
    .map(
      ([r, title, label], i) =>
        `<a href="#/${r}"><span>0${i + 1}</span><h3>${title}</h3><p>${label} ${icon('arrow')}</p></a>`,
    )
    .join('')}</div></section></div>`;
}

function components() {
  return `<div class="page">${heading('FOUNDATIONS / COMPONENTS', 'Small pieces. Shared purpose.', 'Native HTML recipes and optional web components. The same pieces power every example in this collection.', `<button class="sd-button sd-button--outline" id="download-tokens">${icon('download')}Export tokens</button>`)}<div class="component-grid"><section class="sd-card"><div class="spec-label">01 <span>Actions</span></div><h2>A clear next step</h2><p>One primary action per region. Quiet actions support it.</p><div class="component-row"><button class="sd-button sd-button--accent" data-toast="Primary action selected.">${icon('play')}Run program</button><button class="sd-button" data-toast="Your example has been saved.">Save changes</button></div><div class="component-row"><button class="sd-button sd-button--outline" data-toast="Secondary action selected.">View details</button><button class="sd-button sd-button--quiet" data-toast="Quiet action selected.">Cancel</button><button class="sd-button" disabled>Unavailable</button></div><pre class="mini-code">&lt;button class="sd-button sd-button--accent"&gt;
  Run program
&lt;/button&gt;</pre></section><section class="sd-card"><div class="spec-label">02 <span>Inputs</span></div><h2>Ask just enough</h2><form id="example-form"><label class="sd-label" for="component-name">Blueprint name</label><input id="component-name" class="sd-input" required placeholder="e.g. Greenhouse monitor" minlength="2" maxlength="60" aria-describedby="component-help"/><span class="sd-field-help" id="component-help">Choose a name that explains what your flow does.</span><label class="sd-switch"><input type="checkbox" checked/>Enable automatic saving</label><button class="sd-button sd-button--small" type="submit">Create blueprint</button></form></section><section class="sd-card"><div class="spec-label">03 <span>Feedback</span></div><h2>Always know where you are</h2><div class="component-row"><span class="sd-badge sd-badge--success"><i class="sd-dot"></i>Running</span><span class="sd-badge sd-badge--warning"><i class="sd-dot"></i>Paused</span><span class="sd-badge sd-badge--danger"><i class="sd-dot"></i>Failed</span></div><div class="sd-callout">Your blueprint is saved. You can keep exploring.</div><div class="sd-callout sd-callout--warning">One input still needs a connection. Review the highlighted operator.</div></section><section class="sd-card"><div class="spec-label">04 <span>Data types</span></div><h2>Meaning follows the data</h2><div class="component-row types-large">${['number', 'string', 'boolean', 'binary', 'primitive', 'generic', 'trigger'].map((t) => `<slang-type kind="${t}"></slang-type>`).join('')}</div><pre class="mini-code">&lt;slang-type kind="number"&gt;&lt;/slang-type&gt;</pre><p>Color is a supporting cue. Type names remain visible in every theme.</p></section><section class="sd-card component-wide"><div class="spec-label">05 <span>Flow canvas</span></div><div class="section-heading"><div><h2>Connections, made visible.</h2><p>Keyboard-focusable operators, typed ports, and a shared coordinate system.</p></div><span id="component-selection" class="sd-badge">Select a node</span></div><div class="component-canvas"><slang-flow id="component-flow"></slang-flow></div><pre class="mini-code">&lt;slang-flow selected="transform" result="42"&gt;&lt;/slang-flow&gt;</pre></section><section class="sd-card component-wide"><div class="spec-label">06 <span>Get started</span></div><h2>Bring Slang into your interface.</h2><p>The CSS works with Angular, Vue, React, Svelte, or a plain HTML page. Custom elements are optional.</p><div class="code-heading"><span>JavaScript / CSS</span><button class="sd-button sd-button--quiet sd-button--small" id="copy-install">${icon('copy')}Copy</button></div><pre class="sd-code">import '@bitspark/slang-design/styles.css';
import '@bitspark/slang-design'; // optional custom elements

// Put recipes inside a .sd-scope container.
// Set data-theme="light" or "dark" on a parent.</pre><p class="fine-print">Install from the GitHub repository or an npm pack tarball. An npm registry release has not been published.</p></section></div></div>`;
}

export function operatorCards(list) {
  return list.length
    ? list
        .map(
          (op) =>
            `<button class="operator-card sd-card" data-operator="${safe(op.name)}"><div class="operator-card-top"><span class="operator-glyph" style="--operator-color:var(--sd-type-${op.type})">${safe(op.icon)}</span><span class="sd-badge">${op.category}</span></div><h2>${op.name}</h2><p>${op.description}</p><div class="operator-card-bottom"><slang-type kind="${op.type}"></slang-type><span>Explore ${icon('arrow')}</span></div></button>`,
        )
        .join('')
    : `<div class="empty-state"><div>${icon('search')}</div><h2>No matching operators</h2><p>Try another search or choose a different category.</p><button class="sd-button sd-button--outline" id="reset-search">Clear filters</button></div>`;
}
function library() {
  const count = filterOperators(state.query, state.category).length;
  return `<div class="page">${heading('EXAMPLE / OPERATOR LIBRARY', 'Good things come in small pieces.', 'Find a building block, understand what it does, and make it part of your next idea.', link('#/studio', 'Open studio', 'sd-button--accent'))}<div class="library-tools"><label class="search-field">${icon('search')}<span class="sr-only">Search operators</span><input id="operator-search" placeholder="Search by name, purpose, or data type…" value="${safe(state.query)}" type="search"/></label><span class="library-count" aria-live="polite">${count} operator${count === 1 ? '' : 's'}</span></div><div class="sd-tabs category-tabs" role="group" aria-label="Operator category">${['All', 'Math', 'Data', 'Control'].map((c) => `<button data-category="${c}" aria-pressed="${state.category === c}">${c === 'All' ? 'All operators' : c}</button>`).join('')}</div><div class="operator-grid" id="operator-results">${operatorCards(filterOperators(state.query, state.category))}</div><div class="library-footnote"><span class="sd-dot"></span>A curated sample of the Slang standard library. <a href="https://github.com/Bitspark/slang-lib">Browse the full library ↗</a></div></div>`;
}

function heritage() {
  return `<div class="page">${heading('ORIGINS / DESIGN RESEARCH', 'A new chapter. The same language.', 'Reconstructed from the Slang family’s actual source styles, layouts, and visual assets.')}<section class="heritage-intro"><div><span class="section-index">THE CLOUD & WEB FAMILY</span><h2>Clear. Spacious.<br/><em>Connected.</em></h2><p>The later Slang identity brings together petrol blue, raspberry, light slab-serif headlines, pale canvases, and meaningful connections. This is the direction of Slang Design.</p></div><div class="heritage-mark"><img src="${mark}" alt="Reconstructed Slang cloud mark"/><span>slang</span><div class="era-palette"><i style="background:#164968"></i><i style="background:#1c6f9a"></i><i style="background:#b21546"></i><i style="background:#fcfcfc"></i></div><p>Reconstructed cloud mark<br/><small>Original proportions adapted to a clean SVG grid.</small></p></div></section><section class="principle-list">${[
    [
      'Show the relationships',
      'Use real diagrams and clear labels. Connections are the subject, not background decoration.',
    ],
    [
      'Give complexity room',
      'Quiet surfaces and deliberate spacing make dense technical information approachable.',
    ],
    [
      'Use color with a purpose',
      'Separate brand accents, data types, and status. Pair every semantic color with a word or shape.',
    ],
    [
      'Carry history forward',
      'Preserve recognizable primitives. Improve focus, contrast, responsiveness, and consistency.',
    ],
  ]
    .map(([title, desc], i) => `<div><span>0${i + 1}</span><h2>${title}</h2><p>${desc}</p></div>`)
    .join(
      '',
    )}</section><section><div class="section-heading"><div><span class="section-index">SOURCE INVENTORY</span><h2>Grounded in the work.</h2></div><p>Inspected September 2026.<br/>Private links require organization access.</p></div><div class="source-list">${sources.map((s) => `<article><div><a href="https://github.com/Bitspark/${s.name}/tree/${s.sha}" target="_blank" rel="noopener">${s.name} ${icon('external')}</a><span class="sd-badge">${s.access}</span></div><h3>${s.role}</h3><p>${s.detail}</p><code>${s.sha.slice(0, 7)}${s.file ? ' / ' + s.file : ''}</code></article>`).join('')}</div></section><div class="sd-callout research-note"><strong>Reconstruction, not a frozen snapshot.</strong><br/>The palette and type colors are recovered from source. Semantic roles, spacing, accessible states, and these example layouts are new. No legacy commercial template code, private infrastructure, customer data, or paid font/icon assets are included. The authentication service was also inspected; it provides backend behavior rather than a visual system.</div></div>`;
}
export const pages = {
  foundations,
  components,
  brand,
  library,
  heritage,
  ...examplePages,
  operatorCards,
};
