# Contributing

Keep changes rooted in the later Slang cloud/web identity: petrol, raspberry, Roboto/Roboto Slab, pale workspaces, and typed connections. Preserve the distinction between brand, data type, and status colors.

## Workflow

1. Change source tokens, recipes, components, or example pages.
2. If tokens changed, run `npm run tokens`.
3. Run `npm run format`, then `npm run check`.
4. Verify affected pages in a browser, including narrow screens and dark mode.
5. Open a pull request describing the visible behavior, research basis, and checks.

Do not copy private infrastructure or commercial theme assets into this public repository. Record source provenance for identity decisions. Self-host newly introduced fonts with their licenses. Keep components independent of the showcase router and demo state.

## Browser verification

- Foundations, components, origins, and all five example views load without console errors.
- Theme switching is readable and persists through reload.
- Operator search works with a category, empty results, and a cleared query; details open and close by keyboard.
- Studio computes changed values, rejects invalid input, selects nodes with Enter/Space, updates its definition, and restores saved values.
- Cloud creation starts in Paused; Start/Pause updates the row and summary. Refresh preserves demo data. It never contacts a real deployment service.
- Dialogs close with Escape and return focus to the opener.
- Skip link, route navigation, mobile menu, and focus states work at desktop and 390 px widths. Check at 200% zoom when changing density.
- Check text overflow, bounded table scrolling, and font loading. Never claim full WCAG conformance from contrast tests alone.

## Publishing

GitHub Pages uses the `Validate and publish showcase` workflow. Every push to `main` runs checks and builds the site before uploading a Pages artifact. `pull_request` runs validation without deployment. Pages uses relative assets and hash routes, so deep links do not require server rewrites.

Version the source package and tag stable revisions. The Git package can be installed directly from a version tag. Publishing to the npm registry is a separate operation and is not configured by this repository. Keep `package-lock.json` committed for reproducible showcase builds.
