import logoLight from '../assets/logo/slang-logo-light.svg';
import logoDark from '../assets/logo/slang-logo-dark.svg';

// The surrounding home link provides the accessible name.
export const websiteLogo = () =>
  `<span class="website-logo" aria-hidden="true"><img class="website-logo-light" src="${logoLight}" width="356" height="128" alt=""/><img class="website-logo-dark" src="${logoDark}" width="356" height="128" alt=""/></span>`;
