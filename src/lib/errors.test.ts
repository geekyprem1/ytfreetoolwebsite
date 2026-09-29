import { afterEach, describe, expect, it, vi } from 'vitest';
import { logSafeError } from './errors';

describe('safe upstream error logging', () => {
  afterEach(() => vi.restoreAllMocks());

  it('does not print URLs, messages or credentials from SDK errors', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = Object.assign(new Error('https://example.test/?key=secret-value'), {
      code: 'EACCES', status: 503, config: { url: 'https://example.test/?key=secret-value' },
    });
    logSafeError('request failed', error);
    expect(spy).toHaveBeenCalledWith('request failed', { code: 'EACCES', status: 503 });
    expect(JSON.stringify(spy.mock.calls)).not.toContain('secret-value');
  });
});
