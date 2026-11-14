// Read-only local HTTP audit: page reachability and server-rendered SEO.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.HOMEPAGE_AUDIT_URL || 'http://localhost:4180';
if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base)) throw new Error('Use a localhost preview URL.');
const source = fs.readFileSync(path.join(scriptDirectory, '../src/content/tools-metadata.ts'), 'utf8');
const routes = [...source.matchAll(/route:\s*'([^']+)'/g)].map(m => m[1]);
(async () => {
  const response = await fetch(base, {signal: AbortSignal.timeout(60000)});
  const html = await response.text();
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  const graphs = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const website = graphs.flatMap(g => g['@graph'] || [g]).find(g => g['@type'] === 'WebSite');
  const seo = {
    status: response.status,
    oneH1: (html.match(/<h1[\s>]/g) || []).length === 1,
    canonical: Boolean(canonical && website?.url && new URL(canonical).href === new URL(website.url).href),
    title: /<title>[^<]*YouTube[^<]*<\/title>/.test(html),
    description: /name="description"/.test(html),
    structuredData: html.includes('application/ld+json') && html.includes('FAQPage'),
    allToolsServerRendered: routes.every(route => html.includes(`href="${route}"`)),
  };
  const results = [];
  const pending = [...routes, '/about', '/contact', '/privacy', '/terms', '/blog'];
  async function worker() {
    while (pending.length) {
      const route = pending.shift();
      try { const r = await fetch(base + route, {signal: AbortSignal.timeout(90000)}); await r.arrayBuffer(); results.push({route,status:r.status}); }
      catch (error) { results.push({route,error:error.message}); }
    }
  }
  await Promise.all([worker(),worker(),worker()]);
  const failed = results.filter(r => r.status !== 200);
  const warnings = canonical && /localhost|127\.0\.0\.1/.test(new URL(canonical).hostname) ? ['Local preview canonical uses localhost. Configure NEXT_PUBLIC_SITE_URL to the production origin before deployment.'] : [];
  const report = {checkedAt:new Date().toISOString(),base,toolCount:routes.length,canonicalUrl:canonical,seo,warnings,checkedRoutes:results.length,failed,results};
  fs.mkdirSync(path.join(scriptDirectory,'../validation'), {recursive:true});
  fs.writeFileSync(path.join(scriptDirectory,'../validation/canvas-homepage-routes.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify({seo,canonicalUrl:canonical,warnings,toolCount:routes.length,checkedRoutes:results.length,failed},null,2));
  if (failed.length || Object.values(seo).some(v => v === false) || seo.status !== 200) process.exitCode = 1;
})().catch(error => {console.error(error);process.exitCode=1;});
