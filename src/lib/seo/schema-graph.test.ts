import { describe, expect, it } from 'vitest';
import { datasetNode, toolPageGraph } from './schema-graph';

describe('SEO schema graph helpers', () => {
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
        '@type': 'HowTo',
        step: [expect.objectContaining({ '@type': 'HowToStep', position: 1 })],
      }),
    ]));
  });
});
