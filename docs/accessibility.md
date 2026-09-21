# Accessibility

The system targets readable, keyboard-operable interfaces. Automated checks cover specific contracts; they do not establish blanket WCAG conformance for every downstream application.

- Light and dark semantic text pairs meet a minimum **4.5:1** contrast. Tested pairs include primary/muted/soft text, action labels, links, and success/warning/error text on their surfaces.
- Focus indicators meet **3:1** against normal, page, and subtle surfaces. Controls use a 3 px outline with an offset.
- Type colors are recovered identity cues, not body text colors. Every marker has a visible textual label. Boolean uses a circle rather than the default square. Status badges also contain words.
- Buttons, inputs, labels, checkboxes, tables, and dialogs use native elements. The showcased category and canvas-view selectors are button groups with `aria-pressed`, not incomplete ARIA tabs.
- SVG graph nodes have accessible names, button roles, keyboard focus, Enter/Space behavior, and visible selection/focus states.
- The main content has a working skip link. Hash-route changes move focus to the main region and update the document title.
- Search result counts and flow output use live announcements. Dialogs use the browser's focus containment, Escape handling, and modal semantics.
- Reduced-motion settings suppress transitions and smooth scrolling. No animation is required to understand a diagram.
- Mobile layouts reorganize content; tables scroll within their own region. Small graph labels may still need zoom on very narrow screens, so the studio also exposes a textual definition and inspector.
- Fonts are local and use `font-display: swap`. UI fallback fonts keep content available while font files load.

When integrating, label all icon-only actions, connect errors and help text to fields, preserve keyboard order, use the actual heading hierarchy for the page, and test with real assistive technologies. The examples are a starting point, not a substitute for application-level accessibility review.
