import { ToolSchema } from '@/components/tools/tool-schema';
import { BreadcrumbSchema } from '@/components/tools/breadcrumb-schema';
import { site } from '@/content/site';

interface ToolPageSchemaProps {
  toolName: string;
  toolDescription: string;
  toolSlug: string;
  children: React.ReactNode;
}

export function ToolPageSchema({ toolName, toolDescription, toolSlug, children }: ToolPageSchemaProps) {
  return (
    <>
      <ToolSchema name={toolName} description={toolDescription} slug={toolSlug} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: site.url },
          { name: 'Tools', url: `${site.url}/#tools` },
          { name: toolName, url: `${site.url}/${toolSlug}` },
        ]}
      />
      {children}
    </>
  );
}
