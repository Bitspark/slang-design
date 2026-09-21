# Using Slang Design

## Import only what you need

```js
import '@bitspark/slang-design/styles.css'; // tokens, local fonts, component recipes
// Or: import '@bitspark/slang-design/tokens.css'; // variables only
import '@bitspark/slang-design'; // optional custom elements; safe to import during SSR
```

The package can be installed from GitHub at a version tag, or built with `npm pack` and installed from the resulting tarball. It is not currently on the npm registry. All distributable source, CSS and font assets are present in Git; consumers do not need Vite or a build step for this package.

For plain HTML, copy `styles/`, `components/`, and `assets/` together without changing their relative paths:

```html
<link rel="stylesheet" href="./slang-design/styles/index.css" />
<script type="module" src="./slang-design/components/index.js"></script>
```

## Scope and themes

```html
<section class="sd-scope" data-theme="light">
  <label class="sd-label" for="flow-name">Blueprint name</label>
  <input class="sd-input" id="flow-name" aria-describedby="flow-name-help" />
  <span class="sd-field-help" id="flow-name-help">Use a name that describes the flow.</span>
  <button class="sd-button sd-button--accent">Create blueprint</button>
</section>
```

Use `data-theme="dark"` for the dark adaptation. Tokens inherit and can be scoped to subtrees. The package does not reset the host application's `body`, headings, links, layout, or routing. It defines recipes and locally loaded fonts. Use `background: var(--sd-bg)` and `color: var(--sd-text)` on your application shell. Headings can use `font-family: var(--sd-font-display); font-weight: 300`.

Override semantic roles rather than copying hexadecimal colors into product CSS. Edit `tokens/tokens.json` and run `npm run tokens` when changing the shared contract. Do not edit `styles/tokens.css` directly. `--sd-color-*` holds historical primitives; `--sd-*` roles such as `surface`, `text`, `accent`, and `success` provide themed semantics.

## Recipes

| Recipe                                  | Variants / notes                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| `sd-button`                             | `--accent`, `--outline`, `--quiet`, `--small`, `--icon`; native `disabled`                   |
| `sd-card`                               | Surface, padding, border, and radius                                                         |
| `sd-label`, `sd-input`, `sd-field-help` | Native labels/inputs/selects/textareas; invalid state through `aria-invalid="true"`          |
| `sd-badge`                              | `--success`, `--warning`, `--danger`; always provide status text                             |
| `sd-callout`                            | Standard information or `--warning`                                                          |
| `sd-tabs`                               | Styling only; supply correct native buttons, pressed state, or full tab behavior in the host |
| `sd-switch`                             | Label with native checkbox; keyboard and checked state are browser-provided                  |
| `sd-table`                              | Semantic `table`, `thead`, `th`, `tbody`; wrap for narrow-screen scrolling                   |
| `sd-code`                               | Scrollable code surface; supply `pre`/`code` semantics                                       |
| `sd-dialog`                             | Native `dialog`; the host calls `showModal()` and `close()`                                  |
| `sd-divider`, `sd-skip`                 | Separator and skip link; connect the link to the main region                                 |

Recipes provide presentation. They do not perform network calls, register fake application behavior, or create a state management dependency.

## Custom elements

`slang-type` displays an explicit type label and a colored marker. Supported kinds: `number`, `string`, `boolean`, `binary`, `primitive`, `generic`, `trigger`. Unknown kinds safely fall back to `generic`. A slot can provide a more precise label.

```html
<slang-type kind="generic">stream&lt;T&gt;</slang-type>
```

`slang-flow` is a presentational, selectable flow specimen. It is not the full Slang editor or an arbitrary graph renderer. It has two fixed demonstration layouts and does not compile or execute blueprints.

| Attribute              | Meaning                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `variant="overview"`   | Five-node CSV/filter/output composition; omitted uses input/multiply/output                   |
| `selected="transform"` | Selected node; IDs are `input`, `source`, `transform`, `format`, `output` depending on layout |
| `result="42"`          | Displayed output label in the three-node layout; text is escaped                              |

```js
const flow = document.querySelector('slang-flow');
flow.addEventListener('slang-node-select', (event) => {
  console.log(event.detail.id);
});
flow.setAttribute('result', '84');
```

`slang-node-select` bubbles across the shadow boundary and contains `{ id }`. Nodes support pointer activation, Enter, and Space. Component styles use inherited tokens. Registration is idempotent. The module is safe to evaluate without a DOM during SSR; rendering/registration occurs in the browser. TypeScript declarations include the custom element map and event detail.

## Framework integration

- **Vue:** import the stylesheet and component module in the client entry, and configure `compilerOptions.isCustomElement` for tags starting with `slang-` if using the optional custom elements. Ordinary CSS recipes need no special configuration.
- **Angular:** import the stylesheet globally, register elements in the browser entry, and include `CUSTOM_ELEMENTS_SCHEMA` where custom elements are rendered. Native CSS recipes can be used directly.
- **React / Next.js:** import the CSS once. Register elements in a client module; the graph attributes are strings. Use a ref and `addEventListener('slang-node-select', ...)` with cleanup when consuming the event. Supply custom JSX intrinsic element declarations if your TypeScript setup requires them.
- **Svelte / plain HTML:** import the module and CSS and use the elements directly; subscribe to the native custom event.

Do not wrap a button inside another button, treat colored type markers as interactive controls, or rely on the example studio as a production compiler. Integrate the actual [Slang editor](https://github.com/Bitspark/slang-editor) and runtime separately.
