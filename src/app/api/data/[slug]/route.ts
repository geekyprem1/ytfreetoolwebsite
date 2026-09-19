import { NextResponse } from 'next/server';
import { datasetToCsv, getDatasetBySlug } from '@/content/data/datasets';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataset = getDatasetBySlug(slug);
  if (!dataset) return NextResponse.json({ error: 'Dataset not found' }, { status: 404 });

  return new NextResponse(datasetToCsv(dataset), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${dataset.slug}.csv"`,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
