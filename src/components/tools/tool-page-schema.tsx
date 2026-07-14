import { ToolSchema } from '@/components/tools/tool-schema';
import { BreadcrumbSchema } from '@/components/tools/breadcrumb-schema';

interface ToolPageSchemaProps {
  toolName: string;
  toolDescription: string;
  toolSlug: string;
  children: React.ReactNode;
}

export function ToolPageSchema({ toolName, toolDescription, toolSlug, children }: ToolPageSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yttoolkit.com';

  return (
    <>
      <ToolSchema name={toolName} description={toolDescription} slug={toolSlug} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Tools', url: `${baseUrl}/` },
          { name: toolName, url: `${baseUrl}/${toolSlug}` },
        ]}
      />
      {children}
    </>
  );
}
