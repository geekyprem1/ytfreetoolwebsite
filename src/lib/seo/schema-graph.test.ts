import { describe, expect, it } from 'vitest';
import { datasetNode, editorialPersonNode, organizationNode, toolPageGraph } from './schema-graph';

describe('SEO schema graph helpers', () => {
  it('uses a crawlable large logo and a linked editorial person entity', () => {
    expect(organizationNode().logo).toEqual({
      '@type': 'ImageObject',
      url: 'https://yttools.pro/logo',
      width: 512,
      height: 512,
    });
    expect(editorialPersonNode()).toMatchObject({
      '@type': 'Person',
      '@id': 'https://yttools.pro/about#person',
      worksFor: { '@id': 'https://yttools.pro/#organization' },
    });
  });

  it('exposes a real CSV DataDownload distribution for datasets', () => {
    const node = datasetNode({
      name: 'Example dataset',
      description: 'Example description',
      path: '/data/example',
      downloadPath: '/api/data/example',
      dateModified: '2026-09-19',
    });

    expect(node.distribution).toEqual({
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: 'https://yttools.pro/api/data/example',
    });
    expect(node.dateModified).toBe('2026-09-19');
  });

  it('adds HowTo steps only when a tool provides a real procedure', () => {
    const graph = toolPageGraph({
      name: 'Example tool',
      description: 'Example description',
      slug: 'example-tool',
      howToSteps: [{ name: 'Enter input', text: 'Enter the required input.' }],
    });

    expect(graph['@graph']).toEqual(expect.arrayContaining([
      expect.objectContaining({
        '@type': 'WebPage',
        speakable: expect.objectContaining({ cssSelector: ['.answer-first'] }),
      }),
      expect.objectContaining({
        '@type': 'HowTo',
        step: [expect.objectContaining({ '@type': 'HowToStep', position: 1 })],
      }),
    ]));
  });
});
