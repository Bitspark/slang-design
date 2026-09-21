# Initial release verification

Verified on 21 September 2026 for the initial 0.1.0 release.

- `npm run check`: formatting, six automated contracts, generated-token consistency, production build, and package contents passed.
- A separate consumer project installed the packed package. Server-side module import, token exports, and all six bundled font paths passed.
- All eight views were checked in the Chromium-based browser at desktop and 390 px width. Page-level horizontal overflow was corrected in the components and cloud views; the deployment table scrolls within its container.
- Light/dark switching and persistence, mobile navigation, keyboard dialog dismissal, library search plus category filtering, empty states, and clearing filters were exercised.
- The studio calculated changed inputs (13 × 3 = 39), selected nodes by keyboard, restored saved inputs, displayed its textual definition, and rejected an empty value submitted by keyboard.
- The component form submitted its sample name. The documentation's in-page links kept the documentation route active.
- The fictional cloud workspace created an example, started and paused it, and retained its status through reload.
- No browser console errors were observed during these checks.

These checks cover the design system and its local demonstrations. They do not test a production Slang compiler, a real cloud deployment service, or complete assistive-technology conformance. See [accessibility](accessibility.md) for the tested contrast contracts and integration responsibilities.

## Logo family, 0.2.0

The nine logo assets were parsed as SVG and checked for embedded images, external resources, scripts, and live text. The eight transparent variants contain no background rectangle. Public package export paths resolve, and the production build emits downloadable SVG files. The existing six automated contracts and full build/package check pass.

The logo gallery was checked at desktop and 390 px widths in both interface themes, with no horizontal page overflow or browser console errors. All preview images loaded, and the wordmark download completed through the browser. The logo preview in the documentation was rendered directly from the SVG paths.
