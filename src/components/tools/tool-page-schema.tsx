import { JsonLd } from '@/components/seo/json-ld';
import { toolPageGraph, type FaqItem } from '@/lib/seo/schema-graph';

interface ToolPageSchemaProps {
  toolName: string;
  toolDescription: string;
  toolSlug: string;
  faqs?: FaqItem[];
  howToSteps?: { name: string; text: string }[];
  children: React.ReactNode;
}

export function ToolPageSchema({
  toolName,
  toolDescription,
  toolSlug,
  faqs = [],
  howToSteps,
  children,
}: ToolPageSchemaProps) {
  return (
    <>
      <JsonLd
        data={toolPageGraph({
          name: toolName,
          description: toolDescription,
          slug: toolSlug,
          faqs,
          howToSteps,
        })}
      />
      {children}
    </>
  );
}
