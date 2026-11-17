# Tivona official website

This repository contains only Tivona's public website, its localized copy and assets, and the GitHub Pages deployment workflow. Chrome extension implementation, release files, analytics configuration, credentials and other development files stay in the `dial` repository.

## Languages

English (`/`), Persian (`/fa/`), Spanish (`/es/`), Brazilian Portuguese (`/pt-br/`), German (`/de/`), Turkish (`/tr/`), Arabic (`/ar/`), Russian (`/ru/`) and Simplified Chinese (`/zh-hans/`).

## Update the site

- Edit page wording and localized metadata in `content/site-copy/*.json`.
- Edit language names, tags, directions and URL paths in `content/site-locales.cjs`.
- Update the public privacy policy in `content/privacy.html`.
- Keep images, fonts and styles in `content/assets/`, `content/fonts/`, `content/help.css` and `content/landing.css`.
- Build the deployable static site with `npm run build`. GitHub Actions runs the build and validation when `main` changes, then deploys `dist/` to GitHub Pages.

The site generator emits self-referencing canonical URLs, reciprocal `hreflang` links including `x-default`, Open Graph and Schema.org URLs, `sitemap.xml`, and `robots.txt` from the configured website base URL in `scripts/site.cjs`.

## Local preview

Run `npm run build` and serve the generated `dist/` directory with any static HTTP server. Do not open the HTML files directly from the filesystem: relative asset paths and language links should be checked over HTTP.

## Privacy

The published privacy policy describes Tivona's current optional PostHog usage sharing, including that it starts off. The website repository contains no PostHog project keys or extension tracking configuration.
