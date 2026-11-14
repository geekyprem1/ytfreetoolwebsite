// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tools } from './tools-metadata';
import { getHomeToolSuggestions } from './home-tool-suggestions';

describe('homepage URL suggestions', () => {
  it('has a real page for every homepage tool route and no duplicate destinations', () => {
    expect(new Set(tools.map(t => t.route)).size).toBe(tools.length);
    for (const tool of tools) {
      expect(existsSync(resolve('src/app/(tools)', tool.route.slice(1), 'page.tsx')), tool.route).toBe(true);
    }
  });
  it('passes normalized video input to existing tools without tracking parameters', () => {
    const result = getHomeToolSuggestions('https://youtu.be/dQw4w9WgXcQ?si=tracking');
    expect(result?.type).toBe('video');
    expect(result?.suggestions.find(s => s.tool.slug === 'thumbnail-downloader')?.href).toBe('/thumbnail-downloader?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ');
    expect(result?.suggestions.every(s => !s.href.includes('tracking'))).toBe(true);
  });
  it('preserves handles and legacy channel URLs', () => {
    for (const input of ['@Creator', 'https://youtube.com/c/Creator', 'https://youtube.com/user/Creator']) {
      const result = getHomeToolSuggestions(input);
      expect(result?.type).toBe('channel');
      expect(result?.suggestions.some(s => s.tool.slug === 'channel-statistics')).toBe(true);
      expect(result?.suggestions.every(s => new URL(s.href, 'https://example.test').searchParams.get('url')?.includes('Creator'))).toBe(true);
    }
  });
  it('suggests a playlist tool for a playlist URL', () => {
    const result = getHomeToolSuggestions('https://youtube.com/playlist?list=PL1234567890abcd');
    expect(result?.type).toBe('playlist');
    expect(result?.suggestions[0]?.tool.slug).toBe('playlist-length-calculator');
  });
  it('does not treat ordinary searches, broken links or lookalike hosts as URLs', () => {
    for (const input of ['thumbnail viewer', '', 'https://youtube.com/watch?v=bad', 'https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ', 'javascript:alert(1)']) {
      expect(getHomeToolSuggestions(input)).toBeNull();
    }
  });
});
