# Design research and decisions

This system follows the later Slang cloud and website identity. The source inspection was performed on 21 September 2026. We used styles, components, page layouts, and visual assets as evidence; we did not assume that every historical application can still be built or that its backend is operational.

## Source inventory

| Repository and revision                                                                                                                          | Evidence inspected                                                                                                         | Contribution                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [slang-editor @ ed1fe3e](https://github.com/Bitspark/slang-editor/tree/ed1fe3e93c1a26e9953694fd69ba882eb9fd0e6f)                                 | `src/styles/variables.scss`, `studio.ts`, `editor.scss`, editor components                                                 | Roboto, type colors, compact nodes, ports, connection curves, graph composition                             |
| [slang.cloud @ c5d49c2](https://github.com/Bitspark/slang.cloud/tree/c5d49c23f044f93cf6e1b032f0276c5504942980) (private)                         | `src/theme.ts`, `App.vue`, `layouts/Default.vue`, toolbar/navigation, studio, blueprint and deployment views, logo         | Blue/raspberry application theme, permanent navigation, workspace hierarchy, cards, tables, cloud mark      |
| [bitspark.de @ 93ea37d](https://github.com/Bitspark/bitspark.de/tree/93ea37d72e78b6abd1b5aa3fc3d161ad3eeb7f02) (private)                         | `scss/core_b6k.scss`, `_themes-b6k.scss`, `_layout-colors.scss`, Slang landing and documentation pages, graph illustration | Petrol/raspberry, light Roboto Slab headings, white space, diagram-led explanation, documentation hierarchy |
| [slang-ui @ e4bb0c7](https://github.com/Bitspark/slang-ui/tree/e4bb0c7fb13cc24bee2bc33c458c1031d6b32561)                                         | Editor, sidebar, debug panel and type/value forms                                                                          | Studio anatomy and information hierarchy, not an alternative brand palette                                  |
| [search.bitspark.de @ 767508c](https://github.com/Bitspark/search.bitspark.de/tree/767508cf5eba313b619f5371d6eb189d96afe8a0) (private)           | README, operator records, web-component example                                                                            | Search vocabulary and operator reference structure; no independent visual system                            |
| [repo.bitspark.de @ 0934da9](https://github.com/Bitspark/repo.bitspark.de/tree/0934da9f6ebb282f05b3fd1929e7f9b85f460af3) (private)               | README and generated bundle inventory                                                                                      | Operator distribution concepts; no independent visual frontend                                              |
| [playground.tryslang.com @ 737813d](https://github.com/Bitspark/playground.tryslang.com/tree/737813dc3b824a4c0e95c894e63a6ef97f25fc1d) (private) | README and frontend/static-file inventory                                                                                  | Hosted session experience; it serves the editor rather than establishing its own visual language            |
| [slang-showcases @ fb13578](https://github.com/Bitspark/slang-showcases/tree/fb13578539340d0fba9fd3abf7696287b3fff904) (private)                 | Showcase and template inventory                                                                                            | Integration scenarios; no reusable website theme or customer content imported                               |
| [auth.bitspark.de](https://github.com/Bitspark/auth.bitspark.de) (private)                                                                       | Repository file inventory                                                                                                  | Authentication backend, with no independent frontend style source identified                                |

The runtime, standard library, language experiments, CI containers, and microcontroller examples are language/infrastructure projects, not additional web design systems. The temporary restored tryslang.com landing page is not a historical style reference for this work.

## Recovered primitives

| Element             | Source value             | Use here                                                                    |
| ------------------- | ------------------------ | --------------------------------------------------------------------------- |
| Website primary     | `#164968`                | Petrol, structure and primary actions                                       |
| Cloud primary       | `#1c6f9a`                | Links and accessible focus                                                  |
| Website accent      | `#b21546`                | Raspberry, primary next step and selected navigation                        |
| Cloud accent        | `#cb2f5f`                | Preserved primitive; stronger website raspberry is the default action color |
| Ink / paper         | `#212124` / `#fcfcfc`    | Calm type and open surfaces                                                 |
| Number              | `#2e49b3`                | Type markers and connections                                                |
| String              | `#a52e2e`                | Type markers and connections                                                |
| Boolean             | `#ff764d`                | Type markers, with a circular shape                                         |
| Binary              | `#83a91d`                | Type markers                                                                |
| Primitive / generic | `#209cee` / `#b25db2`    | Type markers and connections                                                |
| Website typography  | Roboto + Roboto Slab 300 | Body/UI and light display headings                                          |

Typography is self-hosted from Fontsource. Share Tech Mono is used only for technical notation; it is not the brand's display voice. The original paid font/icon resources and commercial template styles are not redistributed.

## Reconstruction choices

- **One family:** petrol structure, raspberry emphasis, pale workspaces. Every example uses this direction.
- **Relationships as imagery:** diagrams are meaningful interface content. Lines connect real labeled nodes rather than acting as abstract decoration.
- **Quiet density:** marketing has room to breathe; the studio and tables use compact spacing without changing the underlying family.
- **Explicit semantics:** brand accents, data types, and feedback each have separate roles. A red string port is not an error.
- **New semantic layer:** spacing, radii, control heights, focus, status backgrounds, and dark-mode adaptations are new decisions. They are not presented as historically exact.
- **Legible graphs:** the source editor used 6 px connection strokes and tiny 80 × 46 nodes. The showcase uses thinner strokes and larger labeled nodes for modern documentation and demonstration contexts.
- **Brand mark:** a clean SVG adaptation of the cloud mark, reconstructed from the viewed image. The original opposing brackets, inset connector, and raised square are retained. Transparent surface variants, monochrome assets, and a Roboto outline wordmark are documented in [the logo guide](logo.md). It is an adaptation, not a claim to reproduce the original vector artwork exactly.
- **Accessible by construction:** text remains readable without semantic color, native controls retain keyboard behavior, focus is visible, and motion can be reduced.

## Publication boundaries

This public repository includes original implementation, documented design facts, a reconstructed brand mark, and appropriately licensed fonts. It does not contain cloned private repositories, credentials, private deployment configuration, customer data, commercial Bulkit source, Font Awesome Pro assets, or Nexa font files. Source links to private repositories are references for maintainers and require their own access.
