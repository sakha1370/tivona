# Website URL migration

The new official website is `https://sakha1370.github.io/tivona/`. The former site at `https://sakha1370.github.io/dial/` remains in the original `dial` repository while the new Pages deployment and Search Console property are verified.

## URL mapping

| Former URL | New URL |
| --- | --- |
| `/dial/` | `/tivona/` |
| `/dial/fa/` | `/tivona/fa/` |
| `/dial/es/` | `/tivona/es/` |
| `/dial/pt-br/` | `/tivona/pt-br/` |
| `/dial/de/` | `/tivona/de/` |
| `/dial/tr/` | `/tivona/tr/` |
| `/dial/ar/` | `/tivona/ar/` |
| `/dial/ru/` | `/tivona/ru/` |
| `/dial/zh-hans/` | `/tivona/zh-hans/` |
| `/dial/privacy.html` | `/tivona/privacy.html` |
| `/dial/uninstall.html` | `/tivona/uninstall.html` |

GitHub Pages does not support arbitrary HTTP 301 rules. Landing pages include an immediate path-preserving JavaScript fallback when they are served under the old `/dial/` path, retain the query and fragment, and use absolute links to the new language pages and privacy policy. The new pages have canonicals and `hreflang` URLs on `/tivona/`.

The fallback is prepared in the local `dial` working tree. The currently published `/dial/` pages will keep serving their existing version until that change is approved, committed, and pushed to `dial`.

Google recommends permanent server-side redirects when the host supports them. For static Pages, a separate old-site redirect artifact would be preferable; an instant meta refresh is Google's next choice, followed by JavaScript when the other options are unavailable. Do not remove the old site while the destination is being verified. Keep the legacy fallback in place for at least a year after it is deployed.

`robots.txt` is included at the project path and allows crawling, with the new sitemap URL. The standard robots file is scoped to the host root (`https://sakha1370.github.io/robots.txt`); this project repository cannot replace a root-level file used by other GitHub Pages projects. The sitemap is also submitted directly in Search Console for this URL-prefix property.

## Search Console monitoring

The URL-prefix property is `https://sakha1370.github.io/tivona/`. In Search Console, use **Performance → Search results** and compare equivalent date ranges. Track clicks, impressions, average CTR, average position, and the queries users searched for. To compare languages, add a **Page** filter for each path prefix: `/` (English), `/fa/`, `/es/`, `/pt-br/`, `/de/`, `/tr/`, `/ar/`, `/ru/`, and `/zh-hans/`. Use exact URL filters for individual landing pages when needed. Newly added properties may not have performance data yet; sitemap submission and a successful live URL test do not guarantee that a page has been indexed.
