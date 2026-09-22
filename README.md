# Slang Design

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo/slang-logo-dark.svg">
    <img src="assets/logo/slang-logo-light.svg" alt="Slang" width="280">
  </picture>
</p>

**Connected by design.** The shared visual language for Slang websites, studios, applications, and documentation.

[Explore the live showcase](https://design.slang.bitspark.com/) · [Design research](docs/research.md) · [Using the system](docs/usage.md) · [Accessibility](docs/accessibility.md)

Slang Design reconstructs the later Slang cloud and web identity: petrol blue, raspberry accents, Roboto and Roboto Slab, pale workspaces, and colored data connections. It brings those ideas into a small, framework-independent system with explicit tokens, native HTML recipes, and optional custom elements.

## Explore

| View                                                                 | What it demonstrates                                                             |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Foundations](https://design.slang.bitspark.com/#/foundations)       | Color, typography, semantic data types, and the visual language                  |
| [Components](https://design.slang.bitspark.com/#/components)         | Actions, forms, feedback, type labels, flow canvas, and token export             |
| [Logo & brand](https://design.slang.bitspark.com/#/brand)            | Vector logos for light/dark surfaces, symbols, monochrome artwork, and downloads |
| [Origins & principles](https://design.slang.bitspark.com/#/heritage) | Source inventory, provenance, and design decisions                               |
| [Product website](https://design.slang.bitspark.com/#/website)       | Diagram-led marketing and a clear first action                                   |
| [Operator library](https://design.slang.bitspark.com/#/library)      | Search, category filtering, empty states, and operator details                   |
| [Visual studio](https://design.slang.bitspark.com/#/studio)          | Selectable graph, inspector, editable inputs, calculation, and output console    |
| [Documentation](https://design.slang.bitspark.com/#/docs)            | Concepts, diagrams, reference tables, and in-page navigation                     |
| [Cloud workspace](https://design.slang.bitspark.com/#/cloud)         | Metrics, deployment table, status, creation dialog, and local demo state         |

The examples demonstrate interfaces, not a hosted Slang engine. Studio multiplication runs locally. Cloud actions only change fictional browser-local data. The working studio is [slang.run](https://slang.run/); the product website is [slang.bitspark.com](https://slang.bitspark.com/). The language runtime lives in [Bitspark/slang](https://github.com/Bitspark/slang).

## Logo assets

[Preview the logo family](https://design.slang.bitspark.com/#/brand) or see the [logo guide](docs/logo.md). Nine SVG downloads include transparent light/dark logos and symbols, one-color artwork, and an app icon. Lettering is outlined, with no font dependency. Import assets through `@bitspark/slang-design/logo/*.svg`.

## Run locally

Requires Node.js 22.12+ (CI uses Node 24).

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5176`. `npm run build` produces a static `dist/` site. `npm run preview` serves that build. Hash routes and relative assets work on GitHub Pages and other static hosts, including subdirectories.

## Use in another project

The package is available from this Git repository; it has not been published to the npm registry.

```sh
npm install github:Bitspark/slang-design#v0.2.1
```

```js
import '@bitspark/slang-design/styles.css';
import '@bitspark/slang-design'; // optional: registers slang-type and slang-flow
```

```html
<section class="sd-scope" data-theme="light">
  <article class="sd-card">
    <h2>Double a number</h2>
    <slang-type kind="number"></slang-type>
    <button class="sd-button sd-button--accent">Run flow</button>
  </article>
</section>
```

Use the CSS with native controls in Angular, Vue, React, Svelte, or plain HTML. Only the optional custom elements need JavaScript. Full import, event, theme, and framework guidance is in [docs/usage.md](docs/usage.md). Font files are self-hosted; the showcase makes no third-party font or analytics requests.

## Structure

```text
tokens/tokens.json   Source of truth: primitives, dimensions, light/dark roles
styles/             Generated CSS variables, fonts, scoped component recipes
components/         Dependency-free custom elements and TypeScript declarations
assets/             Brand mark, self-hosted fonts, and font licenses
site/               Nine showcase views built from the shared system
docs/               Research, usage, accessibility, and contribution guidance
tests/              Contrast, focus, theme parity, and demo behavior contracts
```

## Checks and delivery

```sh
npm run tokens       # Regenerate CSS after editing tokens/tokens.json
npm test             # Contrast, theme contracts, search, and calculation
npm run build        # Verify generated tokens and build the showcase
npm run check        # Format, test, build, and inspect the package
```

GitHub Actions validates pull requests. Changes on `main` also deploy the showcase to GitHub Pages. Pages must use **GitHub Actions** as its build source. See the [deployment runbook](docs/deployment.md) for domain ownership, DNS/TLS, verification and rollback, and [contributing](docs/contributing.md) for the browser verification checklist.

New code and documentation: Apache-2.0. Font license texts and brand attribution are included in [NOTICE](NOTICE) and `assets/licenses/`.
