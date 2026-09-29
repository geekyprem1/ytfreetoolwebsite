import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { tools, toolCount } from '@/content/tools-metadata';
import { ToolDirectory } from './tool-directory';

const title = `All ${toolCount} Free YouTube Tools | YT Toolkit`;
const description = `Find the right free YouTube tool for your task. Search ${toolCount} tools for thumbnails, transcripts, metadata, video ideas, analytics, SEO and creator calculators.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/tools' },
  openGraph: { title, description, type: 'website' },
};

export default function ToolsDirectoryPage() {
  return (
    <div className="max-w-5xl">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li aria-hidden><ChevronRight className="size-3.5 opacity-50" /></li>
          <li aria-current="page" className="font-medium text-foreground">Tools</li>
        </ol>
      </nav>

      <header className="mb-10 max-w-3xl">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Creator tool index / {toolCount} free tools
        </p>
        <h1 className="text-display text-heading-md md:text-heading-lg text-balance mb-4">
          Find the right YouTube tool for the job.
        </h1>
        <p className="text-lead">
          Start with what you need to do. Search by task or browse a category, then open the tool directly.
        </p>
      </header>

      <ToolDirectory tools={tools} />
    </div>
  );
}
