# Deploy the design resource

The canonical site is **<https://design.slang.bitspark.com/>**. This repository owns its static build, deployment workflow and rollback. GitHub Pages hosts it; Cloudflare hosts the DNS record.

## Place in the Slang system

The showcase is a public resource for designers and developers. The product website is `slang.bitspark.com`, the working studio and its APIs are `slang.run`, and deployed programs use `slangapps.com`. The showcase's studio/cloud views are browser-local demonstrations. They do not require accounts, backend credentials, databases or the execution hosts.

There are two independent outputs from this repository:

- The showcase: the current `main` build deployed by GitHub Actions.
- The reusable design package: versioned tokens, CSS, components and assets, selected explicitly by consuming repositories. Updating the showcase does not upgrade those consumers. npm registry publishing is not configured.

Consumers bundle their selected assets into their own releases; they should not load production CSS or JavaScript from the mutable showcase URL. A showcase outage therefore does not interrupt those applications. The shared domain naming expresses product ownership, not shared hosting or a runtime dependency. The umbrella architecture and inventory belong in the private `slang-ecosystem` repository.

## Hosting configuration

| Setting                | Value                                                          |
| ---------------------- | -------------------------------------------------------------- |
| Repository / branch    | `Bitspark/slang-design`, `main`                                |
| Pages build source     | GitHub Actions (`workflow`)                                    |
| Pages custom domain    | `design.slang.bitspark.com`                                    |
| DNS                    | Exact CNAME `design.slang.bitspark.com` → `bitspark.github.io` |
| Cloudflare mode / TTL  | DNS only, 120 seconds                                          |
| TLS                    | GitHub-managed certificate; enforce HTTPS once issued          |
| Deployment environment | `github-pages`, restricted to the `main` branch                |
| Build output           | `dist/`, Vite relative assets and hash routes                  |

DNS only means GitHub terminates TLS directly, including for this nested hostname. No proxy or wildcard record is needed. Do not point the CNAME at a URL containing `/slang-design/` or add a CNAME alongside another record at the same hostname.

For initial setup or migration:

1. Prefer verifying `slang.bitspark.com` (which covers its immediate subdomain `design`) or the exact hostname in **Bitspark organization Settings → Pages**. Publish the TXT challenge GitHub provides and complete verification. Keep the TXT record. This is separate from assigning a repository custom domain, and separate from the organization's profile verification badge.
2. Set the repository's Pages custom domain **before** adding its DNS record. The documented API equivalent is `gh api --method PUT repos/Bitspark/slang-design/pages -f cname=design.slang.bitspark.com`.
3. Add the exact DNS-only CNAME above. Preserve all other records. Check authoritative/public DNS and Pages' DNS health.
4. Wait for GitHub's certificate to cover the hostname, then enforce HTTPS: `gh api --method PUT repos/Bitspark/slang-design/pages -F https_enforced=true`. DNS/certificate issuance can take up to 24 hours.
5. Verify normal TLS, the HTTP redirect, the former `https://bitspark.github.io/slang-design/` URL, and the deployed build as below.

Actions-based Pages deployments configure the domain in Pages settings/API. A `CNAME` file in the artifact is ignored. Organization-level domain verification needs its own recorded result; a working certificate or successful DNS check does not prove that verification was completed.

## Delivery and validation

The [workflow](../.github/workflows/site.yml) runs `npm ci` and `npm run check` on pull requests and `main`. Checks cover formatting, the existing test suite, generated tokens, the production build and package contents. Only `main` uploads and deploys the built artifact. The deploy job has `pages: write` and `id-token: write`; build jobs only read source. Actions are pinned to commits and checkout does not persist credentials. Production runs are serialized without cancelling an active run; newer pending changes may replace older pending runs.

Use a pull request, inspect the affected screens using the [browser checklist](contributing.md#browser-verification), and merge after validation. The merge triggers publication. Inspect the successful `deploy` job and its commit SHA, not just a green pull-request build. GitHub's `github-pages` environment records deployment history. No Cloudflare token, SSH key or studio secret belongs in this build.

After a domain or delivery change, check:

- `gh api repos/Bitspark/slang-design/pages`: expected domain, certificate and HTTPS enforcement.
- HTTPS 200 with ordinary certificate validation at the canonical URL; HTTP upgrades to HTTPS; the old Pages URL redirects correctly. Test a hash-route link such as `#/brand` in a browser.
- The served HTML and referenced JS/CSS/assets match the successful production artifact. Load all nine views; check the console, fonts, logos and downloads.
- The changed page at desktop and 390 px widths, with light/dark mode and a reload. Demo state is per browser origin; changing the hostname does not migrate local demonstration data.

Record the deployed SHA, workflow/deployment link, DNS/TLS observations and browser results in the ecosystem's dated evidence. Its backend release manifest tracks a different deployment and must not be rewritten to imply the backend was redeployed.

## Rollback and removal

For a faulty content/build change, revert the responsible commit through a pull request and let the same checked workflow publish the rollback. Verify the newly deployed SHA and assets. If an older successful Actions run is still reproducible, rerunning its complete workflow is an emergency alternative; record that its SHA differs from current `main`. Rollback of a design package in a consumer is a separate dependency change and consumer release.

For a domain move or site retirement, remove/repoint the exact DNS record and allow cached DNS to expire **before** releasing the Pages custom domain or deleting the site. Preserve any organization verification TXT records. Do not leave a dangling hostname. The old GitHub Pages address can be restored by removing the custom domain after DNS has been handled and updating canonical links.

## Platform references

- [GitHub: custom domain setup and configuration order](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: organization domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [GitHub: HTTPS and certificate issuance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [GitHub: Pages REST API](https://docs.github.com/en/rest/pages/pages)
