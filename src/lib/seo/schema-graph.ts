import { site } from '@/content/site';
import { tools, toolCount, calculatorCount } from '@/content/tools-metadata';

export type FaqItem = { q: string; a: string };

export function graphJsonLd(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/logo`,
      width: 512,
      height: 512,
    },
    description: site.description,
    email: site.supportEmail,
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
  };
}

export function editorialPersonNode() {
  return {
    '@type': 'Person',
    '@id': `${site.url}/about#person`,
    name: 'YT Toolkit Editorial Team',
    url: `${site.url}/about`,
    worksFor: { '@id': `${site.url}/#organization` },
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.legalName,
    url: site.url,
    description: site.description,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function siteWideGraph() {
  return graphJsonLd([organizationNode(), websiteNode()]);
}

export function homepageGraph(faqs: readonly FaqItem[]) {
  const featureList = tools.map((t) => t.name);

  /** Single @graph for `/` — includes Organization + WebSite so homepage does not need a second script. */
  return graphJsonLd([
    organizationNode(),
    websiteNode(),
    {
      '@type': 'WebPage',
      '@id': `${site.url}/#webpage`,
      url: site.url,
      name: `Free YouTube Creator Tools - YT Toolkit | ${toolCount} Tools Including ${calculatorCount} Calculators`,
      description: site.description,
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': `${site.url}/#webapp` },
      publisher: { '@id': `${site.url}/#organization` },
    },
    {
      '@type': 'WebApplication',
      '@id': `${site.url}/#webapp`,
      name: site.legalName,
      url: site.url,
      description: site.description,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList,
      publisher: { '@id': `${site.url}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${site.url}/#software`,
      name: site.legalName,
      url: site.url,
      description: site.description,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList,
      publisher: { '@id': `${site.url}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ]);
}

export function toolPageGraph(opts: {
  name: string;
  description: string;
  slug: string;
  faqs?: readonly FaqItem[];
  howToSteps?: { name: string; text: string }[];
}) {
  const url = `${site.url}/${opts.slug}`;
  const nodes: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: opts.name,
      description: opts.description,
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': `${url}#webapp` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.answer-first'],
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${url}#webapp`,
      name: opts.name,
      url,
      description: opts.description,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      isPartOf: { '@id': `${site.url}/#webapp` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${url}#software`,
      name: opts.name,
      url,
      description: opts.description,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: site.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Tools',
          item: `${site.url}/#tools`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: opts.name,
          item: url,
        },
      ],
    },
  ];

  if (opts.faqs && opts.faqs.length > 0) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: opts.faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });
  }

  if (opts.howToSteps && opts.howToSteps.length > 0) {
    nodes.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: `How to use ${opts.name}`,
      step: opts.howToSteps.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  return graphJsonLd(nodes);
}

/** Breadcrumb node for content pages outside the /#tools group (data, glossary, vs, etc.). */
export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Dataset node for /data pages — the schema AI engines look for on statistics pages. */
export function datasetNode(opts: {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
  dateModified?: string;
  downloadPath?: string;
}) {
  return {
    '@type': 'Dataset',
    '@id': `${site.url}${opts.path}#dataset`,
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.downloadPath
      ? {
          distribution: {
            '@type': 'DataDownload',
            encodingFormat: 'text/csv',
            contentUrl: `${site.url}${opts.downloadPath}`,
          },
        }
      : {}),
    isAccessibleForFree: true,
    creator: { '@id': `${site.url}/#organization` },
    license: `${site.url}/terms`,
  };
}

/** DefinedTermSet + DefinedTerm nodes for the glossary. */
export function definedTermNode(opts: {
  term: string;
  definition: string;
  slug: string;
}) {
  return {
    '@type': 'DefinedTerm',
    '@id': `${site.url}/glossary/${opts.slug}#term`,
    name: opts.term,
    description: opts.definition,
    inDefinedTermSet: `${site.url}/glossary#set`,
    url: `${site.url}/glossary/${opts.slug}`,
  };
}

export function definedTermSetNode(terms: { term: string; slug: string }[]) {
  return {
    '@type': 'DefinedTermSet',
    '@id': `${site.url}/glossary#set`,
    name: 'YouTube Creator Glossary',
    url: `${site.url}/glossary`,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      url: `${site.url}/glossary/${t.slug}`,
    })),
  };
}

/** ItemList node for hub/index pages (data index, glossary index, programmatic sets). */
export function itemListNode(opts: {
  id: string;
  items: { name: string; path: string }[];
}) {
  return {
    '@type': 'ItemList',
    '@id': `${site.url}${opts.id}`,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${site.url}${item.path}`,
    })),
  };
}
