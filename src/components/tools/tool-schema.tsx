interface ToolSchemaProps {
  name: string;
  description: string;
  slug: string;
}

export function ToolSchema({ name, description, slug }: ToolSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yttoolkit.com';
  const url = `${baseUrl}/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
