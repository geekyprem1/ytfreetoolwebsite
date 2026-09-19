import { describe, expect, it } from 'vitest';
import { tools } from './tools-metadata';
import { getToolLastModified } from './tool-last-modified';

describe('tool sitemap freshness registry', () => {
  it('covers every public tool route', () => {
    const missing = tools.filter((tool) => !getToolLastModified(tool.route)).map((tool) => tool.route);
    expect(missing).toEqual([]);
  });
});
