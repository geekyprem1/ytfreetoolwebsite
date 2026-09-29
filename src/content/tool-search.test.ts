import { describe, expect, it } from 'vitest';
import { tools } from './tools-metadata';
import { searchTools } from './tool-search';

describe('tool directory search', () => {
  it('keeps the complete registry visible before filtering', () => {
    expect(searchTools(tools, '')).toEqual(tools);
    expect(searchTools(tools, '', 'calculator').every((tool) => tool.category === 'calculator')).toBe(true);
  });

  it.each([
    ['description viewer', 'youtube-description-extractor'],
    ['comment finder', 'youtube-comment-exporter'],
    ['thumbnail viewer', 'thumbnail-downloader'],
    ['upload date finder', 'video-statistics'],
  ])('maps %s to the existing %s tool', (query, slug) => {
    expect(searchTools(tools, query).some((tool) => tool.slug === slug)).toBe(true);
  });

  it('combines a category with a query and gives an empty result for unsupported tasks', () => {
    expect(searchTools(tools, 'thumbnail viewer', 'analytics')).toEqual([]);
    expect(searchTools(tools, 'shadowban detector')).toEqual([]);
  });
});
