/** Slang's optional, dependency-free custom elements. Import once in a browser. */
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const kinds = new Set(['number', 'string', 'boolean', 'binary', 'primitive', 'generic', 'trigger']);
const ElementBase = globalThis.HTMLElement ?? class {};

class SlangType extends ElementBase {
  static observedAttributes = ['kind'];
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, before, after) {
    if (before !== after) this.render();
  }
  render() {
    const kind = kinds.has(this.getAttribute('kind')) ? this.getAttribute('kind') : 'generic';
    this.shadowRoot.innerHTML = `<style>:host{display:inline-flex;vertical-align:middle}span{display:inline-flex;align-items:center;gap:7px;font:12px/1.6 var(--sd-font-code,monospace);color:var(--sd-text,#212124)}i{width:8px;height:8px;border-radius:2px;background:var(--sd-type-${kind});box-shadow:0 0 0 1px #0001}i.boolean{border-radius:50%}</style><span><i class="${kind}" aria-hidden="true"></i><slot>${kind}</slot></span>`;
  }
}

class SlangFlow extends ElementBase {
  static observedAttributes = ['variant', 'selected', 'result'];
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.addEventListener('click', (e) => this.select(e));
    this.shadowRoot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.select(e);
      }
    });
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, before, after) {
    if (before !== after) this.render();
  }
  select(event) {
    const node = event.target.closest?.('[data-node]');
    if (!node) return;
    this.setAttribute('selected', node.dataset.node);
    this.shadowRoot.querySelector(`[data-node="${node.dataset.node}"]`)?.focus();
    this.dispatchEvent(
      new CustomEvent('slang-node-select', {
        detail: { id: node.dataset.node },
        bubbles: true,
        composed: true,
      }),
    );
  }
  render() {
    const overview = this.getAttribute('variant') === 'overview';
    const selected = this.getAttribute('selected');
    const result = this.getAttribute('result') || '42';
    const node = (id, x, y, w, title, subtitle, kind, icon) =>
      `<g class="node ${selected === id ? 'selected' : ''}" tabindex="0" role="button" aria-label="Inspect ${escape(title)}" data-node="${id}" transform="translate(${x} ${y})"><rect class="body" width="${w}" height="68" rx="5"/><rect class="port" x="-4" y="28" width="8" height="12" rx="1" fill="var(--sd-type-${kind})"/><rect class="port" x="${w - 4}" y="28" width="8" height="12" rx="1" fill="var(--sd-type-${kind})"/><text x="16" y="26" class="title">${escape(title)}</text><text x="16" y="47" class="subtitle">${escape(subtitle)}</text><text x="${w - 23}" y="27" class="glyph" text-anchor="middle">${escape(icon)}</text></g>`;
    const content = overview
      ? `<path class="wire" style="--wire:var(--sd-type-string)" d="M177 100H209Q231 100 231 122V149Q231 171 258 171"/><path class="wire" style="--wire:var(--sd-type-number)" d="M177 249H209Q231 249 231 227V193Q231 171 258 171"/><path class="wire" style="--wire:var(--sd-type-generic)" d="M420 171H447Q466 171 466 151V91Q466 71 488 71"/><path class="wire" style="--wire:var(--sd-type-number)" d="M420 171H447Q466 171 466 191V253Q466 275 488 275"/>${node('source', 27, 66, 150, 'Read CSV', 'city-population.csv', 'string', '≋')}${node('input', 27, 215, 150, 'Value', 'threshold: 10,000', 'number', '#')}${node('transform', 258, 137, 162, 'Filter & map', 'connected operators', 'generic', '⋈')}${node('format', 488, 37, 165, 'Format', 'a useful answer', 'generic', '{}')}${node('output', 488, 241, 165, 'Visualize', 'see the result', 'number', '▥')}`
      : `<path class="wire" style="--wire:var(--sd-type-number)" d="M189 178H259"/><path class="wire" style="--wire:var(--sd-type-number)" d="M421 178H491"/>${node('input', 27, 144, 162, 'Input', 'number · user value', 'number', '#')}${node('transform', 259, 144, 162, 'Multiply', 'x × factor', 'number', '×')}${node('output', 491, 144, 162, 'Output', `number · ${result}`, 'number', '↗')}<text x="340" y="294" text-anchor="middle" class="hint">Select an operator to inspect its properties</text>`;
    this.shadowRoot.innerHTML = `<style>:host{display:block;width:100%}svg{display:block;width:100%;height:auto;overflow:visible}.wire{stroke:var(--wire);stroke-width:2;fill:none;stroke-linecap:round}.body{fill:var(--sd-surface,#fff);stroke:var(--sd-border-strong,#82949f);stroke-width:1;filter:drop-shadow(0 3px 5px #1649680a)}.title{font:500 13px var(--sd-font-body,Arial);fill:var(--sd-text,#212124)}.subtitle{font:11px var(--sd-font-code,monospace);fill:var(--sd-text-muted,#596773)}.glyph{font:18px var(--sd-font-code,monospace);fill:var(--sd-text-muted,#596773)}.hint{font:12px var(--sd-font-body,Arial);fill:var(--sd-text-muted,#596773)}.node{cursor:pointer;outline:none}.node:hover .body{stroke:var(--sd-primary,#164968);stroke-width:2}.node:focus-visible .body,.node.selected .body{stroke:var(--sd-accent,#b21546);stroke-width:2.5}.node:focus-visible .body{stroke-dasharray:5 3}@media(prefers-reduced-motion:no-preference){.body{transition:stroke .15s}}</style><svg viewBox="0 0 680 360" role="group" aria-label="${overview ? 'Data flow from CSV and a numeric threshold to formatting and visualization' : 'Number input connected to multiply and output'}">${content}</svg>`;
  }
}

export function registerSlangElements() {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get('slang-type')) customElements.define('slang-type', SlangType);
  if (!customElements.get('slang-flow')) customElements.define('slang-flow', SlangFlow);
}
registerSlangElements();
export { SlangType, SlangFlow };
