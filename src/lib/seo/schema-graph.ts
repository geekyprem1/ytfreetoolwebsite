import { site } from '@/content/site';
import { tools } from '@/content/tools-metadata';

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
    logo: `${site.url}/icon`,
    description: site.description,
    email: site.supportEmail,
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
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

  return graphJsonLd([
    {
      '@type': 'WebPage',
      '@id': `${site.url}/#webpage`,
      url: site.url,
      name: 'Free YouTube Creator Tools - YT Toolkit | 15+ AI Video Tools',
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
}) {
  const url = `${site.url}/${opts.slug}`;
  const nodes: Record<string, unknown>[] = [
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

  return graphJsonLd(nodes);
}
