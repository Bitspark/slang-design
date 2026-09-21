import { heading } from './pages.js';
import { icon } from './app.js';
import logoLight from '../assets/logo/slang-logo-light.svg';
import logoDark from '../assets/logo/slang-logo-dark.svg';
import logoBlack from '../assets/logo/slang-logo-black.svg';
import logoWhite from '../assets/logo/slang-logo-white.svg';
import markLight from '../assets/logo/slang-mark-light.svg';
import markDark from '../assets/logo/slang-mark-dark.svg';
import markBlack from '../assets/logo/slang-mark-black.svg';
import markWhite from '../assets/logo/slang-mark-white.svg';
import universal from '../assets/logo/slang-mark-universal.svg';

const download = (url, file, label) =>
  `<a class="sd-button sd-button--outline sd-button--small" href="${url}" download="${file}">${icon('download')}${label}<span class="sr-only"> — ${file}</span></a>`;

export function brand() {
  return `<div class="page brand-page">${heading('FOUNDATIONS / LOGO & BRAND', 'One mark. Every surface.', 'The familiar Slang brackets, drawn as clean vectors. A transparent symbol, an outlined wordmark, and a version for every background.')}
  <div class="brand-pair">
    <section class="brand-card">
      <div class="brand-preview brand-surface-light"><span class="brand-specimen-label">01 / ON LIGHT</span><img src="${logoLight}" width="356" height="128" alt="Slang logo in petrol, raspberry, and blue on a bright background"/><span class="brand-specimen-foot">Petrol structure · raspberry accent</span></div>
      <div class="brand-downloads"><h2>For bright surfaces</h2><p>Use on white, paper, and pale workspaces.</p><div>${download(logoLight, 'slang-logo-light.svg', 'Wordmark SVG')}${download(markLight, 'slang-mark-light.svg', 'Symbol SVG')}</div></div>
    </section>
    <section class="brand-card">
      <div class="brand-preview brand-surface-dark"><span class="brand-specimen-label">02 / ON DARK</span><img src="${logoDark}" width="356" height="128" alt="Slang logo in pale ink, raspberry, and blue on a petrol background"/><span class="brand-specimen-foot">Pale structure · luminous detail</span></div>
      <div class="brand-downloads"><h2>For dark surfaces</h2><p>Use on petrol, charcoal, and dark workspaces.</p><div>${download(logoDark, 'slang-logo-dark.svg', 'Wordmark SVG')}${download(markDark, 'slang-mark-dark.svg', 'Symbol SVG')}</div></div>
    </section>
  </div>
  <section class="brand-principles"><div><span class="section-index">FAMILIAR GEOMETRY</span><h2>A connection worth keeping.</h2><p>The opposing brackets, inset blue connector, and raised square come from the Slang cloud mark. The lettering uses our Roboto foundation, converted to vector outlines.</p></div><div><span class="section-index">BUILT TO TRAVEL</span><h2>Nothing to install.</h2><p>Every download is a self-contained SVG. No background rectangle in the transparent variants, no embedded bitmap, and no external font dependency.</p></div></section>
  <section class="brand-mono"><div class="section-heading"><div><span class="section-index">ONE COLOR / SAME CHARACTER</span><h2>When simplicity matters.</h2></div><p>For print, stamps, and places<br/>where color is unavailable.</p></div><div class="brand-pair"><section class="brand-card"><div class="brand-preview brand-preview-small brand-surface-light"><img src="${logoBlack}" width="356" height="128" alt="One-color dark Slang wordmark"/></div><div class="brand-downloads"><h3>Solid ink</h3><div>${download(logoBlack, 'slang-logo-black.svg', 'Wordmark SVG')}${download(markBlack, 'slang-mark-black.svg', 'Symbol SVG')}</div></div></section><section class="brand-card"><div class="brand-preview brand-preview-small brand-surface-charcoal"><img src="${logoWhite}" width="356" height="128" alt="One-color white Slang wordmark"/></div><div class="brand-downloads"><h3>Reversed white</h3><div>${download(logoWhite, 'slang-logo-white.svg', 'Wordmark SVG')}${download(markWhite, 'slang-mark-white.svg', 'Symbol SVG')}</div></div></section></div></section>
  <section class="brand-icon-section"><div><span class="section-index">APP ICON / ANY SURFACE</span><h2>A little home of its own.</h2><p>When the background is outside your control, use the contained app icon. Its charcoal tile and fine border stay distinct on both light and dark surfaces.</p>${download(universal, 'slang-mark-universal.svg', 'App icon SVG')}</div><div class="brand-icon-samples"><div class="brand-surface-light">${[24, 32, 48, 72].map((size) => `<div><img src="${universal}" width="${size}" height="${size}" alt="Slang icon at ${size} pixels"/><span>${size}</span></div>`).join('')}</div><div class="brand-surface-dark">${[24, 32, 48, 72].map((size) => `<div><img src="${universal}" width="${size}" height="${size}" alt="Slang icon at ${size} pixels on dark"/><span>${size}</span></div>`).join('')}</div></div></section>
  <section class="brand-guidance sd-card"><span class="section-index">A FEW SIMPLE RULES</span><h2>Give the mark room to speak.</h2><ul><li>Choose the variant for the surface behind it, independently of the device’s theme.</li><li>Keep the proportions. Leave at least one bracket-stroke of clear space around the visible artwork.</li><li>Use the symbol at 24 px or larger, and the full wordmark at 112 px or larger.</li><li>For photographs or busy backgrounds, use the contained app icon or a quiet solid panel.</li></ul><a class="text-link" href="https://github.com/Bitspark/slang-design/blob/main/docs/logo.md">Read the logo guide ${icon('arrow')}</a></section>
  </div>`;
}
