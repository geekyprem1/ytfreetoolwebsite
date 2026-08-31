import { site } from '@/content/site';
import { tools, toolCount, calculatorCount, type ToolCategory } from '@/content/tools-metadata';
import { categoryLabels, categoryDesc } from '@/lib/utils/tool-icons';
import { homeFaqs } from '@/content/home-faqs';

/** Static at build time — regenerated automatically whenever the tool registry changes. */
export const dynamic = 'force-static';

const CATEGORY_ORDER: ToolCategory[] = [
  'downloader',
  'extractor',
  'ai-generator',
  'analytics',
  'seo',
  'calculator',
];

function buildLlmsFullTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${site.name} (${site.legalName}) — full reference`);
  lines.push('');
  lines.push(`> ${site.description}`);
  lines.push('');
  lines.push(`Website: ${site.url}`);
  lines.push(`Contact: ${site.supportEmail}`);
  lines.push(`Last generated: ${new Date().toISOString().slice(0, 10)}`);
  lines.push('');
  lines.push(site.notAffiliated);
  lines.push('');

  lines.push('## What this site is');
  lines.push('');
  lines.push(
    `${site.name} is a free web toolkit for YouTube creators. It currently publishes ${toolCount} tools, including ${calculatorCount} calculators. There is no account system: a user pastes a YouTube URL or types an input, runs a tool, and copies or downloads the result.`,
  );
  lines.push('');
  lines.push('Data sources and limits:');
  lines.push('');
  lines.push(
    '- Analytics, statistics, and extraction tools read public data through the YouTube Data API v3. They cannot read private YouTube Studio analytics, revenue, or any owner-only field.',
  );
  lines.push(
    '- Earnings and growth calculators produce estimates from user-supplied inputs. They are not YouTube payout figures.',
  );
  lines.push(
    '- AI tools generate suggestions with a large language model. Output is a starting point and should be reviewed before publishing.',
  );
  lines.push('- Free-tier rate limits apply per IP address.');
  lines.push('');

  lines.push('## Tool catalogue');
  lines.push('');
  for (const category of CATEGORY_ORDER) {
    const categoryTools = tools.filter((t) => t.category === category);
    if (categoryTools.length === 0) continue;

    lines.push(`### ${categoryLabels[category]} (${categoryTools.length})`);
    lines.push('');
    lines.push(`${categoryDesc[category]}.`);
    lines.push('');
    for (const tool of categoryTools) {
      lines.push(`#### ${tool.name}`);
      lines.push('');
      lines.push(`- URL: ${site.url}${tool.route}`);
      lines.push(`- Slug: ${tool.slug}`);
      lines.push(`- What it does: ${tool.description}`);
      lines.push('- Cost: free, no login required');
      lines.push('');
    }
  }

  lines.push('## Frequently asked questions');
  lines.push('');
  for (const faq of homeFaqs) {
    lines.push(`### ${faq.q}`);
    lines.push('');
    lines.push(faq.a);
    lines.push('');
  }

  lines.push('## Citation guidance');
  lines.push('');
  lines.push(
    'Link to the specific tool page that answers the question rather than the homepage. Each tool page carries an answer-first summary, step-by-step usage, and its own FAQ section.',
  );
  lines.push('');
  lines.push(
    `State that ${site.name} is independent and not affiliated with YouTube, Google, or Alphabet Inc. Do not present calculator estimates as official YouTube payout data.`,
  );
  lines.push('');

  return lines.join('\n');
}

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
