'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const locales = require('../content/site-locales.cjs');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const home = 'https://sakha1370.github.io/tivona/';
const urlFor = locale => locale.path ? home + locale.path + '/' : home;
const expected = [...locales.map(locale => [locale.tag, urlFor(locale)]), ['x-default', home]];
assert.equal(locales.length, 9);
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
assert.match(fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8'), new RegExp(`Sitemap: ${home.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}sitemap\\.xml`));
assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
for (const locale of locales) {
  const pagePath = path.join(dist, locale.path, 'index.html');
  const html = fs.readFileSync(pagePath, 'utf8');
  const pageUrl = urlFor(locale);
  assert.ok(html.includes(`<link rel="canonical" href="${pageUrl}">`), locale.code);
  assert.ok(html.includes(`<html lang="${locale.tag}" dir="${locale.rtl ? 'rtl' : 'ltr'}">`), locale.code);
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map(match => match.slice(1));
  assert.deepEqual(alternates, expected, locale.code);
  const languages = html.match(/<ul class="language-links">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(languages, locale.code);
  const links = [...languages.matchAll(/<a href="([^"]+)" hreflang="([^"]+)"/g)].map(([, href, tag]) => [tag, href]);
  assert.deepEqual(links, expected.slice(0, -1).map(([tag, href]) => [tag, href]), locale.code);
  assert.ok(html.includes('https://chromewebstore.google.com/detail/aeoijkdjmndfjkkalijcjafcmhmloemh'), locale.code);
  assert.ok(html.includes('"url": "' + pageUrl + '"'), locale.code);
  const entry = sitemap.split('<url>').find(value => value.includes(`<loc>${pageUrl}</loc>`));
  assert.ok(entry, locale.code);
  const sitemapAlternates = [...entry.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(match => match.slice(1));
  assert.deepEqual(sitemapAlternates, expected, locale.code);
}
for (const file of [
  'privacy.html', 'uninstall.html', 'help.css', 'landing.css',
  'assets/tivona-icon.png', 'assets/en/dashboard.webp', 'fonts/Vazirmatn-NL-wght.woff2'
]) assert.ok(fs.existsSync(path.join(dist, file)), file);
assert.match(fs.readFileSync(path.join(dist, 'privacy.html'), 'utf8'), /canonical/);
assert.match(fs.readFileSync(path.join(dist, 'uninstall.html'), 'utf8'), /name="robots" content="noindex"/);
assert.ok(fs.readdirSync(dist).some(name => /^google[a-z0-9]+\.html$/.test(name)), 'Search Console verification file is deployed');
assert.doesNotMatch(sitemap, /github\.io\/dial/);
console.log(`Validated ${locales.length} localized pages, reciprocal SEO metadata, sitemap, robots.txt, policy and site assets.`);
